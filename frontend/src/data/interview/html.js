/**
 * 50 High-Value HTML Interview Questions
 */

export const HTML_QUESTIONS = [
  {
    id: 1,
    question: "What is semantic HTML, and why is it important for SEO and accessibility?",
    category: "Semantics",
    difficulty: "Easy",
    explanation: "Semantic HTML uses elements that clearly describe their meaning to both the browser and developer (e.g., `<header>`, `<article>`, `<main>`, `<nav>`). It enables assistive technologies like screen readers to navigate page landmarks and helps search engine crawlers understand content structure and indexing hierarchy."
  },
  {
    id: 2,
    question: "What does the `<!DOCTYPE html>` declaration do?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "The `<!DOCTYPE html>` declaration informs the web browser about the HTML version used (HTML5). It forces the browser to render the page in 'Standards Mode' rather than 'Quirks Mode', ensuring consistent cross-browser layout and CSS box model calculations."
  },
  {
    id: 3,
    question: "What is the difference between `localStorage`, `sessionStorage`, and `cookies`?",
    category: "Web Storage",
    difficulty: "Medium",
    explanation: "`localStorage` persists data across browser sessions with no expiration (~5-10MB). `sessionStorage` lasts only as long as the tab/window is open (~5MB). Cookies store small strings (~4KB), have configurable expirations, and are automatically sent to the server in every HTTP request header."
  },
  {
    id: 4,
    question: "What is the difference between `script`, `script async`, and `script defer`?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "Standard `<script>` blocks HTML parsing while the script is downloaded and executed. `<script async>` downloads the script asynchronously in parallel with HTML parsing and executes immediately when downloaded (pausing HTML parsing). `<script defer>` downloads asynchronously but waits until HTML parsing is completely finished before executing in document order."
  },
  {
    id: 5,
    question: "What are data attributes (`data-*`), and how are they accessed in JavaScript and CSS?",
    category: "DOM & Attributes",
    difficulty: "Easy",
    explanation: "Data attributes allow storing custom extra data on standard HTML elements without non-standard hacks. In JavaScript, they are accessed via `element.dataset.customName`. In CSS, they can be targeted using attribute selectors: `[data-status='active']` or displayed using `attr(data-*)` in pseudo-elements."
  },
  {
    id: 6,
    question: "What is the difference between block, inline, and inline-block HTML elements?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "Block elements (e.g., `<div>`, `<p>`) take up the full available width and start on a new line. Inline elements (e.g., `<span>`, `<a>`) only take up as much width as their content and do not respect vertical margins/height. Inline-block elements sit inline on the same row but respect custom width, height, padding, and margins."
  },
  {
    id: 7,
    question: "What is the HTML5 `<picture>` element and how does it support responsive images?",
    category: "Media & Responsive",
    difficulty: "Medium",
    explanation: "The `<picture>` element wraps one or more `<source>` elements and an `<img>` fallback. It enables 'art direction'—serving completely different image crops or formats (WebP, AVIF) based on media query breakpoints (`media='(min-width: 768px)'`) or browser image format support."
  },
  {
    id: 8,
    question: "What is the purpose of ARIA roles and attributes in modern web applications?",
    category: "Accessibility",
    difficulty: "Medium",
    explanation: "Accessible Rich Internet Applications (ARIA) attributes (e.g., `role='dialog'`, `aria-expanded='true'`, `aria-live='polite'`) supplement HTML when native elements cannot express dynamic interactive states, allowing screen readers and assistive devices to announce UI state changes properly."
  },
  {
    id: 9,
    question: "What is the difference between `src` and `href` attributes?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`src` (source) is used to embed an external resource directly into the current document (e.g., `<img>`, `<script>`, `<iframe>`), pausing parsing or substituting content. `href` (hypertext reference) establishes a relationship/link to external resources (e.g., `<link rel='stylesheet'>`, `<a href='...'>`)."
  },
  {
    id: 10,
    question: "Why should every `<img>` tag include a descriptive `alt` attribute?",
    category: "Accessibility",
    difficulty: "Easy",
    explanation: "The `alt` text is read by screen readers for visually impaired users, displayed if the image fails to load, and indexed by search engine crawlers. Decorative images should use an empty `alt=''` to signal screen readers to ignore them."
  },
  {
    id: 11,
    question: "What is the `<template>` element and how does it work with Web Components?",
    category: "Advanced",
    difficulty: "Medium",
    explanation: "The `<template>` tag holds client-side HTML markup that is parsed by the browser but NOT rendered on page load. Its content can be cloned and instantiated dynamically via JavaScript (`template.content.cloneNode(true)`), commonly serving as the blueprint for Shadow DOM custom elements."
  },
  {
    id: 12,
    question: "What is the Shadow DOM and how does it encapsulate styles and markup?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Shadow DOM attaches a scoped, isolated DOM sub-tree to an element. Styles and scripts inside the shadow root do not leak out into the global document, and global CSS rules cannot accidentally overwrite internal shadow components, providing true native encapsulation."
  },
  {
    id: 13,
    question: "What is the purpose of the `<meta name='viewport'>` tag in responsive design?",
    category: "Media & Responsive",
    difficulty: "Easy",
    explanation: "`<meta name='viewport' content='width=device-width, initial-scale=1.0'>` instructs mobile browsers to render the page at the device's actual physical screen width rather than defaulting to a zoomed-out 980px desktop viewport emulation."
  },
  {
    id: 14,
    question: "What is the difference between `<canvas>` and `<svg>`?",
    category: "Media & Responsive",
    difficulty: "Medium",
    explanation: "`<svg>` is vector-based (XML in DOM), scales infinitely without pixelation, and elements can be styled with CSS and bound to event listeners. `<canvas>` is raster pixel-based (immediate mode drawn via JavaScript bitmap APIs), making it significantly faster for high-performance games and complex particle simulations."
  },
  {
    id: 15,
    question: "What does `rel='noopener noreferrer'` do on `<a>` tags with `target='_blank'`?",
    category: "Security",
    difficulty: "Medium",
    explanation: "`target='_blank'` without `rel='noopener'` allows the newly opened tab to access the original page via `window.opener`, creating phishing and tab-napping vulnerabilities. `noopener` breaks the `window.opener` reference, and `noreferrer` prevents sending the Referer HTTP header."
  },
  {
    id: 16,
    question: "What is progressive rendering in HTML and how can developers optimize it?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "Progressive rendering is the technique of streaming and rendering parts of a webpage as soon as chunks arrive rather than waiting for the entire document. It is optimized by placing critical CSS in `<head>`, lazy-loading below-the-fold images, and deferring non-critical scripts."
  },
  {
    id: 17,
    question: "What is the difference between `GET` and `POST` methods in HTML `<form>` submission?",
    category: "Forms",
    difficulty: "Easy",
    explanation: "`GET` appends form data to the URL query string, making it bookmarkable and visible in history (not suitable for sensitive data like passwords). `POST` transmits form data inside the HTTP request body, with no size limits and higher privacy."
  },
  {
    id: 18,
    question: "What is the purpose of the `hidden` attribute in HTML5?",
    category: "DOM & Attributes",
    difficulty: "Easy",
    explanation: "The boolean `hidden` attribute tells the browser not to render the element (equivalent to CSS `display: none;`). It hides elements visually and from screen readers until the attribute is removed dynamically."
  },
  {
    id: 19,
    question: "How does the HTML5 Drag and Drop API work?",
    category: "DOM & Attributes",
    difficulty: "Hard",
    explanation: "By setting `draggable='true'` on an element, it fires drag events (`dragstart`, `drag`, `dragend`). Target drop zones listen to `dragover` (calling `e.preventDefault()`) and `drop`, utilizing the `DataTransfer` object (`e.dataTransfer.setData/getData`) to transfer payload data."
  },
  {
    id: 20,
    question: "What is the Content Security Policy (CSP) meta tag and what does it protect against?",
    category: "Security",
    difficulty: "Hard",
    explanation: "`<meta http-equiv='Content-Security-Policy' content='...'>` defines trusted sources for scripts, stylesheets, images, and network connections. It is a fundamental defense against Cross-Site Scripting (XSS) and data injection attacks."
  },
  {
    id: 21,
    question: "What is the difference between `<b>`/`<i>` and `<strong>`/`<em>`?",
    category: "Semantics",
    difficulty: "Easy",
    explanation: "`<b>` and `<i>` apply purely stylistic bold and italic rendering without semantic importance. `<strong>` indicates strong importance or urgency (announced with emphasis by screen readers), and `<em>` conveys linguistic stress emphasis that changes sentence meaning."
  },
  {
    id: 22,
    question: "What is the difference between `disabled` and `readonly` attributes on form inputs?",
    category: "Forms",
    difficulty: "Easy",
    explanation: "`disabled` inputs are grayed out, cannot receive focus, and their values are NOT submitted with the form. `readonly` inputs allow focus and text selection, submit their values with the form, but prevent the user from editing the text content."
  },
  {
    id: 23,
    question: "How do `srcset` and `sizes` attributes optimize responsive images?",
    category: "Media & Responsive",
    difficulty: "Medium",
    explanation: "`srcset` provides a list of image URLs paired with their actual pixel widths (e.g., `image-800w.jpg 800w`). `sizes` specifies how much viewport width the image will occupy at various breakpoints. The browser automatically chooses and downloads the single optimal image based on screen DPI and container size."
  },
  {
    id: 24,
    question: "What is the difference between `<section>`, `<article>`, and `<div>`?",
    category: "Semantics",
    difficulty: "Medium",
    explanation: "`<article>` is for standalone, independently distributable content (e.g., blog posts, comments, news articles). `<section>` is for thematic grouping of related content within a document, typically with a heading. `<div>` carries no semantic meaning and is strictly a styling container."
  },
  {
    id: 25,
    question: "What are HTML5 Microdata and JSON-LD structured data formats?",
    category: "SEO",
    difficulty: "Medium",
    explanation: "Structured data formats annotate webpage content with schema.org vocabularies. JSON-LD (`<script type='application/ld+json'>`) provides structured JSON metadata describing products, reviews, organizations, and recipes, enabling Google to display Rich Search Snippets."
  },
  {
    id: 26,
    question: "What are Open Graph (og:*) meta tags and Twitter Cards?",
    category: "SEO",
    difficulty: "Easy",
    explanation: "Open Graph meta tags (e.g., `<meta property='og:title'>`, `og:image`) define how URLs appear when shared on social platforms (LinkedIn, Facebook, Discord, Slack), ensuring rich preview cards with custom titles, descriptions, and thumbnails."
  },
  {
    id: 27,
    question: "How does the HTML5 `autofocus` attribute work and what is its accessibility concern?",
    category: "Accessibility",
    difficulty: "Easy",
    explanation: "`autofocus` automatically places keyboard focus onto an input upon page load. While convenient, it can disorient screen reader users by skipping preceding page context and cause unexpected keyboard popups on mobile devices."
  },
  {
    id: 28,
    question: "What is the purpose of `<link rel='preload'>` vs `<link rel='prefetch'>`?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "`preload` tells the browser to download a high-priority resource needed for the *current* page immediately (fonts, hero images, critical scripts). `prefetch` downloads low-priority resources during idle time for *future* navigations the user is likely to make."
  },
  {
    id: 29,
    question: "What is the `<dialog>` element and what native methods does it provide?",
    category: "DOM & Attributes",
    difficulty: "Medium",
    explanation: "The native `<dialog>` element represents modal or popup dialogs. It provides `dialog.show()` (non-modal) and `dialog.showModal()` (modal with built-in backdrop, focus trapping, and `Escape` key close handling), replacing complex custom modal libraries."
  },
  {
    id: 30,
    question: "What is an `iframe` and what security restrictions can be enforced with the `sandbox` attribute?",
    category: "Security",
    difficulty: "Medium",
    explanation: "An `<iframe>` embeds an external HTML document inside the current page. The `sandbox` attribute restricts the embedded document by disabling scripts, form submissions, popups, and top-level navigation unless explicit tokens like `allow-scripts` or `allow-same-origin` are granted."
  },
  {
    id: 31,
    question: "What is the difference between `window.onload` and `DOMContentLoaded`?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "`DOMContentLoaded` fires as soon as the HTML document is completely parsed and DOM tree constructed, without waiting for stylesheets, images, and subframes. `window.onload` fires later, only after the document and all external assets (images, stylesheets) have completely finished loading."
  },
  {
    id: 32,
    question: "What is the purpose of the `<noscript>` tag?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "The `<noscript>` tag displays fallback HTML content to users who have disabled JavaScript in their browser or when using environments where scripts fail to execute."
  },
  {
    id: 33,
    question: "What is the HTML5 Geolocation API and how does it handle user permissions?",
    category: "DOM & Attributes",
    difficulty: "Medium",
    explanation: "Accessed via `navigator.geolocation.getCurrentPosition()`, it requests the user's geographic coordinates (latitude/longitude). Browsers strictly enforce explicit user permission prompts via HTTPS before releasing location data."
  },
  {
    id: 34,
    question: "What are Web Workers and how do they communicate with the main HTML/DOM thread?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Web Workers run CPU-intensive JavaScript tasks in background threads without blocking the main browser UI thread. Because workers have no direct access to the DOM, they communicate with the main script via asynchronous message passing using `postMessage()` and `onmessage` event handlers."
  },
  {
    id: 35,
    question: "What is the `novalidate` attribute in HTML forms?",
    category: "Forms",
    difficulty: "Easy",
    explanation: "Adding `novalidate` to `<form novalidate>` suppresses native browser HTML5 form validation tooltips (like 'Please fill in this field'), allowing custom JavaScript validation libraries to manage errors exclusively."
  },
  {
    id: 36,
    question: "What does `<base href='...'>` do in an HTML document?",
    category: "Fundamentals",
    difficulty: "Medium",
    explanation: "The `<base>` tag in `<head>` specifies the base URL for all relative URLs (links, images, stylesheets) in the document, ensuring consistent link resolution across deep client-side routed subpaths."
  },
  {
    id: 37,
    question: "What is the difference between `IndexedDB` and `localStorage`?",
    category: "Web Storage",
    difficulty: "Hard",
    explanation: "`localStorage` is synchronous, key-value string-based, and limited to ~5MB, which can freeze the UI thread on heavy reads. `IndexedDB` is a full asynchronous, transactional, indexed NoSQL database capable of storing hundreds of megabytes of complex objects, files, and blobs."
  },
  {
    id: 38,
    question: "How does the `loading='lazy'` attribute improve image performance?",
    category: "Performance",
    difficulty: "Easy",
    explanation: "`<img loading='lazy'>` defers loading offscreen images until the user scrolls near them, reducing initial page weight, bandwidth consumption, and improving Largest Contentful Paint (LCP)."
  },
  {
    id: 39,
    question: "What is the `<meta charset='UTF-8'>` tag and why should it appear early in `<head>`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "It declares character encoding (UTF-8 covering almost all written languages). Placing it within the first 1024 bytes of `<head>` prevents encoding mismatches, mojibake characters, and potential security sniffing attacks."
  },
  {
    id: 40,
    question: "What is the purpose of the `<slot>` element in Web Components?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "The `<slot>` placeholder inside a Web Component's Shadow DOM allows parent HTML markup to inject custom markup into specific designated locations within the custom component, enabling native component composition."
  },
  {
    id: 41,
    question: "What are Service Workers in HTML5 Progressive Web Apps (PWAs)?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "Service Workers are event-driven background scripts that act as programmable network proxies between the browser and network. They intercept fetch requests, cache assets for offline access, and manage push notifications and background sync."
  },
  {
    id: 42,
    question: "What is the difference between `accept` and `enctype` attributes in file upload forms?",
    category: "Forms",
    difficulty: "Medium",
    explanation: "`accept` on `<input type='file'>` filters allowed file extensions or MIME types (e.g., `accept='image/png, .pdf'`). `enctype='multipart/form-data'` on the `<form>` specifies that the request body must encode binary file data rather than standard URL-encoded strings."
  },
  {
    id: 43,
    question: "What is the purpose of the `<mark>` tag in HTML5?",
    category: "Semantics",
    difficulty: "Easy",
    explanation: "The `<mark>` tag represents highlighted or marked text for reference purposes, such as highlighting search query terms matched within a paragraph."
  },
  {
    id: 44,
    question: "How does the `tabindex` attribute affect keyboard navigation?",
    category: "Accessibility",
    difficulty: "Medium",
    explanation: "`tabindex='0'` puts an element into natural keyboard tab order. `tabindex='-1'` makes an element focusable via JavaScript (`element.focus()`) but skips it in sequential tab navigation. Positive values (`tabindex='1+'`) disrupt natural tab order and are considered an anti-pattern."
  },
  {
    id: 45,
    question: "What is the difference between the `<details>` and `<summary>` elements?",
    category: "Semantics",
    difficulty: "Easy",
    explanation: "`<details>` creates a native interactive disclosure widget that expands and collapses without JavaScript. The `<summary>` element inside acts as the visible clickable heading or label."
  },
  {
    id: 46,
    question: "What is the purpose of `<link rel='canonical'>`?",
    category: "SEO",
    difficulty: "Medium",
    explanation: "A canonical link specifies the master/authoritative URL of a page when duplicate or near-identical content exists under multiple URLs (e.g., HTTP vs HTTPS, query params), consolidating SEO ranking signals."
  },
  {
    id: 47,
    question: "What is the HTML5 `BroadcastChannel` API?",
    category: "Advanced",
    difficulty: "Hard",
    explanation: "The `BroadcastChannel` API allows simple one-to-many communication between different browser tabs, windows, iframes, or Web Workers running under the same origin without using WebSockets or polling localStorage."
  },
  {
    id: 48,
    question: "What does `contenteditable` attribute do on HTML elements?",
    category: "DOM & Attributes",
    difficulty: "Easy",
    explanation: "Setting `contenteditable='true'` transforms any HTML container (like a `<div>`) into an editable rich-text area where users can type, format text, and insert markup directly, often used to build custom WYSIWYG editors."
  },
  {
    id: 49,
    question: "What is the purpose of the `download` attribute on `<a>` tags?",
    category: "DOM & Attributes",
    difficulty: "Easy",
    explanation: "The `download` attribute instructs the browser to download the target URL file locally rather than navigating to it, optionally accepting a custom filename as its value: `<a href='report.pdf' download='Q3_Report.pdf'>`."
  },
  {
    id: 50,
    question: "What is the purpose of the `dns-prefetch` and `preconnect` resource hints?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "`dns-prefetch` resolves the DNS domain name of a third-party server in the background. `preconnect` goes a step further by performing the DNS lookup, TCP handshake, and TLS negotiation in advance, cutting connection latency for external API or CDN origins."
  }
];
