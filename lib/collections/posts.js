module.exports = (coll) => {
  const posts = [...coll.getFilteredByGlob('src/posts/*.md')];

  return posts.reverse();
};
function prepareHeadlines(content) {
  const dom = new JSDOM(content);
  let headerElements = dom.window.document.querySelectorAll("h2,h3,h4,h5,h6");
  let headers = [];

  if (headerElements.length) {
    headerElements.forEach((header) => {
      const slug = header.innerHTML
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&nbsp;|&amp;/gi, " ")
        .replace(/[^a-zA-Z0-9 ]/gi, "")
        .replace(/ /gi, "-")
        .replace(/-+/gi, "-")
        .toLowerCase();

      const title = header.innerHTML.replace(/(<([^>]+)>)/gi, "");

      header.innerHTML =
        header.innerHTML +
        '<a href="#' +
        slug +
        '" class="anchor"><span aria-hidden="true">#</span><span>anchor</span></a>';
      header.id = slug;

      headers.push({
        slug: slug,
        title: title,
        tagName: header.tagName,
      });
    });

    content = dom.window.document.body.innerHTML;
  }
  return { content: content, headers: headers };
}