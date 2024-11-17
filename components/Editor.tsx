'use client'
import { useRoom } from "@liveblocks/react/suspense";
import { useEffect, useState, } from "react";
import * as Y from "yjs";
import { useSelf } from "@liveblocks/react/suspense";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import {LiveblocksYjsProvider} from "@liveblocks/yjs";
import {BlockNoteView} from "@blocknote/shadcn";
import {BlockNoteEditor} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import "@blocknote/core/fonts/inter.css"
import "@blocknote/shadcn/style.css"
import stringToColor from "@/lib/color";

type EditorProps = {
    doc : Y.Doc;
    provider : any;
    darkMode: boolean;
};


function BlockNote({doc, provider,darkMode}: EditorProps) {
    const userInfo = useSelf((me)=> me.info);//user info when typing
    const editor :BlockNoteEditor = useCreateBlockNote({
        collaboration:{//object
            provider,//arguement
            fragment: doc.getXmlFragment("document-store"),//storing info 
            user : {
                name: userInfo?.name,
                color: stringToColor(userInfo?.email),
            },
        },
    });
    return(
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView
            className="min-h-screen"
            editor = {editor}
            theme = {
                darkMode ? "dark" : "light"
            }
            />
        </div>
    )
}
 


function Editor() {
    const room = useRoom();
    const [doc,setDoc] = useState<Y.Doc>();
    const [provider,setProvider] = useState<LiveblocksYjsProvider>();
    const [darkMode,setdarkMode] = useState(false);

    useEffect(()=>{
        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room,yDoc);
        setDoc(yDoc);
        setProvider(yProvider);
        
    return () =>{
        yDoc?.destroy();
        yProvider?.destroy();
    };
    },[room])
    if(!doc || !provider){
        return null;
    }
    
    const style = `hover:text-white ${
        darkMode
        ?"text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
        :"text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"

    }`;
  return (
    <div className="max-w-6xl mx-auto p-4">
        <div className="flex intems-center gap-2 justify-end mb-10">
      <h1 className="text-2xl font-bold mb-4">Editor</h1>
      <div>
        {/* Translate Document Ai */}
        {/** Chat to Cocument Ai */}
        {/** Dark Mode */}
        <Button className={style} onClick={()=> setdarkMode(!darkMode)}>
            {darkMode ? <SunIcon/> :<MoonIcon/> }

        </Button>
        </div>
      </div>
      {/**Block Note */}
      <BlockNote doc = {doc} provider = { provider} darkMode={darkMode}/>
    </div>
  );
}

export default Editor;
