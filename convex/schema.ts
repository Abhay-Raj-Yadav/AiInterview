import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  }),
  // NEW TABLE ADDED HERE
  InterviewSessionTable: defineTable({
    
    resumeUrl: v.string(), // URL to the uploaded resume
    userId:v.id("users"),
    status:v.string(),
    interviewQuestions: v.any(),
    }),
  
});