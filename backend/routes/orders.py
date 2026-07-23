from flask import Blueprint, jsonify, request
from database import db
from models import Cart, Order, OrderItem

orders_bp = Blueprint("orders", __name__)

@orders_bp.route("/orders", methods=["POST"])
def place_order():

    data = request.json
    user_id = data["user_id"]

    # Get all cart items for the user
    cart_items = Cart.query.filter_by(user_id=user_id).all()

    if len(cart_items) == 0:
        return jsonify({
            "message": "Cart is empty"
        }), 400

    # Calculate total amount
    total_amount = 0

    for item in cart_items:
        total_amount += item.product.price * item.quantity

    # Create a new order
    order = Order(
        user_id=user_id,
        total_amount=total_amount,
        status="Pending"
    )

    db.session.add(order)
    db.session.commit()

    # Save each cart item into order_items table
    for item in cart_items:

        order_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.product.price
        )

        db.session.add(order_item)

    # Clear the user's cart
    for item in cart_items:
        db.session.delete(item)

    db.session.commit()

    return jsonify({
    "message": "Order placed successfully",
    "order_id": order.id,
    "total_amount": total_amount
}), 201

@orders_bp.route("/orders", methods=["GET"])
def get_orders():

    orders = Order.query.all()

    result = []

    for order in orders:

        result.append({
            "id": order.id,
            "user_id": order.user_id,
            "total_amount": order.total_amount,
            "status": order.status
        })

    return jsonify(result)


@orders_bp.route("/order-items", methods=["GET"])
def get_order_items():

    items = OrderItem.query.all()

    result = []

    for item in items:

        result.append({
            "id": item.id,
            "order_id": item.order_id,
            "product_id": item.product_id,
            "quantity": item.quantity,
            "price": item.price
        })

    return jsonify(result)