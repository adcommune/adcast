import { channelId } from "@/config";
import { client } from "@/lib/neynar";
import { FeedType, FilterType } from "@neynar/nodejs-sdk";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const { casts } = await client.fetchFeed(FeedType.Filter, {
    filterType: FilterType.ChannelId,
    channelId,
  });

  return NextResponse.json({ casts });
};
