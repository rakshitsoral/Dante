// ... inside new GitContentSource({
models: [
  {
    name: "Page",
    type: "page",
    label: "Page",
    urlPath: "/{slug}",
    filePath: "src/pages/{slug}.md", // Dante typically keeps pages here
    fields: [
      { name: "title", type: "string", label: "Title", required: true },
      { name: "description", type: "string", label: "Description" },
      { name: "body", type: "markdown", label: "Content" }
    ]
  },
  {
    name: "Post",
    type: "page",
    label: "Blog Post",
    urlPath: "/blog/{slug}",
    filePath: "src/posts/{slug}.md", // Dante's blog posts location
    fields: [
      { name: "title", type: "string", label: "Title", required: true },
      { name: "date", type: "date", label: "Date", required: true },
      { name: "description", type: "string", label: "Excerpt/Description" },
      { name: "tags", type: "list", items: { type: "string" }, label: "Tags" },
      { name: "body", type: "markdown", label: "Content" }
    ]
  },
  {
    name: "Settings",
    type: "data",
    label: "Site Settings",
    file: "src/_data/metadata.json", // Common Dante metadata file
    fields: [
      { name: "title", type: "string", label: "Site Title" },
      { name: "url", type: "string", label: "Site URL" },
      { name: "description", type: "string", label: "Site Description" },
      { 
        name: "author", 
        type: "object", 
        fields: [
          { name: "name", type: "string" },
          { name: "email", type: "string" }
        ] 
      }
    ]
  }
]