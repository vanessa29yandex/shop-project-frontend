import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { 
  Box, 
  Button, 
  FormLabel,
  Image,
  Heading, 
  Input, 
  Stack, 
  Text } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import useAxiosPrivate from '../../hook/useAxiosPrivate';

// const useStat = () => {
//   return [
//     stateNow,
//     (state) => {
//       stateNow = state;
//     },
//   ];
// };

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const axiosPrivateRoute = useAxiosPrivate();
  const [values, setValues] = useState({
    user_name: user?.user?.user_name,
    user_email: user?.user?.user_email,
    user_phone: user?.user?.user_phone,
    user_avatar: user?.user?.user_avatar,
    // user_password: user?.user?.user_password,
    user_address: {
      city: user?.user?.city || '',
      street: user?.user?.street || '',
      building: user?.user?.building || '',
      apartment: user?.user?.apartment || '',
    },
  });

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleSaveButton = async () => {
    try {
      const response = await axiosPrivateRoute.put(
        `/users/customers/${user?.user._id}`,
        values,
      );  

      setUser((prevUserDetails) => ({
        ...prevUserDetails,
        user: response?.data?.user,
      }));
      setIsEditing(false);
      toast.success(response?.data?.message);
      
    } catch (error) {
      toast.error(error?.response?.data.message);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64image = await convertToBase64(file);
    setValues((prevValues) => ({ ...prevValues, user_avatar: base64image }));
  };

  const handleNestedChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      user_address: {
        ...prevValues.user_address,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Box minH='65vh' py={10} px={4}>
      <Heading mb={6}>My Profile</Heading>
      <Stack spacing={2}>
        <Heading as='h3' fontSize='lg'>
          Details
        </Heading>
        <Text fontSize='md'>
          <Text as='span' fontWeight='bold'>
            Name:{' '}
          </Text>
          {isEditing ? (
            <Input
              name='user_name'
              type='text'
              placeholder='Type in your name'
              value={values.user_name || ''}
              onChange={handleChange}
            />
          ) : (
            user?.user.user_name
          )}
        </Text>
        <Text fontSize='md'>
          <Text as='span' fontWeight='bold'>
            Email:{' '}
          </Text>
          {isEditing ? (
            <Input
              name='user_email'
              type='email'
              placeholder='Enter email'
              value={values.user_email || ''}
              onChange={handleChange}
            />
          ) : (
            user?.user.user_email
          )}
        </Text>
        <Text fontSize='md'>
          <Text as='span' fontWeight='bold'>
            Phone:{' '}
          </Text>
          {isEditing ? (
            <Input
              name='user_phone'
              type='text'
              placeholder='Enter phone'
              value={values.user_phone || ''}
              onChange={handleChange}
            />
          ) : (
            user?.user.user_phone
          )}
        </Text>
        <Text fontSize='md'>
          <FormLabel htmlFor='user_avatar'>Avatar</FormLabel>
        </Text>
        {isEditing ? (
          <Input
            name='user_avatar'
            type='file'
            onChange={handleFileUpload}
            accept='.jpeg, .png, .jpg'
          />
        ) : (
          <Image
            width={100}
            src={values.user_avatar} // default avatar
            alt='User Avatar'
          />
        )}

        <Heading as='h3' fontSize='lg'>
          Address
        </Heading>
        <Text>
          <Text as='span' fontWeight='bold'>
            City:{' '}
          </Text>
          {isEditing ? (
            <Input
              name='city'
              type='text'
              placeholder='Enter city'
              value={values?.user_address?.city || ''}
              onChange={handleNestedChange}
            />
          ) : (
            user?.user?.user_address.city
          )}
        </Text>
        <Text fontSize='md'>
          <Text as='span' fontWeight='bold'>
            Building:
          </Text>{' '}
          {isEditing ? (
            <Input
              name='building'
              value={values.user_address?.building || ''}
              onChange={handleNestedChange}
              placeholder='Enter your building'
            />
          ) : (
            user?.user?.user_address?.building
          )}
        </Text>
        <Text fontSize='md'>
          <Text as='span' fontWeight='bold'>
            Apartment:
          </Text>{' '}
          {isEditing ? (
            <Input
              name='apartment'
              value={values.user_address?.apartment || ''}
              onChange={handleNestedChange}
              placeholder='Enter your apartment'
            />
          ) : (
            user?.user_address?.apartment
          )}
        </Text>
      </Stack>
      {isEditing ? (
        <Button mt={4} colorScheme='teal' onClick={handleSaveButton}>
          Save
        </Button>
      ) : (
        <Button mt={4} colorScheme='teal' onClick={handleEditButton}>
          Edit
        </Button>
      )}
    </Box>
  );
};

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}

export default Profile;