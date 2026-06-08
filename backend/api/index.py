from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PriceRequest(BaseModel):
    product_name: str
    category: str

@app.get("/api/health")
def read_health():
    return {"status": "ok", "message": "OSMART API is running"}

@app.post("/api/ai/predict-price")
def predict_price(req: PriceRequest):
    base = 100
    if req.category == 'farm': base = 50
    elif req.category == 'product': base = 500
    predicted = base + random.randint(10, 200)
    return {
        "product": req.product_name,
        "predicted_price": predicted,
        "confidence": round(random.uniform(0.8, 0.99), 2),
        "trend": "up" if random.random() > 0.5 else "down"
    }

@app.get("/api/ai/insights")
def get_insights():
    return {
        "insights": [
            "Demand for Organic Mangoes is expected to rise by 25% next week.",
            "Local services in Madurai are experiencing peak booking hours from 4 PM - 7 PM.",
            "Handloom silk products are trending among users in Chennai."
        ],
        "trending_products": [
            {"name": "Coimbatore Wet Grinder", "sales": 450, "trend": "+12%"},
            {"name": "Organic Turmeric Powder", "sales": 320, "trend": "+8%"},
            {"name": "Kanchipuram Silk Sarees", "sales": 150, "trend": "+22%"}
        ]
    }
