import {
  CastWithInteractions,
  ConversationConversation,
  User,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";

export class FarcasterClientAPI {
  async fetchCast(cast_id: string): Promise<{ cast: CastWithInteractions }> {
    return fetch(`/api/cast/${cast_id}`).then((res) => res.json());
  }

  async fetchConversation(
    hash: string
  ): Promise<{ conversation: ConversationConversation }> {
    return fetch(`/api/conversation/${hash}`).then((res) => res.json());
  }

  async fetchFeed(): Promise<{ casts: CastWithInteractions[] }> {
    return fetch("/api/feed").then((res) => res.json());
  }

  async fetchProfile(fid?: number): Promise<{ user?: User }> {
    if (!fid) return { user: undefined };

    return fetch(`/api/profile/${fid}`).then((res) => res.json());
  }
}
