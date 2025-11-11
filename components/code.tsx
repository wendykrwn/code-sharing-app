"use client"
import { defaultHtmlCode } from "@/utils/codeExample"
import { Editor, OnMount } from "@monaco-editor/react"
import { SetStateAction, useEffect, useRef, useState } from "react"
import SelectInput from "./selectInput";
import Button from "./button";
import shareIcon from "../public/Share.svg"

type MonacoEditor = Parameters<OnMount>[0];
const Code = ({defaultValue,defaultLanguage}:{defaultValue?:string,defaultLanguage?:string}) => {
    const [theme,setTheme] = useState('light')
    const [language, setLanguage] = useState('html')
    const [value, setValue] = useState('')
    const [shareLink, setShareLink] = useState('')

    const editorRef = useRef<MonacoEditor | null>(null);

    const handleEditorDidMount : OnMount = (editor,monaco) => {
        editorRef.current = editor;
        setValue(editorRef.current.getValue())
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
    }
    const changeLanguage = (e: { target: { value: SetStateAction<string>; }; })=> {
        setLanguage(e.target.value)
    }
    const changeTheme = (e: { target: { value: SetStateAction<string>; }; }) => {
        setTheme(e.target.value)
    }
    const handleCopy = async () => {
        if (shareLink) {
          await navigator.clipboard.writeText(shareLink);
          alert("Lien copié dans le presse-papiers !");
        }
      };
    
    return (
        <div className="bg-white h-[80vh] w-5xl m-auto rounded-2xl py-5">
            <div className="h-[90%]">
                <Editor 
                    defaultValue={defaultValue || defaultHtmlCode} 
                    onMount={handleEditorDidMount}
                    language={language}
                    theme={theme}
                    onChange={(value)=>{if(value)setValue(value)}}
                />
            </div>
            <div className="">
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
            <div>
                {
                    shareLink && <p onClick={handleCopy}>{shareLink}</p>
                }
                <Button
                    text="Share"
                    icon={shareIcon}
                    handleClick={handleShare}
                    disabled={defaultValue==value}
                />
            </div>
         
            </div>
        </div>
    )
}

export default Code