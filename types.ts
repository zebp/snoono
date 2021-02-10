export interface Thing<T> {
    id?: string;
    /**
     * The type that the thing represents.
     */
    kind: string;
    /**
     * The full name of the thing containing the kind and id.
     */
    name?: string;
    /**
     * The inner data of the thing.
     */
    data: T;
}

/**
 * Representation of a slice of a paging list.
 */
export interface Listing<T> {
    /**
     * The fullname of the listing that follows before this page. null if there is no previous page.
     */
    before?: string;
    /**
     * The fullname of the listing that follows after this page. null if there is no next page.
     */
    after?: string;
    /**
     * This modhash is not the same modhash provided upon login. You do not need to update your user's
     * modhash everytime you get a new modhash. You can reuse the modhash given upon login.
     */
    modhash: string;
    children: Thing<T>[],
}

export interface Votable {
    ups: number;
    down: number;
    /**
     * If the thing is liked by the user
     */
    likes?: boolean;
}

export interface Created {
    created: number;
    created_utc: number;
}

export type Edited = boolean | number;

export interface Comment extends Votable, Created {
    approved_by: string;
    author: string;
    author_flair_css_class: string;
    author_flair_text: string;
    banned_by: string;
    body: string;
    body_html: string;
    edited: Edited;
    gilded: number;
    link_author: string;
    link_id: string;
    link_title: string;
    link_url: string;
    num_reports: number;
    parent_id: string;
    replies: Thing<Comment>[];
    saved: boolean;
    score: number;
    score_hidden: boolean;
    subreddit: string;
    subreddit_id: string;
    distinguished?: string;
}

export interface Link extends Votable, Created {
    author: string;
    author_flair_css_class: string;
    author_flair_text: string;
    clicked: boolean;
    domain: string;
    hidden: boolean;
    is_self: boolean;
    link_flair_css_class: string;
    link_flair_text: string;
    locked: boolean;
    media: unknown;
    media_embed: unknown;
    num_comments: number;
    over_18: boolean;
    permalink: string;
    saved: boolean;
    score: number;
    selftext: string;
    selftext_html: string;
    subreddit: string;
    subreddit_id: string;
    thumbnail: string;
    title: string;
    url: string;
    edited: number;
    distinguished?: string;
    stickied: boolean;
}

// TODO
export interface FlairRichtext {
    e: E;
    t?: string;
    a?: string;
    u?: string;
}

// TODO: Find constants
export type FlairTextColor = string;

export enum SubredditType {
    Public = "public",
    Private = "private",
    Restricted = "restricted",
    GoldRestricted = "gold_restricted",
    Archived = "archived",
    User = "user",
}

export interface Submission extends Votable, Created {
    approved_at_utc: null;
    subreddit: string;
    selftext?: string;
    author_fullname?: string;
    saved: boolean;
    mod_reason_title: null;
    gilded: number;
    clicked?: boolean;
    title?: string;
    link_flair_richtext?: FlairRichtext[];
    subreddit_name_prefixed: string;
    hidden?: boolean;
    pwls?: number | null;
    link_flair_css_class?: null | string;
    thumbnail_height?: number | null;
    top_awarded_type: null;
    hide_score?: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color?: FlairTextColor;
    upvote_ratio?: number;
    author_flair_background_color: null | string;
    subreddit_type: SubredditType;
    total_awards_received: number;
    media_embed?: MediaEmbed;
    thumbnail_width?: number | null;
    author_flair_template_id: null | string;
    is_original_content?: boolean;
    user_reports: any[];
    secure_media?: DataMedia | null;
    is_reddit_media_domain?: boolean;
    is_meta?: boolean;
    category?: null;
    secure_media_embed?: MediaEmbed;
    link_flair_text?: null | string;
    can_mod_post: boolean;
    score: number;
    approved_by: null;
    author_premium?: boolean;
    thumbnail?: string;
    edited: boolean | number;
    author_flair_css_class: null | string;
    author_flair_richtext?: FlairRichtext[];
    gildings: DataGildings;
    post_hint?: PostHint;
    content_categories?: null;
    is_self?: boolean;
    mod_note: null;
    created: number;
    link_flair_type?: FlairType;
    wls?: number | null;
    removed_by_category?: RemovedByCategory | null;
    banned_by: null;
    author_flair_type?: FlairType;
    domain?: Domain;
    allow_live_comments?: boolean;
    selftext_html?: null | string;
    suggested_sort?: null | string;
    banned_at_utc: null;
    url_overridden_by_dest?: string;
    view_count?: null;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable?: boolean;
    pinned?: boolean;
    over_18: boolean;
    preview?: DataPreview;
    all_awardings: AllAwarding[];
    awarders: any[];
    media_only?: boolean;
    can_gild: boolean;
    spoiler?: boolean;
    locked: boolean;
    author_flair_text: null | string;
    treatment_tags: any[];
    visited?: boolean;
    removed_by?: null;
    num_reports: null;
    distinguished: null;
    subreddit_id: string;
    mod_reason_by: null;
    removal_reason: null;
    link_flair_background_color?: LinkFlairBackgroundColor;
    id: string;
    is_robot_indexable?: boolean;
    report_reasons: null;
    author: string;
    discussion_type?: null;
    num_comments: number;
    send_replies: boolean;
    whitelist_status?: WhitelistStatus | null;
    contest_mode?: boolean;
    mod_reports: any[];
    author_patreon_flair?: boolean;
    author_flair_text_color: FlairTextColor | null;
    permalink: string;
    parent_whitelist_status?: WhitelistStatus | null;
    stickied: boolean;
    url?: string;
    subreddit_subscribers?: number;
    created_utc: number;
    num_crossposts?: number;
    media?: DataMedia | null;
    is_video?: boolean;
    link_flair_template_id?: string;
    crosspost_parent_list?: CrosspostParentList[];
    crosspost_parent?: string;
    comment_type?: null;
    link_id?: string;
    replies?: string;
    parent_id?: string;
    body?: string;
    link_title?: string;
    is_submitter?: boolean;
    body_html?: string;
    collapsed_reason?: null;
    associated_award?: null;
    score_hidden?: boolean;
    link_permalink?: string;
    link_author?: string;
    link_url?: string;
    collapsed?: boolean;
    controversiality?: number;
    collapsed_because_crowd_control?: null;
}

export interface AllAwarding {
    giver_coin_reward: number | null;
    subreddit_id: null | string;
    is_new: boolean;
    days_of_drip_extension: number;
    coin_price: number;
    id: string;
    penny_donate: number | null;
    award_sub_type: AwardSubType;
    coin_reward: number;
    icon_url: string;
    days_of_premium: number;
    tiers_by_required_awardings: { [key: string]: TiersByRequiredAwarding } | null;
    resized_icons: ResizedIcon[];
    icon_width: number;
    static_icon_width: number;
    start_date: number | null;
    is_enabled: boolean;
    awardings_required_to_grant_benefits: number | null;
    description: string;
    end_date: null;
    subreddit_coin_reward: number;
    count: number;
    static_icon_height: number;
    name: string;
    resized_static_icons: ResizedIcon[];
    icon_format: Format | null;
    icon_height: number;
    penny_price: number | null;
    award_type: RemovedByCategory;
    static_icon_url: string;
}

export enum AwardSubType {
    Appreciation = "APPRECIATION",
    Global = "GLOBAL",
    Group = "GROUP",
    Moderator = "MODERATOR",
    Premium = "PREMIUM",
}

export enum RemovedByCategory {
    Global = "global",
    Moderator = "moderator",
}

export enum Format {
    Apng = "APNG",
    PNG = "PNG",
}

export interface ResizedIcon {
    url: string;
    width: number;
    height: number;
    format?: Format | null;
}

export interface TiersByRequiredAwarding {
    resized_icons: ResizedIcon[];
    awardings_required: number;
    static_icon: ResizedIcon;
    resized_static_icons: ResizedIcon[];
    icon: ResizedIcon;
}

export enum E {
    Emoji = "emoji",
    Text = "text",
}

export enum FlairType {
    Richtext = "richtext",
    Text = "text",
}

export interface CrosspostParentList {
    approved_at_utc: null;
    subreddit: string;
    selftext: string;
    author_fullname: string;
    saved: boolean;
    mod_reason_title: null;
    gilded: number;
    clicked: boolean;
    title: string;
    link_flair_richtext: LinkFlairRichtext[];
    subreddit_name_prefixed: string;
    hidden: boolean;
    pwls: number | null;
    link_flair_css_class: null | string;
    downs: number;
    thumbnail_height: number;
    top_awarded_type: null;
    hide_score: boolean;
    name: string;
    quarantine: boolean;
    link_flair_text_color: FlairTextColor;
    upvote_ratio: number;
    author_flair_background_color: null;
    subreddit_type: SubredditType;
    ups: number;
    total_awards_received: number;
    media_embed: MediaEmbed;
    thumbnail_width: number;
    author_flair_template_id: null;
    is_original_content: boolean;
    user_reports: any[];
    secure_media: CrosspostParentListMedia | null;
    is_reddit_media_domain: boolean;
    is_meta: boolean;
    category: null;
    secure_media_embed: MediaEmbed;
    link_flair_text: null | string;
    can_mod_post: boolean;
    score: number;
    approved_by: null;
    author_premium: boolean;
    thumbnail: string;
    edited: boolean;
    author_flair_css_class: null;
    author_flair_richtext: any[];
    gildings: CrosspostParentListGildings;
    post_hint?: PostHint;
    content_categories: null;
    is_self: boolean;
    mod_note: null;
    created: number;
    link_flair_type: FlairType;
    wls: number | null;
    removed_by_category: null | string;
    banned_by: null;
    author_flair_type: E;
    domain: Domain;
    allow_live_comments: boolean;
    selftext_html: null;
    likes: null;
    suggested_sort: null;
    banned_at_utc: null;
    url_overridden_by_dest: string;
    view_count: null;
    archived: boolean;
    no_follow: boolean;
    is_crosspostable: boolean;
    pinned: boolean;
    over_18: boolean;
    preview?: CrosspostParentListPreview;
    all_awardings: AllAwarding[];
    awarders: any[];
    media_only: boolean;
    can_gild: boolean;
    spoiler: boolean;
    locked: boolean;
    author_flair_text: null;
    treatment_tags: any[];
    visited: boolean;
    removed_by: null;
    num_reports: null;
    distinguished: null;
    subreddit_id: string;
    mod_reason_by: null;
    removal_reason: null;
    link_flair_background_color: string;
    id: string;
    is_robot_indexable: boolean;
    report_reasons: null;
    author: string;
    discussion_type: null;
    num_comments: number;
    send_replies: boolean;
    whitelist_status: WhitelistStatus | null;
    contest_mode: boolean;
    mod_reports: any[];
    author_patreon_flair: boolean;
    author_flair_text_color: null;
    permalink: string;
    parent_whitelist_status: WhitelistStatus | null;
    stickied: boolean;
    url: string;
    subreddit_subscribers: number;
    created_utc: number;
    num_crossposts: number;
    media: CrosspostParentListMedia | null;
    is_video: boolean;
    link_flair_template_id?: string;
}

export type Domain = string;

export interface CrosspostParentListGildings {
    gid_1?: number;
}

export interface LinkFlairRichtext {
    e: E;
    t: string;
}

export interface CrosspostParentListMedia {
    type: Domain;
    oembed: PurpleOembed;
}

export interface PurpleOembed {
    provider_url: string;
    version: string;
    title: string;
    height: number;
    width: number;
    html: string;
    provider_name: RName;
    type: Type;
}

export enum RName {
    Gfycat = "Gfycat",
    RedGIFS = "RedGIFS",
}

export enum Type {
    Video = "video",
}

export interface MediaEmbed {
    content?: string;
    width?: number;
    scrolling?: boolean;
    height?: number;
    media_domain_url?: string;
}

export type WhitelistStatus = string;

export type PostHint = string;

export interface CrosspostParentListPreview {
    images: PurpleImage[];
    reddit_video_preview?: RedditVideoPreview;
    enabled: boolean;
}

export interface PurpleImage {
    source: ResizedIcon;
    resolutions: ResizedIcon[];
    variants: PurpleVariants;
    id: string;
}

export interface PurpleVariants {
    obfuscated: GIF;
    nsfw: GIF;
}

export interface GIF {
    source: ResizedIcon;
    resolutions: ResizedIcon[];
}

export interface RedditVideoPreview {
    bitrate_kbps?: number;
    fallback_url: string;
    height: number;
    width: number;
    scrubber_media_url: string;
    dash_url: string;
    duration: number;
    hls_url: string;
    is_gif: boolean;
    transcoding_status: TranscodingStatus;
}

export type TranscodingStatus = string;

export interface DataGildings {
    gid_1?: number;
    gid_2?: number;
    gid_3?: number;
}

export type LinkFlairBackgroundColor = String;

export interface DataMedia {
    type: Domain;
    oembed: FluffyOembed;
}

export interface FluffyOembed {
    provider_url: string;
    version: string;
    title: string;
    height: number;
    width: number;
    html: string;
    provider_name: RName;
    type: Type;
    description?: string;
    author_name?: RName;
    thumbnail_width?: number;
    thumbnail_url?: string;
    thumbnail_height?: number;
}

export interface DataPreview {
    images: FluffyImage[];
    enabled: boolean;
    reddit_video_preview?: RedditVideoPreview;
}

export interface FluffyImage {
    source: ResizedIcon;
    resolutions: ResizedIcon[];
    variants: FluffyVariants;
    id: string;
}

export interface FluffyVariants {
    obfuscated?: GIF;
    nsfw?: GIF;
    gif?: GIF;
    mp4?: GIF;
}

// TODO: Find constants
export type Kind = string;
