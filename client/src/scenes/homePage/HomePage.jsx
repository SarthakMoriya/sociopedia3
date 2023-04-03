import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";
import UserWidget from "../widgets/UserWidget";
import MyPost from "../widgets/MyPost";
import PostsWidget from "../widgets/PostsWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        gap="0.6rem"
        justifyContent="space-between"
        display={isNonMobileScreens ? "flex" : "block"}
      >
        <Box flexBasis={isNonMobileScreens ? "28%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPost picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
