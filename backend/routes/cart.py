from flask import Blueprint, jsonify, request
from database import db
from models import Cart

cart_bp = Blueprint("cart", __name__)


@cart_bp.route("/cart", methods=["POST"])
def add_to_cart():

    data = request.json
    cart_item = Cart.query.filter_by(user_id=data["user_id"],product_id=data["id"]).first()

    if cart_item is None:
        cart_item = Cart(user_id=data["user_id"],
                        product_id=data["id"],
                        quantity=1)
        db.session.add(cart_item)
    else:
        cart_item.quantity+=1
        
    
    db.session.commit()

    return jsonify({
        "message": "Product added to cart"
    }), 201

@cart_bp.route("/cart", methods=["GET"])
def get_cart():

    user_id = request.args.get("user_id")

    cart_items = Cart.query.filter_by(
        user_id=user_id
    ).all()

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


@cart_bp.route("/cart/<int:cart_id>", methods=["DELETE"])
def remove_from_cart(cart_id):

    cart_item = Cart.query.get(cart_id)

    if cart_item is None:
        return jsonify({
            "message": "Item not found"
        }), 404

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({
        "message": "Product removed successfully"
    }), 200


@cart_bp.route("/cart/<int:cart_id>/increase", methods=["PATCH"])
def increase_quantity(cart_id):

    cart_item = Cart.query.get(cart_id)

    if cart_item is None:
        return jsonify({
            "message": "Item not found"
        }), 404

    cart_item.quantity += 1

    db.session.commit()

    return jsonify({
        "message": "Quantity increased successfully"
    }), 200



@cart_bp.route("/cart/<int:cart_id>/decrease", methods=["PATCH"])
def decrease_quantity(cart_id):

    cart_item = Cart.query.get(cart_id)

    if cart_item is None:
        return jsonify({
            "message": "Item not found"
        }), 404

    if cart_item.quantity > 1:
        cart_item.quantity -= 1
    else:
        db.session.delete(cart_item)

    db.session.commit()

    return jsonify({
        "message": "Quantity decreased successfully"
    }), 200    
