import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0',
  ssgName: 'eleventy', // Using 'eleventy' from your module.exports
  nodeVersion: '20',    // Updated to match your successful Netlify environment
  devCommand: 'npm run eleventy:serve',
  
  experimental: {
    ssg: {
      name: 'Eleventy',
      logPatterns: {
        up: ['Server at']
      },
      directoryChangePatterns: ['src/**']
    }
  },

  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      // Adjust contentDirs to where your actual .md or .json files live
      contentDirs: ["src", "content"], 
      models: [
        {
          name: "page",
          type: "page",
          label: "Page",
          urlPath: "/{slug}",
          // Ensure this matches your actual file structure
          filePath: "src/{slug}.md", 
          fields: [
            {
              type: "string",
              name: "title",
              label: "Title",
              required: true
            },
            {
              type: "markdown",
              name: "body",
              label: "Content"
            }
          ]
        }
      ],
    })
  ]
});