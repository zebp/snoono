import { RedditClient } from "../mod.ts";
import { Thing, Listing, Submission } from "../types.ts";

interface Information {
    name: string;
}

export class Me {
    private readonly info: Information;
    private readonly client: RedditClient;

    private constructor(info: Information, client: RedditClient) {
        this.info = info;
        this.client = client;
    }

    public static async fromClient(client: RedditClient): Promise<Me> {
        const info: Information = await client.get("https://oauth.reddit.com/api/v1/me.json");
        return new Me(info, client);
    }

    public async fetchSavedPosts(): Promise<Thing<Listing<Submission>>> {
        return this.client.get(`https://oauth.reddit.com/user/${this.info.name}/saved.json`);
    }
}