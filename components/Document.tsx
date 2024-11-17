'use client'
import { updateDoc,doc } from "firebase/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";


function Document({id}:{id:string}) {
    const [input,setinput] = useState("");
    const [isUpdating,startTransition] = useTransition(); 
const [data,loading,error] = useDocumentData(doc(db,"documents",id))
const isOwner = useOwner();
// const isOwner = useOwner();
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
    <div className="flex-1 h-full bg-white p-5">
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
              

                {/* if  */}
                {isOwner && (
                  <>

                  {/**  Invite User  */}
                  {/**  Delete  document  */}

                  <DeleteDocument/>
                  
                  </>
                
                ) }
                </div>
                {/* invite && is owner  */}


            </form>
            
        </div>
      <div>
        {/* Manage users */}
        {/* Avatars */}



      </div>
      <Editor/>
      {/*Collaborative editor */}
    </div>
  )
}

export default Document
