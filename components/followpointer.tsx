import {motion} from "framer-motion";
import stringToColor from "@/lib/color";

function Followpointer({x,y,info,
}:{
    x:number;
    y:number;
    info:{
        name:string;
        email:string;
        avatar: string;
    };
}) {

    const color = stringToColor(info.email || '1')
  return (
    <motion.div 
    className="h-4 w-4 rounded-full absolute z-50"
    style={{
       top:y,
       left:x,
       pointerEvents:"none",
    }}
    initial={{
        scale:1,
        opacity:1,

    }}
    animate={{
        scale:1,
        opacity:1,

    }}
    exit={{
        scale:0,
        opacity:0,

    }}
    
    >
      <motion.div
      style={{
        top:y,
        left:x,
        pointerEvents:"none",
     }}
     initial={{
         scale:1,
         opacity:1,
 
     }}
     animate={{
         scale:1,
         opacity:1,
 
     }}
     exit={{
         scale:0,
         opacity:0,
 
     }}
     
     className="px-2 py-2 bg-natural-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full"
     >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 48" width="25" height="25" fill="#9694FF">
  <path d="M6 4l14.86 36.46a2 2 0 0 0 3.78-.34l3.86-13.54 12.14 8.74a2 2 0 0 0 3.36-2.12L28.4 22.12l13.88-4.26a2 2 0 0 0-.8-3.86L6 4z"/>
</svg>


        
        
       <p className="bg-violet-300  text-white pl-2 pr-2 rounded-md"> {info?.name || info.email}</p>  </motion.div>
    </motion.div>
  )
}

export default Followpointer
