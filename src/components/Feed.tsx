"use client";

import Cast from "@/components/Cast";
import { FarcasterClientAPI } from "@/services/farcasterClient";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Feed() {
  const { data, isLoading } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => new FarcasterClientAPI().fetchFeed(),
  });

  return data ? (
    <div className="flex flex-col gap-1 sm:gap-3">
      {data?.casts.map((cast) => {
        return (
          <Link key={cast.hash} href={`/${cast.hash}`}>
            <Cast {...cast} />
          </Link>
        );
      })}
    </div>
  ) : isLoading ? (
    <p>Fetching Casts</p>
  ) : (
    <p>...</p>
  );
}
