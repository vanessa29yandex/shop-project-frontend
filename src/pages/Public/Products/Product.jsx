import React, { useContext, useState } from 'react';
import axios from '../../../api/axios';
import { Link, useLoaderData } from 'react-router-dom';
import { CartContext } from '../../../context/CartContext';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

export const loader = async ({ params }) => {
  try {
    const {
      data: { product },
    } = await axios.get(`/products/customers/${params.productId}`);

    return { product };
  } catch (error) {
    throw new Error('Couldn\'t find product!');
  }
};

const ProductPage = () => {
  const { product } = useLoaderData();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = (item) => {
    const isItemExist = cartItems.find((cartItem) => cartItem._id === item._id);
    if (isItemExist) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: cartItem.quantity + quantity };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: quantity }]);
    }
  };

  if (!product) return <Spinner size='xl' />;

  return (
    <>
      <Flex mx='auto' direction='column' maxW='80%'>
        <Flex minH='65vh' maxW='100%' mx='auto' py={10} px={4}>
          <Box w='70%'>
            <Image
              src={product.product_image}
              alt={`${product.product_name}`}
            />
          </Box>
          <Box ml={4}>
            <Heading size='lg'>{product.product_name}</Heading>
            <Divider mb={2} />
            <Text mb={2}>{product.product_description}</Text>
            <Text fontWeight='bold' mb={2}>
              $ {product.product_price}
            </Text>
            <Divider mb={2} />
            <Flex>
              <Button onClick={increment}>+</Button>
              <Text>{quantity}</Text>
              <Button onClick={decrement}>-</Button>
            </Flex>
            <Button
              onClick={() => addToCart(product)}
              mb={10}
              colorScheme='twitter'
              size='lg'
            >
              Add To Cart
            </Button>
          </Box>
        </Flex>
        <Button as={Link} to={`../`}>
          Go Back
        </Button>
      </Flex>
    </>
  );
};

export default ProductPage;