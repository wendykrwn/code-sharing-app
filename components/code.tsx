"use client"
import { defaultHtmlCode } from "@/utils/codeExample"
import { Editor, OnMount } from "@monaco-editor/react"
import { SetStateAction, useEffect, useRef, useState } from "react"

type MonacoEditor = Parameters<OnMount>[0];
const Code = ({defaultValue,defaultLanguage}:{defaultValue:string,defaultLanguage:string}) => {
    const [theme,setTheme] = useState('light')
    const [language, setLanguage] = useState('html')
    const [defaultEditorValue, setDefaultEditorValue] = useState('')
    const [value, setValue] = useState('')
    const [shareLink, setShareLink] = useState('')

    const editorRef = useRef<MonacoEditor | null>(null);

    useEffect(()=>{
        if(!defaultValue){
            setDefaultEditorValue(defaultHtmlCode)
        }else{
            setDefaultEditorValue(defaultValue)
        }
    },[])

    const handleEditorDidMount : OnMount = (editor,monaco) => {
        editorRef.current = editor;
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
                    defaultLanguage="html" 
                    defaultValue={defaultEditorValue} 
                    onMount={handleEditorDidMount}
                    language={language}
                    theme={theme}
                />
            </div>
            <div className="">
                <select onChange={changeLanguage} className="bg-[#CED6E1] rounded-full outline-0 py-1 pl-2 m-auto cursor-pointer " name="languages" id="languages">
                    <option value="javascript">JS</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                </select>
                <select onChange={changeTheme} className="bg-[#CED6E1] rounded-full outline-0 py-1 pl-2 m-auto cursor-pointer" name="themes" id="themes">
                    <option value="light">Light</option>
                    <option value="vs-dark">Dark</option>
                </select>
            <div>
                {
                    shareLink && <p onClick={handleCopy}>{shareLink}</p>
                }
                <button onClick={handleShare} className="bg-[#CED6E1] rounded-full outline-0 py-1 px-3 m-auto cursor-pointer hover:bg-[#afb6c0] active:scale-90 transition duration-300 ease-in-out">Share</button>
            </div>
         
            </div>
        </div>
    )
}

export default Code