import {
  CastWithInteractions,
  User,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";

export class FarcasterClientAPI {
  async fetchFeed(): Promise<{ casts: CastWithInteractions[] }> {
    return fetch("/api/feed").then((res) => res.json());
  }

  async fetchProfile(fid?: number): Promise<{ user?: User }> {
    if (!fid) return { user: undefined };

    return fetch(`/api/profile/${fid}`).then((res) => res.json());
  }
}
