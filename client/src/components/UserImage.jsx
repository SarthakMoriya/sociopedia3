import React from "react";
import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box width={size} height={size}>
      <img
        width={size}
        height={size}
        src={`http://localhost:8080/assets/${image}`}
        style={{ objectFit: "cover", borderRadius: "50%" }}
        alt=""
      />
    </Box>
  );
};

export default UserImage;
