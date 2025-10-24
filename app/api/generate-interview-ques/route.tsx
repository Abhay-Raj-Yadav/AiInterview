import { NextRequest, NextResponse } from "next/server";
import Imagekit from "imagekit";
import { buffer } from "stream/consumers";
import axios from "axios";
var imagekit = new Imagekit({
    publicKey : "your_public_api_key",
    privateKey : "your_private_api_key",
    urlEndpoint : "https://ik.imagekit.io/your_imagekit_id/"
});


export const imageKit=new Imagekit({
    publicKey : process.env.IMAGEKIT_URL_PUBLIC_KEY!,
    privateKey : process.env.IMAGEKIT_URL_PRIVATE_KEY!,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT!
});
export  async function POST(request: NextRequest) {
 
    

    try{
         const formData=await request.formData();
    const file=formData.get('file') as File;

    if(!file){
        return NextResponse.json({error:'No file uploaded'},{status:400});
    }
      console.log("file", formData);
    const arrayBuffer=await file.arrayBuffer();
    const buffer=Buffer.from(arrayBuffer);
    const uploadResponse=await imagekit.upload({
        file:buffer,
        fileName:`upload-${Date.now()}.pdf`,
        isPrivateFile:false,
        useUniqueFileName:true,
    });
    const result= await axios.post('http://localhost:5678/webhook/e5ed1096-c289-4a81-85bd-9691d6d21fed',{
    resumeUrl:uploadResponse?.url
    });
    console.log(result.data);


        return NextResponse.json(result.data);
    }catch(error:any){
        console.log('upload-error',error);
    }

}
