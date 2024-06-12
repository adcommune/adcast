"use client";

import Cast from "@/components/Cast";
import { FarcasterClientAPI } from "@/services/farcasterClient";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";

export default function Feed() {
  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: async ({ pageParam }: any) => new FarcasterClientAPI().fetchFeed({ cursor: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: any) => lastPage.next?.cursor || false,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return data ? (
    <div className="flex flex-col gap-1 sm:gap-3">
      {data?.pages.map((page: { casts: any[]; }) =>
        page.casts.map((cast) => (
          <Link key={cast.hash} href={`/${cast.hash}`}>
            <Cast {...cast} />
          </Link>
        ))
      )}
    </div>
  ) : isLoading ? (
    <p>Fetching Casts</p>
  ) : (
    <p>...</p>
  );
}
