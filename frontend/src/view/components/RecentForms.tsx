import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { GenericObjectType } from "../../config/Types"
import FormComponent from "./FormComponent"
// import { IconButton } from "@mui/material"

interface RecentFormsProps {
    handleDeleteForm: (formId: string) => void;
}

const RecentForms = (props: RecentFormsProps) => {
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
                        <FormComponent 
                            form={form}
                            index={index}
                            handleDeleteForm={() => props.handleDeleteForm(form._id)}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default RecentForms