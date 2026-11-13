import React from 'react'
import { Clapperboard, Compass, UserRound, Layers } from 'lucide-react'
export default function Sidebar({ profile, onProfile, active, setActive, mobileOpen, closeMobile }) {
 return <><div className={`sidebar-backdrop ${mobileOpen?'show':''}`} onClick={closeMobile}/><aside className={`sidebar ${mobileOpen?'mobile-open':''}`}>
  <div className="brand"><span className="brand-mark"><Clapperboard size={20}/></span><span>looply</span></div>
  <div className="side-label">WORKSPACE</div>
  <nav><button className={active==='collection'?'nav-item active':'nav-item'} onClick={()=>{setActive('collection');closeMobile()}}><Layers size={18}/>My Collection<span className="nav-dot"/></button><button className={active==='discover'?'nav-item active':'nav-item'} onClick={()=>{setActive('discover');closeMobile()}}><Compass size={18}/>Discover</button></nav>
  <div className="sidebar-bottom"><button className="nav-item" onClick={onProfile}><UserRound size={18}/>Edit Profile</button><div className="profile-mini"><div className="avatar">{(profile.displayName||'Y').slice(0,1).toUpperCase()}</div><div className="profile-copy"><strong>{profile.displayName}</strong><span>@{profile.username}</span></div><button className="more-button" aria-label="Edit profile" onClick={onProfile}>···</button></div></div>
 </aside></>
}