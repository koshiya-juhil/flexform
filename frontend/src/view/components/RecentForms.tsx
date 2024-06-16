import { ArrowDropDown, FolderOpen, MoreVert, Storage } from "@mui/icons-material"
import { IconButton } from "@mui/material"

const RecentForms = () => {
    return (
        <div className="bg-white ml-40 mr-40">
            <div className="flex mt-4 flex-row justify-between items-center">
                <div style={{fontSize: "16px", fontWeight: "500"}}>Recent Forms</div>
                <div className="flex items-center">
                    <div className="flex box-content items-center p-1 rounded-md text-base" style={{fontSize: "14px", marginRight: "125px"}}>Owned by anyone <ArrowDropDown/></div>
                    <IconButton><Storage style={{fontSize: "16px", color: "black"}} /></IconButton>
                    <IconButton><FolderOpen style={{fontSize: "16px", color: "black"}} /></IconButton>
                </div>
            </div>
            <div className="flex flex-wrap justify-start mt-5">
                <div className="flex flex-col box-border w-52 mr-5 hover:border border-purple-800">
                    <img className="box-border h-36 w-48" />
                    <div className="flex flex-col justify-between p-4">
                        <h5></h5>
                        <div className="flex flex-row justify-between mt-1" style={{fontSize: "12px", color: "grey"}}>
                            <div className="flex flex-row items-center">
                                <Storage style={{color: "white", fontSize: "12px", backgroundColor: "#6E2594", padding: "3px", marginRight: "3px", borderRadius: "2px"}} /> Opened 10 Jun 2024
                            </div>
                            <MoreVert style={{fontSize: "16px", color: "grey"}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentForms