import { Outlet } from "react-router-dom";
import Nav from "../components/sections/Nav";
import { Box, Divider } from "@chakra-ui/react";
import useAxiosPrivate from "../hook/useAxiosPrivate";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";

const Root = () => {
  return (
      <Box maxW="92%" mx="auto">
        <Nav />
        <Divider />
        <Outlet />
        {/* <Footer /> */}
      </Box>
  );
};

export default Root;
