import { ChangeEventHandler } from "react"

const SelectInput = ({currentValue,handleSelectedChange,options}:{currentValue:string,handleSelectedChange:ChangeEventHandler<HTMLSelectElement>, options:string[]}) => {
    return (
        <select value={currentValue} onChange={handleSelectedChange} className="bg-[#CED6E1] text-[#364153] rounded-full outline-0 py-1 pl-3 pr-2 cursor-pointer text-[10px] font-semibold " name="languages" id="languages">
            {
                options.map((value,index)=><option key={index} value={value}>{value.toUpperCase()}</option>)
            }
        </select>
    )
}

export default SelectInput