import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const createQuote = (payload) => api.post("/quotes", payload).then((r) => r.data);
export const listQuotes = () => api.get("/quotes").then((r) => r.data);
export const updateQuoteStatus = (id, status) =>
  api.patch(`/quotes/${id}`, { status }).then((r) => r.data);
export const deleteQuote = (id) => api.delete(`/quotes/${id}`).then((r) => r.data);
