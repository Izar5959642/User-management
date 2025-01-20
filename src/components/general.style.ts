import { styled } from '@mui/material/styles';
import { Box, Paper, Container, Button} from '@mui/material';

// Container for centering the login form
export const LoginContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: 'bluesky'
});

// Paper styling for the login form
export const StyledPaper = styled(Paper)({
  padding: '32px',
  width: '400px',
});

// Box styling for the inner form layout
export const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});


// Styles for the user list container
export const UserListContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: "100vw",
  height:"100vw",
  display:"flex",
  flexDirection: "column",
  overflowY: "auto",
}));
// Styles for individual user items
export const UserItem = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[300]}`,
  color:'black',
}));

export const AddUserButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    position: "fixed",
    bottom: theme.spacing(2),
     alignContent: "center",
  }));


