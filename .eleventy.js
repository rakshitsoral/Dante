const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  // Passthrough
  eleventyConfig.addPassthroughCopy("src/assets/img/");
  eleventyConfig.addPassthroughCopy({ "src/posts/img/": "assets/img/" });
  eleventyConfig.addPassthroughCopy({ "src/work/img/": "assets/img/" });
  eleventyConfig.addPassthroughCopy("src/assets/files/");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/assets/css/");

  // Layout aliases
  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");
  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("work", "layouts/work.njk");

  // Filters
  eleventyConfig.addFilter("readableDate", require("./lib/filters/readableDate"));
  eleventyConfig.addFilter("minifyJs", require("./lib/filters/minifyJs"));

  // ✅ FIX: htmlDateString filter (NOW LOADED)
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split("T")[0];
  });

  // Transforms
  eleventyConfig.addTransform("postcss", require("./lib/transforms/postcss"));
  eleventyConfig.addTransform("minifyHtml", require("./lib/transforms/minifyHtml"));

  // Collections
  eleventyConfig.addCollection("posts", require("./lib/collections/posts"));
  eleventyConfig.addCollection("work", require("./lib/collections/work"));
  eleventyConfig.addCollection("pagedPosts", require("./lib/collections/pagedPosts"));

  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    templateFormats: ["md", "njk", "html"],
    dataTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
