"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { log } from "console";
import { CloudUpload, icons, Loader, WandSparkles, X } from "lucide-react";
import Image from "next/image";
//@ts-ignore
import uuid4 from "uuid4";
import React, { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import axios from "axios";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import Constants from "@/data/Constants";
function ImageUpload() {
  const {user} = useAuthContext();
    const AiModelList=[
        {
            name:"Gemini Google",
            icon:'/google.png',
            modelName:"google/gemini-2.0-pro-exp-02-05:free",

        },{
            name:"Deepseek",
            icon:'/deepseek.png',
            modelName:"deepseek/deepseek-r1-distill-llama-70b:free"
            
        },{
            name:"llama by meta",
            icon:"/meta.png",
            modelName:"meta-llama/llama-3.3-70b-instruct:free"
        }
    ]
    const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [file,setFile] = useState<any>();
  const [model,setModel] = useState<string>();
  const [description,setDescription] = useState<string>();
  const [loading,setLoading] = useState<boolean>(false);
  const onImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      console.log(file[0]);
      const imageUrl = URL.createObjectURL(file[0]);
      setFile(file[0]);
      setPreview(imageUrl);
    }
  };
  const onConvertToCode=async()=>{
     setLoading(true);
    if(!file || !model || !description){
        console.log("Please fill all the fields");
        
        return
    }
    //save image to firebase
    const fileName = Date.now()+'.png';
    const imageRef = ref(storage,"wireframe/"+fileName);
    await uploadBytes(imageRef,file).then((snapshot)=>{
        console.log("Image Uploaded");
    }).catch((error)=>{
        console.log(error);
    })
    const imageUrl = await getDownloadURL(imageRef);
   // console.log(imageUrl);
        const uid = uuid4()
    //save to database
    const result = await axios.post('/api/wireframe-to-code', {
        imageUrl:imageUrl,
        model:model,
        description:description,
        uid:uid,
        createdBy:user?.email
    });
    console.log(result.data);
    
    setLoading(false);
    router.push(`/view-code/${uid}`);

  


    
    

  }
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {!preview ? (
          <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center">
            <CloudUpload className="h-10 w-10 text-primary" />
            <h2 className="font-bold text-lg">Upload Image</h2>
            <p className="text-gray-400 mt-3">
              Click Button to Select Wireframe Image
            </p>
            <div className="p-5 border border-dashed w-full flex justify-center">
              <label htmlFor="imageSelect">
                <h2 className="p-2 bg-primary text-white rounded-md px-3 cursor-pointer">
                  Select Image
                </h2>
              </label>
            </div>
            <input
              multiple={false}
              onChange={onImageSelect}
              type="file"
              id="imageSelect"
              className="hidden"
            />
          </div>
        ) : (
          <div className="p-7 border border-dashed rounded-md shadow-md">
            <Image
              src={preview}
              alt="preview"
              width={500}
              height={500}
              className="w-full h-[300px] object-contain"
            />
            <X
              onClick={() => setPreview(null)}
              className="flex justify-end w-full cursor-pointer"
            />
          </div>
        )}
        <div className="p-7 border border-dashed rounded-lg shadow-md">
          <h2 className="font-bold text-lg">Select Ai Model</h2>
          <Select onValueChange={(value) => setModel(value)} >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {Constants.AiModelList.map((item) => (
                <SelectItem key={item.name} value={item.name}>
                    <div className="flex items-center gap-2">
                  <Image src={item.icon} alt={item.name} width={20} height={20} />
                 <h2>{item.name}</h2> 
                 </div>
                </SelectItem>
              ))}
             
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">
            Enter Description about your webpage
          </h2>

          <Textarea 
            onChange={(e) => setDescription(e.target.value)}
            className="mt-3 h-[200px]"
            placeholder="Write about your webpage"
          />
        </div>
      </div>
      <div className="mt-10 flex justify-center">
        <Button onClick={onConvertToCode} disabled={loading}>
          
         {loading?<Loader className="mr-2 h-4 w-4 animate-spin" />: <WandSparkles />} Convert to code
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
