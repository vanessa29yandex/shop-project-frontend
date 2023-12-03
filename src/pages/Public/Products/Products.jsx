import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useLoaderData } from "react-router-dom";
import { Box, Text, Heading, Input, InputRightElement, Divider, SimpleGrid, InputGroup, Center } from "@chakra-ui/react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import {CartContext} from "../../../context/CartContext";
import { useContext } from "react";
import Pagination from "./Pagination";
import { BiSearch } from "react-icons/bi";

export const getAllProducts = async () => {
  try {
    const {
      data: { products },
    } = await axios.get("/products/customers/all");
    return products;
  } catch (error) {
    throw error;
  }
};

const Products = () => {
  const initialProducts = useLoaderData();
  const [products, setProducts] = useState([...initialProducts]);
  const { cartItems, setCartItems } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage]=useState(1);

  useEffect(() => {
    const searchResults = initialProducts.filter(
      (product) =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
    ); 

    setProducts(searchResults)
  }, [searchTerm, initialProducts]);

  const productPerPage = 4;
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const onHandleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addToCart = (item) => {
    const isItemExist = cartItems.find((cartItem) => cartItem._id === item._id);

    if (isItemExist) {
      const updateCartItems = cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      setCartItems(updateCartItems);
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const handlePageChange = (page)=>{
    setCurrentPage(page)
  }

  return (
    <Box minH='65vh' py={10} px={4}>
      <Heading>Home</Heading>
      <Text my={5}>
        Welcome to our online store for furniture, Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Aliquid incidunt cupiditate ipsam dolorem
        consequuntur, quasi quidem illo fugiat aliquam, eveniet, suscipit
        pariatur? Fugiat eius commodi, nemo aut incidunt sint dolorem. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Laborum
        exercitationem eveniet consequatur
      </Text>
      <Heading my={5}>Products</Heading>
      <Center>
      <InputGroup maxW={480}>
        <Input 
        placeholder='search by name or description'
        value={searchTerm}
        onChange={onHandleSearchChange}/>
        <InputRightElement>
          <BiSearch/>
        </InputRightElement>
      </InputGroup>
      </Center>
      <Divider />
      <SimpleGrid my={4}
        spacing={4}
        justifyContent='center'
        templateColumns='repeat(auto-fill, minmax(200px, 350px))'
      >
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            addToCart={addToCart}
          >
            {product.product_name}
          </ProductCard>
        ))}
      </SimpleGrid>
      <Pagination
        currentPage={currentPage}
        productsPerPage={productPerPage}
        totalProducts={products.length}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default Products;
