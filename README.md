# Minimal Mistakes remote theme starter

Click [**Use this template**](https://github.com/mmistakes/mm-github-pages-starter/generate) button above for the quickest method of getting started with the [Minimal Mistakes Jekyll theme](https://github.com/mmistakes/minimal-mistakes).

Contains basic configuration to get you a site with:

- Sample posts.
- Sample top navigation.
- Sample author sidebar with social links.
- Sample footer links.
- Paginated home page.
- Archive pages for posts grouped by year, category, and tag.
- Sample about page.
- Sample 404 page.
- Site wide search.

Replace sample content with your own and [configure as necessary](https://mmistakes.github.io/minimal-mistakes/docs/configuration/).

---

## The Scratch Pad

The landing page (`index.html` + `_layouts/home.html`) leads with an intro, then
the Scratch Pad, then recent writing. It is no longer a paginated post list.

To add something to the Scratch Pad, add an entry to the top of
[`_data/scratchpad.yml`](_data/scratchpad.yml) — no template changes needed:

```yaml
- title: "Thing I Made"
  url: /thing/                       # internal path or full external URL
  blurb: "What it does, in a sentence."
  status: prototype                  # live | prototype | experiment | archived
  date: 2026-09
  stack:
    - Claude
  source: https://github.com/deanbaker/blog   # optional
  writeup: /blog/thing/                       # optional
```

Entries render on both the landing page (first
`scratchpad_limit` of them, set in `index.html` front matter) and the full
[`/scratch-pad/`](_pages/scratch-pad.md) page.

Copy for the intro, tagline and section lede lives in the front matter of
`index.html`, so wording changes don't need a template edit.


---

## Troubleshooting

If you have a question about using Jekyll, start a discussion on the [Jekyll Forum](https://talk.jekyllrb.com/) or [StackOverflow](https://stackoverflow.com/questions/tagged/jekyll). Other resources:

- [Ruby 101](https://jekyllrb.com/docs/ruby-101/)
- [Setting up a Jekyll site with GitHub Pages](https://jekyllrb.com/docs/github-pages/)
- [Configuring GitHub Metadata](https://github.com/jekyll/github-metadata/blob/master/docs/configuration.md#configuration) to work properly when developing locally and avoid `No GitHub API authentication could be found. Some fields may be missing or have incorrect data.` warnings.
