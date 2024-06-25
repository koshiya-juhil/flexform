import { Search } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Config } from "../../config/IISMethods"
import UserMenu from "./UserMenu";

interface HeaderProps {
    searchQuery: string;
    handleSearchQuery: (value: string) => void;
}

function Header(props: HeaderProps) {

    return (
        <div className="flex justify-between sticky mx-2 py-1 items-center bg-white text-black">
            <div className="flex items-center">
                {/* <IconButton>
                    <MenuIcon />
                </IconButton> */}
                <div className="flex items-center ml-2 header">
                    <div className="text-2xl font-bold text-gray-700">{Config.websiteName}</div>
                </div>
            </div>

            <div className="flex items-center flex-row w-1/2 h-11 rounded bg-slate-100">
                <IconButton><Search /></IconButton>
                <input type="text" name="search" placeholder="search" className="border-none h-10 bg-transparent outline-none w-full"
                    value={props.searchQuery}
                    onChange={(e) => props.handleSearchQuery(e.target.value)}
                />
            </div>
            
            <UserMenu />

        </div>
    )
}

export default Header