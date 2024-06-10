import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PurchaseCoinsModal from './PurchaseCoinsModal';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);

const PurchaseCoins = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const packages = [
    { coins: 10, price: 1 },
    { coins: 100, price: 9 },
    { coins: 500, price: 19 },
    { coins: 1000, price: 39 },
  ];
  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleBuyNow = async (pkg) => {
      const sessionId = await createStripeCheckoutSession(pkg.coins);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
  };

  const createStripeCheckoutSession = async (coins) => {
    try {
      const response = await fetch(`/create-checkout-session/${coins}`);
      const data = await response.json();
      return data.sessionId;
    } catch (error) {
      // throw new Error('Error creating Stripe checkout session');
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="parent-container">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Purchase Coins</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.coins}
                className="border rounded-lg p-4 text-center shadow cursor-pointer hover:bg-gray-100"
                style={{ height: '350px' }}
                onClick={() => openModal(pkg)}
              >
                <h2 className="text-2xl font-bold mb-2">{pkg.coins} Coins</h2>
                <p className="text-lg mb-4">${pkg.price}.00</p>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleBuyNow(pkg)}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
        {selectedPackage && (
          <PurchaseCoinsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            selectedPackage={selectedPackage}
          />
        )}
      </div>
    </Elements>
  );
};

export default PurchaseCoins;
