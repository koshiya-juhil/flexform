import { Storage } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { GenericObjectType } from "../../config/Types"
import { IISMethods } from "../../config/IISMethods"
// import { IconButton } from "@mui/material"

const RecentForms = () => {
    const navigate = useNavigate();
    const myForms = useSelector((store: RootState) => store.state.myForms);

    return (
        <div className="bg-white ml-40 mr-40">
            <div className="flex mt-4 flex-row justify-between items-center">
                <div style={{ fontSize: "16px", fontWeight: "500" }}>My Forms</div>
                {/* <div className="flex items-center">
                    <div className="flex box-content items-center p-1 rounded-md text-base" style={{ fontSize: "14px", marginRight: "125px" }}>
                        Owned by me 
                        <ArrowDropDown />
                    </div>
                    <IconButton><Storage style={{ fontSize: "16px", color: "black" }} /></IconButton>
                    <IconButton><FolderOpen style={{ fontSize: "16px", color: "black" }} /></IconButton>
                </div> */}
            </div>


            <div className="flex flex-wrap justify-start mt-5">
                {myForms.map((form: GenericObjectType, index: number) => {
                    return (
                        <div key={index + form._id} className="flex flex-col box-border border-light rounded w-64 mr-5 mb-3 cursor-pointer hover:border hover:border-purple-800"
                            onClick={() => navigate(`/form/edit/${form._id}`)}
                        >
                            {/* <img className="box-border h-36 w-48" /> */}
                            <div className="flex flex-col justify-between p-4">
                                <h5 className="truncate">{form.title}</h5>
                                <div className="flex flex-row justify-between mt-1" style={{ fontSize: "12px", color: "grey" }}>
                                    <div className="flex flex-row items-center">
                                        <Storage className="text-white bg-purple-800 mr-1 rounded-sm" style={{ fontSize: "18px", padding: "2.5px" }} />
                                        Created on {IISMethods.getDateFormats(form.createdAt, 4)}
                                    </div>
                                    {/* <MoreVert style={{ fontSize: "16px", color: "grey" }} /> */}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default RecentForms