"use client"
import { defaultHtmlCode } from "@/utils/codeExample"
import { Editor, OnMount } from "@monaco-editor/react"
import { SetStateAction, useEffect, useRef, useState } from "react"
type MonacoEditor = Parameters<OnMount>[0];
const Code = () => {
    const [theme,setTheme] = useState('light')
    const [language, setLanguage] = useState('html')
    const editorRef = useRef<MonacoEditor | null>(null);


    const handleEditorDidMount : OnMount = (editor,monaco) => {
        editorRef.current = editor;
        console.log("Langages dispo :", monaco.languages.getLanguages());
    }
    const getValue = () => {
        if(editorRef.current){
            return editorRef.current.getValue()
        }
        else null
    }
    const changeLanguage = (e: { target: { value: SetStateAction<string>; }; })=> {
        setLanguage(e.target.value)
    }
    const changeTheme = (e: { target: { value: SetStateAction<string>; }; }) => {
        setTheme(e.target.value)
    }
    return (
        <div className="bg-white h-[80vh] w-5xl m-auto rounded-2xl py-5">
            <div className="h-[90%]">
                <Editor 
                    defaultLanguage="html" 
                    defaultValue={defaultHtmlCode} 
                    onMount={handleEditorDidMount}
                    language={language}
                    theme={theme}
                />
            </div>
            <div className="">
                {/* <label htmlFor="languages">Choose a pet:</label> */}
                <select onChange={changeLanguage} className="bg-[#CED6E1] rounded-full outline-0 py-1 pl-2 m-auto " name="languages" id="languages">
                    <option value={language}>{language.toUpperCase()}</option>
                    <option value="javascript">JS</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                </select>
                <select onChange={changeTheme} className="bg-[#CED6E1] rounded-full outline-0 py-1 pl-2 m-auto " name="themes" id="themes">
                    <option value={theme}>{theme}</option>
                    <option value="light">Light</option>
                    <option value="vs-dark">Vs-dark</option>
                </select>
            </div>
        </div>
    )
}

export default Code