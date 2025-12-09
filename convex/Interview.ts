
// Force a re-push
import { mutation } from "./_generated/server";
import { v } from "convex/values";
// ... (rest of your file)



export const SaveInterviewQuestions = mutation({
  args: {

    questions: v.array(v.any()), 
    uid: v.id("users"),
    resumeUrl: v.optional(v.string()),
    jobTitle: v.optional(v.string()),   
    jobDescription: v.optional(v.string()), 
  },
 
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("InterviewSessionTable", {
       interviewQuestions: args.questions,
       userId: args.uid,
       resumeUrl: args.resumeUrl,
       status: 'draft',
       jobTitle: args.jobTitle,        
       jobDescription: args.jobDescription,
    });
    return result;
  },
});