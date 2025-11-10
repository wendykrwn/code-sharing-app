"use client"
import { defaultHtmlCode } from "@/utils/codeExample"
import { Editor } from "@monaco-editor/react"

const Code = () => {
    return (
        <div className="bg-white h-[80vh] w-5xl m-auto rounded-2xl py-5">
            <div className="h-[90%]">
                <Editor defaultLanguage="html" defaultValue={defaultHtmlCode} />
            </div>
        </div>
    )
}

export default Code