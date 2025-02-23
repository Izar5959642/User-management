import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser, updateUser } from "../services/userService";
import { User } from "../interfaces/userInterface";
import { addUserStore ,updateUserStore} from "../store/userSlice";

export const usePopup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const  dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ,isEdit: boolean , onClose: () => void, user? : User) => {
        e.preventDefault(); 

        if(!username|| !fullName || !email || (!password && !isEdit)){
            setSubmitError("אנא מלא את כל השדות")
            return;
        }
        setIsLoading(true)
        setSubmitError("")
        try{
            const payload_update = {username, fullName, email, password, _id: user?._id};
            const payload_add = {username, fullName, email, password};
            const {res , err} = isEdit ? await updateUser(payload_update) : await addNewUser(payload_add);

            if (res ){
                (
                    isEdit ? dispatch(updateUserStore(res.data)) : dispatch(addUserStore(res.data))
                )
            }
            if(err ){
                setSubmitError(err.message || "ארע שגיאת שרת")
            } else onClose();
        } catch (error){
            setSubmitError("Something went wrong.")
        }finally{
            setIsLoading(false);
        }

        setIsLoading(false)
        onClose();
    };
        
    
    
    return {
        username,
        password,
        isLoading,
        fullName, setFullName,
        email, setEmail,
        setUsername,
        setPassword,
        setIsLoading,
        submitError, setSubmitError,
        handleSubmit,
        showPassword, setShowPassword
    }
} 