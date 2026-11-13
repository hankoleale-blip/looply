import React, { useEffect, useRef, useState } from 'react'
import { Play, Pause, Share2, ExternalLink, Trash2, Camera } from 'lucide-react'
import { embedUrl } from '../utils/videoUtils'
export default function VideoCard({ video, onDelete, onShare, onToast }) {
 const frame = useRef(null), [apiReady,setApiReady] = useState(false), [playing,setPlaying] = useState(false), [failed,setFailed] = useState(false)
 useEffect(()=>{
  if(video.platform!=='YouTube') return
  const check=()=>setApiReady(!!window.YT?.get)
  if(window.YT?.Player){check();return}
  if(!document.querySelector('script[data-youtube-api]')){const s=document.createElement('script');s.src='https://www.youtube.com/iframe_api';s.dataset.youtubeApi='true';document.head.appendChild(s)}
  const prev=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{prev?.();check()}
  const timer=setTimeout(check,2500);return()=>clearTimeout(timer)
 },[video.platform])
 const control=action=>{
  const win=frame.current?.contentWindow
  if(!win) return
  win.postMessage(JSON.stringify({event:'command',func:action,args:[]}), '*')
  setPlaying(action==='playVideo')
 }
 const date=new Date(video.addedAt).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'})
 return <article className="video-card"><div className="video-frame">
  {!failed ? <iframe ref={frame} src={embedUrl(video)} title={video.title||`${video.platform} video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" onError={()=>setFailed(true)} /> : <div className="embed-fallback"><span>Preview unavailable</span><a href={video.url} target="_blank" rel="noreferrer">Open original video <ExternalLink size={14}/></a></div>}
 <div className="platform-pill">{video.platform==='YouTube'?<Play size={13}/>:<Camera size={13}/>} {video.platform}</div>
 </div><div className="video-info"><div className="video-title-row"><h3>{video.title||'Untitled short'}</h3><button className="icon-button" aria-label="Delete video" onClick={()=>onDelete(video)}><Trash2 size={16}/></button></div><div className="video-meta"><span>Added {date}</span><span className="meta-dot"/></div><div className="video-actions">
 {video.platform==='YouTube' ? <><button className="card-action play-action" onClick={()=>control(playing?'pauseVideo':'playVideo')}>{playing?<Pause size={15}/>:<Play size={15}/>} {playing?'Pause':'Play'}</button><button className="card-action" onClick={()=>control('pauseVideo')}><Pause size={15}/>Pause</button></> : <button className="card-action" onClick={()=>{onToast('Instagram playback is controlled in Instagram.');window.open(video.url,'_blank','noopener,noreferrer')}}><ExternalLink size={15}/>Open to play</button>}
 <button className="card-action share-action" onClick={()=>onShare(video)} aria-label="Share video"><Share2 size={15}/></button><a className="card-action" href={video.url} target="_blank" rel="noreferrer" aria-label="Open original video"><ExternalLink size={15}/></a>
 </div></div></article>
}
