import { useNavigate } from "react-router";
import { deleteUserById, getUserList } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { removeUserStore, setUsers } from "../store/userSlice";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { setAdminFromServer } from "../store/adminSlice";
import { User } from "../interfaces/userInterface";

export const useUserList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleOpenPopup = () => {
    setIsPopupOpen(true)
  }
  const handleClosePopup = () => {
    setIsPopupOpen(false)
  }
  const [editPopup, setEditPopup] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const adminName = useSelector((state: RootState) => state.admin.username) || localStorage.getItem("adminName")
  useEffect(() => {
    if (!users.length) setUsersToStore();
  }, [users]);

  const setUsersToStore = async () => {
    const { res, err } = await getUserList()
    const token = localStorage.getItem("token")
    if (res) {
      dispatch(setUsers(res?.data))
    } else if (err && token) {
      window.alert(err.message + "  ארע שגיאה")
      console.log(err.message, "ארע שגיאה")
    }
  }
  const handleLogout = () => {
    navigate('/')
    localStorage.removeItem("token");
    localStorage.removeItem("adminName"); 
    dispatch(
      setAdminFromServer({
        _id: '',
        username: '',
        fullName: '',
        password: '',
        token: ''
      })
    )
    dispatch(setUsers([]))
  };

  const handleDelete = async (user: User) => {
    setIsLoadingDelete(true)
    const confirm = window.confirm(" האם אתה בטוח שאתה רוצה למחוק")
    if (!confirm) {
      setIsLoadingDelete(false)
      return
    }
    try {
      if (!user._id) return
      const { res, err } = await deleteUserById(user._id)
      if (res) {
        dispatch(removeUserStore(user._id))
      }
      if (err) {
        window.alert(err.message + " ארע שגיאה משתמש לא נמחק ")
      }
    } catch (error) {
      console.log("Error")
    }
    finally {
      setIsLoadingDelete(false)
    }
  }
  return {
    editPopup,
    setEditPopup,
    isPopupOpen,
    handleClosePopup,
    handleOpenPopup,
    handleLogout,
    users,
    handleDelete,
    isLoadingDelete,
    adminName,
  }
}