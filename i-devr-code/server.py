from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import stripe
import os

app = Flask(__name__, static_folder='client/dist')
CORS(app)

stripe.api_key = "sk_test_4eC39HqLyjWDarjtT1zdp7dc"

@app.route("/")
def serve_app():
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/assets/<path:path>")
def serve_assets(path):
    return send_from_directory(os.path.join(app.static_folder, "assets"), path)

@app.route("/create-payment-intent", methods=["POST"])
def create_payment():
    try:
        data = request.get_json()
        payment_intent = stripe.PaymentIntent.create(
            amount=data["amount"],
            currency="usd",
            payment_method_types=["card"]
        )
        return jsonify({"clientSecret": payment_intent.client_secret})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=8000, debug=True)
