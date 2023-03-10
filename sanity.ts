import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2021-10-21", // https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === "production", // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
};

export const sanityClient = createClient(config);

export const urlFor = (source: any) =>
  createImageUrlBuilder(config).image(source);
