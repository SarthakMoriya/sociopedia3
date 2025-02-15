import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import FriendsListWidget from "../widgets/FriendsListWidget";
import MyPost from "../widgets/MyPost";
import UserWidget from "../../scenes/widgets/UserWidget";
import PostsWidget from "../../scenes/widgets/PostsWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`https://sociopedia-mc9w.onrender.com/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (!user) return null;
  return <Box>
  <Navbar />
  <Box
    width="100%"
    padding="2rem 6%"
    display={isNonMobileScreens ? "flex" : "block"}
    gap="2rem"
    justifyContent="center"
  >
    <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
      <UserWidget userId={userId} picturePath={user.picturePath} />
      <Box m="2rem 0" />
      <FriendsListWidget userId={userId} />
    </Box>
    <Box
      flexBasis={isNonMobileScreens ? "42%" : undefined}
      mt={isNonMobileScreens ? undefined : "2rem"}
    >
      <MyPost picturePath={user.picturePath} />
      <Box m="2rem 0" />
      <PostsWidget userId={userId} isProfile />
    </Box>
  </Box>
</Box>
};

export default ProfilePage;
