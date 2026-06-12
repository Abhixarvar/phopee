import { useState, useEffect } from "react";
import { Sun, Moon, ChevronRight, ChevronLeft, RotateCcw, X, ExternalLink, BarChart2, Check, Smartphone } from "lucide-react";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PHONE DATABASE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PHONES = [
  { id:1,  name:"iPhone 15 Pro Max", brand:"Apple",    price:159900, pStr:"₹1,59,900", os:"ios",     g:9.5, cam:9.8, bat:8.0, perf:9.8, storage:[256,512,1024], size:"large",    bio:"The pinnacle of iPhone — titanium build, A17 Pro chip, and a 5× periscope zoom.", pros:["A17 Pro chip","Titanium frame","5× periscope zoom","Action Button"] },
  { id:2,  name:"iPhone 15 Pro",     brand:"Apple",    price:134900, pStr:"₹1,34,900", os:"ios",     g:9.5, cam:9.5, bat:7.8, perf:9.8, storage:[128,256,512,1024], size:"standard", bio:"Pro performance meets refined titanium design with blazing USB-C 3.0.", pros:["A17 Pro chip","USB-C 3.0","Triple camera","Titanium design"] },
  { id:3,  name:"iPhone 15",         brand:"Apple",    price:79900,  pStr:"₹79,900",   os:"ios",     g:8.5, cam:8.8, bat:8.0, perf:9.0, storage:[128,256,512], size:"standard", bio:"The essential iPhone — Dynamic Island, USB-C and a breakthrough 48MP camera.", pros:["Dynamic Island","USB-C","48MP main camera","A16 Bionic"] },
  { id:4,  name:"iPhone 14",         brand:"Apple",    price:69900,  pStr:"₹69,900",   os:"ios",     g:8.0, cam:8.5, bat:7.8, perf:8.5, storage:[128,256,512], size:"standard", bio:"Life-saving Emergency SOS via satellite and a brilliant dual-camera system.", pros:["A15 Bionic","Emergency SOS satellite","Crash Detection","Great camera"] },
  { id:5,  name:"iPhone 13",         brand:"Apple",    price:59900,  pStr:"₹59,900",   os:"ios",     g:7.5, cam:8.0, bat:8.2, perf:8.0, storage:[128,256,512], size:"standard", bio:"Remarkable battery life and cinema-worthy video — a timeless Apple classic.", pros:["Long battery life","Cinematic mode","A15 Bionic","5G ready"] },
  { id:6,  name:"Galaxy S24 Ultra",  brand:"Samsung",  price:129999, pStr:"₹1,29,999", os:"android", g:9.5, cam:9.8, bat:8.5, perf:9.7, storage:[256,512,1024], size:"large",    bio:"The ultimate Android — integrated S Pen, 200MP camera, and Galaxy AI.", pros:["S Pen included","200MP camera","Snapdragon 8 Gen 3","Galaxy AI"] },
  { id:7,  name:"Galaxy S24+",       brand:"Samsung",  price:99999,  pStr:"₹99,999",   os:"android", g:9.0, cam:9.0, bat:8.8, perf:9.5, storage:[256,512], size:"large",    bio:"Flagship power and a massive battery backed by 7 years of software support.", pros:["4900mAh battery","Snapdragon 8 Gen 3","7-year updates","50MP camera"] },
  { id:8,  name:"Galaxy S24",        brand:"Samsung",  price:79999,  pStr:"₹79,999",   os:"android", g:8.8, cam:8.8, bat:8.0, perf:9.3, storage:[128,256], size:"standard", bio:"Compact flagship with Galaxy AI and Snapdragon 8 Gen 3 in a titanium frame.", pros:["Compact flagship","Snapdragon 8 Gen 3","Galaxy AI","Titanium frame"] },
  { id:9,  name:"Galaxy A54",        brand:"Samsung",  price:38999,  pStr:"₹38,999",   os:"android", g:7.0, cam:7.5, bat:8.5, perf:7.2, storage:[128,256], size:"standard", bio:"IP67-rated mid-ranger with 50MP triple camera and 4 years of OS updates.", pros:["50MP triple camera","5000mAh battery","IP67 rating","4-year updates"] },
  { id:10, name:"Galaxy A34",        brand:"Samsung",  price:28999,  pStr:"₹28,999",   os:"android", g:6.5, cam:7.0, bat:8.8, perf:6.8, storage:[128,256], size:"large",    bio:"All-day battery and IP67 protection — a reliable everyday workhorse.", pros:["5000mAh battery","50MP camera","90Hz display","IP67"] },
  { id:11, name:"OnePlus 12",        brand:"OnePlus",  price:64999,  pStr:"₹64,999",   os:"android", g:9.3, cam:8.5, bat:9.5, perf:9.5, storage:[256,512], size:"large",    bio:"100W charging and Hasselblad cameras — never settle for slow charging again.", pros:["100W SuperVOOC","Hasselblad cameras","Snapdragon 8 Gen 3","5400mAh"] },
  { id:12, name:"OnePlus 12R",       brand:"OnePlus",  price:39999,  pStr:"₹39,999",   os:"android", g:8.5, cam:7.5, bat:9.2, perf:8.8, storage:[128,256], size:"large",    bio:"Flagship Snapdragon 8 Gen 2 with insane 100W charging at mid-range price.", pros:["100W charging","Snapdragon 8 Gen 2","5500mAh battery","120Hz AMOLED"] },
  { id:13, name:"Pixel 8 Pro",       brand:"Google",   price:106999, pStr:"₹1,06,999", os:"android", g:8.0, cam:9.9, bat:8.5, perf:9.0, storage:[128,256,1024], size:"large",    bio:"The gold standard in AI-powered photography with 7-year update guarantee.", pros:["Best AI camera","7-year updates","Temperature sensor","Pro video"] },
  { id:14, name:"Pixel 8",           brand:"Google",   price:75999,  pStr:"₹75,999",   os:"android", g:7.8, cam:9.5, bat:8.2, perf:8.8, storage:[128,256], size:"standard", bio:"Pure Android excellence with Tensor G3's outstanding photo processing.", pros:["Tensor G3 chip","50MP camera","Pure Android","Google AI"] },
  { id:15, name:"Pixel 8a",          brand:"Google",   price:52999,  pStr:"₹52,999",   os:"android", g:7.5, cam:9.0, bat:8.0, perf:8.5, storage:[128,256], size:"standard", bio:"Pixel camera brilliance now available at a more accessible price point.", pros:["Tensor G3","64MP camera","5-year updates","Best AI features"] },
  { id:16, name:"Xiaomi 14 Ultra",   brand:"Xiaomi",   price:99999,  pStr:"₹99,999",   os:"android", g:9.0, cam:9.9, bat:8.5, perf:9.7, storage:[256,512], size:"large",    bio:"Leica 1-inch sensor meets Snapdragon 8 Gen 3 — the ultimate camera phone.", pros:["Leica 1-inch sensor","Snapdragon 8 Gen 3","90W wireless","Pro Kit"] },
  { id:17, name:"Xiaomi 14",         brand:"Xiaomi",   price:69999,  pStr:"₹69,999",   os:"android", g:9.0, cam:9.2, bat:8.8, perf:9.7, storage:[256,512], size:"standard", bio:"Compact powerhouse with Leica optics and 90W fast charging.", pros:["Leica cameras","Compact flagship","90W charging","Snapdragon 8 Gen 3"] },
  { id:18, name:"iQOO 12",           brand:"iQOO",     price:52999,  pStr:"₹52,999",   os:"android", g:9.8, cam:8.0, bat:9.0, perf:9.7, storage:[256,512], size:"large",    bio:"Purpose-built for gaming — 144Hz LTPO, Snapdragon 8 Gen 3, 120W charging.", pros:["Best gaming phone","144Hz LTPO AMOLED","Snapdragon 8 Gen 3","120W charge"] },
  { id:19, name:"Nothing Phone 2a",  brand:"Nothing",  price:23999,  pStr:"₹23,999",   os:"android", g:7.0, cam:7.5, bat:8.5, perf:7.5, storage:[128,256], size:"large",    bio:"Iconic Glyph lighting system with clean Nothing OS and Dimensity 7200 Pro.", pros:["Glyph Interface","Dimensity 7200 Pro","Clean Nothing OS","50MP camera"] },
  { id:20, name:"Edge 50 Pro",       brand:"Motorola", price:31999,  pStr:"₹31,999",   os:"android", g:7.5, cam:8.5, bat:8.0, perf:8.0, storage:[256,512], size:"large",    bio:"Stunning curved pOLED and 125W TurboPower — fastest charging in class.", pros:["125W TurboPower","Curved pOLED","50MP ultra-wide","Moto AI"] },
  { id:21, name:"GT 5 Pro",          brand:"Realme",   price:34999,  pStr:"₹34,999",   os:"android", g:9.0, cam:7.8, bat:8.5, perf:9.3, storage:[256,512], size:"large",    bio:"Snapdragon 8 Gen 3 and a 5600mAh battery at an unbeatable mid-range price.", pros:["Snapdragon 8 Gen 3","100W charging","5600mAh battery","144Hz AMOLED"] },
  { id:22, name:"Poco X6 Pro",       brand:"Poco",     price:26999,  pStr:"₹26,999",   os:"android", g:8.8, cam:7.0, bat:8.0, perf:8.8, storage:[256,512], size:"large",    bio:"Undisputed king of performance-per-rupee — Dimensity 8300 Ultra at ₹26,999.", pros:["Dimensity 8300 Ultra","120W charging","144Hz display","Best value"] },
];

const GR = {
  Apple:    ["#2c2c2e","#3d3d3f"], Samsung: ["#1428A0","#0b6ef5"],
  OnePlus:  ["#900009","#f5010c"], Google:  ["#1557d4","#0f9d58"],
  Xiaomi:   ["#b45309","#f97316"], iQOO:    ["#3730a3","#7c3aed"],
  Nothing:  ["#141414","#3a3a3a"], Motorola:["#002060","#0a75d6"],
  Realme:   ["#b45309","#eab308"], Poco:    ["#78350f","#f59e0b"],
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ QUESTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const QUESTIONS = [
  { id:"budget", title:"What's your budget?", sub:"We'll find phones that give the best value for your spend.", type:"choice",
    opts:[{v:"b1",label:"Under ₹20,000",s:"Budget essentials",e:"💰"},{v:"b2",label:"₹20K – ₹40K",s:"Mid-range sweet spot",e:"💳"},{v:"b3",label:"₹40K – ₹70K",s:"Upper mid-range",e:"🎯"},{v:"b4",label:"₹70K – ₹1,00,000",s:"Premium segment",e:"✨"},{v:"b5",label:"Above ₹1,00,000",s:"True flagship",e:"👑"}] },
  { id:"os", title:"iOS or Android?", sub:"Your ecosystem preference shapes every recommendation.", type:"choice",
    opts:[{v:"ios",label:"iPhone (iOS)",s:"Apple ecosystem",e:"🍎"},{v:"android",label:"Android",s:"Open & customisable",e:"🤖"},{v:"any",label:"No Preference",s:"Just give me the best",e:"⚡"}] },
  { id:"usage", title:"How do you mainly use your phone?", sub:"We'll weight the features that matter most to you.", type:"choice",
    opts:[{v:"gaming",label:"Gaming",s:"Performance & display",e:"🎮"},{v:"camera",label:"Photography",s:"Best camera quality",e:"📷"},{v:"social",label:"Social Media",s:"Camera speed & beauty",e:"📱"},{v:"business",label:"Business",s:"Productivity & reliability",e:"💼"},{v:"content",label:"Content Creation",s:"Video & creative tools",e:"🎬"},{v:"battery",label:"Battery Life",s:"All-day & beyond",e:"🔋"},{v:"general",label:"General Use",s:"Balanced & versatile",e:"🌟"}] },
  { id:"screenSize", title:"Screen size preference?", sub:"Find the form factor that fits your hand.", type:"choice",
    opts:[{v:"compact",label:"Compact",s:'Under 6.2" · Easy one-handed',e:"🤏"},{v:"standard",label:"Standard",s:'6.2"–6.5" · Sweet spot',e:"📱"},{v:"large",label:"Large",s:'6.5"+ · Immersive',e:"🖥️"},{v:"any",label:"No Preference",s:"Show me everything",e:"↔️"}] },
  { id:"batteryImp", title:"How important is battery life?", sub:"Rate from 1 (doesn't matter) to 5 (absolutely critical).", type:"rating",
    labels:["Not important","Slightly","Moderate","Very important","Must have"] },
  { id:"cameraImp", title:"How important is camera quality?", sub:"Rate from 1 (casual snaps) to 5 (professional photography).", type:"rating",
    labels:["Casual snaps","Basic shots","Good quality","Great photos","Pro quality"] },
  { id:"perfImp", title:"How important is raw performance?", sub:"Rate from 1 (light tasks) to 5 (heavy multitasking & gaming).", type:"rating",
    labels:["Light browsing","Basic tasks","Smooth","Heavy multitask","Max power"] },
  { id:"storage", title:"How much storage do you need?", sub:"More storage = more photos, apps, and offline media.", type:"choice",
    opts:[{v:"128",label:"128 GB",s:"Light user · Stream everything",e:"📂"},{v:"256",label:"256 GB",s:"Most users · Sweet spot",e:"💾"},{v:"512",label:"512 GB",s:"Power user · No compromise",e:"🗄️"},{v:"1024",label:"1 TB",s:"Heavy user · Ultimate freedom",e:"🏦"}] },
  { id:"brand", title:"Any brand preference?", sub:"We'll give your preferred brand extra consideration.", type:"choice",
    opts:[{v:"Apple",label:"Apple",s:"iPhones only",e:"🍎"},{v:"Samsung",label:"Samsung",s:"Galaxy series",e:"🌌"},{v:"OnePlus",label:"OnePlus",s:"Never Settle",e:"🔴"},{v:"Google",label:"Google",s:"Pure Android",e:"🔍"},{v:"any",label:"Any Brand",s:"Best overall pick wins",e:"🏆"}] },
  { id:"condition", title:"New or refurbished?", sub:"Certified refurbished phones offer big savings on tested quality.", type:"choice",
    opts:[{v:"new",label:"Brand New",s:"Full warranty & fresh",e:"🎁"},{v:"refurb",label:"Refurbished",s:"Save up to 30%",e:"♻️"},{v:"either",label:"Either is fine",s:"Best deal wins",e:"🤝"}] },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ALGORITHM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const BR = { b1:[0,20000], b2:[20000,40000], b3:[40000,70000], b4:[70000,100000], b5:[100000,Infinity] };

function scorePhone(ph, a) {
  let s = 0;
  const [mn,mx] = BR[a.budget]||[0,Infinity];
  if (ph.price>=mn && ph.price<=mx) s+=25; else if (ph.price<mn) s+=15; else s+=Math.max(0,25-Math.round(((ph.price-mx)/mx)*50));
  if (!a.os||a.os==="any"||ph.os===a.os) s+=20;
  const u={gaming:ph.g,camera:ph.cam,social:ph.cam*.6+ph.perf*.4,business:ph.perf*.6+ph.bat*.4,content:ph.cam*.5+ph.perf*.5,battery:ph.bat,general:(ph.g+ph.cam+ph.bat+ph.perf)/4}[a.usage]||7;
  s+=Math.round((u/10)*15);
  const bw=Number(a.batteryImp||3)/5,cw=Number(a.cameraImp||3)/5,pw=Number(a.perfImp||3)/5,tw=bw+cw+pw;
  s+=tw>0?Math.round(((ph.bat*bw+ph.cam*cw+ph.perf*pw)/(tw*10))*20):10;
  const need=parseInt(a.storage||"256");
  s+=ph.storage.includes(need)?10:ph.storage.some(x=>x>=need)?6:2;
  s+=(!a.brand||a.brand==="any")?10:ph.brand===a.brand?10:1;
  return Math.min(100,s);
}

function getReasons(ph, a) {
  const r=[];
  const [mn,mx]=BR[a.budget]||[0,Infinity];
  if (ph.price>=mn&&ph.price<=mx) r.push("Fits perfectly within your budget");
  else if (ph.price<mn) r.push("Great value — under your budget");
  if (a.os&&a.os!=="any"&&ph.os===a.os) r.push("Runs your preferred OS");
  const ul={gaming:"gaming",camera:"photography",social:"social media",business:"business",content:"content creation",battery:"battery endurance",general:"everyday use"};
  const u={gaming:ph.g,camera:ph.cam,social:ph.cam*.6+ph.perf*.4,business:ph.perf*.6+ph.bat*.4,content:ph.cam*.5+ph.perf*.5,battery:ph.bat,general:(ph.g+ph.cam+ph.bat+ph.perf)/4}[a.usage]||7;
  if (u>=9.2) r.push(`Outstanding for ${ul[a.usage]||"your use case"}`);
  else if (u>=8.0) r.push(`Excellent for ${ul[a.usage]||"your use case"}`);
  if (ph.cam>=9.5&&Number(a.cameraImp)>=4) r.push("World-class camera system");
  if (ph.bat>=9.0&&Number(a.batteryImp)>=4) r.push("Exceptional battery endurance");
  if (ph.perf>=9.5&&Number(a.perfImp)>=4) r.push("Industry-leading performance");
  if (a.brand&&a.brand!=="any"&&ph.brand===a.brand) r.push(`From your preferred brand · ${ph.brand}`);
  const need=parseInt(a.storage||"256");
  if (ph.storage.includes(need)) r.push(`Available in ${need>=1000?"1TB":need+"GB"} storage`);
  return r.slice(0,4);
}

function getLinks(name) {
  const q=encodeURIComponent(name);
  let off=`https://www.google.com/search?q=buy+${q}+india`;
  if (name.includes("iPhone")) off="https://www.apple.com/in/shop/buy-iphone";
  else if (name.includes("Galaxy")) off="https://www.samsung.com/in/smartphones/";
  else if (name.includes("Pixel")) off="https://store.google.com/in/category/phones";
  else if (name.includes("OnePlus")) off="https://www.oneplus.com/in";
  else if (name.includes("Xiaomi")||name.includes("Redmi")) off="https://www.mi.com/in/phones";
  return { amazon:`https://www.amazon.in/s?k=${q}`, flipkart:`https://www.flipkart.com/search?q=${q}`, off };
}

function topPhones(a) {
  return PHONES.map(p=>({...p,sc:scorePhone(p,a),rsns:getReasons(p,a)})).sort((a,b)=>b.sc-a.sc).slice(0,6);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ STYLES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CSS = `
  *{box-sizing:border-box}
  .papp{font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
  @keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes scaleIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
  @keyframes slideR{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
  @keyframes slideL{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
  @keyframes float1{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-16px) rotate(3deg)}}
  @keyframes float2{0%,100%{transform:translateY(-6px) rotate(7deg)}50%{transform:translateY(10px) rotate(-1deg)}}
  @keyframes float3{0%,100%{transform:translateY(4px) rotate(-2deg)}50%{transform:translateY(-14px) rotate(8deg)}}
  @keyframes spin{to{stroke-dashoffset:0}}
  @keyframes dotPulse{0%,100%{transform:scale(.7);opacity:.4}50%{transform:scale(1);opacity:1}}
  .au{animation:fadeUp .55s ease both}
  .ai{animation:fadeIn .4s ease both}
  .as{animation:scaleIn .42s ease both}
  .ar{animation:slideR .44s ease both}
  .al{animation:slideL .44s ease both}
  .f1{animation:float1 5s ease-in-out infinite}
  .f2{animation:float2 6s ease-in-out infinite}
  .f3{animation:float3 4.5s ease-in-out infinite}
  .d1{animation-delay:.07s}.d2{animation-delay:.14s}.d3{animation-delay:.21s}
  .d4{animation-delay:.28s}.d5{animation-delay:.36s}.d6{animation-delay:.44s}.d7{animation-delay:.52s}
  .opt{transition:all .18s ease;cursor:pointer;-webkit-tap-highlight-color:transparent;user-select:none}
  .opt:hover{transform:translateY(-2px)}
  .opt:active{transform:scale(.97)}
  .cta{transition:all .2s ease;cursor:pointer;user-select:none}
  .cta:hover{transform:scale(1.03)}
  .cta:active{transform:scale(.97)}
  .bbtn{transition:all .15s ease;cursor:pointer;text-decoration:none}
  .bbtn:hover{opacity:.82;transform:translateY(-1px)}
  .bbtn:active{transform:scale(.96)}
  .nbtn{transition:opacity .15s ease;cursor:pointer}
  .nbtn:hover{opacity:.7}
  .nbtn:active{transform:scale(.96)}
  .sbar{transition:width 1.1s ease .2s}
  .dot1{animation:dotPulse .8s ease-in-out 0s infinite}
  .dot2{animation:dotPulse .8s ease-in-out .2s infinite}
  .dot3{animation:dotPulse .8s ease-in-out .4s infinite}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(128,128,128,.3);border-radius:3px}
`;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ COMPONENTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function PhoneMockup({ colors, anim="f1", scale=1, opacity=1 }) {
  const [c1,c2]=colors;
  const w=Math.round(70*scale),h=Math.round(128*scale),r=Math.round(15*scale);
  return (
    <div className={anim} style={{width:w,height:h,borderRadius:r,background:`linear-gradient(145deg,${c1},${c2})`,position:"relative",overflow:"hidden",boxShadow:`0 ${Math.round(18*scale)}px ${Math.round(50*scale)}px rgba(0,0,0,.38)`,opacity}}>
      <div style={{position:"absolute",top:Math.round(9*scale),left:"50%",transform:"translateX(-50%)",width:Math.round(20*scale),height:Math.round(3*scale),background:"rgba(255,255,255,.25)",borderRadius:Math.round(2*scale)}}/>
      <div style={{position:"absolute",top:Math.round(20*scale),left:Math.round(5*scale),right:Math.round(5*scale),bottom:Math.round(17*scale),background:"rgba(0,0,0,.28)",borderRadius:Math.round(9*scale),display:"flex",alignItems:"center",justifyContent:"center"}}>
        <Smartphone size={Math.round(20*scale)} color="rgba(255,255,255,.45)"/>
      </div>
      <div style={{position:"absolute",bottom:Math.round(6*scale),left:"50%",transform:"translateX(-50%)",width:Math.round(26*scale),height:Math.round(3*scale),background:"rgba(255,255,255,.38)",borderRadius:Math.round(2*scale)}}/>
      <div style={{position:"absolute",top:"30%",left:"50%",width:Math.round(80*scale),height:Math.round(80*scale),borderRadius:"50%",background:"rgba(255,255,255,.04)",transform:"translate(-30%,-30%)"}}/>
    </div>
  );
}

function CircleScore({ score:sc, dark }) {
  const r=34,circ=2*Math.PI*r,offset=circ-(sc/100)*circ;
  const col=sc>=85?"#30d158":sc>=70?"#0071e3":sc>=55?"#ff9f0a":"#ff453a";
  return (
    <svg width="84" height="84" viewBox="0 0 84 84">
      <circle cx="42" cy="42" r={r} fill="none" stroke={dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)"} strokeWidth="6"/>
      <circle cx="42" cy="42" r={r} fill="none" stroke={col} strokeWidth="6" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 42 42)" style={{transition:"stroke-dashoffset 1.3s ease .4s"}}/>
      <text x="42" y="39" textAnchor="middle" fontSize="16" fontWeight="800" fill={col} style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{sc}%</text>
      <text x="42" y="52" textAnchor="middle" fontSize="9" fontWeight="600" fill={dark?"rgba(255,255,255,.4)":"rgba(0,0,0,.35)"} style={{fontFamily:"'Plus Jakarta Sans',sans-serif",letterSpacing:"0.5px"}}>MATCH</text>
    </svg>
  );
}

function Navbar({ dark, setDark, page, onRestart }) {
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:dark?"rgba(0,0,0,.88)":"rgba(251,251,253,.88)",backdropFilter:"blur(22px)",WebkitBackdropFilter:"blur(22px)",borderBottom:`1px solid ${dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`,height:52}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:7}}>
          <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#0071e3,#5ac8fa)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Smartphone size={14} color="#fff"/>
          </div>
          <span style={{fontSize:15,fontWeight:800,color:dark?"#f5f5f7":"#1d1d1f",letterSpacing:"-0.4px"}}>Phopee</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          {page!=="home"&&<button className="nbtn" onClick={onRestart} style={{display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:600,color:dark?"rgba(255,255,255,.5)":"rgba(0,0,0,.45)",background:"none",border:"none",padding:"5px 10px",borderRadius:8}}>
            <RotateCcw size={13}/> Restart
          </button>}
          <button className="nbtn" onClick={()=>setDark(!dark)} style={{background:dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.06)",border:"none",borderRadius:"50%",width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            {dark?<Sun size={14} color="#f5f5f7"/>:<Moon size={14} color="#1d1d1f"/>}
          </button>
        </div>
      </div>
    </nav>
  );
}

function ProgressBar({ step, total, dark }) {
  const pct=Math.round((step/total)*100);
  return (
    <div style={{width:"100%",maxWidth:540,margin:"0 auto 28px"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontSize:12,fontWeight:600,color:dark?"rgba(255,255,255,.38)":"rgba(0,0,0,.35)"}}>Question {step+1} of {total}</span>
        <span style={{fontSize:12,fontWeight:700,color:"#0071e3"}}>{pct}%</span>
      </div>
      <div style={{height:4,background:dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)",borderRadius:2,overflow:"hidden"}}>
        <div className="sbar" style={{height:"100%",width:`${pct}%`,background:"linear-gradient(90deg,#0071e3,#5ac8fa)",borderRadius:2}}/>
      </div>
    </div>
  );
}

function OptionCard({ opt, selected, onSelect, dark }) {
  const bg=selected?(dark?"rgba(0,113,227,.22)":"rgba(0,113,227,.09)"):(dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.03)");
  const br=selected?"#0071e3":(dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.1)");
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(255,255,255,.42)":"rgba(0,0,0,.42)";
  return (
    <div className="opt" onClick={()=>onSelect(opt.v)} style={{background:bg,border:`1.5px solid ${br}`,borderRadius:14,padding:"13px 15px",display:"flex",alignItems:"center",gap:11}}>
      <span style={{fontSize:21,flexShrink:0,lineHeight:1}}>{opt.e}</span>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:14,fontWeight:700,color:tx,letterSpacing:"-0.2px"}}>{opt.label}</div>
        <div style={{fontSize:12,color:sb,marginTop:1}}>{opt.s}</div>
      </div>
      <div style={{width:20,height:20,borderRadius:10,background:selected?"#0071e3":"transparent",border:`1.5px solid ${selected?"#0071e3":(dark?"rgba(255,255,255,.2)":"rgba(0,0,0,.15)")}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all .18s ease"}}>
        {selected&&<Check size={11} color="#fff" strokeWidth={3}/>}
      </div>
    </div>
  );
}

function RatingSelector({ value, onChange, labels, dark }) {
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(255,255,255,.4)":"rgba(0,0,0,.4)";
  const sel=value?Number(value):0;
  return (
    <div>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:16}}>
        {[1,2,3,4,5].map(n=>{
          const active=sel===n;
          return (
            <button key={n} className="opt" onClick={()=>onChange(n)} style={{width:56,height:58,borderRadius:14,border:`1.5px solid ${active?"#0071e3":(dark?"rgba(255,255,255,.12)":"rgba(0,0,0,.1)")}`,background:active?(dark?"rgba(0,113,227,.28)":"rgba(0,113,227,.09)"):(dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.03)"),fontSize:22,fontWeight:800,color:active?"#0071e3":tx,cursor:"pointer",transition:"all .18s ease"}}>
              {n}
            </button>
          );
        })}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",padding:"0 4px"}}>
        {labels.map((l,i)=>(
          <span key={i} style={{fontSize:10.5,color:sel===i+1?"#0071e3":sb,fontWeight:sel===i+1?700:400,textAlign:"center",flex:1,transition:"all .2s",lineHeight:1.3}}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PAGES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function HomePage({ onStart, dark }) {
  const bg=dark?"radial-gradient(ellipse at 18% 48%,rgba(0,113,227,.22) 0%,transparent 52%),radial-gradient(ellipse at 82% 16%,rgba(191,90,242,.16) 0%,transparent 52%),radial-gradient(ellipse at 55% 85%,rgba(48,209,88,.1) 0%,transparent 45%),#000":"radial-gradient(ellipse at 18% 48%,rgba(0,113,227,.1) 0%,transparent 52%),radial-gradient(ellipse at 82% 16%,rgba(191,90,242,.07) 0%,transparent 52%),radial-gradient(ellipse at 55% 85%,rgba(48,209,88,.06) 0%,transparent 45%),#fbfbfd";
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(245,245,247,.6)":"rgba(29,29,31,.6)";
  return (
    <div style={{minHeight:"100vh",background:bg,display:"flex",alignItems:"center",justifyContent:"center",paddingTop:52}}>
      <div style={{maxWidth:1060,width:"100%",padding:"48px 24px",display:"flex",alignItems:"center",gap:64,flexWrap:"wrap",justifyContent:"center"}}>
        {/* Text */}
        <div style={{flex:"1 1 320px",maxWidth:520}}>
          <div className="au" style={{display:"inline-flex",alignItems:"center",gap:6,background:dark?"rgba(0,113,227,.18)":"rgba(0,113,227,.07)",border:`1px solid ${dark?"rgba(0,113,227,.38)":"rgba(0,113,227,.18)"}`,borderRadius:20,padding:"5px 13px",marginBottom:22}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#0071e3",display:"inline-block"}}/>
            <span style={{fontSize:11,fontWeight:700,color:"#0071e3",letterSpacing:"0.5px",textTransform:"uppercase"}}>Phopee · 22 Phones</span>
          </div>
          <h1 className="au d1" style={{fontSize:"clamp(34px,6vw,60px)",fontWeight:800,color:tx,lineHeight:1.07,letterSpacing:"-2px",marginBottom:18}}>
            Find Your<br/>
            <span style={{background:"linear-gradient(135deg,#0071e3 0%,#bf5af2 55%,#30d158 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Perfect Phone.</span>
          </h1>
          <p className="au d2" style={{fontSize:"clamp(15px,2vw,17px)",color:sb,lineHeight:1.7,marginBottom:30,fontWeight:400}}>
            Answer 10 smart questions. Our algorithm analyses 22 flagship and mid-range phones and finds your ideal match — instantly.
          </p>
          <div className="au d3" style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:36}}>
            {["🧠 Smart Algorithm","📱 22 Phones","🇮🇳 India Prices","⚡ 2 Minutes"].map((f,i)=>(
              <span key={i} style={{fontSize:12.5,fontWeight:500,color:sb,background:dark?"rgba(255,255,255,.07)":"rgba(0,0,0,.05)",border:`1px solid ${dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)"}`,borderRadius:20,padding:"4px 12px"}}>{f}</span>
            ))}
          </div>
          <div className="au d4">
            <button className="cta" onClick={onStart} style={{background:"#0071e3",color:"#fff",border:"none",borderRadius:980,padding:"15px 34px",fontSize:17,fontWeight:700,letterSpacing:"-0.3px",display:"inline-flex",alignItems:"center",gap:8,boxShadow:"0 8px 28px rgba(0,113,227,.38)"}}>
              Find My Perfect Phone <ChevronRight size={18}/>
            </button>
            <p style={{fontSize:12,color:dark?"rgba(255,255,255,.28)":"rgba(0,0,0,.28)",marginTop:12}}>Free · No sign-up required · Takes ~2 min</p>
          </div>
        </div>
        {/* Floating phones */}
        <div className="au d2" style={{position:"relative",width:240,height:280,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <div style={{position:"absolute",top:30,left:0,opacity:.45}}><PhoneMockup colors={GR.Samsung} anim="f2" scale={.7}/></div>
          <div style={{position:"absolute",top:20,right:0,opacity:.55}}><PhoneMockup colors={GR.Google} anim="f3" scale={.78}/></div>
          <div style={{position:"relative",zIndex:2}}><PhoneMockup colors={GR.Apple} anim="f1" scale={1.05}/></div>
          <div style={{position:"absolute",bottom:10,left:"30%",opacity:.4}}><PhoneMockup colors={GR.OnePlus} anim="f2" scale={.6}/></div>
        </div>
      </div>
    </div>
  );
}

function LoadingPage({ dark }) {
  const bg=dark?"#000":"#fbfbfd";
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(255,255,255,.5)":"rgba(0,0,0,.5)";
  return (
    <div style={{minHeight:"100vh",background:bg,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:24}}>
      <div className="as" style={{textAlign:"center"}}>
        <div style={{fontSize:52,marginBottom:16}}>🔍</div>
        <div style={{fontSize:24,fontWeight:800,color:tx,letterSpacing:"-0.6px"}}>Analysing your preferences…</div>
        <p style={{fontSize:15,color:sb,marginTop:10}}>Scoring 22 phones across budget, OS, features & more</p>
      </div>
      <div style={{display:"flex",gap:8}}>
        {["dot1","dot2","dot3"].map(c=><div key={c} className={c} style={{width:10,height:10,borderRadius:"50%",background:"#0071e3"}}/>)}
      </div>
    </div>
  );
}

function QuizPage({ step, question, answer, onAnswer, onNext, onPrev, dark, animDir }) {
  const bg=dark?"radial-gradient(ellipse at 20% 60%,rgba(0,113,227,.12) 0%,transparent 50%),#000":"radial-gradient(ellipse at 20% 60%,rgba(0,113,227,.07) 0%,transparent 50%),#fbfbfd";
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(245,245,247,.55)":"rgba(29,29,31,.55)";
  const cardBg=dark?"rgba(28,28,30,.85)":"rgba(255,255,255,.9)";
  const brd=dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)";
  const isLast=step===QUESTIONS.length-1;
  const animCls=animDir==="back"?"al":"ar";
  return (
    <div style={{minHeight:"100vh",background:bg,padding:"80px 20px 40px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <div style={{width:"100%",maxWidth:548}}>
        <ProgressBar step={step} total={QUESTIONS.length} dark={dark}/>
        <div key={step} className={animCls} style={{background:cardBg,backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",border:`1px solid ${brd}`,borderRadius:24,padding:"26px 22px 22px",boxShadow:dark?"0 20px 60px rgba(0,0,0,.5)":"0 20px 60px rgba(0,0,0,.07)"}}>
          <div style={{marginBottom:22}}>
            <div style={{fontSize:"clamp(19px,3.5vw,24px)",fontWeight:800,color:tx,letterSpacing:"-0.5px",lineHeight:1.25,marginBottom:question.sub?7:0}}>{question.title}</div>
            {question.sub&&<div style={{fontSize:13.5,color:sb,lineHeight:1.5}}>{question.sub}</div>}
          </div>
          {question.type==="choice"&&(
            <div style={{display:"grid",gridTemplateColumns:question.opts.length>4?"repeat(2,1fr)":"1fr",gap:9}}>
              {question.opts.map((opt,i)=>(
                <div key={opt.v} className={`au d${Math.min(i+1,7)}`}>
                  <OptionCard opt={opt} selected={answer===opt.v} onSelect={onAnswer} dark={dark}/>
                </div>
              ))}
            </div>
          )}
          {question.type==="rating"&&(
            <div className="au"><RatingSelector value={answer} onChange={v=>onAnswer(String(v))} labels={question.labels} dark={dark}/></div>
          )}
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:18,gap:12}}>
          <button className="nbtn" onClick={onPrev} disabled={step===0} style={{display:"flex",alignItems:"center",gap:5,fontSize:14,fontWeight:600,color:step===0?(dark?"rgba(255,255,255,.18)":"rgba(0,0,0,.18)"):(dark?"rgba(255,255,255,.6)":"rgba(0,0,0,.6)"),background:"none",border:"none",padding:"10px 0",cursor:step===0?"not-allowed":"pointer"}}>
            <ChevronLeft size={16}/> Previous
          </button>
          <button className="cta" onClick={onNext} disabled={!answer} style={{background:answer?"#0071e3":"rgba(0,113,227,.3)",color:"#fff",border:"none",borderRadius:980,padding:"12px 26px",fontSize:15,fontWeight:700,display:"flex",alignItems:"center",gap:6,opacity:answer?1:.55,cursor:answer?"pointer":"not-allowed",boxShadow:answer?"0 6px 20px rgba(0,113,227,.35)":"none"}}>
            {isLast?"See My Results ✨":"Next"} {!isLast&&<ChevronRight size={15}/>}
          </button>
        </div>
      </div>
    </div>
  );
}

function PhoneCard({ phone, rank, dark, onCompare, inCompare }) {
  const [c1,c2]=GR[phone.brand]||["#333","#555"];
  const links=getLinks(phone.name);
  const cardBg=dark?"rgba(28,28,30,.92)":"rgba(255,255,255,.96)";
  const brd=dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)";
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(255,255,255,.42)":"rgba(0,0,0,.42)";
  const rankTags=[{label:"Best Match",color:"#0071e3"},{label:"Runner Up",color:"#6e6e73"},{label:"Third Pick",color:"#a67c52"}];
  const rt=rankTags[rank-1];
  return (
    <div className={`as d${rank}`} style={{background:cardBg,backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",border:`1px solid ${brd}`,borderRadius:22,overflow:"hidden",boxShadow:rank===1?(dark?"0 24px 60px rgba(0,113,227,.18)":"0 24px 60px rgba(0,113,227,.1)"):(dark?"0 12px 40px rgba(0,0,0,.4)":"0 12px 40px rgba(0,0,0,.06)"),display:"flex",flexDirection:"column"}}>
      {/* Gradient header */}
      <div style={{background:`linear-gradient(145deg,${c1},${c2})`,padding:"22px 18px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-25,right:-25,width:130,height:130,borderRadius:"50%",background:"rgba(255,255,255,.05)"}}/>
        <div style={{position:"absolute",bottom:-35,left:-10,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,.04)"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",position:"relative",zIndex:1}}>
          <div>
            <span style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.6)",letterSpacing:"0.7px",textTransform:"uppercase"}}>{phone.brand}</span>
            <div style={{fontSize:17,fontWeight:800,color:"#fff",letterSpacing:"-0.4px",marginTop:2,lineHeight:1.2}}>{phone.name}</div>
            <div style={{fontSize:15,fontWeight:700,color:"rgba(255,255,255,.8)",marginTop:5}}>{phone.pStr}</div>
          </div>
          <CircleScore score={phone.sc} dark={true}/>
        </div>
        <div style={{position:"absolute",top:11,right:14,background:"rgba(255,255,255,.14)",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,color:"#fff",backdropFilter:"blur(8px)"}}>#{rank}</div>
      </div>
      {/* Body */}
      <div style={{padding:"15px 18px 18px",flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{display:"inline-flex",alignSelf:"flex-start",background:dark?`rgba(0,113,227,.18)`:`rgba(0,113,227,.07)`,borderRadius:20,padding:"3px 10px",marginBottom:12}}>
          <span style={{fontSize:11,fontWeight:700,color:rt.color}}>{rt.label}</span>
        </div>
        <p style={{fontSize:12.5,color:sb,lineHeight:1.6,marginBottom:13}}>{phone.bio}</p>
        {/* Reasons */}
        <div style={{marginBottom:14}}>
          {phone.rsns.map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:7,marginBottom:5}}>
              <div style={{width:16,height:16,borderRadius:8,background:"rgba(0,113,227,.15)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
                <Check size={9} color="#0071e3" strokeWidth={3}/>
              </div>
              <span style={{fontSize:12.5,color:tx,fontWeight:500,lineHeight:1.4}}>{r}</span>
            </div>
          ))}
        </div>
        {/* Spec bars */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 14px",marginBottom:16}}>
          {[["📷",ph=>ph.cam,"Camera"],["⚡",ph=>ph.perf,"Perf"],["🔋",ph=>ph.bat,"Battery"],["🎮",ph=>ph.g,"Gaming"]].map(([icon,fn,label])=>{
            const val=fn(phone);
            return (
              <div key={label}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
                  <span style={{fontSize:10.5,color:sb,fontWeight:500}}>{icon} {label}</span>
                  <span style={{fontSize:10.5,color:tx,fontWeight:700}}>{val}/10</span>
                </div>
                <div style={{height:4,background:dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.07)",borderRadius:2,overflow:"hidden"}}>
                  <div className="sbar" style={{width:`${val*10}%`,height:"100%",background:"linear-gradient(90deg,#0071e3,#5ac8fa)",borderRadius:2}}/>
                </div>
              </div>
            );
          })}
        </div>
        {/* Buy buttons */}
        <div style={{display:"flex",gap:7,marginBottom:9,flexWrap:"wrap"}}>
          {[["Amazon",links.amazon,"#e47911"],["Flipkart",links.flipkart,"#2874f0"],["Official",links.off,"#1d1d1f"]].map(([lbl,url,col])=>(
            <a key={lbl} href={url} target="_blank" rel="noopener noreferrer" className="bbtn" style={{flex:1,minWidth:74,textAlign:"center",fontSize:12,fontWeight:700,color:"#fff",background:dark&&lbl==="Official"?"rgba(255,255,255,.15)":col,borderRadius:10,padding:"8px 4px",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}>
              {lbl} <ExternalLink size={9}/>
            </a>
          ))}
        </div>
        {/* Compare toggle */}
        <button className="nbtn" onClick={()=>onCompare(phone)} style={{width:"100%",padding:"9px",borderRadius:10,border:`1.5px solid ${inCompare?"#0071e3":(dark?"rgba(255,255,255,.14)":"rgba(0,0,0,.11)")}`,background:inCompare?(dark?"rgba(0,113,227,.18)":"rgba(0,113,227,.07)"):"transparent",fontSize:12.5,fontWeight:600,color:inCompare?"#0071e3":(dark?"rgba(255,255,255,.45)":"rgba(0,0,0,.45)"),cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
          <BarChart2 size={12}/> {inCompare?"Added to Compare ✓":"+ Add to Compare"}
        </button>
      </div>
    </div>
  );
}

function CompareView({ phones, dark, onClose }) {
  const bg=dark?"rgba(12,12,14,.98)":"rgba(255,255,255,.98)";
  const brd=dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)";
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(255,255,255,.42)":"rgba(0,0,0,.42)";
  const specs=[["cam","📷","Camera"],["perf","⚡","Performance"],["bat","🔋","Battery"],["g","🎮","Gaming"]];
  const cols=`160px repeat(${phones.length},1fr)`;
  return (
    <div className="ai" style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.65)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",display:"flex",alignItems:"flex-end",justifyContent:"center",padding:"0 0 0 0"}}>
      <div style={{width:"100%",maxWidth:920,background:bg,backdropFilter:"blur(30px)",WebkitBackdropFilter:"blur(30px)",borderRadius:"22px 22px 0 0",border:`1px solid ${brd}`,maxHeight:"92vh",overflow:"hidden",display:"flex",flexDirection:"column"}}>
        <div style={{padding:"15px 20px",borderBottom:`1px solid ${brd}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <span style={{fontSize:16,fontWeight:800,color:tx,letterSpacing:"-0.3px"}}>Comparison</span>
          <button className="nbtn" onClick={onClose} style={{background:dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.07)",border:"none",borderRadius:"50%",width:30,height:30,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <X size={14} color={tx}/>
          </button>
        </div>
        <div style={{overflow:"auto",padding:"18px 20px 24px"}}>
          {/* Phone headers */}
          <div style={{display:"grid",gridTemplateColumns:cols,gap:12,marginBottom:22}}>
            <div/>
            {phones.map(p=>{
              const [c1,c2]=GR[p.brand]||["#333","#555"];
              return (
                <div key={p.id} style={{background:`linear-gradient(145deg,${c1},${c2})`,borderRadius:16,padding:"14px 12px",textAlign:"center"}}>
                  <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.6)",textTransform:"uppercase",letterSpacing:"0.4px"}}>{p.brand}</div>
                  <div style={{fontSize:14,fontWeight:800,color:"#fff",letterSpacing:"-0.3px",marginTop:2,lineHeight:1.25}}>{p.name}</div>
                  <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,.72)",marginTop:3}}>{p.pStr}</div>
                  <div style={{marginTop:8,display:"flex",justifyContent:"center"}}><CircleScore score={p.sc} dark={true}/></div>
                </div>
              );
            })}
          </div>
          {/* Spec rows */}
          {specs.map(([key,icon,label])=>(
            <div key={key} style={{display:"grid",gridTemplateColumns:cols,gap:12,marginBottom:16,alignItems:"center"}}>
              <span style={{fontSize:13,fontWeight:600,color:sb}}>{icon} {label}</span>
              {phones.map(p=>{
                const val=p[key];
                return (
                  <div key={p.id}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                      <span style={{fontSize:12,fontWeight:700,color:tx}}>{val}/10</span>
                      <span style={{fontSize:11,color:sb}}>{val>=9.5?"Exceptional":val>=8.5?"Excellent":val>=7.5?"Great":val>=6?"Good":"Fair"}</span>
                    </div>
                    <div style={{height:7,background:dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.07)",borderRadius:4,overflow:"hidden"}}>
                      <div className="sbar" style={{width:`${val*10}%`,height:"100%",background:`linear-gradient(90deg,${val>=9?"#30d158":val>=7.5?"#0071e3":"#ff9f0a"},${val>=9?"#34c759":"#5ac8fa"})`,borderRadius:4}}/>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          {/* Storage */}
          <div style={{display:"grid",gridTemplateColumns:cols,gap:12,marginBottom:14,alignItems:"center"}}>
            <span style={{fontSize:13,fontWeight:600,color:sb}}>💾 Storage</span>
            {phones.map(p=>(
              <div key={p.id} style={{display:"flex",flexWrap:"wrap",gap:5}}>
                {p.storage.map(s=><span key={s} style={{fontSize:11.5,fontWeight:600,color:tx,background:dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.07)",borderRadius:7,padding:"3px 8px"}}>{s>=1000?"1TB":s+"GB"}</span>)}
              </div>
            ))}
          </div>
          {/* OS */}
          <div style={{display:"grid",gridTemplateColumns:cols,gap:12,alignItems:"center"}}>
            <span style={{fontSize:13,fontWeight:600,color:sb}}>📱 Platform</span>
            {phones.map(p=>(
              <span key={p.id} style={{fontSize:13,fontWeight:600,color:tx}}>{p.os==="ios"?"🍎 iOS":"🤖 Android"}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ results, dark, onRestart }) {
  const [cmp, setCmp] = useState([]);
  const [showCmp, setShowCmp] = useState(false);
  const bg=dark?"radial-gradient(ellipse at 20% 50%,rgba(0,113,227,.15) 0%,transparent 52%),radial-gradient(ellipse at 80% 15%,rgba(191,90,242,.1) 0%,transparent 52%),#000":"radial-gradient(ellipse at 20% 50%,rgba(0,113,227,.08) 0%,transparent 52%),radial-gradient(ellipse at 80% 15%,rgba(191,90,242,.06) 0%,transparent 52%),#fbfbfd";
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(245,245,247,.52)":"rgba(29,29,31,.52)";
  const brd=dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.07)";
  const top3=results.slice(0,3);
  const rest=results.slice(3,6);
  const toggle=(ph)=>setCmp(c=>c.find(p=>p.id===ph.id)?c.filter(p=>p.id!==ph.id):c.length>=3?c:[...c,ph]);
  return (
    <div style={{minHeight:"100vh",background:bg,paddingTop:52}}>
      <div style={{maxWidth:1080,margin:"0 auto",padding:"40px 20px 110px"}}>
        {/* Header */}
        <div className="au" style={{textAlign:"center",marginBottom:44}}>
          <div style={{fontSize:"clamp(28px,5vw,50px)",fontWeight:800,color:tx,letterSpacing:"-1.5px",lineHeight:1.1}}>Your Top Matches</div>
          <p style={{fontSize:16,color:sb,marginTop:10,fontWeight:400}}>Based on your answers, here are the best phones for you.</p>
        </div>
        {/* Top 3 */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:20,marginBottom:36}}>
          {top3.map((p,i)=><PhoneCard key={p.id} phone={p} rank={i+1} dark={dark} onCompare={toggle} inCompare={!!cmp.find(c=>c.id===p.id)}/>)}
        </div>
        {/* Also Consider */}
        {rest.length>0&&(
          <div style={{marginBottom:40}}>
            <div className="au" style={{fontSize:20,fontWeight:800,color:tx,marginBottom:14,letterSpacing:"-0.5px"}}>Also Consider</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:13}}>
              {rest.map((p,i)=>{
                const [c1,c2]=GR[p.brand]||["#333","#555"];
                const inC=!!cmp.find(c=>c.id===p.id);
                return (
                  <div key={p.id} className={`as d${i+1}`} style={{background:dark?"rgba(28,28,30,.75)":"rgba(255,255,255,.85)",backdropFilter:"blur(16px)",border:`1px solid ${brd}`,borderRadius:16,padding:"13px 15px",display:"flex",gap:13,alignItems:"center"}}>
                    <div style={{width:44,height:78,borderRadius:10,background:`linear-gradient(145deg,${c1},${c2})`,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 14px rgba(0,0,0,.2)"}}>
                      <Smartphone size={14} color="rgba(255,255,255,.55)"/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:700,color:tx,letterSpacing:"-0.2px"}}>{p.name}</div>
                      <div style={{fontSize:12,color:sb,marginTop:1}}>{p.pStr}</div>
                      <div style={{fontSize:11.5,color:"#0071e3",fontWeight:700,marginTop:4}}>{p.sc}% match</div>
                    </div>
                    <button className="nbtn" onClick={()=>toggle(p)} style={{flexShrink:0,background:inC?"rgba(0,113,227,.14)":"transparent",border:`1px solid ${inC?"#0071e3":(dark?"rgba(255,255,255,.15)":"rgba(0,0,0,.1)")}`,borderRadius:8,padding:"6px 10px",fontSize:11,fontWeight:700,color:inC?"#0071e3":(dark?"rgba(255,255,255,.4)":"rgba(0,0,0,.4)"),cursor:"pointer"}}>
                      {inC?"✓ Added":"+ Compare"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Restart */}
        <div style={{textAlign:"center"}}>
          <button className="nbtn" onClick={onRestart} style={{display:"inline-flex",alignItems:"center",gap:8,background:"transparent",border:`1.5px solid ${dark?"rgba(255,255,255,.18)":"rgba(0,0,0,.14)"}`,borderRadius:980,padding:"12px 28px",fontSize:14,fontWeight:600,color:sb,cursor:"pointer"}}>
            <RotateCcw size={14}/> Start Over
          </button>
        </div>
      </div>
      {/* Compare bar */}
      {cmp.length>=2&&(
        <div className="au" style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:50,background:dark?"rgba(28,28,30,.96)":"rgba(255,255,255,.96)",backdropFilter:"blur(22px)",WebkitBackdropFilter:"blur(22px)",border:`1px solid ${dark?"rgba(255,255,255,.14)":"rgba(0,0,0,.12)"}`,borderRadius:980,padding:"9px 9px 9px 18px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 8px 36px rgba(0,0,0,.22)",whiteSpace:"nowrap"}}>
          <span style={{fontSize:13,fontWeight:600,color:tx}}>{cmp.length} phones selected</span>
          <button className="cta" onClick={()=>setShowCmp(true)} style={{background:"#0071e3",color:"#fff",border:"none",borderRadius:980,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5,boxShadow:"0 4px 16px rgba(0,113,227,.35)"}}>
            <BarChart2 size={13}/> Compare
          </button>
          <button className="nbtn" onClick={()=>setCmp([])} style={{background:"transparent",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <X size={13} color={sb}/>
          </button>
        </div>
      )}
      {showCmp&&<CompareView phones={cmp} dark={dark} onClose={()=>setShowCmp(false)}/>}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ APP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("home");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [animDir, setAnimDir] = useState("forward");

  useEffect(()=>{
    const link=document.createElement("link");
    link.rel="stylesheet";
    link.href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap";
    document.head.appendChild(link);
    const style=document.createElement("style");
    style.textContent=CSS;
    document.head.appendChild(style);
    return()=>{
      try{document.head.removeChild(link)}catch(e){}
      try{document.head.removeChild(style)}catch(e){}
    };
  },[]);

  const startQuiz=()=>{setStep(0);setAnswers({});setPage("quiz")};
  const restart=()=>{setStep(0);setAnswers({});setResults([]);setPage("home")};
  const setAnswer=(v)=>setAnswers(a=>({...a,[QUESTIONS[step].id]:v}));

  const goNext=()=>{
    setAnimDir("forward");
    if (step<QUESTIONS.length-1) { setStep(s=>s+1); }
    else {
      setPage("loading");
      setTimeout(()=>{setResults(topPhones(answers));setPage("results");},1400);
    }
  };

  const goPrev=()=>{setAnimDir("back");if(step>0)setStep(s=>s-1)};
  const curQ=QUESTIONS[step];
  const curA=answers[curQ?.id];

  return (
    <div className="papp" style={{minHeight:"100vh"}}>
      <Navbar dark={dark} setDark={setDark} page={page} onRestart={restart}/>
      {page==="home"    && <HomePage    onStart={startQuiz} dark={dark}/>}
      {page==="quiz"    && <QuizPage    step={step} question={curQ} answer={curA} onAnswer={setAnswer} onNext={goNext} onPrev={goPrev} dark={dark} animDir={animDir}/>}
      {page==="loading" && <LoadingPage dark={dark}/>}
      {page==="results" && <ResultsPage results={results} dark={dark} onRestart={restart}/>}
    </div>
  );
}
