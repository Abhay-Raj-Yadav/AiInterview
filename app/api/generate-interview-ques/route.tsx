import { NextRequest, NextResponse } from "next/server";
import Imagekit from "imagekit";
import { buffer } from "stream/consumers";
import axios from "axios";
// Removed the hardcoded 'imagekit' instance which was causing a potential failure.
// The instance below, configured with environment variables, is the correct one.


export const imageKit=new Imagekit({
    publicKey : process.env.IMAGEKIT_URL_PUBLIC_KEY!,
    privateKey : process.env.IMAGEKIT_URL_PRIVATE_KEY!,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT!
});
export  async function POST(request: NextRequest) {
 
    

    try{
         const formData=await request.formData();
    const file=formData.get('file') as File;
    const jobTitle=formData.get('jobTitle') ;
    const jobDescription=formData.get('jobDescription') ;

    if(file  && file.size>0){
    
      console.log("file", formData);
    const arrayBuffer=await file.arrayBuffer();
    const buffer=Buffer.from(arrayBuffer);


    
    // Corrected to use the exported 'imageKit' instance (uppercase 'K')
    const uploadResponse=await imageKit.upload({
        file:buffer,
        fileName:`upload-${Date.now()}.pdf`,
        isPrivateFile:false,
        useUniqueFileName:true,
    });
    const result= await axios.post('http://localhost:5678/webhook/e5ed1096-c289-4a81-85bd-9691d6d21fed',{
    resumeUrl:uploadResponse?.url
    });
    console.log(result.data);


     return NextResponse.json({
        questions: result.data?.message?.content?.questions,
        resumeUrl: uploadResponse?.url
    });
    }else{
        const result= await axios.post('http://localhost:5678/webhook/e5ed1096-c289-4a81-85bd-9691d6d21fed',{
         resumeUrl:null,
         jobTitle:jobTitle,
         jobDescription:jobDescription
    });
    console.log(result.data);


     return NextResponse.json({
        questions: result.data?.message?.content?.questions,
        resumeUrl: null
    });

    }}
    catch(error:any){
        console.error('upload-error',error);
        // Added explicit return for the error case to prevent implicit 500
        return NextResponse.json(
            { error: 'Internal Server Error during file upload/processing', details: error.message },
            { status: 500 }
        );
    }

}