import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter(q => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length === 0) {
      const data = {
        name: args.name,
        email: args.email,
        imageUrl: args.imageUrl,
      };
      const result = await ctx.db.insert("users", data);  
      return {
        ...data,
        id: result,
      };
    }
    return user[0];
  },
});