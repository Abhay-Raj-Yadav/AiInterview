import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const SaveInterviewQuestions = mutation({
  args: {
    questions:v.any(),
    uid: v.id("users"),
    resumeUrl: v.optional(v.string()),
  
  },
 
  handler: async (ctx, args) => {
    // Map the string array of questions to the object structure needed for the DB

    const result = await ctx.db.insert("InterviewSessionTable", {
       interviewQuestions: args.questions,
       userId: args.uid,
       resumeUrl: args.resumeUrl,
       status: 'draft'
    });
    return result;
  },
});