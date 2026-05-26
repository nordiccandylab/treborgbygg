"""Backend tests for Treborg Bygg Quote API."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://bygg-portfolio.preview.emergentagent.com').rstrip('/')
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def created_ids():
    ids = []
    yield ids
    # cleanup
    for i in ids:
        try:
            requests.delete(f"{API}/quotes/{i}", timeout=10)
        except Exception:
            pass


# ---------- Health ----------
def test_root():
    r = requests.get(f"{API}/", timeout=10)
    assert r.status_code == 200
    assert "message" in r.json()


# ---------- POST /api/quotes ----------
def test_create_quote_success(created_ids):
    payload = {
        "namn": "TEST_Anna Andersson",
        "email": "test_anna@example.com",
        "telefon": "+46701234567",
        "foretag": "TEST AB",
        "tjanst": "Renovering",
        "meddelande": "Vi behöver renovera vårt badrum.",
    }
    r = requests.post(f"{API}/quotes", json=payload, timeout=10)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["namn"] == payload["namn"]
    assert data["email"] == payload["email"]
    assert data["status"] == "ny"
    assert "id" in data and isinstance(data["id"], str)
    assert "created_at" in data
    created_ids.append(data["id"])


def test_create_quote_minimal(created_ids):
    payload = {
        "namn": "TEST_Min",
        "email": "test_min@example.com",
        "meddelande": "Kort meddelande.",
    }
    r = requests.post(f"{API}/quotes", json=payload, timeout=10)
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ny"
    created_ids.append(data["id"])


def test_create_quote_missing_namn():
    payload = {"email": "x@example.com", "meddelande": "msg"}
    r = requests.post(f"{API}/quotes", json=payload, timeout=10)
    assert r.status_code == 422


def test_create_quote_missing_email():
    payload = {"namn": "TEST", "meddelande": "msg"}
    r = requests.post(f"{API}/quotes", json=payload, timeout=10)
    assert r.status_code == 422


def test_create_quote_missing_meddelande():
    payload = {"namn": "TEST", "email": "x@example.com"}
    r = requests.post(f"{API}/quotes", json=payload, timeout=10)
    assert r.status_code == 422


def test_create_quote_empty_namn():
    payload = {"namn": "", "email": "x@example.com", "meddelande": "msg"}
    r = requests.post(f"{API}/quotes", json=payload, timeout=10)
    assert r.status_code == 422


def test_create_quote_invalid_email():
    payload = {"namn": "TEST", "email": "not-an-email", "meddelande": "msg"}
    r = requests.post(f"{API}/quotes", json=payload, timeout=10)
    assert r.status_code == 422


# ---------- GET /api/quotes ----------
def test_list_quotes(created_ids):
    r = requests.get(f"{API}/quotes", timeout=10)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    # ensure created entry exists
    ids = [q["id"] for q in data]
    if created_ids:
        assert created_ids[0] in ids
    # check sort desc by created_at
    if len(data) >= 2:
        assert data[0]["created_at"] >= data[1]["created_at"]


# ---------- PATCH /api/quotes/{id} ----------
def test_patch_status_valid(created_ids):
    assert created_ids, "No quote created"
    qid = created_ids[0]
    for status in ["kontaktad", "klar", "ny"]:
        r = requests.patch(f"{API}/quotes/{qid}", json={"status": status}, timeout=10)
        assert r.status_code == 200, r.text
        assert r.json()["status"] == status

    # verify persistence
    rg = requests.get(f"{API}/quotes", timeout=10)
    found = next((q for q in rg.json() if q["id"] == qid), None)
    assert found and found["status"] == "ny"


def test_patch_status_invalid(created_ids):
    qid = created_ids[0]
    r = requests.patch(f"{API}/quotes/{qid}", json={"status": "bogus"}, timeout=10)
    assert r.status_code == 400


def test_patch_status_nonexistent():
    r = requests.patch(f"{API}/quotes/does-not-exist", json={"status": "ny"}, timeout=10)
    assert r.status_code == 404


# ---------- DELETE /api/quotes/{id} ----------
def test_delete_quote():
    # create
    payload = {"namn": "TEST_Del", "email": "del@example.com", "meddelande": "delete me"}
    r = requests.post(f"{API}/quotes", json=payload, timeout=10)
    qid = r.json()["id"]
    # delete
    rd = requests.delete(f"{API}/quotes/{qid}", timeout=10)
    assert rd.status_code == 200
    assert rd.json().get("deleted") is True
    # verify removed
    rg = requests.get(f"{API}/quotes", timeout=10)
    ids = [q["id"] for q in rg.json()]
    assert qid not in ids


def test_delete_nonexistent():
    r = requests.delete(f"{API}/quotes/no-such-id", timeout=10)
    assert r.status_code == 404
