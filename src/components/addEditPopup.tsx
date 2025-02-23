import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Typography, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { StyledBox } from './general.style';
import { usePopup } from '../hooks/useAddEditPopup';

interface EditUserPopupProps {
    user: { username: string; fullName: string; email: string; _id: string, password: string };
    isEdit: boolean;
    open: boolean;
    onClose: () => void;
}

const AddEditPopup: React.FC<EditUserPopupProps> = ({ user, isEdit, open, onClose }) => {
    const {
        username, setUsername,
        fullName, setFullName,
        email, setEmail,
        password, setPassword,
        isLoading,
        submitError,
        showPassword, setShowPassword,
        handleSubmit
    } = usePopup();

    useEffect(() => {
        if (isEdit) {
            setUsername(user.username || '')
            setFullName(user.fullName || '')
            setEmail(user.email || '')
            setPassword('')
        }
    }, [isEdit, user])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                <Typography variant='h5' component="div">
                    {isEdit ? "Edit" : "Add new User"}
                </Typography>
            </DialogTitle>

            <DialogContent>
                <form onSubmit={(e) => handleSubmit(e, isEdit, onClose, user)}>
                    <StyledBox>
                        <TextField
                            value={username}
                            placeholder='username'
                            onChange={(e) => setUsername(e.target.value)}
                            margin="normal"
                        >
                        </TextField>
                        <TextField
                            value={email}
                            placeholder='email'
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                        >
                        </TextField>
                        <TextField
                            value={fullName}
                            placeholder='fullName'
                            onChange={(e) => setFullName(e.target.value)}
                            margin="normal"
                        >
                        </TextField>
                        {!isEdit &&
                            <TextField
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                              sx={{
                                                '&:focus': {
                                                  outline: 'none',
                                                  border: 'none',
                                                },
                                              }}
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        }
                    </StyledBox>
                    {submitError && (
                        <Typography color="error" variant="body2" align="center" gutterBottom>
                            {submitError}
                        </Typography>
                    )}
                    <DialogActions>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={isLoading}
                            startIcon={isLoading && <CircularProgress size={20} />}
                        >
                            {isEdit ? "Save Changes" : "Add User"}
                        </Button>
                        <Button onClick={onClose} color="secondary" disabled={isLoading}>
                            cancel
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddEditPopup;