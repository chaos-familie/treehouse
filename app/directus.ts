import { createDirectus, rest, type DirectusFile } from "@directus/sdk";

export const ASSETS_URL = "https://cms.chaos-familie.de/assets/";
export const Directus = createDirectus("https://cms.chaos-familie.de").with(
  rest()
);

export interface DirectusRestError {
  message: string;
  errors: { message: string; extensions: { code: string; reason: string } }[];
  response: {
    ok: boolean;
    redirected: boolean;
    status: number;
    urL: string;
    statusText: string;
  };
}

export interface BlogScheme {
  id: number;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  opener_image: string;
  title: string;
  tags: string[];
  post: string;
  is_released: boolean;
  description: string;
}

export interface CustomDirectusFile extends DirectusFile {
  blurhash: string;
}

export type Author = {
  name: string;
  avatar: { src: string };
  to: string;
  target: string;
}[];

export interface Member {
  id: string;
  display_name: string;
  picture: string;
  short_description: string;
  description: string;
  links: [
    {
      url: string;
      type:
        | "twitter"
        | "twitch"
        | "youtube"
        | "tiktok"
        | "instagram"
        | "discord";
    }
  ];
  gender: number;
  relations: Relations;
  tags: string[];
  gallery: number[];
  resolved_gallery: {
    src: string;
    blurhash: string;
    width: number;
    height: number;
  }[];
}

export type Relations = {
  relation: { key: string; display_name?: string };
  gender?: number;
  relation_type: "parent" | "sibling" | "married" | "child" | "none";
}[];
