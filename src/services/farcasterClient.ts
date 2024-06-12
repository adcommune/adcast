import {
  CastWithInteractions,
  ConversationConversation,
  FeedResponse,
  NextCursor,
  User,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";

export class FarcasterClientAPI {
  async fetchCast(cast_id: string): Promise<{ cast: CastWithInteractions; }> {
    return fetch(`/api/cast/${cast_id}`).then((res) => res.json());
  }

  async fetchConversation(
    hash: string
  ): Promise<{ conversation: ConversationConversation; }> {
    return fetch(`/api/conversation/${hash}`).then((res) => res.json());
  }

  async fetchFeed(next?: NextCursor): Promise<FeedResponse> {
    const url = new URL('/api/feed', window.location.origin);
    if (next?.cursor) {
      url.searchParams.set('cursor', next.cursor);
    }

    const response = await fetch(url.toString());
    return response.json();
  }

  async fetchProfile(fid?: number): Promise<{ user?: User; }> {
    if (!fid) return { user: undefined };

    return fetch(`/api/profile/${fid}`).then((res) => res.json());
  }
}
