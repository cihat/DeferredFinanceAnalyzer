# Deployment Guide

## Finansman Karşılaştırma Aracı - Cloudflare Pages Deployment

This guide explains how to deploy the Financial Comparison Tool to Cloudflare Pages/Workers.

## Prerequisites

- A Cloudflare account (free tier works)
- Node.js and pnpm installed
- Git repository (for automatic deployments)

## Method 1: Deploy via Cloudflare Dashboard (Recommended)

1. **Push your code to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Add financial comparison tool"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages**
   - Click **Create a project**
   - Connect your Git repository
   - Select the repository: `DeferredFinance`

3. **Configure Build Settings**
   - **Framework preset**: SvelteKit
   - **Build command**: `pnpm run build`
   - **Build output directory**: `.svelte-kit/cloudflare`
   - **Node version**: 18 or higher

4. **Deploy**
   - Click **Save and Deploy**
   - Your site will be deployed automatically

## Method 2: Deploy via Wrangler CLI

1. **Install Wrangler**
   ```bash
   pnpm add -D wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   npx wrangler login
   ```

3. **Deploy**
   ```bash
   pnpm run build
   npx wrangler pages deploy .svelte-kit/cloudflare
   ```

## Method 3: Manual Upload

1. **Build the project**
   ```bash
   pnpm run build
   ```

2. **Upload to Cloudflare Pages**
   - Go to Cloudflare Dashboard → Pages
   - Click **Create a project** → **Upload assets**
   - Upload the `.svelte-kit/cloudflare` directory

## Environment Variables

No environment variables are required for this application as it runs entirely client-side.

## Custom Domain (Optional)

1. Go to your Cloudflare Pages project
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Follow the instructions to add your domain

## Continuous Deployment

When using Method 1 (Git integration), Cloudflare Pages will automatically:
- Deploy on every push to your main branch
- Create preview deployments for pull requests
- Provide deployment previews with unique URLs

## Testing Production Build Locally

Before deploying, you can test the production build locally:

```bash
pnpm run build
pnpm run preview
```

Then open http://localhost:4173 in your browser.

## Troubleshooting

### Build Fails
- Ensure all dependencies are installed: `pnpm install`
- Check Node version: `node -v` (should be 18+)
- Clear cache and rebuild: `rm -rf .svelte-kit && pnpm run build`

### Site Not Loading
- Check build output directory is `.svelte-kit/cloudflare`
- Verify adapter-cloudflare is configured in `svelte.config.js`

## Performance

The built application is:
- **Highly optimized**: ~25KB gzipped JavaScript
- **Fast loading**: Static assets served from Cloudflare's global CDN
- **Zero cold starts**: Pages are pre-rendered
- **Responsive**: Works on all device sizes

## Features

✅ Responsive design (mobile, tablet, desktop)  
✅ Real-time calculations  
✅ Interactive slider for delivery month  
✅ Visual comparison chart  
✅ Turkish locale formatting  
✅ No external API calls (runs entirely client-side)  
✅ Minimal bundle size

## Support

For issues or questions, please check:
- [SvelteKit Docs](https://svelte.dev/docs/kit)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)

