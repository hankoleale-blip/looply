export function parseVideoUrl(raw) {
  let url
  try { url = new URL(raw.trim()) } catch { throw new Error('Enter a valid YouTube or Instagram URL.') }
  const host = url.hostname.toLowerCase().replace(/^www\./, '')
  let platform, id
  if (['youtube.com','m.youtube.com','youtu.be'].includes(host)) {
    platform = 'YouTube'
    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0]
    else if (url.pathname.startsWith('/shorts/')) id = url.pathname.split('/')[2]
    else if (url.pathname === '/watch') id = url.searchParams.get('v')
    else if (url.pathname.startsWith('/embed/')) id = url.pathname.split('/')[2]
  } else if (['instagram.com','m.instagram.com'].includes(host)) {
    platform = 'Instagram'
    const parts = url.pathname.split('/').filter(Boolean)
    if (['reel','reels','p','tv'].includes(parts[0])) id = parts[1]
  } else throw new Error('Only YouTube and Instagram links are supported.')
  if (!id || !/^[\w-]+$/.test(id)) throw new Error('That link does not contain a supported video ID.')
  return { platform, id, url: platform === 'YouTube' ? `https://www.youtube.com/watch?v=${id}` : `https://www.instagram.com/${url.pathname.split('/').filter(Boolean)[0]}/${id}/` }
}
export const embedUrl = video => video.platform === 'YouTube' ? `https://www.youtube.com/embed/${video.videoId}?enablejsapi=1&origin=${window.location.origin}&playsinline=1&rel=0` : `https://www.instagram.com/p/${video.videoId}/embed/`