from flask import Blueprint, jsonify, request
from database import db
from models import Cart

cart_bp = Blueprint("cart", __name__)


@cart_bp.route("/cart", methods=["POST"])
def add_to_cart():

    data = request.json
    cart_item = Cart.query.filter_by(product_id=data["id"]).first()

    if cart_item is None:
        cart_item =Cart(
            product_id=data["id"],
            quantity=1
        )
        db.session.add(cart_item)
    else:
        cart_item.quantity+=1
        
    
    db.session.commit()

    return jsonify({
        "message": "Product added to cart"
    }), 201

@cart_bp.route("/cart", methods=["GET"])
def get_cart():

    cart_items = Cart.query.all()

    result = []

    for item in cart_items:

        result.append({
            "id": item.id,
            "product_id": item.product_id,
            "product_name": item.product.name,
            "price": item.product.price,
            "image": item.product.image,
            "category": item.product.category,
            "quantity": item.quantity
        })

    return jsonify(result)