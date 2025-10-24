import React, { use, useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import JobDescription from './JobDescription'
import Resume from './Resume'
import axios from 'axios'

function CreateInterviewDialog() {
const [formData, setFormData] = useState<any>({});
const [file,setFile]=useState<File|null>();
const [loading,setLoading]=useState(false);
const onHandleInputChange = ({ field, value }: { field: string; value: any }) => {
  setFormData((prev: any) => ({
    ...prev,
    [field]: value,
  }));
};


const onSubmit=async ()=>{
  if(!file)return;
  setLoading(true);
  const formData=new FormData();
  formData.append('file',file);
  try{
    const res=await axios.post('api/generate-interview-ques',formData);
    console.log(res.data);

  }catch(e){
        console.log(e);
  }finally{
    setLoading(false);
  }
}
  return (
  <Dialog>
  <DialogTrigger>
    <Button > Create Interview</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Details</DialogTitle>
      <DialogDescription>
        <Tabs defaultValue="resume" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="resume">Resume </TabsTrigger>
    <TabsTrigger value="job-description">Job Description</TabsTrigger>
  </TabsList>
  <TabsContent value="resume"><Resume setFiles={(file:File)=>setFile(file)} /></TabsContent>
  <TabsContent value="job-description"><JobDescription onHandleInputChange={onHandleInputChange}/></TabsContent>
</Tabs>
        
      </DialogDescription>
    </DialogHeader>
    <DialogFooter className='gap-2'>
        <DialogClose>
              <Button variant={'ghost'}>Cancel</Button>
            </DialogClose>
            <Button onClick={onSubmit} disabled={loading || !file}>Submit</Button>
         </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default CreateInterviewDialog
