import os
import stripe

stripe.api_key = os.environ.get("STRIPE_API_KEY", "")
