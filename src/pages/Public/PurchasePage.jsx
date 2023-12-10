import {
  Box,
  Heading,
  Text,
  Table,
  Tr,
  Td,
  Tbody,
  Thead,
  Th,
  Flex,
  Input,
  Button,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import AuthContext from '../../context/AuthContext';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PurchasePage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [payments, setPayments] = useState(null);

  const [values, setValues] = useState({
    name: user?.user?.user_name || '',
    email: user?.user?.user_email || '',
    phone: user?.user?.user_phone || '',
    city: user?.user?.user_address.city || '',
    street: user?.user?.user_address.street || '',
    building: user?.user?.user_address.building || '',
    apartment: user?.user?.user_address.apartment || '',
  });

  const [paymentValues, setPaymentValues] = useState({
    credit: '4111111111111111',
    expDate: '12/24',
    cvv: '357',
  });

  const userDetails = user?.user
    ? (({ user_avatar, ...rest }) => rest)(user.user)
    : {};

  const cartDetails = cartItems.map(
    ({ product_image, ...restOfItem }) => restOfItem,
  );

  const continuePlaceOrder = async (paymentStatus) => {
    try {
      const end_point = user ? 'customer-order' : 'order';

      const { data: order_status } = await axios.post(`/orders/${end_point}`, {
        user: user?.user?._id,
        customer_details: {
          customer_name: values.name,
          customer_email: values.email,
          customer_phone: values.phone,
          customer_address: {
            city: values.city,
            street: values.street,
            building: values.building,
            apartment: values.apartment,
          },
        },
        payment_details: paymentStatus,
        products: cartItems.map((pr) => {
          return {
            product: pr._id,
            RTP: pr.product_price,
            quantity: pr.quantity,
          };
        }),
      });

      setCartItems([]);
      // console.log(order_status.data);
      // alert(`Your order is placed, order number: ${order_status.order_number}`);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    const { credit, expDate, cvv } = paymentValues;

    try {
      const {
        data: { paymentStatus },
      } = await axios.post(`/payments/pay`, {
        userDetails,
        cartDetails,
        cartTotal: totalPrice,
        creditNumber: credit,
        expDate,
        cvv,

        orderDetails: {
          userId: user?.user?._id,
          customer_details: {
            customer_name: values.name,
            customer_email: values.email,
            customer_phone: values.phone,
            customer_address: {
              city: values.city,
              street: values.street,
              building: values.building,
              apartment: values.apartment,
            },
          },
          products: cartItems.map((pr) => {
            return {
              product: pr._id,
              RTP: pr.product_price,
              quantity: pr.quantity,
            };
          }),
        },
      });
      console.log(paymentStatus);

     if (paymentStatus.redirtectURL !=='')
        return(window.location.href = paymentStatus.redirectUrl);

      return navigate(`/success-payment?token=${paymentStatus.token}`)
    } catch (error) {
      toast.error(error.response.data.message);
      navigate('/rejected-payment')
    }
  };

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreditChange = (e) => {
    setPaymentValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const updatedNumber = cartItems.length;

    setTotalProducts(updatedNumber);

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.product_price,
      0,
    );

    setTotalPrice(totalPrice.toFixed(2));
  }, [cartItems]);

  return (
    <form onSubmit={placeOrder}>
      <Box minH='65vh' maxW='90%' mx='auto' py={10} px={4}>
        <Heading as='h2' size='xl' mb={4}>
          Order Items
        </Heading>
        <Box mb={4}>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Price</Th>
                <Th minW={170}>Quantity</Th>
                <Th>Total</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cartItems.map((item) => (
                <Tr key={item._id}>
                  <Td>{item.product_name}</Td>
                  <Td>${item.product_price}</Td>
                  <Td>
                    <Text mx={1.5} as='b'>
                      {item.quantity}
                    </Text>
                  </Td>
                  <Td>${(item.quantity * item.product_price).toFixed(2)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Heading as='h3' size='md' mt={2}>
            Cart Total: ${totalPrice}
          </Heading>
        </Box>
        <Heading m={4}>Customer and Shipping details</Heading>
        <Box mb={4}>
          <Flex direction='column' mb={4}>
            <Input
              value={values.name}
              isRequired
              onChange={handleChange}
              name='name'
              placeholder='Full Name'
              mb={2}
            />
            <Input
              value={values.email}
              isRequired
              onChange={handleChange}
              name='email'
              placeholder='Email'
              type='email'
              mb={2}
            />
            <Input
              value={values.phone}
              isRequired
              onChange={handleChange}
              name='phone'
              placeholder='Phone'
              mb={2}
            />
            <Input
              value={values.street}
              isRequired
              onChange={handleChange}
              name='street'
              placeholder='Street Address'
              mb={2}
            />
            <Input
              value={values.city}
              isRequired
              onChange={handleChange}
              name='city'
              placeholder='City'
              mb={2}
            />
            <Input
              value={values.building}
              isRequired
              onChange={handleChange}
              name='building'
              placeholder='Building Number'
              mb={2}
            />
            <Input
              value={values.apartment}
              isRequired
              onChange={handleChange}
              name='apartment'
              placeholder='Apartment Number'
              mb={2}
            />
          </Flex>
        </Box>
        <Heading m={4}>Credit Card Details</Heading>
        <Box mb={4}>
          <Flex direction='column' mb={4}>
            <Input
              value={paymentValues.credit}
              isRequired
              onChange={handleCreditChange}
              name='credit'
              placeholder='Card Number'
              mb={2}
              min={8}
              max={16}
            />
            <Input
              value={paymentValues.expDate}
              isRequired
              onChange={handleCreditChange}
              name='expDate'
              placeholder='Expiration Date'
              mb={2}
            />
            <Input
              value={paymentValues.cvv}
              isRequired
              onChange={handleCreditChange}
              name='cvv'
              placeholder='CVV'
              mb={2}
            />
          </Flex>
        </Box>
        <Button type='submit' colorScheme='teal'>
          Place Order
        </Button>
      </Box>
    </form>
  );
};

export default PurchasePage;