import { Paper, Tab, Tabs } from "@mui/material"
import { formtab } from "../../config/Types"
// import { purple } from "@mui/material/colors";
// import { makeStyles } from "@mui/material"

// const useStyles : () => Record<string, string> = makeStyles(() => ({
//     root:{
//         flexGrow: 1
//     },
//     tab: {
//         fontSize: 12,
//         color: "#5f6368",
//         textTransform: "capitalize",
//         height: 10,
//         fontWeight: "600",
//         fontFamily: "Google Sans, Roboto, Arial, sans-serif"
//     },
//     tabs: {
//         height: 10,
//     }
// }))

interface HeaderTabsProps {
    formTab: formtab;
    setFormTab: React.Dispatch<React.SetStateAction<formtab>>;
}

function HeaderTabs(props: HeaderTabsProps) {

    // const classes = useStyles();

    return (
        <Paper className="paper-root">
            <Tabs 
                className="tabs"
                textColor="secondary"
                indicatorColor="secondary"
                centered={true}
                value={props.formTab}
                onChange={(e, val) => props.setFormTab(val)}
                // sx={{
                //     '&.Mui-selected': {
                //         color: purple[800],
                //     },
                // }}
            >
                <Tab label="Questions" id="questions" value="questions" className="tab"></Tab>
                <Tab label="Responses" id="responses" value="responses" className="tab"></Tab>
            </Tabs>
        </Paper>
    )
}

export default HeaderTabs