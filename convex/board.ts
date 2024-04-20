import { mutation ,query} from "./_generated/server"
import { v } from "convex/values"

const images = [
  "/placeholders/1.jpg",
  "/placeholders/2.jpg",
  "/placeholders/3.jpg",
  "/placeholders/4.jpg",
  "/placeholders/5.jpg",
]

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const randomImage = images[Math.floor(Math.random() * images.length)]

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage
    })

    return board;
  }
})

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorize")

    const userId = identity.subject;

    const existingFavorite = await ctx.db
    .query("userFavorites")
    .withIndex("by_user_board", (q) => q
      .eq("userId", userId)
      .eq("boardId", args.id)
    ).unique()

    if(existingFavorite) await ctx.db.delete(existingFavorite._id)

    await ctx.db.delete(args.id)
  }
})

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {

    const identity = await ctx.auth.getUserIdentity();
    const title = args.title.trim()
    if (!identity) throw new Error("Unauthorize")

    if (!title) {
      throw new Error("Title is required")
    }

    if (title.length > 60) {
      throw new Error("Title can not be longer than 60 characters")
    }

    const board = await ctx.db.patch(args.id, { 
      title: args.title
    })

    return board
  }
})

export const favorite = mutation({
  args:{ id: v.id("boards"), orgId: v.string()},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id)

    if(!board) throw new Error("Board not found")

    const userId = identity.subject

    const existingFavorite = await ctx.db
    .query("userFavorites")
    .withIndex("by_user_board", (q) => q
      .eq("userId", userId)
      .eq("boardId", board._id)
    ).unique()

    if(existingFavorite) throw new Error("Board already favorited")

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId
    })

    return board

  }
})

export const unfavorite = mutation({
  args:{ id: v.id("boards")},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if(!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id)

    if(!board) throw new Error("Board not found")

    const userId = identity.subject

    const existingFavorite = await ctx.db
    .query("userFavorites")
    .withIndex("by_user_board", (q) => q
      .eq("userId", userId)
      .eq("boardId", board._id)
    ).unique()

    if(!existingFavorite) throw new Error("Favorited not found")

    await ctx.db.delete(existingFavorite._id)

    return board

  }
})

export const get = query({
  args: {id: v.id("boards")},
  handler: async (ctx, args) => {
    const board = ctx.db.get(args.id);
    return board
  }
})
