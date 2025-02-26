import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  UserItem,
  AddUserButton,
} from "./general.style"
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AppBar, Avatar, Box, Button, ButtonGroup, CircularProgress, Container, List, Stack, Toolbar } from "@mui/material";
import { useUserList } from "../hooks/useUserList";
import AddEditPopup from "./addEditPopup";
import { blueGrey } from "@mui/material/colors";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const UserListPage: React.FC = () => {

  const {
    editPopup,
    setEditPopup,
    isPopupOpen,
    handleClosePopup,
    handleOpenPopup,
    handleLogout,
    users,
    handleDelete,
    isLoadingDelete,
    adminName
  } = useUserList();

  const [selectedUser, setSelectedUser] = useState(null);
  const handleEditClicked = (user: any) => {
    setEditPopup(true);
    setSelectedUser(user)
    handleOpenPopup()
  };

  const handleAddClicked = (user: any) => {
    setEditPopup(false);
    setSelectedUser(user)
    handleOpenPopup()
  };

  const emptyUser = { username: '', email: '', fullName: '', _id: '', password: '' }

  return (
    <Box sx={{ height: '90vh', display: 'flex', flexDirection: 'column', overflowY: 'hidden' }}>
      {/* Top Bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201, justifyContent: "space-between", backgroundColor: '#3f51b5' }} >
        <Toolbar>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: blueGrey[500] }}>
              <PeopleAltIcon />
            </Avatar>
            <Typography variant="h6" component="div">
              {adminName}
            </Typography>
          </Stack>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            User Management
          </Typography>
          <Button variant="contained" color="primary" onClick={handleLogout}>
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>

      {/* User List Container */}
      <Box
        sx={{
          flex: 1,
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflowX: "hidden",
          overflowY: "hidden"
        }}
      >
        <Container maxWidth="md" sx={{ width: "75vw", overflowX: 'hidden', textAlign: 'center' }}>
          <List sx={{
            maxHeight: "75vh",
            width: "100%",
            minWidth: "60px",
            overflowY: 'auto',
            overflowX: "none",

            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}>
            {users.map((user) => (
              <UserItem key={user._id}>
                <Box
                  sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: '20px',
                    }}
                    
                  >
                  <Stack direction="row" spacing={5}> 
                  <Avatar
                    sx={{ bgcolor: blueGrey[500] }}
                    alt={user.username}
                    src="/broken-image.jpg"
                  />
                  <Typography variant="body1" component="div">
                    <Typography variant="body2" component="div"></Typography>
                    <Typography>User Name: {user.username}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Full name: {user.fullName}</Typography>

                  </Typography>
                  </Stack>
                </Box>

                <ButtonGroup variant="contained" aria-label="Basic button group">
                  <Button
                    disabled={isLoadingDelete}
                    startIcon={isLoadingDelete && <CircularProgress size={20} />}
                  >
                    <DeleteOutlinedIcon
                      onClick={() => handleDelete(user)}
                      sx={{ cursor: 'pointer', marginRight: '1' }} />
                  </Button>
                  <Button>
                    <EditIcon
                      onClick={() => handleEditClicked(user)}
                      sx={{ cursor: 'pointer', marginRight: '1' }}
                    />
                  </Button>
                </ButtonGroup>

              </UserItem>
            ))}
          </List>
        </Container>

        <Box sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          marginTop: '20px',
        }}>
          <AddUserButton
            variant="contained"
            color="primary"
            onClick={() => handleAddClicked(emptyUser)}
          >
            Add new user
            <PersonAddIcon sx={{ paddingLeft: "15px" }}> </PersonAddIcon>
          </AddUserButton>
        </Box>
      </Box>

      {isPopupOpen &&
        <AddEditPopup
          user={selectedUser ? selectedUser : emptyUser}
          isEdit={editPopup}
          open={isPopupOpen}
          onClose={handleClosePopup}
        />
      }
    </Box>
  );
};
export default UserListPage;