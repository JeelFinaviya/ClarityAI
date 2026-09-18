/**
 * 50 High-Value CSS Interview Questions
 */

export const CSS_QUESTIONS = [
  {
    id: 1,
    question: "What is the CSS Box Model, and how does `box-sizing: border-box` change it?",
    category: "Box Model",
    difficulty: "Easy",
    explanation: "The CSS box model consists of content, padding, border, and margin. Under the default `box-sizing: content-box`, `width` applies only to content, so padding and borders increase total element dimensions. With `box-sizing: border-box`, `width` includes content, padding, and border, making responsive layout calculations predictable."
  },
  {
    id: 2,
    question: "How does CSS Specificity work and how is the specificity hierarchy calculated?",
    category: "Specificity & Cascade",
    difficulty: "Medium",
    explanation: "Specificity determines which rule applies when multiple selectors match an element. It is calculated as a 4-part tuple: Inline styles (1,0,0,0) > IDs (0,1,0,0) > Classes, attributes, and pseudo-classes (0,0,1,0) > Elements and pseudo-elements (0,0,0,1). Universal `*` and inherited values have 0 specificity. `!important` overrides normal specificity."
  },
  {
    id: 3,
    question: "What is the difference between `display: none` and `visibility: hidden`?",
    category: "Layout",
    difficulty: "Easy",
    explanation: "`display: none` completely removes the element from the document render tree, taking up no space and triggering reflow. `visibility: hidden` hides the element visually, but the element retains its exact dimensions and empty space in the layout."
  },
  {
    id: 4,
    question: "What is the difference between Flexbox and CSS Grid, and when should you use each?",
    category: "Layout",
    difficulty: "Medium",
    explanation: "Flexbox is 1-dimensional (arranging items along a row OR a column, content-first). CSS Grid is 2-dimensional (aligning items simultaneously across rows AND columns, layout-first). Use Flexbox for linear navigation bars or card internals; use CSS Grid for full-page structures, dashboards, and complex masonry-style grids."
  },
  {
    id: 5,
    question: "How do CSS positioning values (`static`, `relative`, `absolute`, `fixed`, `sticky`) differ?",
    category: "Positioning",
    difficulty: "Medium",
    explanation: "`static` is default normal flow. `relative` shifts an element relative to its normal position without affecting surrounding flow. `absolute` positions relative to its closest non-static ancestor. `fixed` positions relative to the browser viewport. `sticky` acts as `relative` until a scroll threshold is met, then acts as `fixed` within its parent container."
  },
  {
    id: 6,
    question: "What is a Block Formatting Context (BFC) and how can you trigger one?",
    category: "Layout",
    difficulty: "Hard",
    explanation: "A BFC is an isolated mini-layout environment in which blocks render. Elements in a BFC contain internal floats, do not collapse margins with external elements, and prevent overlapping with adjacent floats. BFCs are triggered by `display: flow-root`, `overflow: hidden/auto`, `position: absolute/fixed`, or `display: flex/grid`."
  },
  {
    id: 7,
    question: "What is margin collapsing and in what scenarios does it occur?",
    category: "Box Model",
    difficulty: "Medium",
    explanation: "Margin collapsing occurs when adjacent vertical margins of block-level elements merge into a single margin equal to the largest of the values. It happens between: 1) Adjacent sibling blocks, 2) Parent and first/last child when no border/padding separates them, and 3) Empty blocks."
  },
  {
    id: 8,
    question: "What is the difference between `em`, `rem`, `vw`, `vh`, and `%` units?",
    category: "Typography & Units",
    difficulty: "Easy",
    explanation: "`rem` is relative to the root (`<html>`) font size. `em` is relative to the font-size of the element itself (or parent for properties). `vw`/`vh` are 1% of the viewport width/height. `%` is relative to the parent container's dimension for width/height or font-size."
  },
  {
    id: 9,
    question: "What is the difference between pseudo-classes (`:`) and pseudo-elements (`::`)?",
    category: "Selectors",
    difficulty: "Easy",
    explanation: "Pseudo-classes (`:hover`, `:focus`, `:nth-child()`) target elements based on dynamic user state or document tree structure. Pseudo-elements (`::before`, ::after, `::placeholder`) create or target virtual sub-elements that do not exist explicitly in the HTML markup."
  },
  {
    id: 10,
    question: "How does `z-index` work, and what is a Stacking Context?",
    category: "Positioning",
    difficulty: "Hard",
    explanation: "`z-index` controls the 3D rendering order along the z-axis for positioned elements. However, `z-index` is strictly scoped within its local Stacking Context. A new stacking context is formed by root `<html>`, positioned elements with `z-index`, `opacity < 1`, `transform`, `filter`, or `isolation: isolate`."
  },
  {
    id: 11,
    question: "What is the difference between CSS Transitions and CSS Animations?",
    category: "Animations",
    difficulty: "Medium",
    explanation: "Transitions interpolate CSS properties smoothly between two distinct states triggered by an event (like `:hover` or JS class change). Animations use `@keyframes` to define multi-step timeline sequences with loops, delays, direction changes, and auto-play capabilities without requiring state triggers."
  },
  {
    id: 12,
    question: "What is the CSS `clamp()` function and how does it enable fluid typography?",
    category: "Typography & Units",
    difficulty: "Medium",
    explanation: "`clamp(min, preferred, max)` sets a value that dynamically scales between a minimum and maximum bound based on a flexible expression. For instance, `font-size: clamp(1rem, 2.5vw, 2.5rem)` scales smoothly with viewport width without requiring multiple media query breakpoints."
  },
  {
    id: 13,
    question: "What are CSS Custom Properties (Variables) and how do they differ from SASS/SCSS variables?",
    category: "Variables & Architecture",
    difficulty: "Easy",
    explanation: "CSS variables (`--primary: #6366f1;` accessed via `var(--primary)`) are live, dynamic, and inherit down the DOM tree at runtime. They can be updated in JavaScript (`element.style.setProperty`) and media queries. SASS variables are static build-time constants replaced with plain CSS values during compilation."
  },
  {
    id: 14,
    question: "What is the difference between Reflow (Layout), Repaint, and Compositing?",
    category: "Performance",
    difficulty: "Hard",
    explanation: "**Reflow** recalculates element positions and geometry (expensive, caused by changes to `width`, `height`, `margin`). **Repaint** redraws visual pixels without altering geometry (`color`, `background-color`). **Compositing** draws GPU layers onto screen (`transform`, `opacity`), which runs on the compositor thread for smooth 60fps animations."
  },
  {
    id: 15,
    question: "How does `flex-grow`, `flex-shrink`, and `flex-basis` work in Flexbox?",
    category: "Layout",
    difficulty: "Medium",
    explanation: "`flex-basis` sets the initial main-size of an item before remaining space is distributed. `flex-grow` determines the proportion of available leftover positive space the item absorbs. `flex-shrink` defines the rate at which an item shrinks when the total items exceed container space."
  },
  {
    id: 16,
    question: "What is the BEM (Block Element Modifier) methodology?",
    category: "Variables & Architecture",
    difficulty: "Easy",
    explanation: "BEM is a naming convention (`.block__element--modifier`, e.g., `.card__btn--primary`) that keeps CSS modular, prevents specificity wars by sticking to single-class selectors, and makes component relationships self-documenting in large codebases."
  },
  {
    id: 17,
    question: "What is the `:has()` pseudo-class (parent selector) in modern CSS?",
    category: "Selectors",
    difficulty: "Medium",
    explanation: "The `:has()` relational selector styles an ancestor or sibling based on whether it contains matching descendants (e.g., `card:has(.card__img)`). It acts as the long-awaited native CSS 'parent selector', eliminating many conditional JavaScript class toggles."
  },
  {
    id: 18,
    question: "What is the difference between `justify-content`, `align-items`, and `align-content`?",
    category: "Layout",
    difficulty: "Medium",
    explanation: "`justify-content` aligns items along the main axis. `align-items` aligns items along the cross axis within a single line. `align-content` aligns entire multi-line flex tracks along the cross axis when there is extra vertical space."
  },
  {
    id: 19,
    question: "What are CSS Container Queries (`@container`) and how do they differ from Media Queries?",
    category: "Media Queries & Responsive",
    difficulty: "Hard",
    explanation: "Media queries (`@media`) evaluate the global browser viewport width. Container queries (`@container (min-width: 400px)`) evaluate the dimensions of the component's immediate parent container, enabling truly modular micro-components that adapt based on where they are placed."
  },
  {
    id: 20,
    question: "What is the CSS `will-change` property and when should you use it?",
    category: "Performance",
    difficulty: "Hard",
    explanation: "`will-change: transform, opacity` hints to the browser engine to promote the element to a dedicated GPU compositing layer ahead of time. It prevents jank during complex animations but should be used sparingly, as excessive GPU memory allocation causes battery drain and sluggishness."
  },
  {
    id: 21,
    question: "How do `min-content`, `max-content`, and `fit-content` intrinsic sizing keywords work?",
    category: "Box Model",
    difficulty: "Medium",
    explanation: "`min-content` shrinks the container to the smallest width possible without overflowing content (width of the longest word). `max-content` expands to the ideal width where no text wraps. `fit-content` uses `max-content` up to the available container space, then wraps like normal."
  },
  {
    id: 22,
    question: "What is the difference between `inherit`, `initial`, `unset`, and `revert`?",
    category: "Specificity & Cascade",
    difficulty: "Medium",
    explanation: "`inherit` takes the computed value of the parent. `initial` sets the property to the official CSS specification default. `unset` acts as `inherit` for inherited properties (like `color`) and `initial` for non-inherited properties. `revert` rolls back to the browser's default User-Agent stylesheet."
  },
  {
    id: 23,
    question: "How do you horizontally and vertically center a div in modern CSS?",
    category: "Layout",
    difficulty: "Easy",
    explanation: "1) Flexbox: `display: flex; justify-content: center; align-items: center;` on parent. 2) Grid: `display: grid; place-items: center;` on parent. 3) Absolute: `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);`."
  },
  {
    id: 24,
    question: "What is the difference between `:nth-child()` and `:nth-of-type()`?",
    category: "Selectors",
    difficulty: "Medium",
    explanation: "`:nth-child(n)` counts all sibling elements regardless of tag name and matches only if the nth element matches the selector. `:nth-of-type(n)` filters siblings to only those sharing the same tag name and counts among that specific type."
  },
  {
    id: 25,
    question: "What are CSS `@supports` feature queries?",
    category: "Media Queries & Responsive",
    difficulty: "Easy",
    explanation: "`@supports (display: subgrid) { ... }` allows developers to write progressive enhancement rules that apply only if the user's browser supports a specific modern CSS property and value."
  },
  {
    id: 26,
    question: "What is the `subgrid` value in CSS Grid?",
    category: "Layout",
    difficulty: "Hard",
    explanation: "`grid-template-columns: subgrid` allows a nested child grid to adopt and align directly with the row and column tracks of its parent grid, creating seamless alignment across nested card headers and footers."
  },
  {
    id: 27,
    question: "What is the difference between `opacity: 0`, `pointer-events: none`, and `user-select: none`?",
    category: "Fundamentals",
    difficulty: "Easy",
    explanation: "`opacity: 0` makes an element invisible while retaining space and click interactions. `pointer-events: none` makes clicks and mouse events pass through the element to layers underneath. `user-select: none` prevents the user from highlighting and selecting text."
  },
  {
    id: 28,
    question: "What is CSS Cascade Layers (`@layer`) and what problem does it solve?",
    category: "Specificity & Cascade",
    difficulty: "Hard",
    explanation: "`@layer base, components, utilities;` allows developers to control the cascade priority of stylesheet layers explicitly. Rules in a higher layer (e.g., `utilities`) always win over rules in lower layers (e.g., `base`), regardless of selector specificity within those layers."
  },
  {
    id: 29,
    question: "What is the difference between CSS `transform` translate vs altering `top`/`left`?",
    category: "Performance",
    difficulty: "Medium",
    explanation: "Altering `top` or `left` changes geometry in the layout engine, triggering reflow and repaint on the main thread. `transform: translate()` is handled entirely by the GPU compositor thread, executing at 60-120fps without triggering layout reflow."
  },
  {
    id: 30,
    question: "What is the CSS `backdrop-filter` property and how is glassmorphism created?",
    category: "Visual Effects",
    difficulty: "Medium",
    explanation: "`backdrop-filter: blur(10px)` applies graphical effects (like blurring, saturation) to the area *behind* an element. Combined with semi-transparent backgrounds (`rgba(255, 255, 255, 0.1)`) and thin borders, it creates modern glassmorphic frosted-glass UI."
  },
  {
    id: 31,
    question: "How does the `gap` property work in Flexbox and CSS Grid?",
    category: "Layout",
    difficulty: "Easy",
    explanation: "`gap: 1rem` (or `row-gap` and `column-gap`) defines gutters between adjacent items inside Flex and Grid containers without creating messy outer margins that require `:last-child` margin resets."
  },
  {
    id: 32,
    question: "What is the CSS `aspect-ratio` property?",
    category: "Box Model",
    difficulty: "Easy",
    explanation: "`aspect-ratio: 16 / 9` enforces a fixed width-to-height ratio on an element, automatically calculating the height as width changes, preventing layout shifts (Cumulative Layout Shift - CLS) while media loads."
  },
  {
    id: 33,
    question: "What is the difference between `auto-fill` and `auto-fit` in CSS Grid `repeat()`?",
    category: "Layout",
    difficulty: "Hard",
    explanation: "Both dynamically create column tracks. `auto-fill` creates as many tracks as can fit in the container (leaving empty tracks at the end). `auto-fit` collapses any empty tracks to `0px` and stretches the filled items to occupy the full container width."
  },
  {
    id: 34,
    question: "What is the CSS `currentColor` keyword?",
    category: "Typography & Units",
    difficulty: "Easy",
    explanation: "`currentColor` acts as a variable holding the computed value of the element's current text `color` property, allowing borders, SVG icons (`fill: currentColor`), and shadows to automatically sync with text color."
  },
  {
    id: 35,
    question: "What is the purpose of `clip-path` in CSS?",
    category: "Visual Effects",
    difficulty: "Medium",
    explanation: "`clip-path` creates a clipping region that determines which part of an element is visible (e.g., `polygon()`, `circle()`, `path()`), allowing complex geometric shapes, slanted hero sections, and custom reveal animations."
  },
  {
    id: 36,
    question: "What are CSS logical properties (e.g., `margin-inline`, `padding-block`) and why use them?",
    category: "Layout",
    difficulty: "Medium",
    explanation: "Logical properties replace physical directional terms (`left/right`, `top/bottom`) with writing-mode aware dimensions (`inline` for text direction, `block` for stack direction), seamlessly supporting RTL (Arabic/Hebrew) and vertical languages."
  },
  {
    id: 37,
    question: "What is CSS Grid `grid-template-areas`?",
    category: "Layout",
    difficulty: "Easy",
    explanation: "`grid-template-areas` defines visual named layout templates using ASCII-like string syntax (e.g., `'header header' 'sidebar main' 'footer footer'`), mapping child elements cleanly via `grid-area: header`."
  },
  {
    id: 38,
    question: "What is the difference between `object-fit: cover` and `object-fit: contain`?",
    category: "Media Queries & Responsive",
    difficulty: "Easy",
    explanation: "`cover` scales an `<img>` or `<video>` to fill the entire container while preserving aspect ratio, cropping edges if needed. `contain` scales the media to fit entirely inside the container without cropping, adding letterbox space if ratios differ."
  },
  {
    id: 39,
    question: "What does the `:focus-visible` pseudo-class do?",
    category: "Selectors",
    difficulty: "Medium",
    explanation: "`:focus-visible` applies focus indicators (like outlines) only when the browser heuristic determines the user is navigating via keyboard (Tab key) or assistive tech, avoiding distracting focus rings on mouse clicks."
  },
  {
    id: 40,
    question: "What is the CSS `contain` property and how does it optimize rendering?",
    category: "Performance",
    difficulty: "Hard",
    explanation: "`contain: layout paint content` informs the browser engine that the element's subtree is completely isolated from the rest of the DOM. Reflows or repaints inside the container do not recalculate the surrounding document, speeding up large single-page apps."
  },
  {
    id: 41,
    question: "What is CSS sub-pixel rendering and font smoothing?",
    category: "Typography & Units",
    difficulty: "Medium",
    explanation: "Font smoothing properties (`-webkit-font-smoothing: antialiased`) control how font glyphs render against dark backgrounds, preventing blurry or excessively thick character weights across different display pixel densities."
  },
  {
    id: 42,
    question: "What is the difference between `linear-gradient`, `radial-gradient`, and `conic-gradient`?",
    category: "Visual Effects",
    difficulty: "Easy",
    explanation: "`linear-gradient` transitions colors along a straight line. `radial-gradient` radiates outward from a central origin point in circular or elliptical patterns. `conic-gradient` sweeps colors rotated around a center point (like a color wheel or pie chart)."
  },
  {
    id: 43,
    question: "What is the `@media (prefers-color-scheme: dark)` media query?",
    category: "Media Queries & Responsive",
    difficulty: "Easy",
    explanation: "It detects if the user has requested a system-wide Dark or Light mode in their operating system settings, allowing stylesheets to automatically apply dark theme variables and styles."
  },
  {
    id: 44,
    question: "What is the `@media (prefers-reduced-motion: reduce)` media query?",
    category: "Accessibility",
    difficulty: "Easy",
    explanation: "It detects if the user has requested the OS to minimize non-essential animations due to vestibular disorders or motion sickness, allowing developers to disable or tone down bouncy parallax and transition effects."
  },
  {
    id: 45,
    question: "What is the CSS `scroll-behavior: smooth` property?",
    category: "Visual Effects",
    difficulty: "Easy",
    explanation: "Adding `scroll-behavior: smooth` to `<html>` causes in-page anchor navigation (`<a href='#section'>`) and programmatic `window.scrollTo()` calls to animate with smooth scrolling instead of jumping abruptly."
  },
  {
    id: 46,
    question: "What is CSS Scroll Snapping (`scroll-snap-type`)?",
    category: "Layout",
    difficulty: "Medium",
    explanation: "`scroll-snap-type: x mandatory` on a scroll container paired with `scroll-snap-align: center` on children creates touch-friendly mobile carousels and full-screen sliders natively in CSS without external JS libraries."
  },
  {
    id: 47,
    question: "What is the CSS `mask-image` property?",
    category: "Visual Effects",
    difficulty: "Medium",
    explanation: "`mask-image` clips an element's visible pixels using the luminance or alpha transparency of another image or gradient, enabling smooth gradient fades and custom visual masks."
  },
  {
    id: 48,
    question: "What is the `:is()` and `:where()` pseudo-class selector?",
    category: "Selectors",
    difficulty: "Medium",
    explanation: "Both take a list of selectors: `:is(h1, h2, h3)` simplifies complex selector chains. The difference is specificity: `:is()` takes the specificity of its most specific argument, while `:where()` always has `0` specificity, making it ideal for base resets."
  },
  {
    id: 49,
    question: "What are CSS counter styles (`counter-reset`, `counter-increment`)?",
    category: "Typography & Units",
    difficulty: "Medium",
    explanation: "CSS counters act as native styling variables incremented via CSS (`counter-increment: step-counter`), accessed via `counter(step-counter)` in `::before` pseudo-elements to render numbered lists or section headers."
  },
  {
    id: 50,
    question: "What is CSS Sub-pixel layout rounding and how does it cause 1px hairline gaps?",
    category: "Box Model",
    difficulty: "Hard",
    explanation: "Browsers calculate layouts in fractional pixels (e.g., `33.333%`), but screens have discrete physical device pixels. Rounding discrepancies between adjacent elements can cause visible 1px hairline gaps, solved by using CSS Grid, `calc()`, or background overlays."
  }
];
