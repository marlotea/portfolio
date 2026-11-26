# Writing posts

Each post is a Markdown file in this folder (`src/posts/`). This README is excluded from the site.

The file name becomes the URL slug: `src/posts/my-post.md` lives at `#/writing/my-post`.

## Frontmatter

The top of each file sets the title, date (`YYYY-MM-DD`) and a one-line summary:

```md
---
title: My post
date: 2026-12-01
summary: One sentence about it.
---
```

Posts are sorted newest first by `date`. The three newest show on the home page.

Add `unlisted: true` to hide a post from the writing lists while keeping its URL working
(e.g. for a post only linked from a project or experience).

## Body

GitHub-flavored Markdown works: **bold**, *italics*, [links](https://github.com/marlotea), lists, tables, quotes and code blocks.

## Section navigation

`##` and `###` headings become the "On this page" side navigation (desktop only). Each heading
gets a linkable id, e.g. `#/writing/my-post/my-heading`. A post without headings shows no side nav.

## Images and video

Put media in `public/writing/` and reference it with a relative path (no leading slash):

```md
![Alt text describing the image](writing/screenshot.png)
![Alt text describing the clip](writing/demo.mp4)
```

`.mp4` and `.webm` files render as a muted, looping, autoplaying video (paused with controls when
the reader prefers reduced motion). Add a `.jpg` with the same name next to the video for the
poster frame shown while it loads.
