import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

export default function PaymentForm() {
  const [error, setError] = useState("");
  const [elements, setElements] = useState(null);
  const [stripe, setStripe] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await stripePromise;
      setStripe(stripeInstance);

      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 99900 })
      });
      
      const { clientSecret } = await response.json();
      const elementsInstance = stripeInstance.elements({ clientSecret });
      const paymentElement = elementsInstance.create("payment");
      
      paymentElement.mount("#payment-element");
      setElements(elementsInstance);
    };

    initializeStripe().catch(err => setError(err.message));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment-confirmation"
      }
    });

    if (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Details</h2>
        <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
          <div id="payment-element" className="min-h-[150px]" />
          <button
            type="submit"
            disabled={!stripe}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            Pay Now
          </button>
          {error && (
            <div className="text-red-600 text-sm mt-2" id="error-message">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
