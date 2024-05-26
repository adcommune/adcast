import { client } from "@/lib/neynar";
import { NextRequest, NextResponse } from "next/server";

type GetProfileParams = { params: { fid: string } };

export const GET = async (_req: NextRequest, { params }: GetProfileParams) => {
  const fid = parseInt(params.fid);

  const { users } = await client.fetchBulkUsers([fid]);

  return NextResponse.json({ user: users[0] });
};
