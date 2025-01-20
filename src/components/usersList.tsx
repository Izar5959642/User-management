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
      <AppBar position="fixed" sx={{ zIndex: 1201, justifyContent: "space-between" }} >
        <Toolbar>
          <Stack sx={{padding: '10px'}}>
            <Avatar >
              <PeopleAltIcon></PeopleAltIcon>
            </Avatar>
          </Stack>
             <Typography> {adminName}</Typography> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Management</Typography>
          <Button variant="contained" onClick={handleLogout}>
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>

      {/* User List Container */}
      <Box
        sx={{
          flex: 1,
          marginTop: '40px',
          marginBottom: '20px',
          overflowX: "hidden",
          overflowY: "hidden"
        }}
      >

        {isPopupOpen &&
          <AddEditPopup
            user={selectedUser ? selectedUser : emptyUser}
            isEdit={editPopup}
            open={isPopupOpen}
            onClose={handleClosePopup}
          />
        }

        {/* User List Section */}
        <Container maxWidth="md" sx={{ width: "100vw", overflowX: 'hidden' }} >
          <List sx={{
            maxHeight: "700px",
            maxWidth: "80vw",
            overflowY: 'auto',
            overflowX: "none",

            "&::-webkit-scrollbar": {
              width: "8px",
              marginRight: "20px",
              marginLeft: "50px",
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
            <Container>
              {users.map((user) => (
                <UserItem key={user._id}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        sx={{ bgcolor: blueGrey }}
                        alt={user.username}
                        src="/broken-image.jpg"
                      />
                      <Typography variant="body1" component="div">
                        <Typography>User name: {user.username}</Typography>
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
            </Container>
          </List>
        </Container>

        <Box sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
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
    </Box>
  );
};
export default UserListPage;
