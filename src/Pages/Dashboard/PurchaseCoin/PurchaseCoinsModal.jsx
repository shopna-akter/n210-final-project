/* eslint-disable react/prop-types */
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useUserFetch from '../../../Hooks/useUserFetch';
import Swal from 'sweetalert2';

const PurchaseCoinsModal = ({ isOpen, onClose, selectedPackage }) => {
  const axiosSecure = useAxiosSecure();
  const userData = useUserFetch()
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      const response = await axiosSecure.post(`/purchase-coins/${selectedPackage.coins}`, {
        coins: selectedPackage.coins,
        payment_method: paymentMethod.type,
        userId: userData._id
      });
      if (response.status === 200) {
        onClose();
        Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            text: 'Your payment has been processed successfully!',
          })
      }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full sm:w-96 bg-white p-4 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-4">Purchase {selectedPackage.coins} Coins</h1>
        <p className="text-lg mb-4">Price: ${selectedPackage.price}.00</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <CardElement className="border rounded-lg p-2" />
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2">
              Confirm Purchase
            </button>
            <button className="btn" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseCoinsModal;
