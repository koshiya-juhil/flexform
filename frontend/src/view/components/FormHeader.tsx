import { Visibility } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Config, IISMethods } from '../../config/IISMethods';
import { Form } from '../../config/Types';
import UserMenu from './UserMenu';

interface FormHeaderProps {
    formData: Form;
    mode: string;
}

const FormHeader = (props: FormHeaderProps) => {
    const formUrl = Config.webUrl + 'form/response/' + props.formData._id;
    return (
        <div className="flex items-center justify-between my-1 mx-4">
            <div className="flex items-center justify-evenly">
                <div className="flex items-center ml-2 header">
                    <div className="text-2xl font-medium text-gray-700">{Config.websiteName}</div>
                </div>
            </div>
            <div className="flex items-center justify-between gap-2">
                {props.mode === 'edit' ?
                    <>
                        <CopyToClipboard text={formUrl} onCopy={() => IISMethods.localnotify('Link Copied to Clipboard', 1)}>
                            <button className="px-5 py-2  bg-purple-800 text-white text-sm rounded-md font-semibold hover:bg-purple-800/[0.8] hover:shadow-lg">Share</button>
                        </CopyToClipboard>

                        <IconButton onClick={() => window.open(formUrl, '_blank')} ><Visibility className='form_header_icon' /></IconButton>
                    </>
                    : <></>}
                <UserMenu />
            </div>
        </div>
    )
}

export default FormHeader;