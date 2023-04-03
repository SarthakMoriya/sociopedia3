import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../../state/index";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch(`htpp://localhost:8080/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `htpp://localhost:8080/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ data }));
  };

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts();
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userid,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userid}
            name={`${firstName} ${lastName} `}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
