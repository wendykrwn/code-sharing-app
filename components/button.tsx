import Image from "next/image"
import { MouseEventHandler } from "react"

const Button = ({icon,text,handleClick,disabled=false}:{icon?:string,text:string, handleClick:MouseEventHandler<HTMLButtonElement>,disabled?:boolean}) => {
    return (
        <button 
            className="bg-[#406AFF] flex gap-x-2 text-[#FFFFFE] py-3 px-6 rounded-full text-[16px] font-semibold hover:bg-[#406AFF]/90 disabled:bg-[#364153] disabled:text-[#CED6E1] disabled:active:scale-100 disabled:cursor-not-allowed disabled:hover:bg-[#364153] cursor-pointer active:scale-90 transition duration-300 ease-in-out"
            onClick={handleClick}
            disabled={disabled}
        >
            {
                icon && 
                <Image 
                    src={icon}
                    alt={icon}
                />
            }
            <p>{text}</p>
        </button>
    )
}

export default Button