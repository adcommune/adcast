import { client } from "@/lib/neynar";
import { CastParamType } from "@neynar/nodejs-sdk";
import { NextRequest, NextResponse } from "next/server";

type GetProfileParams = { params: { hash: string } };

export const GET = async (_req: NextRequest, { params }: GetProfileParams) => {
  const cast = await client
    .lookUpCastByHashOrWarpcastUrl(params.hash, CastParamType.Hash, {})
    .then((res) => res.cast);

  return NextResponse.json({ cast });
};
