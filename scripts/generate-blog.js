#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configure paths relative to repo root
const repoRoot = path.resolve(__dirname, '..');
const blogJson = path.join(repoRoot, 'blog', 'blog.json');
const outFile = path.join(repoRoot, 'blog', 'index.html');

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function generatePostHTML(post) {
  const date = formatDate(post.date);
  const title = post.title;
  const message = post.message.replace(/\n/g, '<br>');
  let photoHTML = '';
  if (post.photo) {
    photoHTML = `<img src="${post.photo}" alt="${title}" class="blog-photo">`;
  }
  return `
    <article class="blog-post">
      <h2>${title}</h2>
      <time datetime="${post.date}">${date}</time>
      ${photoHTML}
      <p>${message}</p>
    </article>
  `;
}

(async () => {
  try {
    const data = await fs.promises.readFile(blogJson, 'utf8');
    const posts = JSON.parse(data);

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const postsHTML = posts.map(generatePostHTML).join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Blog - Wren's Widgets</title>
  <link rel="stylesheet" href="../styles.css">
  <link rel="icon" type="image/png" href="../favicon.png">
</head>
<body>
<header class="header-bar">
  <img src="../resources/logos/couple_brownText_noBackground.png" alt="logo" class="header-logo">
  <h1>R &nbsp; E &nbsp; E &nbsp; N &nbsp; A &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; P &nbsp; E &nbsp; T &nbsp; R &nbsp; I &nbsp; C &nbsp; K</h1>
  <nav class="nav-bar">
    <ul>
      <li><a href="../">about</a></li>
      <li><a href="../gallery/">gallery</a></li>
      <li><a href="../portfolio/">portfolio</a></li>
      <li><a href="./">blog</a></li>
      <li><a href="../contact/">contact</a></li>
    </ul>
  </nav>
</header>

<main class="content">
  <h1>My maker's log — process, places, and thoughts as they happen.</h1>
  ${postsHTML}
</main>

<footer class="site-footer">
  <a href="https://github.com/reenapetrick">Github</a> &nbsp;|&nbsp; <a href="https://www.instagram.com/wrens.widgets/">Instagram</a>
</footer>
</body>
</html>`;

    await fs.promises.writeFile(outFile, html, 'utf8');
    console.log(`Generated blog page with ${posts.length} posts`);
  } catch (err) {
    console.error('Error generating blog:', err);
  }
})();