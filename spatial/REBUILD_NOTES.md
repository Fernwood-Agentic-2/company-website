# Spatial Frontend Rebuild Notes

## What was rebuilt
- Recreated the public homepage from `page-auth.html` as a standalone static frontend.
- Replaced Squarespace layout wrappers with semantic sections:
  - `header` with desktop/mobile navigation
  - hero section
  - statistics section
  - two feature content blocks
  - audience accordion section
  - manifesto section
  - footer
- Preserved visible copy, links, spacing intent, typography family (`Poppins` / `Raleway`), and major responsive behavior.
- Removed all Squarespace runtime dependencies (`Static.SQUARESPACE_CONTEXT`, rollups, visitor scripts, site bundle).
- Localized required image assets to `assets/images` and relinked markup.
- Implemented interaction behavior with plain JS:
  - mobile menu toggle
  - single-open accordion behavior

## Localized assets
- `assets/images/logo.webp`
- `assets/images/hero-ui.webp`
- `assets/images/what-spatial-does.webp`
- `assets/images/what-spatial-is.webp`

## Squarespace-dependent items intentionally not carried over
- Authenticated account context and cookies.
- Squarespace-specific dynamic runtime (fluid engine script runtime, block definitions, site bundle).
- Squarespace-internal metadata/telemetry and user account data embedded in `page-auth.html`.
- Optional icon sprite bundle not used by visible page content.

## Files added
- `index.html`
- `styles.css`
- `script.js`
- `REBUILD_NOTES.md`

## Verification
- Open `index.html` directly or run `npm start` and visit `http://localhost:4173`.
- Validate desktop/tablet/mobile layout and behavior against snapshot.
