import { Switch, styled } from "@mui/material";
import { purple } from "@mui/material/colors";

export const PurpleSwitch = styled(Switch)(() => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: purple[800],
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: purple[800],
    },
}));