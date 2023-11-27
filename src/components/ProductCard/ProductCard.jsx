import {
  Box,
  Center,
  Card,
  CardBody,
  Image,
  Stack,
  HStack,
  Heading,
  Text,
  CardFooter,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate()
  return (
    <Box mt={2} bgColor={'whiteAlpha.900'}>
      <Center>
        <Card>
          <CardBody>
            <Image
            onClick={() =>{navigate(`/products/${product._id}`)}}
            src={product.product_image || 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg'}
              borderRadius='lg'
              maxHeight={'170px'}
            />
            <Stack mt='6' spacing='2'>
              <Heading size='sm'>{product.product_name}</Heading>
              <Text w={250} fontSize='xs' overflowY='hidden' height={150}>
                {product.product_description}
              </Text>
              <HStack>
                {product.categories.map((item) => (
                  <Text bg='purple.200' px={1} borderRadius='14%' fontSize='lg' key={item?.category._id}>
                    {item.category.category_name}
                  </Text>
                ))}
              </HStack>
              <Text color='blue.700' fontSize='xl'>
                ${product.product_price}
              </Text>
            </Stack>
          </CardBody>
          <CardFooter>
            <Button
              onClick={() => {
                addToCart(product);
              }}
            >
              Add To Cart
            </Button>
          </CardFooter>
        </Card>
      </Center>
    </Box>
  );
};

export default ProductCard;
