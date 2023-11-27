import { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const PasswordReset = () => {
  const { user } = useContext(AuthContext);

  const [values, setValues] = useState({
    user_email: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const forgotPassword = async (user_email) => {
    try {
      const response = await axios.post('/mailer/send-password-reset-link', {
        user_email,
      });

      return {success: true, message: response.data.message
      }
    } catch (error) {
      throw new Error(error.response.data.error || "Error in sending email")
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await forgotPassword(values.user_email);
      setValues({
        user_email: '',
      });
      toast.success(response.message);
    } catch (error) {
      toast.error(error.error);
    } finally {
      setLoading(false);
    }
  };
 
  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Box
        as='form'
        onSubmit={handleSubmit}
        minH='65vh'
        maxW='600px'
        mx='auto'
        py={10}
        px={4}
      >
        <Heading mb={2}>Forgot password?</Heading>
        <Text mb={2}>We will send you a password reset link to your Email address</Text>
        <FormControl id='email' isRequired mb={4}>
          <FormLabel>Enter Email Address</FormLabel>
          <Input
            type='email'
            name='user_email'
            value={values.user_email}
            onChange={handleChange}
          />
        </FormControl>
        <Button type='submit' colorScheme='twitter' size='lg' mb={2}>
          Send
        </Button>
      </Box>

      {loading && <Text as='span'>Loading...</Text>}
    </>
  );
};

export default PasswordReset;