 import React, { useContext, useEffect, useState } from 'react';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';
import AuthContext from '../../context/AuthContext';
import { Box, Button, CircularProgress, Divider, Heading, Input } from '@chakra-ui/react';

const ForgotPassword = () => {
  const { user } = useContext(AuthContext);

  const { id } = useParams();

  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const emailToken = location.search.split('=')[1];

  const isUserValid = async () => {
    try {
      const { data } = await axios.get(`/mailer/forgot-password/${id}`, {
        headers: {
          email_verify_token: emailToken,
        },
      });

      if (data.status === 201) {
        console.log('User valid');
      } else {
        navigate('/');
        toast.error('Invalid Link');
      }
    } catch (error) {
      navigate('/');
      toast.error('Invalid Link');
    }
  };

  const setPasswordValue = (e) => {
    setPassword(e.target.value);
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (password === '') {
      toast.error('password is required!');
    } else if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
    } else {
      const { data } = await axios.post(`/mailer/update-password/${id}`, {
        user_password: password,
        email_verify_token: emailToken,
      });
    }
  };

  useEffect(() => {
    isUserValid();
    setTimeout(() => {
      setData(true);
    }, 1000);
  }, []);

  if (user) {
    return <Navigate to='/' />;
  }

  return (
    <>
      {data ? (
        <>
          <Box minH='65vh' maxW='600px' mx='auto' py={10} px={4}>
            <Heading as='h2' size='xl' mb={6}>
              Enter Your NEW Password
            </Heading>
            <section>
              <div className='form_data'>
                <form>
                  {message ? (
                    <p style={{ color: 'green', fontWeight: 'bold' }}>
                      Password Successfully Updated
                    </p>
                  ) : null}
                  <div className='form_input'>
                    <label htmlFor='password'>New password</label>
                    <Input
                      my={5}
                      type='password'
                      value={password}
                      onChange={setPasswordValue}
                      name='password'
                      id='password'
                      placeholder='Enter Your new password'
                    />
                  </div>

                  <Button mb={4} colorScheme='blue' onClick={updatePassword}>
                    Send
                  </Button>
                </form>
                <p>
                  <Divider />
                  <Link to='/'>
                    <Button mt={3}>Home</Button>
                  </Link>
                </p>
              </div>
            </section>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default ForgotPassword;
