const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'for', 'in', 'on', 'at', 'to', 'from', 'by', 'of', 'with', 'about', 'as', 'into', 'like', 'through', 'after', 'over', 'between', 'out', 'against', 'during', 'without', 'before', 'under', 'around', 'among', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'at', 'on', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'has', 'have', 'had', 'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must', 'this', 'that', 'these', 'those', 'then', 'than', 'so', 'very', 'just', 'more', 'most', 'only', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now', '&', '/']);

function getWordScore(word) {
  const clean = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean.length === 0) return -2;
  if (stopWords.has(clean)) return -1;
  return 1;
}

function highlightText(text) {
  const tokens = text.split(/(\s+)/);
  const words = tokens.filter((_, idx) => idx % 2 === 0);
  const N = words.length;

  if (N === 0) return text;

  const K = Math.max(1, Math.min(3, Math.floor((N - 1) / 2)));
  
  let bestScore = -Infinity;
  let bestStart = 0;

  for (let i = 0; i <= N - K; i++) {
    let score = 0;
    for (let j = 0; j < K; j++) {
      score += getWordScore(words[i + j]);
    }
    const centerSentence = (N - 1) / 2;
    const centerWindow = i + (K - 1) / 2;
    const centerDiff = Math.abs(centerWindow - centerSentence);
    score -= centerDiff * 0.1;

    if (getWordScore(words[i]) < 0) score -= 0.5;
    if (getWordScore(words[i + K - 1]) < 0) score -= 0.5;

    // Prefer later indices in case of ties for better flow
    if (score >= bestScore) {
      bestScore = score;
      bestStart = i;
    }
  }

  const tokenStartIdx = bestStart * 2;
  const tokenEndIdx = (bestStart + K - 1) * 2;

  let result = '';
  for (let idx = 0; idx < tokens.length; idx++) {
    if (idx === tokenStartIdx) {
      result += '<span class="role-pink">';
    }
    result += tokens[idx];
    if (idx === tokenEndIdx) {
      result += '</span>';
    }
  }

  return result;
}

function processHtml(html) {
  return html.replace(/<(h[23])([^>]*)>([\s\S]*?)<\/h[23]>/gi, (match, tag, attrs, content) => {
    // Avoid double-processing if class="role-pink" is already present
    if (content.includes('class="role-pink"') || content.includes("class='role-pink'")) {
      return match;
    }
    
    // Check if the content contains nested tags
    if (/<[a-z]/i.test(content)) {
      const parts = content.split(/(<\/?[a-z][^>]*>)/gi);
      let processed = false;
      for (let i = 0; i < parts.length; i++) {
        if (parts[i] && !parts[i].startsWith('<')) {
          const wordsCount = parts[i].trim().split(/\s+/).filter(Boolean).length;
          if (wordsCount > 0 && !processed) {
            parts[i] = highlightText(parts[i]);
            processed = true;
          }
        }
      }
      return `<${tag}${attrs}>${parts.join('')}</${tag}>`;
    }

    return `<${tag}${attrs}>${highlightText(content)}</${tag}>`;
  });
}

module.exports = (content, outputPath) => {
  if (outputPath && outputPath.endsWith('.html')) {
    return processHtml(content);
  }
  return content;
};
