'use client'
import { updateDoc,doc } from "firebase/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
function Document({id}:{id:string}) {
    const [input,setinput] = useState("");
    const [isUpdating,startTransition] = useTransition(); 
const [data,loading,error] = useDocumentData(doc(db,"documents",id))
    useEffect(()=>{
        if(data){
            setinput(data.title);
        }
    
    },[data])
    const updateTitle = (e: FormEvent)=>{
        e.preventDefault();

        if(input.trim()){
            startTransition(async()=>{
                await updateDoc(doc(db,"documents",id),{
                    title:input,
                });
            });
        }
    }
  return (
    <div>
        <div className="">
            <form onSubmit={updateTitle}>
                {/* Update title... */}
                <div className="flex flex-row space-x-4 relative max-w-6xl mx-auto pb-5">
              <Input
              value={input}
              onChange={(e)=>setinput(e.target.value)}
              />
              <Button disabled={isUpdating} type="submit">
                {isUpdating ? "Updating...":"Update"}
              </Button>
              </div>

                {/* if  */}
                {/* invite && is owner  */}


            </form>
            
        </div>
      <div>
        {/* Manage users */}
        {/* Avatars */}



      </div>
      
      {/*Collaborative editor */}
    </div>
  )
}

export default Document
