import type { MetaRecord } from "nextra";

export default {
  index: {
    type: "page",
    display: "hidden",
  },
  react: {
    title: "React",
    type: "page",
  },
  typescript: {
    title: "TypeScript",
    type: "page",
  },
} satisfies MetaRecord;
