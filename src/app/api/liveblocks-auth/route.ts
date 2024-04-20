import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_4XGaXbGAzVx9qj5lniLq5A8LjaMMgkaQkBtG6I71D0fK1Mew24a_QJVatHk72JcW",
});

export async function POST(request: NextRequest) {
  const authorization = await auth();
  console.log("authorization:", authorization);
  const user = await currentUser();
  console.log("user:", user);

  if (!authorization || !user)
    return new NextResponse("Unauthorized", { status: 403 });

  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  console.log("auth-info", {
    room,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authorization.orgId,
  });

  if (board?.orgId !== authorization.orgId) {
    return new NextResponse("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl,
  };
  console.log("userInfo:", userInfo);

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  console.log("status, body:", { status, body });
  return new NextResponse(body, { status });
}
