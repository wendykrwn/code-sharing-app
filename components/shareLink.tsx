import Image from "next/image"
import linkIcon from "../public/link.svg"

const ShareLink = ({link}:{link:string}) => {
    const idLink= link.split('/').pop()?.slice(0,10)
    const handleCopy = async () => {
        await navigator.clipboard.writeText(link);
        alert("Lien copié dans le presse-papiers !");
    };
    return (
        <div className={"flex items-center gap-x-3 text-[#6C707E] dark:text[#CED6E1] cursor-pointer hover:text-[#364153]/60"} onClick={handleCopy}>
            <Image src={linkIcon} alt={linkIcon}/>
            <p>.../{idLink}</p>
        </div>
    )
}

export default ShareLink