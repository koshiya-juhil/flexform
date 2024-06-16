import { Menu, Search } from "@mui/icons-material"
import { Avatar, IconButton } from "@mui/material"
import { Config } from "../../config/IISMethods"

function Header() {
    return (
        <div className="flex justify-between sticky mx-2 py-1 items-center bg-white text-black">
            <div className="flex items-center">
                <IconButton>
                    <Menu />
                </IconButton>
                <div>{Config.websiteName}</div>
            </div>

            <div className="flex items-center flex-row w-1/2 h-11 rounded bg-slate-100">
                <IconButton><Search /></IconButton>
                <input type="text" name="search" placeholder="search" className="border-none h-10 bg-transparent outline-none w-full" />
            </div>

            <div className="flex items-center">
                <IconButton>
                    <Avatar />
                </IconButton>
            </div>
        </div>
    )
}

export default Header