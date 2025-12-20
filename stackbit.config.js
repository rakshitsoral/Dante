import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'eleventy',
  nodeVersion: '20',
  
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["src"],
      models: [
        /**
         * PAGE MODEL
         * Matches: src/pages/about.md  =>  yourdomain.com/about/
         */
        {
          name: "page",
          label: "Page",
          type: "page",
          // Maps the filename {slug} directly to the root URL
          urlPath: "/{slug}", 
          filePath: "src/pages/{slug}.md",
          fields: [
            { name: "title", type: "string", label: "Title", required: true },
            { name: "body", type: "markdown", label: "Content" }
          ]
        },

        /**
         * POST MODEL
         * Matches: src/posts/my-first-post.md  =>  yourdomain.com/blog/my-first-post/
         */
        {
          name: "post",
          label: "Blog Post",
          type: "page",
          // Maps blog posts to a sub-directory
          urlPath: "/blog/{slug}", 
          filePath: "src/posts/{slug}.md",
          fields: [
            { name: "title", type: "string", label: "Title", required: true },
            { name: "date", type: "date", label: "Date" },
            { name: "body", type: "markdown", label: "Content" }
          ]
        }
      ],
    })
  ]
});