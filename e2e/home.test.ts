import { expect, test } from '@playwright/test';

const title = 'Svelte Animate';
const description =
  'A lightweight Svelte component that adds beautiful CSS animations to any element using Animate.css library. Features include click/hover triggers, customizable duration, reduced motion support, and accessibility features. Perfect for creating engaging user interfaces with smooth animations in Svelte applications.';
const keywords =
  'svelte, animation, animate.css, web animation, UI components, front-end development, svelte animations, CSS animations, user interface, accessibility, reduced motion, UI/UX, motion effects, transition effects, animation library, svelte transitions';
const imgUrl = 'https://open-graph-vercel.vercel.app/api/svelte-animate';

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  await page.goto('/');
});

test('index page has expected h1', async ({ page }) => {
  expect(await page.textContent('h1')).toContain('Animation');
});

test('index page has expected meta title', async ({ page }) => {
  await expect(page).toHaveTitle(title);
});

test('index page has expected meta description', async ({ page }) => {
  const metaDescription = page.locator('meta[name="description"]');
  await expect(metaDescription).toHaveAttribute('content', description);
});

test('index page has expected meta keywords', async ({ page }) => {
  const metaKeywords = page.locator('meta[name="keywords"]');
  await expect(metaKeywords).toHaveAttribute('content', keywords);
});

test('index page has expected meta og', async ({ page, baseURL }) => {
  const metaOgTitle = page.locator('meta[property="og:title"]');
  await expect(metaOgTitle).toHaveAttribute('content', title);
  const metaOgDescription = page.locator('meta[property="og:description"]');
  await expect(metaOgDescription).toHaveAttribute('content', description);
  const metaOgUrl = page.locator('meta[property="og:url"]');
  const url = baseURL + '/';
  await expect(metaOgUrl).toHaveAttribute('content', url);
  const metaOgImage = page.locator('meta[property="og:image"]');
  await expect(metaOgImage).toHaveAttribute('content', imgUrl);
});

test('index page has expected meta twitter', async ({ page }) => {
  const metaTwitterTitle = page.locator('meta[name="twitter:title"]');
  await expect(metaTwitterTitle).toHaveAttribute('content', title);
  const metaTwitterDescription = page.locator('meta[name="twitter:description"]');
  await expect(metaTwitterDescription).toHaveAttribute('content', description);
  const metaTwitterImage = page.locator('meta[name="twitter:image"]');
  await expect(metaTwitterImage).toHaveAttribute('content', imgUrl);
});
