import { ColorLens, MoreVert, Settings, StarBorder, Visibility } from '@mui/icons-material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Avatar, IconButton } from '@mui/material';
import formIcon from '../../assets/images/form_icon.png';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Config, IISMethods } from '../../config/IISMethods';
import { Form } from '../../config/Types';

interface FormHeaderProps {
    formData: Form
}

const FormHeader = (props: FormHeaderProps) => {
    const formUrl = Config.webUrl + 'form' + '/respond/' + props.formData._id;
    console.log("formUrl", formUrl)
    return (
        <div className="flex items-center justify-between my-1 mx-4">
            <div className="flex items-center justify-evenly">
                <img src={formIcon} className="h-11 w-10" />
                <input type="text" placeholder="Untitled form" className="form_input border-none outline-none font-sans text-lg font-normal ml-4 text-slate-800 w-32" />
                <FolderOpenIcon className='form_header_icon mr-2.5' />
                <StarBorder className='form_header_icon mr-2.5' />
                <span className='text-xs font-semibold' >All changes saved in drive</span>
            </div>
            <div className="flex items-center justify-between">
                
                <CopyToClipboard text={formUrl} onCopy={() => IISMethods.localnotify('Link Copied to Clipboard', 1)}>
                    <button className="px-5 py-2  bg-purple-800 text-white text-sm rounded-md font-semibold hover:bg-purple-800/[0.8] hover:shadow-lg">Share</button>
                </CopyToClipboard>

                <IconButton><ColorLens className='form_header_icon'/></IconButton>
                <IconButton><Visibility className='form_header_icon'/></IconButton>
                <IconButton><Settings className='form_header_icon'/></IconButton>
                <IconButton><MoreVert className='form_header_icon'/></IconButton>
                <IconButton><Avatar className='h-7 w-7'/></IconButton>
            </div>
        </div>
    )
}

export default FormHeader;