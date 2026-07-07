from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = [
    {
        "id": 1,
        "name": "Laptop",
        "price": 50000,
        "image": "https://via.placeholder.com/200",
        "category": "Electronics"
    },
    {
        "id": 2,
        "name": "Mobile",
        "price": 20000,
        "image": "https://via.placeholder.com/200",
        "category": "Electronics"
    },
    {
        "id": 3,
        "name": "Headphones",
        "price": 3000,
        "image": "https://via.placeholder.com/200",
        "category": "Accessories"
    },
    {
        "id": 4,
        "name": "Smart Watch",
        "price": 8000,
        "image": "https://via.placeholder.com/200",
        "category": "Wearables"
    }
]

@app.route("/")
def home():
    return "ShopSphere API Running"

@app.route("/products")
def get_products():
    return jsonify(products)

if __name__ == "__main__":
    app.run(debug=True)