import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { loginService } from "../services/userService";
import { setAdminFromServer } from "../store/adminSlice";

export const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const {res, err} = await loginService({username,password})
            if (res){
                localStorage.setItem("token", res?.data.token);
                dispatch(
                    setAdminFromServer({                       
                        _id: res.data._id,
                        username: username,
                        fullName: res.data.fullName,
                        password: res.data.password,
                        token: res.data.token                       
                    })
                )       
                navigate('/users')
            }else if(err){
                 window.alert(err.message + "  ארע שגיאה")
                console.log(err.message, "ארע שגיאה")
            }
        } catch (error){
            window.alert("Error during login:")
            console.error("Error during login:", error)
        }finally{
            setIsLoading(false)
        }
      };

      return {
        setIsLoading,
        setPassword,
        setUsername,
        username,
        password,
        isLoading,
        handleLogin
      }
}