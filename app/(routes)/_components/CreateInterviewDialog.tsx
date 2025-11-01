import React, { JSX, useContext, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobDescription from './JobDescription';
import Resume from './Resume';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { UserDetailContext } from '@/context/UserDetailContext';

interface FormState {
  [key: string]: any;
}

function CreateInterviewDialog(): JSX.Element {
  const [formState, setFormState] = useState<FormState>({});
  const [file, setFile] = useState<File | null>(null);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);
  const saveInterviewQuestion = useMutation(api.Interview.SaveInterviewQuestions);

  function onHandleInputChange({ field, value }: { field: string; value: any }) {
    setFormState(prev => ({ ...prev, [field]: value }));
  }

  const onSubmit = async () => {
    if (!file) return;
    setLoading(true);
    const body = new FormData();
    body.append('file', file);
    body.append('formState', JSON.stringify(formState));

    try {
      const res = await axios.post('/api/generate-interview-ques', body);
      console.log(res.data);

      const resp=await saveInterviewQuestion({
        questions:res.data?.questions,
        resumeUrl:res.data?.resumeUrl,
        uid:userDetail?._id
      });
      console.log(resp);
    } catch (e) {
      console.error('Error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Create Interview</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
          <DialogDescription>
            <Tabs defaultValue="resume" className="w-full">
              <TabsList>
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="job-description">Job Description</TabsTrigger>
              </TabsList>
              <TabsContent value="resume">
                <Resume setFiles={(f: File) => setFile(f)} />
              </TabsContent>
              <TabsContent value="job-description">
                <JobDescription onHandleInputChange={onHandleInputChange} />
              </TabsContent>
            </Tabs>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <DialogClose>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={onSubmit} disabled={loading || !file}>
            {loading ? <Loader2Icon className="animate-spin" /> : 'Submit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateInterviewDialog;
