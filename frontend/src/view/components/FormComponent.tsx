import { useNavigate } from "react-router-dom";
import { GenericObjectType } from "../../config/Types"
import { Delete, MoreVert, Storage } from "@mui/icons-material";
import { IISMethods } from "../../config/IISMethods";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

interface FormComponentProps {
    form: GenericObjectType;
    index: number;
    handleDeleteForm: () => void;
}

function FormComponent(props: FormComponentProps) {

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <div key={props.index + props.form._id} className="flex flex-col box-border border-light rounded w-64 mr-5 mb-3 cursor-pointer hover:border hover:border-purple-800">
            {/* <img className="box-border h-36 w-48" /> */}
            <div className="flex flex-row justify-between p-4">
                <div onClick={() => navigate(`/form/edit/${props.form._id}`)} className="w-full">
                    <h5 className="truncate">{props.form.title}</h5>
                    <div className="flex flex-row justify-between mt-1" style={{ fontSize: "12px", color: "grey" }}>
                        <div className="flex flex-row items-center">
                            <Storage className="text-white bg-purple-800 mr-1 rounded-sm" style={{ fontSize: "18px", padding: "2.5px" }} />
                            Created on {IISMethods.getDateFormats(props.form.createdAt, 4)}
                        </div>
                    </div>
                </div>

                <div>
                    <IconButton onClick={handleMenuOpen}>
                        <MoreVert style={{ fontSize: "20px", color: "grey" }} />
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
                        <MenuItem onClick={() => {
                            props.handleDeleteForm();
                            handleMenuClose();
                        }}>
                            <ListItemIcon>
                                <Delete fontSize="small" />
                            </ListItemIcon>
                            Delete
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    )
}

export default FormComponent