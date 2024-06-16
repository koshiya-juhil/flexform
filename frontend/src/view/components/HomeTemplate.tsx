import { MoreVert, UnfoldMore } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import blank from "../../assets/images/forms-blank-googlecolors.png"
import party from "../../assets/images/party_invite.png"
import contact from "../../assets/images/contact_information.png"
import { useNavigate } from "react-router-dom"

function HomeTemplate() {
    const navigate = useNavigate();

    function createForm(){
        navigate("/form/new");
    }

    return (
        <div className="bg-slate-100 pb-10 pt-2">
            <div className="ml-44 mr-44 flex flex-row items-center justify-between">
                <div>
                    <span style={{fontSize: "16px", color:"#202124"}}>Start a new form</span>
                </div>
                <div className="flex">
                    <div className="flex justify-between items-center bg-transparent">
                        Template gallery 
                        <UnfoldMore />
                    </div>
                    <IconButton><MoreVert/></IconButton>
                </div>
            </div>
            <div className="ml-40 mr-40 flex flex-row items-center justify-start">
                <div className="card" onClick={() => createForm()}>
                    <img src={blank} alt="no image" className="card_image" />
                    <p className="card_title">Blank</p>
                </div>
                <div className="card">
                    <img src={party} alt="no image" className="card_image" />
                    <p className="card_title">Party Invitation</p>
                </div>
                <div className="card">
                    <img src={contact} alt="no image" className="card_image" />
                    <p className="card_title">Contact Information</p>
                </div>
            </div>
        </div>
    )
}

export default HomeTemplate