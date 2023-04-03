import Users from "../Models/userModel.js"

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Error could not fetch Data...!" })
    }
}
export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);

        const friends = await Promise.all(
            //har friend id se pura friend ka data friends array me dala hai
            user.friends.map((id) => Users.findById(id))
        )

        const formattedFriends = friends.map(({
            _id, firstName, lastName, occupation, location, picturePath
        }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        })
        //friends array also contained password and email which need not to be shown so we only filtered required data and send as respnse

        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(500).json({ msg: "Error could not fetch Data...!" })
    }
}

/* UPDATE */
export const addRemoveFriends = async (req, res) => {
    try {
      const { id, friendId } = req.params;
      const user = await Users.findById(id);
      const friend = await Users.findById(friendId);
  
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter((id) => id !== friendId);
        friend.friends = friend.friends.filter((id) => id !== id);
      } else {
        user.friends.push(friendId);
        friend.friends.push(id);
      }
      await user.save();
      await friend.save();
  
      const friends = await Promise.all(
        user.friends.map((id) => Users.findById(id))
      );
      const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath }) => {
          return { _id, firstName, lastName, occupation, location, picturePath };
        }
      );
  
      res.status(200).json(formattedFriends);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };