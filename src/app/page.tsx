"use client";

import Cast from "@/components/Cast";
import CommentBox from "@/components/CommentBox";
import { Layout } from "@/components/Layout";
import { FarcasterClientAPI } from "@/services/farcasterClient";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => new FarcasterClientAPI().fetchFeed(),
  });

  return (
    <>
      <CommentBox />
      {data ? (
        <div className="flex flex-col gap-3 mt-2">
          {data?.casts.map((cast) => {
            return <Cast key={cast.hash} {...cast} />;
          })}
        </div>
      ) : (
        <p>Fetching Casts</p>
      )}
    </>
  );
}
