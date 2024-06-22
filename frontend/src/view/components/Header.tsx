import { Login, Logout, Menu as MenuIcon, Search } from "@mui/icons-material"
import { Avatar, IconButton, ListItemIcon, MenuItem, Menu } from "@mui/material"
import { Config, IISMethods } from "../../config/IISMethods"
import { deepOrange } from "@mui/material/colors";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type userType = { email: string, _id: string } | null | undefined;

interface HeaderProps {
    handleLogout: () => void;
}

function Header(props: HeaderProps) {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const user: userType = IISMethods.getLocalStorageData('user');
    console.log('user', user);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className="flex justify-between sticky mx-2 py-1 items-center bg-white text-black">
            <div className="flex items-center">
                <IconButton>
                    <MenuIcon />
                </IconButton>
                <div>{Config.websiteName}</div>
            </div>

            <div className="flex items-center flex-row w-1/2 h-11 rounded bg-slate-100">
                <IconButton><Search /></IconButton>
                <input type="text" name="search" placeholder="search" className="border-none h-10 bg-transparent outline-none w-full" />
            </div>

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
                            props.handleLogout();
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
        </div>
    )
}

export default Header