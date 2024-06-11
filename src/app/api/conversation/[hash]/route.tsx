import { client } from "@/lib/neynar";
import { CastParamType } from "@neynar/nodejs-sdk";
import { NextRequest, NextResponse } from "next/server";

type GetProfileParams = { params: { hash: string } };

export const GET = async (_req: NextRequest, { params }: GetProfileParams) => {
  const conversation = await client
    .lookupCastConversation(params.hash, CastParamType.Hash, {})
    .then((res) => res.conversation);

  return NextResponse.json({ conversation });
};
