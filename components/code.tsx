"use client"
import { defaultHtmlCode } from "@/utils/codeExample"
import { Editor, OnMount } from "@monaco-editor/react"
import { SetStateAction, useRef, useState } from "react"
import SelectInput from "./selectInput";
import Button from "./button";
import shareIcon from "../public/Share.svg"
import ShareLink from "./shareLink";
import { useRouter } from "next/navigation";

type MonacoEditor = Parameters<OnMount>[0];
const Code = ({defaultValue,defaultLanguage}:{defaultValue?:string,defaultLanguage?:string}) => {
    const [theme,setTheme] = useState('light')
    const [language, setLanguage] = useState('html')
    const [disabledBtn, setDisabledBtn] = useState(false)
    const [shareLink, setShareLink] = useState('')
    const router = useRouter()

    const editorRef = useRef<MonacoEditor | null>(null);

    const handleEditorDidMount : OnMount = (editor,monaco) => {
        editorRef.current = editor;
        // setValue(editorRef.current.getValue())
        if(defaultLanguage){
            setLanguage(defaultLanguage)
        }
        console.log("Langages dispo :", monaco.languages.getLanguages());
    }
    const handleShare = async () => {
        if(!editorRef.current) return null
        const content = editorRef.current.getValue();
        
        const res = await fetch("/api/snippets", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content, language }),
          });
        
        const data = await res.json();

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        setShareLink(`${baseUrl}/${data.id}`);
        setDisabledBtn(true)
    }
    const changeLanguage = (e: { target: { value: SetStateAction<string>; }; })=> {
        setLanguage(e.target.value)
    }
    const changeTheme = (e: { target: { value: SetStateAction<string>; }; }) => {
        setTheme(e.target.value)
    }
    
    return (
        <div className="bg-white shadow-2xl h-[720px] md:w-[880px] rounded-2xl pt-6 pb-4">
            <div className="h-[90%]">
                <Editor 
                    defaultValue={defaultValue || defaultHtmlCode} 
                    onMount={handleEditorDidMount}
                    language={language}
                    theme={theme}
                    onChange={()=>{()=> setDisabledBtn(true)}}
                />
            </div>
            <div className="flex items-center justify-between px-4">
                <div className="flex gap-x-2">
                    <SelectInput 
                        currentValue={language}
                        handleSelectedChange={changeLanguage}
                        options={['html','css','javascript']}
                        />
                    <SelectInput 
                        currentValue={theme}
                        handleSelectedChange={changeTheme}
                        options={['light','vs-dark']}
                        />
                </div>
                <div className="flex gap-x-3">
                    {
                        shareLink && 
                        <ShareLink link={shareLink}/>
                    }
                    <Button
                        text="Share"
                        icon={shareIcon}
                        handleClick={handleShare}
                        disabled={disabledBtn}
                    />
                </div>
            </div>
        </div>
    )
}

export default Code