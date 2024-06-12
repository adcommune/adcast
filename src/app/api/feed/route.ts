import { channelId } from "@/config";
import { client } from "@/lib/neynar";
import { NextRequest, NextResponse } from "next/server";

interface IFetchFeedByChannelIdsOptions {
  shouldModerate: boolean;
  limit: number;
  cursor?: string;
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  const searchParams = req.nextUrl.searchParams;
  const cursor: string | null = searchParams.get('cursor');

  const options: IFetchFeedByChannelIdsOptions = {
    shouldModerate: true,
    limit: 25,
  };

  if (cursor) options.cursor = cursor;

  const data = await client.fetchFeedByChannelIds([channelId], options);

  return NextResponse.json(data);
};
