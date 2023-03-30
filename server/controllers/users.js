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
export const addRemoveFriends = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await Users.findById(id);
        const friend = await Users.findById(friendId);

        if (user.friends.includes(friendId)) {
            //Remove
            user.friends = user.friends.filter(fId => fId !== friendId);
            friend.friends = friend.friends.filter(fId => fId !== id);
        } else {
            //Add
            user.friends = user.friends.push(friendId);
            friend.friends = friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        //Again send updated Frinds
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