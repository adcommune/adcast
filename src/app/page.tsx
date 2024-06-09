"use client";

import Cast from "@/components/Cast";
import { FarcasterClientAPI } from "@/services/farcasterClient";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => new FarcasterClientAPI().fetchFeed(),
  });

  return data ? (
    <div className="flex flex-col gap-1 sm:gap-3">
      {data?.casts.map((cast) => {
        return <Cast key={cast.hash} {...cast} />;
      })}
    </div>
  ) : (
    <p>Fetching Casts</p>
  );
}
