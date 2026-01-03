const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPassthroughCopy('src/assets/img/');
  eleventyConfig.addPassthroughCopy({ 'src/posts/img/': 'assets/img/' });
  eleventyConfig.addPassthroughCopy({ 'src/work/img/': 'assets/img/' });
  eleventyConfig.addPassthroughCopy('src/assets/files/');

  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/assets/css/");

  eleventyConfig.addLayoutAlias('default', 'layouts/default.njk');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
  eleventyConfig.addLayoutAlias('work', 'layouts/work.njk');

  eleventyConfig.addFilter('readableDate', require('./lib/filters/readableDate'));
  eleventyConfig.addFilter('minifyJs', require('./lib/filters/minifyJs'));

  eleventyConfig.addTransform('postcss', require('./lib/transforms/postcss'));
  eleventyConfig.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

  eleventyConfig.addCollection('posts', require('./lib/collections/posts'));
  eleventyConfig.addCollection('work', require('./lib/collections/work'));
  eleventyConfig.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
  eleventyConfig.addPassthroughCopy("src/admin");

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    // pathPrefix: "/subfolder/",
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};