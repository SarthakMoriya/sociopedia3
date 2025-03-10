import { Router } from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriends,
  updateSocialLink,
} from "../controllers/users.js";

import { verifyToken } from "../middlewares/auth.js";

// http://localhost:8080/api/v1/users/...
const router = Router();

/* READ Requests*/
router.get("/:id", verifyToken, getUser);
router.patch("/:id/social-links", verifyToken, updateSocialLink);
router.get("/:id/friends", verifyToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriends);

export default router;
