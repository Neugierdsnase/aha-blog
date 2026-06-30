# Indie Web Features

This document describes the indie web features that have been added to your blog and how to use them.

## What is the Indie Web?

The indie web is a movement to keep the web decentralized and user-controlled. Instead of relying on centralized platforms, indie web advocates publish content on their own domains and use open standards to connect with others.

## Features Implemented

### 1. Microformats2 (h-entry, h-card, h-feed)

**What it is:** Microformats are a way to mark up your HTML so that other websites can understand and parse your content.

**What was added:**
- **h-entry** on blog posts: Marks your blog posts with semantic information (title, author, date, content)
- **h-card** on the about page: Provides your identity information in a machine-readable format
- **h-feed** on the blog listing: Marks your blog listing as a feed of posts

**How to verify:**
Visit https://indiewebify.me/ and test your blog URLs to verify the microformats are working correctly.

**Files modified:**
- `src/components/Article.astro` - Added h-entry markup
- `src/components/BookHeading.astro` - Added p-name class to titles
- `src/components/PostList.astro` - Added h-feed markup
- `src/components/list-item/PostListItem.astro` - Added h-entry to list items
- `src/pages/about.astro` - Added h-card markup

### 2. Webmentions

**What it is:** Webmentions are a way for websites to notify each other when they link to or mention each other. Think of it as decentralized comments and reactions.

**What was added:**
- Webmention endpoints in the HTML head
- A React component that fetches and displays webmentions from webmention.io
- Support for likes, reposts, and replies

**How to set up:**
1. Sign up at https://webmention.io/ using your blog domain
2. The endpoints are already configured in `src/components/BaseHead.astro`
3. Webmentions will automatically appear at the bottom of blog posts once you start receiving them

**Optional: Bridgy integration**
To receive webmentions from social media interactions:
1. Go to https://brid.gy/
2. Sign in with your social media accounts (Twitter, Mastodon, etc.)
3. Enable publishing and backfeed for your accounts
4. Bridgy will send webmentions to your site when people interact with your posts on social media

**Files added:**
- `src/components/Webmentions.tsx` - React component for displaying webmentions

**Files modified:**
- `src/components/BaseHead.astro` - Added webmention endpoint links
- `src/components/Article.astro` - Integrated Webmentions component and added styles

### 3. Enhanced About Page with h-card

**What it is:** The h-card is your digital business card - it tells other websites who you are.

**What was added:**
A properly formatted h-card with your name, bio, and website URL.

**Files modified:**
- `src/pages/about.astro` - Completely redesigned with h-card markup

### 4. Enhanced RSS Feed

**What it is:** RSS feeds allow people to subscribe to your content using feed readers.

**What was added:**
- Author information for each post
- Categories/tags based on language and genre
- Better metadata structure
- Atom namespace support

**Files modified:**
- `src/pages/rss.xml.ts` - Enhanced with better metadata

### 5. IndieAuth

**What it is:** IndieAuth allows you to use your own domain as your identity to sign in to other indie web sites and services.

**What was added:**
Links to IndieAuth.com endpoints in your HTML head, enabling you to use your blog URL (https://blog.vomkonstant.in/) as your login identity on indie web sites.

**How to use:**
When logging into indie web services that support IndieAuth:
1. Enter your blog URL as your identity
2. You'll be redirected to indieauth.com to authenticate
3. After authentication, you'll be logged in

**Files modified:**
- `src/components/BaseHead.astro` - Added IndieAuth endpoint links

### 6. POSSE Syndication Links

**What it is:** POSSE stands for "Publish on Own Site, Syndicate Elsewhere." It's the practice of publishing content on your own site first, then syndicating to other platforms.

**What was added:**
- Schema support for syndication URLs in blog posts
- Display of syndication links with proper microformat markup (u-syndication)

**How to use:**
Add syndication links to your blog posts by including them in the frontmatter:

```yaml
---
title: "My Blog Post"
pubDate: 2025-01-15
lang: "de"
syndication:
  - name: "Mastodon"
    url: "https://mastodon.social/@yourname/123456"
  - name: "Twitter"
    url: "https://twitter.com/yourname/status/123456"
---
```

The links will automatically appear on your blog post with the text "Also on: Mastodon, Twitter, ..."

**Files modified:**
- `src/content.config.ts` - Added syndication field to blog schema
- `src/components/Article.astro` - Added syndication link display and styles

## Immediate Setup Steps

These are the actions you should take right now to activate your indie web features:

### 1. Sign up for Webmention.io (5 minutes)
1. Visit https://webmention.io/
2. Sign in with your domain (blog.vomkonstant.in)
3. The endpoints are already configured in your blog - no code changes needed
4. You'll start receiving webmentions once people mention or link to your posts

### 2. Test Your Microformats (2 minutes)
1. Deploy your blog with the new changes
2. Visit https://indiewebify.me/
3. Enter a blog post URL to validate your h-entry markup
4. Enter your about page URL to validate your h-card

### 3. Validate Your RSS Feed (1 minute)
1. Visit https://validator.w3.org/feed/
2. Enter your RSS feed URL: https://blog.vomkonstant.in/rss.xml
3. Ensure it validates correctly

### 4. Test IndieAuth (optional, 2 minutes)
1. Visit https://indielogin.com/
2. Enter your blog URL: https://blog.vomkonstant.in/
3. Complete the authentication flow to verify it works

### 5. Set up Bridgy (optional, 10 minutes)
This connects your social media to receive webmentions from social interactions:
1. Visit https://brid.gy/
2. Sign in with Mastodon, Twitter, or other platforms
3. Enable "listen" to pull in likes, replies, and reposts as webmentions
4. Bridgy will automatically send webmentions to your blog when people interact with your posts

### 6. Add Syndication Links to Posts (ongoing)
When you publish a post and cross-post it to other platforms:
1. Copy the URL from Mastodon/Twitter/etc.
2. Edit your blog post frontmatter:
   ```yaml
   syndication:
     - name: "Mastodon"
       url: "https://mastodon.social/@yourname/123456"
   ```
3. The syndication links will automatically appear on your post

## Testing Your Indie Web Features

1. **Microformats:**
   - Visit https://indiewebify.me/
   - Test your blog post URLs and about page
   - Use https://pin13.net/mf2/ to parse and view your microformats

2. **Webmentions:**
   - Send a test webmention using https://webmention.rocks/
   - Check if webmentions appear on your blog posts

3. **RSS Feed:**
   - Validate your feed at https://validator.w3.org/feed/
   - Test subscribing in a feed reader

4. **IndieAuth:**
   - Try logging into https://indielogin.com/ with your blog URL

## Next Steps (Long-term)

To fully embrace the indie web, consider:

1. **Join the IndieWeb community:**
   - Create a profile on https://indieweb.org/
   - Join the chat channels
   - Attend IndieWebCamp events

2. **Add more features:**
   - Micropub support for posting from apps
   - Reply contexts (showing the post you're replying to)
   - Post kinds (notes, articles, photos, etc.)

3. **Syndicate to other platforms:**
   - Set up automatic syndication using Bridgy Publish
   - Cross-post to Mastodon, Twitter, etc.

4. **Engage with other indie web sites:**
   - Comment on other indie web blogs using webmentions
   - Use your domain as your identity across the indie web

## Resources

- [IndieWeb Wiki](https://indieweb.org/)
- [Microformats Wiki](http://microformats.org/)
- [Webmention.io](https://webmention.io/)
- [Bridgy](https://brid.gy/)
- [IndieAuth.com](https://indieauth.com/)
- [IndieWebify.me](https://indiewebify.me/) - Validation tools
