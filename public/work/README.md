# Work media

The home page cards and case studies show a labeled placeholder until each
file below exists. After adding a file, set `ready: true` on that project's
`media` in `src/data/work.js`.

| File | What it should show | Size |
| --- | --- | --- |
| `voley.webp` | Voley inbox: a two-way text thread with a client, ideally with the HawkSoft client record visible | 1600 × 1000 |
| `bookkeeper-ai.webp` | BookKeeper AI transaction list with suggested categories | 1600 × 1000 |
| `attendease.webp` | AttendEase admin dashboard or class roster | 1600 × 1000 |

## Format

- 1600 × 1000 (16:10), WebP at quality ~80, under 250 KB each.
- Blur or replace any real client names, phone numbers, or student faces.
- Crop to the product UI. No browser chrome or desktop background.

## Optional: short looping video instead of a still

- Same name with `.mp4` (H.264) plus a `.webp` poster frame, e.g.
  `voley.mp4` + `voley.webp`.
- 1600 × 1000, 5–10 seconds, no audio, under 2 MB.
- Set `type: 'video'`, `src: '/work/voley.mp4'`, `poster: '/work/voley.webp'`.
