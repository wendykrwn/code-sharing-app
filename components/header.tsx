import Image from "next/image"
import noteCodeLogo from "../public/NoteCodeLogo.svg"
const Header = () => {
    return (
        <div className="pt-10 pb-9 flex flex-col items-center">
            <Image className="mb-9" src={noteCodeLogo} alt={noteCodeLogo}/>
            <h1 className="flex flex-col gap-y-3 font-semibold text-center ">
                <span className="text-[32px]">Create & Share</span>
                <span className="text-[40px]" >Your Code easily</span>
            </h1>
        </div>
    )
}

export default Header