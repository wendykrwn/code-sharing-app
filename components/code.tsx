"use client"
import { defaultHtmlCode } from "@/utils/codeExample"
import { Editor, OnMount } from "@monaco-editor/react"
import { SetStateAction, useEffect, useRef, useState } from "react"
type MonacoEditor = Parameters<OnMount>[0];
const Code = () => {
    const [theme,setTheme] = useState('light')
    const [language, setLanguage] = useState('html')
    const [value, setValue] = useState('')
    const editorRef = useRef<MonacoEditor | null>(null);


    const handleEditorDidMount : OnMount = (editor,monaco) => {
        editorRef.current = editor;
        console.log("Langages dispo :", monaco.languages.getLanguages());
    }
    const getValue = () => {
        if(editorRef.current){
            const editorValue = editorRef.current.getValue()
            console.log({editorValue})
            setValue(editorValue)
        }
        else {
            setValue('')
        }
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
                <select onChange={changeLanguage} className="bg-[#CED6E1] rounded-full outline-0 py-1 pl-2 m-auto cursor-pointer " name="languages" id="languages">
                    <option value="javascript">JS</option>
                    <option value="css">CSS</option>
                    <option value="html">HTML</option>
                </select>
                <select onChange={changeTheme} className="bg-[#CED6E1] rounded-full outline-0 py-1 pl-2 m-auto cursor-pointer" name="themes" id="themes">
                    <option value="light">Light</option>
                    <option value="vs-dark">Dark</option>
                </select>

                <button onClick={getValue} className="bg-[#CED6E1] rounded-full outline-0 py-1 px-3 m-auto cursor-pointer hover:bg-[#afb6c0] active:scale-90 transition duration-300 ease-in-out">Share</button>
            </div>
        </div>
    )
}

export default Code