# Looply

A frontend-only short-video collection built with React + Vite. Videos and profile details are stored in your browser's `localStorage`; there is no account, backend, API key, or server-side sync.

## Run locally
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Deploy to Vercel
Import this folder/repository into Vercel. Framework preset: **Vite**; build command: `npm run build`; output directory: `dist`. `vercel.json` includes an SPA rewrite.

## Notes
- Supports YouTube Shorts/watch/short links and Instagram Reel/post URLs.
- YouTube uses the official iframe embed and the official IFrame Player API for playback controls when available.
- Instagram uses the official embed. Instagram's embed does not expose external playback controls, so its card links to Instagram instead of faking play/pause.
- Some creators disable embedding, and Instagram may require login or block embeds. In those cases use **Open original**.
- Collections are local to this browser. Sharing a collection copies a share summary and video links; it does **not** publish localStorage data or create a public collection URL.
- Demo items are included on first launch. Remove them and add your own links at any time.
