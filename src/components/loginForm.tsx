import React from 'react';
import { TextField, Button, Typography, CircularProgress } from '@mui/material';
import { LoginContainer, StyledPaper, StyledBox } from './general.style';
import { useLogin } from '../hooks/useLogin';

const LoginForm: React.FC = () => {
  const {
    setUsername,
    setPassword,
    username,
    password,
    isLoading,
    handleLogin,
  } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    handleLogin(); 
  };

  return (
    <LoginContainer>
      <StyledPaper elevation={3}>
        <Typography variant="h5" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <StyledBox>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="new-username" 
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={isLoading} 
              startIcon={isLoading && <CircularProgress size={20} color="inherit" />} 
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </StyledBox>
        </form>
      </StyledPaper>
    </LoginContainer>
  );
};

export default LoginForm;

