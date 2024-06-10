import { channelId } from "@/config";
import { client } from "@/lib/neynar";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { casts } = await client.fetchFeedByChannelIds([channelId], {
    shouldModerate: true,
  });

  return NextResponse.json({ casts });
};
