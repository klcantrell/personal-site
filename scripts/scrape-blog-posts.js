import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogUrls = [
  'https://blog.kalalau-cantrell.com/2017/10/how-and-why-a-sound-engineer-started-learning-to-code/',
  // 'https://blog.kalalau-cantrell.com/2017/12/promises-and-pokemon-how-i-learned-to-think-in-async/',
  // 'https://blog.kalalau-cantrell.com/2018/02/learn-webpack-through-example-i-blurred-placeholder-images/',
  // 'https://blog.kalalau-cantrell.com/2018/09/learn-webpack-by-example-ii-simple-code-splitting-in-a-vanilla-js-app/',
  // 'https://blog.kalalau-cantrell.com/2019/04/3-lessons-i-learned-in-my-first-months-as-a-non-traditional-software-engineer/',
  // 'https://blog.kalalau-cantrell.com/2019/10/mind-the-empathy-gap-3-ways-to-stay-empathetic-as-you-level-up/',
  // 'https://blog.kalalau-cantrell.com/2020/12/4-reasons-to-keep-an-eye-on-dart/',
  // 'https://blog.kalalau-cantrell.com/2021/01/make-smaller-console-apps-with-net-and-corert/'
];

// HTML to Markdown converter
function htmlToMarkdown(html) {
  return html
    // Handle code snippets in tables first (your specific case)
    .replace(/<table[^>]*>[\s\S]*?<td[^>]*class="code"[^>]*>([\s\S]*?)<\/td>[\s\S]*?<\/table>/gi, (match, codeContent) => {
      // Remove HTML tags from code content and preserve line breaks
      const cleanCode = codeContent
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<[^>]*>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .trim();
      
      return `\n\`\`\`\n${cleanCode}\n\`\`\`\n`;
    })
    // Convert headers
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
    // Convert bold and italic
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    // Convert links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // Convert images
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)')
    // Convert paragraphs
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    // Convert line breaks
    .replace(/<br[^>]*>/gi, '\n')
    // Convert regular code blocks
    .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gi, '```\n$1\n```\n')
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    // Convert lists
    .replace(/<ul[^>]*>(.*?)<\/ul>/gi, '$1\n')
    .replace(/<ol[^>]*>(.*?)<\/ol>/gi, '$1\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    // Convert blockquotes
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
    // Convert horizontal rules
    .replace(/<hr[^>]*>/gi, '\n---\n\n')
    // Remove remaining HTML tags
    .replace(/<[^>]*>/g, '')
    // Clean up whitespace
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+|\s+$/g, '')
    // Decode HTML entities
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&hellip;/g, '…');
}

// Extract slug from URL
function getSlugFromUrl(url) {
  const match = url.match(/\/([^\/]+)\/?$/);
  return match ? match[1] : 'untitled';
}

// Extract date from URL
function getDateFromUrl(url) {
  const match = url.match(/\/(\d{4})\/(\d{2})\//);
  if (match) {
    return `${match[1]}-${match[2]}-01`;
  }
  return new Date().toISOString().split('T')[0];
}

// Fetch and process a single blog post
async function fetchBlogPost(url) {
  try {
    console.log(`Fetching: ${url}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Extract header content
    const headerElement = document.querySelector('.entry-header');
    const contentElement = document.querySelector('.entry-content');
    
    if (!headerElement || !contentElement) {
      console.error(`Could not find required elements in: ${url}`);
      return null;
    }
    
    // Extract title
    const titleElement = headerElement.querySelector('h1, h2, h3, h4, h5, h6');
    const title = titleElement ? titleElement.textContent.trim() : 'Untitled';
    
    // Extract date from URL since it's more reliable
    const date = getDateFromUrl(url);
    const slug = getSlugFromUrl(url);
    
    // Convert content to markdown
    const contentHtml = contentElement.innerHTML;
    const markdownContent = htmlToMarkdown(contentHtml);
    
    // Create the full markdown file content
    const fullContent = `---
title: "${title}"
date: "${date}"
slug: "${slug}"
---

${markdownContent}`;
    
    return {
      title,
      date,
      slug,
      content: fullContent,
      url
    };
    
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

// Main function to scrape all posts
async function scrapeAllPosts() {
  const contentDir = path.join(__dirname, '..', 'src', 'content', 'blog');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  
  console.log('Starting blog post scraping...');
  
  for (const url of blogUrls) {
    const post = await fetchBlogPost(url);
    
    if (post) {
      const filename = `${post.slug}.md`;
      const filepath = path.join(contentDir, filename);
      
      fs.writeFileSync(filepath, post.content, 'utf8');
      console.log(`✅ Saved: ${filename}`);
    } else {
      console.log(`❌ Failed to process: ${url}`);
    }
    
    // Add a small delay to be respectful to the server
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Blog scraping complete!');
}

// Run the scraper
scrapeAllPosts().catch(console.error);