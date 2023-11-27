import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import axios from '../../api/axios';
  import { toast } from 'react-toastify';
  import { useNavigate } from 'react-router-dom';
  
  const Register = () => {
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({
      user_name: '',
      user_email: '',
      user_phone: '',
      user_password: '',
      user_password_confirm: '',
    });
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setValues((prevValues) => ({
        ...prevValues,
        [e.target.name]: e.target.value,
      }));
    };
  
    const handleClick = () => setShow(!show);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const {
          user_name,
          user_email,
          user_password,
          user_phone,
          user_password_confirm,
        } = values;
        if (user_password !== user_password_confirm)
          throw new Error('Passwords do not match');
  
        const response = await axios.post('/users/customers/register', {
          user_name,
          user_email,
          user_password,
          user_phone,
        });
  
        toast.success(response.message)
        navigate('/login')
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    
    return (
      <Box
        as='form'
        onSubmit={handleSubmit}
        minH='65vh'
        maxW='600px'
        mx='auto'
        py={10}
        px={4}
      >
        <Heading as='h1' size='xl' mb={5}>
          Register
        </Heading>
        <FormControl isRequired mb={4}>
          <FormLabel>Your Name</FormLabel>
          <Input
            name='user_name'
            type='text'
            placeholder='Type in your name'
            value={values.user_name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Email Address</FormLabel>
          <Input
            name='user_email'
            type='email'
            placeholder='Type in your Email'
            value={values.user_email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Phone Number</FormLabel>
          <Input
            name='user_phone'
            type='text'
            placeholder='Type in your phone'
            value={values.user_phone}
            onChange={handleChange}
          />
        </FormControl>
  
        <FormControl isRequired mb={4}>
          <FormLabel>Password</FormLabel>
          <InputGroup>
          <Input
            name='user_password'
            type={show ? 'text' : 'password'}
            placeholder='Type in you password'
            value={values.user_password}
            onChange={handleChange}
          />
          <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Password Again</FormLabel>
          <Input
            name='user_password_confirm'
            type={show ? 'text' : 'password'}
            placeholder='Type password again'
            value={values.user_password_confirm}
            onChange={handleChange}
          />
        </FormControl>
        <Button type='submit' colorScheme='teal' size='lg' mb={4}>
          Register
        </Button>
        {/* text for "have account? -> link to login" */}
      </Box>
    );
  };
  
  export default Register;