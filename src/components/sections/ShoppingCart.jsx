import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import {
  Badge,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const ShoppingCart = ({ sx, variant }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [totalProducts, setTotalPoducts] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(isOpen);
  const addToCart = (item) => {
    const isItemExist = cartItems.find((cartItem) => cartItem._id === item._id);
    if (isItemExist) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const decrementFromCart = (item) => {
    const isItemExist = cartItems.find((cartItem) => cartItem._id === item._id);
    if (isItemExist) {
      if (isItemExist.quantity === 1) {
        setCartItems((prevItems) =>
          prevItems.filter((cartItem) => cartItem._id !== item._id)
        );
      } else {
        const updatedCartItems = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          }
          return cartItem;
        });
        setCartItems(updatedCartItems);
      }
    }
  };

  const deleteFromCart = (item) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem._id !== item._id)
    );
  };
  
  const resetCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    const updatedNumber = cartItems.length;

    setTotalPoducts(updatedNumber);

    const totalPrice = cartItems.reduce(
      (total, item) => total + item.quantity * item.product_price,
      0
    );

    setTotalPrice(totalPrice.toFixed(2));
  }, [cartItems]);

  return (
    <>
      <Button
        p={1}
        onClick={onOpen}
        sx={sx}
        variant={variant}
        position="relative"
      >
        {totalProducts && totalProducts !== 0 ? (
          <Badge
            fontSize="sm"
            colorScheme="purple"
            position="absolute"
            right="-5px"
            top="0"
          >
            {totalProducts}
          </Badge>
        ) : null}
        <FaShoppingCart />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="920px" mx="auto">
          <ModalCloseButton />
          <ModalBody>
            {cartItems.length === 0 ? (
              <Text>Nothing in your cart</Text>
            ) : (
              <Table variant="striped" colorScheme="twitter" size="md">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Image</Th>
                    <Th>Product</Th>
                    <Th>Price</Th>
                    <Th minW={170}>Quantity</Th>
                    <Th>Total</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItems.map((item) => (
                    <Tr key={item._id}>
                      <Td>
                        <Button onClick={() => deleteFromCart(item)}>
                          Remove
                        </Button>
                      </Td>
                      <Td>
                        <Image maxW="100%" src={item.product_image} />
                      </Td>
                      <Td>{item.product_name}</Td>
                      <Td>${item.product_price}</Td>
                      <Td>
                        <Button
                          onClick={() => decrementFromCart(item)}
                          size="sm"
                          colorScheme="red"
                        >
                          -
                        </Button>
                        <Text mx={1.5} as="b">
                          {item.quantity}
                        </Text>
                        <Button
                          onClick={() => addToCart(item)}
                          size="sm"
                          colorScheme="green"
                        >
                          +
                        </Button>
                      </Td>
                      <Td>
                        ${(item.quantity * item.product_price).toFixed(2)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
            {cartItems.length !== 0 && (
              <Heading as="h3" size="md" mt={2}>
                Cart Total: ${totalPrice}
              </Heading>
            )}
          </ModalBody>
          <ModalFooter p={3} justifyContent="space-between">
            {cartItems.length !== 0 && (
              <>
                <Button
                  onClick={onClose}
                  as={Link}
                  to="/purchase"
                  colorScheme="green"
                >
                  Buy Now
                </Button>
                <Button colorScheme="yellow" onClick={resetCart}>
                  Empty Cart
                </Button>
              </>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShoppingCart;
