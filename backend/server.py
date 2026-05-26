from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------- Models ----------

class QuoteRequestCreate(BaseModel):
    namn: str = Field(..., min_length=1, max_length=200)
    email: EmailStr
    telefon: Optional[str] = Field(default=None, max_length=50)
    foretag: Optional[str] = Field(default=None, max_length=200)
    tjanst: Optional[str] = Field(default=None, max_length=100)
    meddelande: str = Field(..., min_length=1, max_length=5000)


class QuoteRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    namn: str
    email: str
    telefon: Optional[str] = None
    foretag: Optional[str] = None
    tjanst: Optional[str] = None
    meddelande: str
    status: str = "ny"  # ny | kontaktad | klar
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class QuoteStatusUpdate(BaseModel):
    status: str


# ---------- Routes ----------

@api_router.get("/")
async def root():
    return {"message": "Treborg Bygg API"}


@api_router.post("/quotes", response_model=QuoteRequest)
async def create_quote(payload: QuoteRequestCreate):
    quote = QuoteRequest(**payload.model_dump())
    doc = quote.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.quote_requests.insert_one(doc)
    return quote


@api_router.get("/quotes", response_model=List[QuoteRequest])
async def list_quotes():
    quotes = await db.quote_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for q in quotes:
        if isinstance(q.get('created_at'), str):
            try:
                q['created_at'] = datetime.fromisoformat(q['created_at'])
            except ValueError:
                pass
    return quotes


@api_router.patch("/quotes/{quote_id}", response_model=QuoteRequest)
async def update_quote_status(quote_id: str, payload: QuoteStatusUpdate):
    if payload.status not in {"ny", "kontaktad", "klar"}:
        raise HTTPException(status_code=400, detail="Ogiltig status")
    result = await db.quote_requests.find_one_and_update(
        {"id": quote_id},
        {"$set": {"status": payload.status}},
        projection={"_id": 0},
        return_document=True,
    )
    if not result:
        raise HTTPException(status_code=404, detail="Offertförfrågan hittades inte")
    if isinstance(result.get('created_at'), str):
        try:
            result['created_at'] = datetime.fromisoformat(result['created_at'])
        except ValueError:
            pass
    return result


@api_router.delete("/quotes/{quote_id}")
async def delete_quote(quote_id: str):
    res = await db.quote_requests.delete_one({"id": quote_id})
    if res.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Offertförfrågan hittades inte")
    return {"deleted": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
