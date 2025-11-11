"use client"

import { useEffect, useState } from "react"
import { useParams } from 'next/navigation'
import Code from "@/components/code"

const CodePage =  ()  => {
    const params = useParams<{ snippetId: string }>()

    const [codeData,setCodeData] = useState<any>()
    const [error,setError] = useState()
    const getApi = async (id:any) => {
        try {
            const res = await fetch(`/api/snippets/${id}`)
            const data = await res.json()
            setCodeData(data)
            console.log({data})
        }catch(error){
            console.log({error})
        }
    }
    useEffect(()=>{
        console.log({ID : params.snippetId})
        if(params.snippetId){
            getApi(params.snippetId)
        }
    },[setCodeData])
    
    if(error || codeData?.error){
        return <div>Ce code n'existe pas</div>
    }
    if(codeData){
        return (
            <Code 
                defaultValue={codeData.content}
                defaultLanguage={codeData.language}
            />
        )
    }
    return (
        <div>Pas de data</div>
    )
}

export default CodePage