import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'

const SuccessPage = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [token, setToken] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');

  const payedCartItems = [...cartItems];

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const token = currentUrl.searchParams.get('token');

    if (token !== null && token !== undefined && token !== '') {
      setToken(token);
      updateOrderStatus(token)
    } else {
      console.log('Token is empty or not present.');
      throw new Error(
        'There is an issue with order ID, please contact support ',
      );
    }
  }, []);

  const updateOrderStatus = async (token) => {
    try {
      // Assuming the orderId is stored in localStorage or obtained somehow
      
      const response = await axios.patch(`/orders/${token}/status`, { status: 'approved' });

      if (response.data.success) {
        setTransactionStatus('Transaction successful');
        setCartItems([]); // Clear cart after successful transaction
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      setTransactionStatus('Error in transaction');
      throw new Error(
        'Something went wrong with the order please contact our support team!',
      );}
  };
  // send request to update order status to 2 (transaction closed - payment went through)


  return (
    <>
      <div>{transactionStatus}</div>
      {transactionStatus === 'Transaction successful' && JSON.stringify(payedCartItems)}
    </>
  );
};

export default SuccessPage;