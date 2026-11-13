const KEYS = { videos: 'looply.videos.v1', profile: 'looply.profile.v1' }
export const demoVideos = [
 { id:'demo-1', platform:'YouTube', videoId:'jfKfPfyJRdk', url:'https://www.youtube.com/watch?v=jfKfPfyJRdk', title:'A little moment of calm', addedAt:'2026-10-18T10:30:00.000Z' },
 { id:'demo-2', platform:'YouTube', videoId:'aqz-KE-bpKQ', url:'https://www.youtube.com/watch?v=aqz-KE-bpKQ', title:'A different perspective', addedAt:'2026-10-16T09:15:00.000Z' },
 { id:'demo-3', platform:'Instagram', videoId:'C0DPdy5Rz7c', url:'https://www.instagram.com/reel/C0DPdy5Rz7c/', title:'Saved for later', addedAt:'2026-10-12T14:00:00.000Z' }
]
export function loadVideos() {
 try { const saved = localStorage.getItem(KEYS.videos); if (saved) return JSON.parse(saved) } catch {}
 localStorage.setItem(KEYS.videos, JSON.stringify(demoVideos)); return demoVideos
}
export function saveVideos(v) { localStorage.setItem(KEYS.videos, JSON.stringify(v)) }
export function loadProfile() {
 try { return { displayName:'Your name', username:'yourhandle', bio:'Collecting little moments.', ...JSON.parse(localStorage.getItem(KEYS.profile) || '{}') } } catch { return { displayName:'Your name', username:'yourhandle', bio:'Collecting little moments.' } }
}
export function saveProfile(p) { localStorage.setItem(KEYS.profile, JSON.stringify(p)) }