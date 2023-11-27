import { Box, Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiHome, BiMenu, BiUser } from 'react-icons/bi';
import { useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import useLogout from '../../hook/useLogout';
import ShoppingCart from './ShoppingCart';

const Nav = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const logout = useLogout();

  const navStyles = {
    display: [isOpen ? 'flex' : 'none', 'flex'],
    gap: 5,
    p: [2, 5, 7],
  };

  const navButtonStyles = {
    _hover: {
      cursor: 'pointer',
      border: '2px',
      borderColor: 'black',
    },

    fontSize: ['16px', '16px', '20px'],
    border: '2px transparent solid',
  };

  const hamburgerStyles = {
    _hover: {
      cursor: 'pointer',
      border: 0,
      borderColor: 'none',
    },
    left: 0,
    border: 'none',
    display: ['inherit', 'none'],
  };

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const NavButton = ({ children }) => {
    return (
      <Button sx={navButtonStyles} variant='outline'>
        {children}
      </Button>
    );
  };

  return (
    <Box position='sticky' w='100%' top='0' zIndex='2' bg='twitter.200' py={3}>
      <Button
        onClick={handleMenuClick}
        sx={hamburgerStyles}
        size='lg'
        variant='outline'
      >
        <BiMenu />
      </Button>
      <Flex
        justifyContent='space-between'
        alignItems={['baseline', 'center']}
        direction={['column', 'row']}
        sx={navStyles}
      >
        <ButtonGroup w='35%'>
          <Link to='/'>
            <NavButton>
              <BiHome />
            </NavButton>
          </Link>
          <Link to='/about'>
            <Button sx={navButtonStyles} variant='outline'>
              About
            </Button>
          </Link>

          <Link to='/contact'>
            <Button sx={navButtonStyles} variant='outline'>
              Contact
            </Button>
          </Link>
        </ButtonGroup>
        <ButtonGroup w='35%' justifyContent={['start', 'end']}>
          {!user && (
            <Link to='/register'>
              <Button sx={navButtonStyles} variant='outline'>
                Register
              </Button>
            </Link>
          )}
          {!user && (
            <Link to='/login'>
              <Button sx={navButtonStyles} variant='outline'>
                Login
              </Button>
            </Link>
          )}
          {user && (
            <Link to='/profile'>
              <Button sx={navButtonStyles} variant='outline'>
                <BiUser />
                <Text ml={1}>{user?.user?.user_name}</Text>
              </Button>
            </Link>
          )}
          {user && (
            <Button sx={navButtonStyles} variant='outline' onClick={logout}>
              Logout
            </Button>
          )}
          <ShoppingCart sx={navButtonStyles} variant ='variant'/>
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Nav;