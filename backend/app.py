from flask import Flask, jsonify, request
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

cart=[]

@app.route("/")
def home():
    return "ShopSphere API Running"

@app.route("/products")
def get_products():
    return jsonify(products)


@app.route("/cart", methods=["POST"])
def add_to_cart():

    data = request.json

    cart.append(data)

    return jsonify({
        "message": "Product added to cart",
        "cart": cart
    }), 201

if __name__ == "__main__":
    app.run(debug=True)
