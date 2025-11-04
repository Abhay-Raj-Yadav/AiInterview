// import { mutation } from "./_generated/server";
// import { v } from "convex/values";
// import { Id } from "./_generated/dataModel";

// export const SaveInterviewQuestions = mutation({
//   args: {
//     questions:v.optional(v.any()),
//     uid: v.id("users"),
//     resumeUrl: v.optional(v.string()),
  
//   },
 
//   handler: async (ctx, args) => {
//     // Map the string array of questions to the object structure needed for the DB

//     const result = await ctx.db.insert("InterviewSessionTable", {
//        interviewQuestions: args.questions,
//        userId: args.uid,
//        resumeUrl: args.resumeUrl,
//        status: 'draft'
//     });
//     return result;
//   },
// });




import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const SaveInterviewQuestions = mutation({
  args: {
    questions: v.optional(v.any()), // Use v.optional() to prevent errors if questions are null
    uid: v.id("users"),
    resumeUrl: v.optional(v.string()),
    jobTitle: v.optional(v.string()),     // <-- ADD THIS
    jobDescription: v.optional(v.string()), // <-- ADD THIS
  },
 
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("InterviewSessionTable", {
       interviewQuestions: args.questions,
       userId: args.uid,
       resumeUrl: args.resumeUrl,
       status: 'draft',
       jobTitle: args.jobTitle,         // <-- ADD THIS
       jobDescription: args.jobDescription, // <-- ADD THIS
    });
    return result;
  },
});