import { deletUser, updateUser,getUser } from "../services/userService.js";


export const updateUserController = async (req, res) => {
    const id = req.params.id
    const updates = req.body

    try {
        const updateDataUser = await updateUser(
            id,
            updates
        )
        if (!updateDataUser) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({
            message: "User update successfully",
            updateDataUser
        })
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Error updating user", error: error.message })
    }

}


export const deletUserController = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await deletUser(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json({
            message: "User successfully deleted.",
            user: user
        })
    }
    catch(error){
        console.error('Error deleting user:', error); 
        res.status(500).json({ message: 'Error deleting user.', error: error.message });
    }
}

export const getUserController = async (req, res) => {
    try {
      const user = await getUser(req.params.id);
      const userData = user.toObject()
      delete userData.password
      res.status(200).json({
        userData,
        message: "Account has been fetched Successfully",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };
  