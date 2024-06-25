import { Login, Logout } from "@mui/icons-material";
import { Avatar, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IISMethods } from "../../config/IISMethods";
import { deepOrange } from "@mui/material/colors";

type userType = { email: string, _id: string } | null | undefined;

function UserMenu() {

    const navigate = useNavigate();
    const user: userType = IISMethods.getLocalStorageData('user');

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    function handleLogout(){
        IISMethods.clearCookie('token');

        IISMethods.clearLocalStorageData('user');
        navigate('/signin');
    }


    return (

        <div className="flex items-center">
            <IconButton
                onClick={handleMenuOpen}
            >
                {user?.email ?
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.email?.toUpperCase()[0]}</Avatar>
                    :
                    <Avatar />
                }
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {user?._id ?
                    <MenuItem onClick={() => {
                        handleLogout();
                        handleMenuClose();
                    }}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                    :
                    <MenuItem onClick={() => {
                        handleMenuClose();
                        navigate('/signin');
                    }}>
                        <ListItemIcon>
                            <Login fontSize="small" />
                        </ListItemIcon>
                        Login
                    </MenuItem>
                }
            </Menu>
        </div>
    )
}

export default UserMenu