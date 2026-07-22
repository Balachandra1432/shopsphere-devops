from flask import Flask, jsonify, request
from flask_cors import CORS
from database import db
from config import Config
from routes.products import products_bp
from models import Product
from routes.cart import cart_bp
from routes.users import users_bp

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

db.init_app(app)
app.register_blueprint(products_bp)
app.register_blueprint(cart_bp)
app.register_blueprint(users_bp)


with app.app_context():

    db.create_all()

    if Product.query.count() == 0:

        products = [

            Product(
                name="Laptop",
                price=50000,
                image="https://via.placeholder.com/200",
                category="Electronics"
            ),

            Product(
                name="Mobile",
                price=20000,
                image="https://via.placeholder.com/200",
                category="Electronics"
            ),

            Product(
                name="Headphones",
                price=3000,
                image="https://via.placeholder.com/200",
                category="Accessories"
            ),

            Product(
                name="Smart Watch",
                price=8000,
                image="https://via.placeholder.com/200",
                category="Wearables"
            )

        ]

        db.session.add_all(products)
        db.session.commit()

        print("Products inserted successfully!")





@app.route("/")
def home():
    return "ShopSphere API Running"




if __name__ == "__main__":
    app.run(debug=True)
