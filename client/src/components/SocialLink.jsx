import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setSocialLinks } from "../state";

const SocialLink = ({ isOpen, setOpenSocialModal, type, value }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid gray",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(isOpen);
  const dispatcher = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [username, setUsername] = React.useState(value);
  const [loader, setLoader] = React.useState(false);
  const handleClose = () => {
    setOpenSocialModal(false);
    setOpen(false);
  };

  const handleSave = async () => {
    setLoader(true);
    const response = await fetch(
      `http://localhost:8080/users/${user._id}/social-links`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ type, username }),
      }
    );
    const data = await response.json();
    if (data.code === 200) {
      setLoader(false);
      setOpenSocialModal(false);
      setOpen(false);
      dispatcher(setSocialLinks(data.body.socialLinks))
    } else {
      setLoader(false);
    }
  };

  useEffect(() => {
    console.log("IS OPENDED" + isOpen);
  }, []);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {type} Handle
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="USERNAME"
          variant="outlined"
          sx={{ mt: 2 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSave}
          disabled={loader}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default SocialLink;
