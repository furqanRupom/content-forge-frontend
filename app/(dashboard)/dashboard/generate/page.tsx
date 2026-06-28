import GenerateContent from "@/components/modules/User/GenerateContent/GenerateContent";
import { Metadata } from "next";

export const metadata:Metadata ={
    title:"Content Generation | ContentForge AI"
}

const contentGeneratePage = () =>{
    return <main>
        <GenerateContent />
    </main>
}
export default contentGeneratePage