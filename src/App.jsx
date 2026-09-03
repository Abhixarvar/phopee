import { useState, useEffect } from "react";
import { Sun, Moon, ChevronRight, ChevronLeft, RotateCcw, X, ExternalLink, BarChart2, Check, Smartphone, Award, Zap, Camera, Battery, Plus, MessageSquare, Edit3, Globe, Clock, Video, Image as ImageIcon, Play, Youtube } from "lucide-react";
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ PHONE DATABASE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PHONES = [
  // Flagship Ultra & Pro (₹1,00,000+)
  { id:1,  name:"iPhone 16 Pro Max", brand:"Apple",    price:144900, pStr:"₹1,44,900", os:"ios",     g:9.7, cam:9.9, bat:9.2, perf:9.9, storage:[256,512,1024], size:"large",    bio:"The ultimate iPhone with a massive 6.9-inch display, A18 Pro chip, and Camera Control.", pros:["A18 Pro chip","Camera Control","6.9-inch OLED","Apple Intelligence"] },
  { id:2,  name:"Galaxy S25 Ultra",  brand:"Samsung",  price:129999, pStr:"₹1,29,999", os:"android", g:9.8, cam:9.9, bat:9.1, perf:9.9, storage:[256,512,1024], size:"large",    bio:"Samsung's ultimate flagship — Snapdragon 8 Elite, 200MP camera, titanium frame, and built-in S Pen.", pros:["Snapdragon 8 Elite","200MP Camera","Built-in S Pen","Galaxy AI"] },
  { id:3,  name:"Pixel 9 Pro XL",    brand:"Google",   price:124999, pStr:"₹1,24,999", os:"android", g:8.7, cam:9.9, bat:8.8, perf:9.3, storage:[256,512], size:"large",    bio:"Google's supreme camera phone with Gemini Advanced AI, Tensor G4, and 7 years of OS updates.", pros:["Tensor G4 AI","Unmatched Camera","Gemini Advanced","7-Year Updates"] },
  { id:4,  name:"iPhone 16 Pro",     brand:"Apple",    price:119900, pStr:"₹1,19,900", os:"ios",     g:9.7, cam:9.8, bat:8.5, perf:9.9, storage:[128,256,512,1024], size:"standard", bio:"Titanium design with a 6.3-inch display, 5x telephoto zoom, and Camera Control.", pros:["A18 Pro chip","Camera Control","5x Telephoto","Titanium Frame"] },
  { id:5,  name:"Galaxy Z Fold 6",   brand:"Samsung",  price:164999, pStr:"₹1,64,999", os:"android", g:9.1, cam:8.9, bat:8.2, perf:9.7, storage:[256,512,1024], size:"large",    bio:"The world's leading folding smartphone — 7.6-inch main screen, Galaxy AI, and extreme productivity.", pros:["7.6-inch Folding Display","Galaxy AI","Multitasking Beast","Snapdragon 8 Gen 3"] },
  { id:6,  name:"Vivo X200 Pro",     brand:"Vivo",     price:94999,  pStr:"₹94,999",   os:"android", g:9.6, cam:9.9, bat:9.5, perf:9.8, storage:[256,512], size:"large",    bio:"Revolutionary photography powerhouse — Dimensity 9400, Zeiss 200MP APO telephoto, and massive 6000mAh battery.", pros:["Zeiss 200MP APO Camera","Dimensity 9400","6000mAh Battery","90W Fast Charge"] },

  // Upper Flagship (₹70,000 – ₹1,00,000)
  { id:7,  name:"Galaxy S25+",       brand:"Samsung",  price:99999,  pStr:"₹99,999",   os:"android", g:9.5, cam:9.2, bat:9.0, perf:9.7, storage:[256,512], size:"large",    bio:"Flagship power, vibrant 6.7-inch QHD+ screen, and all-day battery with Galaxy AI.", pros:["Snapdragon 8 Elite","QHD+ Dynamic AMOLED","Galaxy AI","4900mAh Battery"] },
  { id:8,  name:"iPhone 16 Plus",    brand:"Apple",    price:89999,  pStr:"₹89,999",   os:"ios",     g:9.0, cam:9.1, bat:9.5, perf:9.5, storage:[128,256,512], size:"large",    bio:"Big 6.7-inch display and phenomenal battery life powered by the A18 chip with Apple Intelligence.", pros:["Exceptional Battery","6.7-inch Display","A18 Chip","Camera Control"] },
  { id:9,  name:"iPhone 16",         brand:"Apple",    price:79900,  pStr:"₹79,900",   os:"ios",     g:8.9, cam:9.1, bat:8.4, perf:9.5, storage:[128,256,512], size:"standard", bio:"The standard-setting iPhone with A18 chip, Action Button, Camera Control, and 48MP main lens.", pros:["Camera Control","A18 Chip","Action Button","Apple Intelligence"] },
  { id:10, name:"Galaxy S25",        brand:"Samsung",  price:79999,  pStr:"₹79,999",   os:"android", g:9.4, cam:9.0, bat:8.3, perf:9.7, storage:[128,256], size:"standard", bio:"Compact Android flagship with Snapdragon 8 Elite power and 7 years of software support.", pros:["Compact Flagship","Snapdragon 8 Elite","Galaxy AI","7-Year Updates"] },
  { id:11, name:"Pixel 9",           brand:"Google",   price:79999,  pStr:"₹79,999",   os:"android", g:8.3, cam:9.5, bat:8.5, perf:9.0, storage:[128,256], size:"standard", bio:"Smart AI features powered by Tensor G4, incredible camera capabilities, and 7-year OS updates.", pros:["Tensor G4 AI","Best-in-Class Camera","Gemini AI","7-Year Updates"] },
  { id:12, name:"OnePlus 13",        brand:"OnePlus",  price:69999,  pStr:"₹69,999",   os:"android", g:9.7, cam:9.0, bat:9.7, perf:9.9, storage:[256,512], size:"large",    bio:"Flagship killer reborn — Snapdragon 8 Elite, Hasselblad triple camera, 6000mAh battery, and 100W charging.", pros:["Snapdragon 8 Elite","6000mAh Battery","100W SUPERVOOC","Hasselblad Optics"] },

  // Premium Mid-Range (₹40,000 – ₹70,000)
  { id:13, name:"iPhone 15",         brand:"Apple",    price:69999,  pStr:"₹69,999",   os:"ios",     g:8.5, cam:8.9, bat:8.0, perf:9.0, storage:[128,256,512], size:"standard", bio:"Proven essential iPhone featuring Dynamic Island, 48MP camera, and USB-C convenience.", pros:["Dynamic Island","USB-C","48MP Main Camera","A16 Bionic"] },
  { id:14, name:"iQOO 13",           brand:"iQOO",     price:54999,  pStr:"₹54,999",   os:"android", g:9.9, cam:8.6, bat:9.6, perf:9.9, storage:[256,512], size:"large",    bio:"Ultimate gaming smartphone with Snapdragon 8 Elite, Q2 gaming display chip, 144Hz screen, and 120W charge.", pros:["Snapdragon 8 Elite","144Hz 2K AMOLED","120W Charging","Dedicated Gaming Chip"] },
  { id:15, name:"Vivo V40 Pro",      brand:"Vivo",     price:49999,  pStr:"₹49,999",   os:"android", g:8.8, cam:9.5, bat:9.1, perf:9.0, storage:[256,512], size:"large",    bio:"Portrait photography master with ZEISS optics, Sony 50MP main sensor, and 5500mAh battery.", pros:["ZEISS Optics","50MP Selfie & Rear","5500mAh Battery","80W FlashCharge"] },
  { id:16, name:"OnePlus 12R",       brand:"OnePlus",  price:39999,  pStr:"₹39,999",   os:"android", g:9.2, cam:7.8, bat:9.4, perf:9.2, storage:[128,256], size:"large",    bio:"Unbeatable performance value with Snapdragon 8 Gen 2, 5500mAh battery, and 100W SUPERVOOC.", pros:["100W Fast Charge","Snapdragon 8 Gen 2","5500mAh Battery","120Hz LTPO AMOLED"] },
  { id:17, name:"Samsung Galaxy A55 5G", brand:"Samsung", price:39999, pStr:"₹39,999", os:"android", g:7.5, cam:8.0, bat:8.8, perf:7.8, storage:[128,256], size:"large", bio:"Premium metal frame design, IP67 water resistance, Knox Vault security, and 4 years of OS updates.", pros:["Premium Metal Build","IP67 Water Resistant","Knox Security","4-Year OS Updates"] },

  // Mid-Range Sweet Spot (₹20,000 – ₹40,000)
  { id:18, name:"iQOO Neo 9 Pro",    brand:"iQOO",     price:34999,  pStr:"₹34,999",   os:"android", g:9.5, cam:8.4, bat:8.9, perf:9.4, storage:[128,256], size:"large",    bio:"Flagship Snapdragon 8 Gen 2 gaming beast with Q1 display chip and 120W fast charging.", pros:["Snapdragon 8 Gen 2","120W Charging","Sony IMX920 Camera","144Hz AMOLED"] },
  { id:19, name:"Motorola Edge 50 Pro", brand:"Motorola", price:31999, pStr:"₹31,999", os:"android", g:8.0, cam:8.7, bat:8.3, perf:8.2, storage:[256],     size:"large",    bio:"Pantone validated curved 144Hz pOLED display with 125W TurboPower and Moto AI features.", pros:["125W TurboPower","144Hz Curved pOLED","Pantone Color Validated","Clean Moto AI"] },
  { id:20, name:"Realme GT 6T",      brand:"Realme",   price:30999,  pStr:"₹30,999",   os:"android", g:9.1, cam:7.8, bat:9.0, perf:9.1, storage:[128,256,512], size:"large",bio:"Snapdragon 7+ Gen 3 powerhouse featuring an industry-leading 6000-nit peak brightness display.", pros:["6000-nit Peak Brightness","Snapdragon 7+ Gen 3","120W Charging","5500mAh Battery"] },
  { id:21, name:"OnePlus Nord 4",    brand:"OnePlus",  price:29999,  pStr:"₹29,999",   os:"android", g:8.8, cam:8.0, bat:9.2, perf:8.9, storage:[128,256], size:"large",    bio:"Sleek metal unibody design powered by Snapdragon 7+ Gen 3 with 100W fast charging.", pros:["Metal Unibody Design","Snapdragon 7+ Gen 3","100W SUPERVOOC","5500mAh Battery"] },
  { id:22, name:"Poco F6 5G",        brand:"Poco",     price:29999,  pStr:"₹29,999",   os:"android", g:9.3, cam:7.7, bat:8.5, perf:9.3, storage:[256,512], size:"large",    bio:"Performance monster driven by Snapdragon 8s Gen 3, 90W turbo charge, and 1.5K AMOLED.", pros:["Snapdragon 8s Gen 3","90W Fast Charging","LiquidCool Tech","1.5K 120Hz Display"] },
  { id:23, name:"Nothing Phone (2a) Plus", brand:"Nothing", price:27999, pStr:"₹27,999", os:"android", g:7.8, cam:8.2, bat:8.8, perf:8.0, storage:[256], size:"large", bio:"Iconic transparent design with Glyph Interface, Dimensity 7350 Pro, and 50MP selfie camera.", pros:["Glyph Interface","Clean Nothing OS","50MP Front Camera","Unique Design"] },
  { id:24, name:"Nothing Phone (2a)",brand:"Nothing",  price:23999,  pStr:"₹23,999",   os:"android", g:7.5, cam:7.9, bat:8.7, perf:7.8, storage:[128,256], size:"large",    bio:"Distinctive transparent aesthetics, smooth Nothing OS, Dimensity 7200 Pro, and great battery.", pros:["Glyph Interface","Dimensity 7200 Pro","Clean Nothing OS","Dual 50MP Cameras"] },
  { id:25, name:"Motorola Edge 50 Neo", brand:"Motorola", price:23999, pStr:"₹23,999", os:"android", g:7.5, cam:8.4, bat:8.2, perf:7.7, storage:[256],     size:"compact",  bio:"Compact military-grade durable phone with Sony LYT-700C camera and 5 years of OS updates.", pros:["IP68 & MIL-STD-810H","Sony LYT-700C OIS","5-Year OS Updates","Compact Form Factor"] },

  // Budget Champions (Under ₹20,000)
  { id:26, name:"Poco X6 Pro 5G",    brand:"Poco",     price:23999,  pStr:"₹23,999",   os:"android", g:9.2, cam:7.5, bat:8.4, perf:9.1, storage:[256,512], size:"large",    bio:"King of performance under 25k — Dimensity 8300 Ultra, WildBoost gaming 2.0, and 67W charge.", pros:["Dimensity 8300 Ultra","WildBoost Gaming","67W Fast Charging","1.5K AMOLED"] },
  { id:27, name:"iQOO Z9s Pro 5G",   brand:"iQOO",     price:24999,  pStr:"₹24,999",   os:"android", g:8.7, cam:8.2, bat:9.1, perf:8.6, storage:[128,256], size:"large",    bio:"Ultra-slim 3D curved 120Hz AMOLED display with Snapdragon 7 Gen 3 and 80W charging.", pros:["3D Curved AMOLED","Snapdragon 7 Gen 3","5500mAh Battery","80W FlashCharge"] },
  { id:28, name:"Redmi Note 13 Pro 5G", brand:"Xiaomi", price:21999, pStr:"₹21,999", os:"android", g:7.8, cam:8.8, bat:8.4, perf:7.9, storage:[128,256], size:"large",    bio:"200MP ultra-clear camera with OIS, Snapdragon 7s Gen 2, and 67W Turbo Charge.", pros:["200MP OIS Camera","1.5K 120Hz AMOLED","67W Fast Charge","Gorilla Glass Victus"] },
  { id:29, name:"CMF Phone 1",       brand:"Nothing",  price:15999,  pStr:"₹15,999",   os:"android", g:7.6, cam:7.6, bat:8.8, perf:7.7, storage:[128],     size:"large",    bio:"Innovatively designed phone with interchangeable back covers, Dimensity 7300, and clean software.", pros:["Modular Back Covers","Dimensity 7300","Clean Nothing OS","5000mAh Battery"] },
  { id:30, name:"Realme 13+ 5G",     brand:"Realme",   price:17999,  pStr:"₹17,999",   os:"android", g:8.5, cam:7.4, bat:8.7, perf:8.4, storage:[128,256], size:"large",    bio:"Budget gaming phenom with Dimensity 7300 Energy, 90fps gaming optimization, and 80W charge.", pros:["80W UltraCharge","90fps Gaming Support","Dimensity 7300 Energy","Vapor Chamber Cooling"] },
  { id:31, name:"Samsung Galaxy M35 5G", brand:"Samsung", price:16999, pStr:"₹16,999", os:"android", g:7.2, cam:7.8, bat:9.7, perf:7.5, storage:[128,256], size:"large",    bio:"Massive 6000mAh battery monster with 120Hz Super AMOLED display and Knox Vault protection.", pros:["6000mAh Monster Battery","120Hz Super AMOLED","Knox Security","Exynos 1380"] },
  { id:32, name:"Poco X6 5G",        brand:"Poco",     price:18999,  pStr:"₹18,999",   os:"android", g:7.9, cam:7.9, bat:8.5, perf:8.0, storage:[128,256,512], size:"large",bio:"Versatile all-rounder with 64MP OIS camera, 67W fast charging, and 1.5K Dolby Vision screen.", pros:["64MP OIS Camera","1.5K AMOLED Display","67W Turbo Charge","Great Value"] },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ UPCOMING PHONES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const UPCOMING_PHONES = [
  { id: 102, name: "Galaxy S26 Ultra", brand: "Samsung", expected: "Early 2026", desc: "Snapdragon 8 Gen 5, enhanced Galaxy AI, and a refined titanium unibody." },
  { id: 103, name: "Pixel 10 Pro XL", brand: "Google", expected: "Oct 2025", desc: "First fully custom TSMC Tensor G5 chip with revolutionary on-device AI." },
  { id: 104, name: "Nothing Phone (3)", brand: "Nothing", expected: "Mid 2025", desc: "True flagship processor, evolved Glyph Interface, and advanced AI interactions." }
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ BRAND LOGOS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ICONS = {
  apple: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5,14.4c0,3.2,2.8,4.2,2.9,4.3c-0.2,0.7-1,3.4-3,6.2c-1.7,2.5-3.5,4.9-6.3,5c-2.7,0.1-3.6-1.6-6.6-1.6 c-3,0-4.1,1.6-6.6,1.7C-6,30.1-8,27.4-9.9,24.7c-4-5.8-7.1-16.4-3-23.5C-10.8-2.2-7.5-5.2-4-5.3c2.7-0.1,5.3,1.8,7.1,1.8 c1.8,0,4.9-2.2,8-1.8C14.5-4.8,17.2-3.3,19-0.8c-1.5,1-4.4,2.6-4.3,6.1C14.7,9.3,18,10.6,18.1,10.7C17.9,11.3,17.2,13.2,16.5,14.4z M10.4-6.3C11.9-8.1,12.9-10.6,12.6-13c-2.2,0.1-4.8,1.5-6.4,3.3C4.9-8,3.7-5.5,4.1-3C6.4-2.8,8.8-4.3,10.4-6.3z" transform="translate(10, 14) scale(0.6)"/></svg>,
  android: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.8c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm-11 0c-.8 0-1.4-.6-1.4-1.4s.6-1.4 1.4-1.4 1.4.6 1.4 1.4-.6 1.4-1.4 1.4zm10.7-5.5l1.8-3.1c.1-.2 0-.5-.2-.6-.2-.1-.5 0-.6.2l-1.9 3.2C14.9 8.2 13.5 8 12 8s-2.9.2-4.3.9l-1.9-3.2c-.1-.2-.4-.3-.6-.2-.2.1-.3.4-.2.6l1.8 3.1C3.6 10.9 1 14.6 1 19h22c0-4.4-2.6-8.1-5.8-9.7z"/></svg>,
  samsung: <span style={{fontWeight:800,fontSize:14,letterSpacing:"-0.5px",fontFamily:"Arial",textTransform:"uppercase"}}>SAMSUNG</span>,
  google: <svg width="22" height="22" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>,
  oneplus: <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-4H7v-2h4V6h2v4h4v2h-4v4zm-1-7c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>,
};

const GR = {
  Apple:    ["#2c2c2e","#3d3d3f"], Samsung: ["#1428A0","#0b6ef5"],
  OnePlus:  ["#900009","#f5010c"], Google:  ["#1557d4","#0f9d58"],
  Xiaomi:   ["#b45309","#f97316"], iQOO:    ["#3730a3","#7c3aed"],
  Nothing:  ["#141414","#3a3a3a"], Motorola:["#002060","#0a75d6"],
  Realme:   ["#b45309","#eab308"], Poco:    ["#78350f","#f59e0b"],
  Vivo:     ["#0f172a","#2563eb"],
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ QUESTIONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const QUESTIONS = [
  { id:"budget", title:"What's your budget?", sub:"We'll find phones that give the best value for your spend.", type:"choice",
    opts:[{v:"b1",label:"Under ₹20,000",s:"Budget essentials",e:"💰"},{v:"b2",label:"₹20K – ₹40K",s:"Mid-range sweet spot",e:"💳"},{v:"b3",label:"₹40K – ₹70K",s:"Upper mid-range",e:"🎯"},{v:"b4",label:"₹70K – ₹1,00,000",s:"Premium segment",e:"✨"},{v:"b5",label:"Above ₹1,00,000",s:"True flagship",e:"👑"}] },
  { id:"os", title:"iOS or Android?", sub:"Your ecosystem preference shapes every recommendation.", type:"choice",
    opts:[{v:"ios",label:"iPhone (iOS)",s:"Apple ecosystem",e:ICONS.apple},{v:"android",label:"Android",s:"Open & customisable",e:ICONS.android},{v:"any",label:"No Preference",s:"Just give me the best",e:"⚡"}] },
  { id:"usage", title:"How do you mainly use your phone?", sub:"We'll weight the features that matter most to you.", type:"choice",
    opts:[{v:"gaming",label:"Gaming",s:"Performance & display",e:"🎮"},{v:"camera",label:"Photography",s:"Best camera quality",e:"📷"},{v:"social",label:"Social Media",s:"Camera speed & beauty",e:"📱"},{v:"business",label:"Business",s:"Productivity & reliability",e:"💼"},{v:"content",label:"Content Creation",s:"Video & creative tools",e:"🎬"},{v:"battery",label:"Battery Life",s:"All-day & beyond",e:"🔋"},{v:"general",label:"General Use",s:"Balanced & versatile",e:"🌟"}] },
  { id:"screenSize", title:"Screen size preference?", sub:"Find the form factor that fits your hand.", type:"choice",
    opts:[{v:"compact",label:"Compact",s:'Under 6.3" · Easy one-handed',e:"🤏"},{v:"standard",label:"Standard",s:'6.3"–6.5" · Sweet spot',e:"📱"},{v:"large",label:"Large",s:'6.5"+ · Immersive',e:"🖥️"},{v:"any",label:"No Preference",s:"Show me everything",e:"↔️"}] },
  { id:"batteryImp", title:"How important is battery life?", sub:"Rate from 1 (doesn't matter) to 5 (absolutely critical).", type:"rating",
    labels:["Not important","Slightly","Moderate","Very important","Must have"] },
  { id:"cameraImp", title:"How important is camera quality?", sub:"Rate from 1 (casual snaps) to 5 (professional photography).", type:"rating",
    labels:["Casual snaps","Basic shots","Good quality","Great photos","Pro quality"] },
  { id:"perfImp", title:"How important is raw performance?", sub:"Rate from 1 (light tasks) to 5 (heavy multitasking & gaming).", type:"rating",
    labels:["Light browsing","Basic tasks","Smooth","Heavy multitask","Max power"] },
  { id:"storage", title:"How much storage do you need?", sub:"More storage = more photos, apps, and offline media.", type:"choice",
    opts:[{v:"128",label:"128 GB",s:"Light user · Stream everything",e:"📂"},{v:"256",label:"256 GB",s:"Most users · Sweet spot",e:"💾"},{v:"512",label:"512 GB",s:"Power user · No compromise",e:"🗄️"},{v:"1024",label:"1 TB",s:"Heavy user · Ultimate freedom",e:"🏦"}] },
  { id:"brand", title:"Any brand preference?", sub:"We'll give your preferred brand extra consideration.", type:"choice",
    opts:[{v:"Apple",label:"Apple",s:"iPhones only",e:ICONS.apple},{v:"Samsung",label:"Samsung",s:"Galaxy series",e:ICONS.samsung},{v:"OnePlus",label:"OnePlus",s:"Never Settle",e:ICONS.oneplus},{v:"Google",label:"Google",s:"Pure Android",e:ICONS.google},{v:"any",label:"Any Brand",s:"Best overall pick wins",e:"🏆"}] },
  { id:"condition", title:"New or refurbished?", sub:"Certified refurbished phones offer big savings on tested quality.", type:"choice",
    opts:[{v:"new",label:"Brand New",s:"Full warranty & fresh",e:"🎁"},{v:"refurb",label:"Refurbished",s:"Save up to 30%",e:"♻️"},{v:"either",label:"Either is fine",s:"Best deal wins",e:"🤝"}] },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ ALGORITHM & REMARKS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const BR = { b1:[0,20000], b2:[20000,40000], b3:[40000,70000], b4:[70000,100000], b5:[100000,Infinity] };

function scorePhone(ph, a) {
  let s = 0;
  const [mn,mx] = BR[a.budget]||[0,Infinity];
  if (ph.price > mx * 1.15) return 0;
  if (ph.price>=mn && ph.price<=mx) s+=30; else if (ph.price<mn) s+=20; else s+=Math.max(0,10-Math.round(((ph.price-mx)/mx)*100));
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
  else if (name.includes("Vivo")) off="https://www.vivo.com/in";
  else if (name.includes("iQOO")) off="https://www.iqoo.com/in";
  else if (name.includes("Nothing")||name.includes("CMF")) off="https://in.nothing.tech";
  else if (name.includes("Motorola")) off="https://www.motorola.in";
  else if (name.includes("Realme")) off="https://www.realme.com/in/";
  else if (name.includes("Poco")) off="https://www.poco.in";
  return { amazon:`https://www.amazon.in/s?k=${q}`, flipkart:`https://www.flipkart.com/search?q=${q}`, off };
}

function topPhones(a) {
  return PHONES.map(p=>({...p,sc:scorePhone(p,a),rsns:getReasons(p,a)})).sort((a,b)=>b.sc-a.sc).slice(0,6);
}

function generateComparisonRemarks(phones) {
  if (!phones || phones.length === 0) return null;
  const sortedByCam = [...phones].sort((a,b)=>b.cam-a.cam);
  const sortedByPerf = [...phones].sort((a,b)=>(b.perf+b.g)-(a.perf+a.g));
  const sortedByBat = [...phones].sort((a,b)=>b.bat-a.bat);
  const sortedByValue = [...phones].sort((a,b)=>((b.cam+b.bat+b.perf)/b.price)-((a.cam+a.bat+a.perf)/a.price));
  const overallWinner = [...phones].sort((a,b)=>(b.cam+b.bat+b.perf+b.g)-(a.cam+a.bat+a.perf+a.g))[0];

  const highlights = [];
  if (sortedByCam[0]) {
    highlights.push({
      title: "📷 Best Photography & Video",
      phone: sortedByCam[0].name,
      badge: `${sortedByCam[0].cam}/10 Camera Score`,
      color: "#0071e3",
      desc: `${sortedByCam[0].name} leads in image processing, sensor quality, and portrait precision.`
    });
  }

  if (sortedByPerf[0]) {
    highlights.push({
      title: "⚡ Raw Speed & Gaming Champion",
      phone: sortedByPerf[0].name,
      badge: `${sortedByPerf[0].perf}/10 Perf · ${sortedByPerf[0].g}/10 Gaming`,
      color: "#bf5af2",
      desc: `${sortedByPerf[0].name} offers maximum frame rates, heavy multitasking efficiency, and thermal stability.`
    });
  }

  if (sortedByBat[0]) {
    highlights.push({
      title: "🔋 Battery Endurance Leader",
      phone: sortedByBat[0].name,
      badge: `${sortedByBat[0].bat}/10 Battery Rating`,
      color: "#30d158",
      desc: `${sortedByBat[0].name} delivers the longest single-charge battery backup for demanding screen-on times.`
    });
  }

  if (sortedByValue[0] && phones.length > 1) {
    highlights.push({
      title: "💰 Smartest Value Pick",
      phone: sortedByValue[0].name,
      badge: sortedByValue[0].pStr,
      color: "#ff9f0a",
      desc: `${sortedByValue[0].name} packs the highest overall feature rating per Rupee spent in this comparison.`
    });
  }

  // Summary Verdict text
  let summaryVerdict = "";
  if (phones.length === 1) {
    summaryVerdict = `${phones[0].name} is a stellar device with strong overall balance (${phones[0].pStr}).`;
  } else if (phones.length === 2) {
    const [p1, p2] = phones;
    summaryVerdict = `Comparing ${p1.name} (${p1.pStr}) vs ${p2.name} (${p2.pStr}): Choose ${bestCam.name} if camera is your top priority, or pick ${bestPerf.name} if you want peak speed and gaming performance.`;
  } else {
    summaryVerdict = `Across this ${phones.length}-phone comparison, ${overallWinner.name} stands out as the ultimate flagship all-rounder, while ${sortedByValue[0].name} provides the most aggressive price-to-performance ratio.`;
  }

  return { overallWinner, highlights, summaryVerdict };
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
  @keyframes dotPulse{0%,100%{transform:scale(.7);opacity:.4}50%{transform:scale(1);opacity:1}}
  
  :root { --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.15); --ease-out: cubic-bezier(0.25, 0.8, 0.25, 1); }
  
  .au{animation:fadeUp .6s var(--ease-spring) both}
  .ai{animation:fadeIn .5s var(--ease-out) both}
  .as{animation:scaleIn .5s var(--ease-spring) both}
  .ar{animation:slideR .5s var(--ease-spring) both}
  .al{animation:slideL .5s var(--ease-spring) both}
  .f1{animation:float1 5s ease-in-out infinite}
  .f2{animation:float2 6s ease-in-out infinite}
  .f3{animation:float3 4.5s ease-in-out infinite}
  .d1{animation-delay:.07s}.d2{animation-delay:.14s}.d3{animation-delay:.21s}
  .d4{animation-delay:.28s}.d5{animation-delay:.36s}.d6{animation-delay:.44s}.d7{animation-delay:.52s}
  
  .opt{transition:all .25s var(--ease-spring);cursor:pointer;-webkit-tap-highlight-color:transparent;user-select:none}
  .opt:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 20px rgba(0,0,0,.08)}
  .opt:active{transform:scale(.97) translateY(0)}
  .cta{transition:all .25s var(--ease-spring);cursor:pointer;user-select:none}
  .cta:hover{transform:scale(1.04) translateY(-2px)}
  .cta:active{transform:scale(.96) translateY(0)}
  .bbtn{transition:all .2s ease;cursor:pointer;text-decoration:none}
  .bbtn:hover{opacity:.85;transform:translateY(-2px)}
  .bbtn:active{transform:scale(.96)}
  .nbtn{transition:all .2s ease;cursor:pointer}
  .nbtn:hover{opacity:.7;transform:scale(1.05)}
  .nbtn:active{transform:scale(.95)}
  .sbar{transition:width 1.2s cubic-bezier(0.22, 1, 0.36, 1) .2s}
  .dot1{animation:dotPulse .8s ease-in-out 0s infinite}
  .dot2{animation:dotPulse .8s ease-in-out .2s infinite}
  .dot3{animation:dotPulse .8s ease-in-out .4s infinite}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:transparent}
  ::-webkit-scrollbar-thumb{background:rgba(128,128,128,.3);border-radius:4px}
  ::-webkit-scrollbar-thumb:hover{background:rgba(128,128,128,.5)}
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

function Navbar({ dark, setDark, page, onRestart, onOpenCompare }) {
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:100,background:dark?"rgba(0,0,0,.88)":"rgba(251,251,253,.88)",backdropFilter:"blur(22px)",WebkitBackdropFilter:"blur(22px)",borderBottom:`1px solid ${dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"}`,height:52}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer"}} onClick={onRestart}>
          <div style={{width:26,height:26,borderRadius:8,background:"linear-gradient(135deg,#0071e3,#5ac8fa)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Smartphone size={14} color="#fff"/>
          </div>
          <span style={{fontSize:15,fontWeight:800,color:dark?"#f5f5f7":"#1d1d1f",letterSpacing:"-0.4px"}}>Phopee</span>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <button className="nbtn" onClick={onOpenCompare} style={{display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:700,color:page==="compare"?"#0071e3":(dark?"rgba(255,255,255,.8)":"rgba(0,0,0,.8)"),background:page==="compare"?(dark?"rgba(0,113,227,.2)":"rgba(0,113,227,.1)"):"transparent",border:"none",padding:"5px 12px",borderRadius:8}}>
            <BarChart2 size={14} color="#0071e3"/> Spec Comparator
          </button>
          {page!=="home"&&<button className="nbtn" onClick={onRestart} style={{display:"flex",alignItems:"center",gap:5,fontSize:13,fontWeight:600,color:dark?"rgba(255,255,255,.5)":"rgba(0,0,0,.45)",background:"none",border:"none",padding:"5px 10px",borderRadius:8}}>
            <RotateCcw size={13}/> Quiz
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
      <span style={{fontSize:21,flexShrink:0,lineHeight:1,display:"flex",alignItems:"center",justifyContent:"center",width:24,height:24}}>{opt.e}</span>
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

function PhoneNews({ dark }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.gsmarena.com%2Frss-news-reviews.php3');
        const data = await res.json();
        if (data.status === 'ok') {
          setNews(data.items.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch news", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(245,245,247,.6)":"rgba(29,29,31,.6)";

  return (
    <div style={{maxWidth:1060,width:"100%",padding:"0 24px 60px"}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:20}}>
        <Globe size={22} color="#0071e3"/>
        <h2 className="au" style={{fontSize:22,fontWeight:800,color:tx,letterSpacing:"-0.5px",margin:0}}>Latest Phone News</h2>
      </div>
      
      {loading ? (
        <div style={{display:"flex",gap:8,padding:"40px 0",justifyContent:"center"}}>
          {["dot1","dot2","dot3"].map(c=><div key={c} className={c} style={{width:8,height:8,borderRadius:"50%",background:"#0071e3"}}/>)}
        </div>
      ) : (
        <div className="au d1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
          {news.map((item, i) => (
            <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="opt" style={{background:dark?"rgba(255,255,255,.03)":"rgba(0,0,0,.02)",border:`1px solid ${dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.06)"}`,borderRadius:16,padding:"18px",textDecoration:"none",display:"flex",flexDirection:"column"}}>
              {item.thumbnail && <img src={item.thumbnail} alt="" style={{width:"100%",height:140,objectFit:"cover",borderRadius:10,marginBottom:12}}/>}
              <div style={{fontSize:15,fontWeight:800,color:tx,letterSpacing:"-0.2px",lineHeight:1.3,marginBottom:8}}>{item.title}</div>
              <div style={{marginTop:"auto",display:"flex",alignItems:"center",gap:5,fontSize:11,fontWeight:600,color:sb}}>
                <Clock size={12}/> {new Date(item.pubDate).toLocaleDateString(undefined, {month:'short',day:'numeric'})}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function HomePage({ onStart, onOpenCompare, dark }) {
  const bg=dark?"radial-gradient(ellipse at 18% 48%,rgba(0,113,227,.22) 0%,transparent 52%),radial-gradient(ellipse at 82% 16%,rgba(191,90,242,.16) 0%,transparent 52%),radial-gradient(ellipse at 55% 85%,rgba(48,209,88,.1) 0%,transparent 45%),#000":"radial-gradient(ellipse at 18% 48%,rgba(0,113,227,.1) 0%,transparent 52%),radial-gradient(ellipse at 82% 16%,rgba(191,90,242,.07) 0%,transparent 52%),radial-gradient(ellipse at 55% 85%,rgba(48,209,88,.06) 0%,transparent 45%),#fbfbfd";
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(245,245,247,.6)":"rgba(29,29,31,.6)";
  return (
    <div style={{minHeight:"100vh",background:bg,display:"flex",flexDirection:"column",alignItems:"center",paddingTop:52}}>
      <div style={{flex:1,display:"flex",alignItems:"center",width:"100%"}}>
        <div style={{maxWidth:1060,width:"100%",margin:"0 auto",padding:"48px 24px",display:"flex",alignItems:"center",gap:64,flexWrap:"wrap",justifyContent:"center"}}>
        {/* Text */}
        <div style={{flex:"1 1 320px",maxWidth:520}}>
          <div className="au" style={{display:"inline-flex",alignItems:"center",gap:6,background:dark?"rgba(0,113,227,.18)":"rgba(0,113,227,.07)",border:`1px solid ${dark?"rgba(0,113,227,.38)":"rgba(0,113,227,.18)"}`,borderRadius:20,padding:"5px 13px",marginBottom:22}}>
            <span style={{width:6,height:6,borderRadius:"50%",background:"#0071e3",display:"inline-block"}}/>
            <span style={{fontSize:11,fontWeight:700,color:"#0071e3",letterSpacing:"0.5px",textTransform:"uppercase"}}>Phopee · {PHONES.length} Latest Phones</span>
          </div>
          <h1 className="au d1" style={{fontSize:"clamp(34px,6vw,60px)",fontWeight:800,color:tx,lineHeight:1.07,letterSpacing:"-2px",marginBottom:18}}>
            Find Your<br/>
            <span style={{background:"linear-gradient(135deg,#0071e3 0%,#bf5af2 55%,#30d158 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>Perfect Phone.</span>
          </h1>
          <p className="au d2" style={{fontSize:"clamp(15px,2vw,17px)",color:sb,lineHeight:1.7,marginBottom:30,fontWeight:400}}>
            Answer 10 smart questions or compare detailed specs side-by-side. Our algorithm analyses {PHONES.length} flagship and budget smartphones to find your ideal match — instantly.
          </p>
          <div className="au d3" style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:36}}>
            {["🧠 Smart Algorithm",`📱 ${PHONES.length} Latest Phones`,"🇮🇳 India Prices","⚖️ Detailed Spec Comparison"].map((f,i)=>(
              <span key={i} style={{fontSize:12.5,fontWeight:500,color:sb,background:dark?"rgba(255,255,255,.07)":"rgba(0,0,0,.05)",border:`1px solid ${dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)"}`,borderRadius:20,padding:"4px 12px"}}>{f}</span>
            ))}
          </div>
          <div className="au d4" style={{display:"flex",flexWrap:"wrap",gap:12,alignItems:"center"}}>
            <button className="cta" onClick={onStart} style={{background:"#0071e3",color:"#fff",border:"none",borderRadius:980,padding:"15px 32px",fontSize:16,fontWeight:700,letterSpacing:"-0.3px",display:"inline-flex",alignItems:"center",gap:8,boxShadow:"0 8px 28px rgba(0,113,227,.38)"}}>
              Find My Perfect Phone <ChevronRight size={18}/>
            </button>
            <button className="nbtn" onClick={onOpenCompare} style={{background:dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.06)",color:tx,border:`1px solid ${dark?"rgba(255,255,255,.15)":"rgba(0,0,0,.12)"}`,borderRadius:980,padding:"14px 24px",fontSize:15,fontWeight:700,display:"inline-flex",alignItems:"center",gap:8}}>
              <BarChart2 size={16} color="#0071e3"/> Compare Specs
            </button>
          </div>
          <p style={{fontSize:12,color:dark?"rgba(255,255,255,.28)":"rgba(0,0,0,.28)",marginTop:12}}>Free · No sign-up required · Instant comparisons</p>
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

      {/* Upcoming Phones Section */}
      <div style={{maxWidth:1060,width:"100%",padding:"20px 24px 60px"}}>
        <h2 className="au" style={{fontSize:22,fontWeight:800,color:tx,marginBottom:20,letterSpacing:"-0.5px"}}>On The Horizon: Upcoming Phones</h2>
        <div className="au d1" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16}}>
          {UPCOMING_PHONES.map(up => (
            <div key={up.id} className="opt" style={{background:dark?"rgba(255,255,255,.03)":"rgba(0,0,0,.02)",border:`1px solid ${dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.06)"}`,borderRadius:16,padding:"18px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{fontSize:15,fontWeight:800,color:tx,letterSpacing:"-0.2px"}}>{up.name}</div>
                <div style={{fontSize:11,fontWeight:700,color:"#0071e3",background:dark?"rgba(0,113,227,.15)":"rgba(0,113,227,.08)",padding:"3px 8px",borderRadius:12}}>{up.expected}</div>
              </div>
              <div style={{fontSize:13,color:sb,lineHeight:1.5}}>{up.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Phone News Section */}
      <PhoneNews dark={dark} />
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
        <p style={{fontSize:15,color:sb,marginTop:10}}>Scoring {PHONES.length} latest phones across budget, OS, features & more</p>
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
  const rt=rankTags[rank-1]||{label:`Match #${rank}`,color:"#0071e3"};
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
        {/* Compare & Media toggles */}
        <div style={{display:"flex",gap:7}}>
          <button className="nbtn" onClick={()=>onCompare(phone)} style={{flex:1,padding:"9px",borderRadius:10,border:`1.5px solid ${inCompare?"#0071e3":(dark?"rgba(255,255,255,.14)":"rgba(0,0,0,.11)")}`,background:inCompare?(dark?"rgba(0,113,227,.18)":"rgba(0,113,227,.07)"):"transparent",fontSize:12.5,fontWeight:600,color:inCompare?"#0071e3":(dark?"rgba(255,255,255,.45)":"rgba(0,0,0,.45)"),cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
            <BarChart2 size={12}/> {inCompare?"Added ✓":"+ Compare"}
          </button>
          {phone.onOpenMedia && (
            <button className="nbtn" onClick={()=>phone.onOpenMedia(phone)} style={{flex:1,padding:"9px",borderRadius:10,border:`1.5px solid ${dark?"rgba(255,255,255,.14)":"rgba(0,0,0,.11)"}`,background:"transparent",fontSize:12.5,fontWeight:600,color:dark?"rgba(255,255,255,.8)":"rgba(0,0,0,.8)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
              <Youtube size={12} color="#ff0000" /> Media
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ SPEC COMPARATOR & REMARKS STUDIO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function CompareStudio({ selectedPhones, onTogglePhone, dark, onClose, isModal }) {
  const bg=dark?"radial-gradient(ellipse at 20% 50%,rgba(0,113,227,.15) 0%,transparent 52%),#0b0b0e":"#fbfbfd";
  const cardBg=dark?"rgba(22,22,26,.94)":"rgba(255,255,255,.96)";
  const brd=dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)";
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(255,255,255,.48)":"rgba(0,0,0,.48)";

  const [userRemarks, setUserRemarks] = useState(() => {
    try { return localStorage.getItem("phopee_user_remarks") || ""; } catch(e) { return ""; }
  });
  const [savedToast, setSavedToast] = useState(false);

  const saveRemarks = () => {
    try { localStorage.setItem("phopee_user_remarks", userRemarks); } catch(e) {}
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2200);
  };

  const currentPhones = selectedPhones.length > 0 ? selectedPhones : [PHONES[0], PHONES[1]];
  const remarksData = generateComparisonRemarks(currentPhones);

  const specsRows = [
    ["pStr", "💰 MRP Price", p => <span style={{fontWeight:700,color:tx}}>{p.pStr}</span>],
    ["os", "📱 Operating System", p => <span style={{fontWeight:600,color:tx}}>{p.os === "ios" ? "🍎 Apple iOS" : "🤖 Android"}</span>],
    ["perf", "⚡ Speed & Processor", p => (
      <div>
        <div style={{fontWeight:700,color:tx}}>{p.perf}/10</div>
        <div style={{fontSize:11,color:sb}}>{p.pros[0]}</div>
      </div>
    )],
    ["cam", "📷 Camera Rating", p => (
      <div>
        <div style={{fontWeight:700,color:tx}}>{p.cam}/10</div>
        <div style={{fontSize:11,color:sb}}>{p.pros[1] || "Pro Camera Optics"}</div>
      </div>
    )],
    ["bat", "🔋 Battery Endurance", p => (
      <div>
        <div style={{fontWeight:700,color:tx}}>{p.bat}/10</div>
        <div style={{fontSize:11,color:sb}}>{p.pros[2] || "All-day Battery"}</div>
      </div>
    )],
    ["g", "🎮 Gaming Performance", p => (
      <div>
        <div style={{fontWeight:700,color:tx}}>{p.g}/10</div>
        <div style={{fontSize:11,color:sb}}>{p.g >= 9.5 ? "144Hz / Max Graphics" : p.g >= 8.8 ? "Smooth 90-120Hz Gaming" : "Standard Gaming"}</div>
      </div>
    )],
    ["size", "📐 Form Factor", p => <span style={{textTransform:"capitalize",fontWeight:600,color:tx}}>{p.size} ({p.size === "compact" ? '< 6.3"' : p.size === "standard" ? '6.3"–6.5"' : '6.5"+'})</span>],
    ["storage", "💾 Storage Options", p => (
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {p.storage.map(s => <span key={s} style={{fontSize:10.5,fontWeight:600,background:dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.06)",borderRadius:6,padding:"2px 6px",color:tx}}>{s>=1000?"1TB":s+"GB"}</span>)}
      </div>
    )],
    ["pros", "✨ Key Strengths", p => (
      <ul style={{margin:0,paddingLeft:14,fontSize:11.5,color:sb}}>
        {p.pros.map((pr,i) => <li key={i} style={{marginBottom:2}}>{pr}</li>)}
      </ul>
    )],
  ];

  const cols = `160px repeat(${currentPhones.length}, 1fr)`;

  const content = (
    <div style={{maxWidth:1100,margin:"0 auto",padding:isModal?"20px 20px 30px":"80px 20px 60px"}}>
      {/* Header */}
      <div className="au" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24,flexWrap:"wrap",gap:16}}>
        <div>
          <div style={{display:"inline-flex",alignItems:"center",gap:6,background:dark?"rgba(0,113,227,.18)":"rgba(0,113,227,.07)",border:`1px solid ${dark?"rgba(0,113,227,.38)":"rgba(0,113,227,.18)"}`,borderRadius:20,padding:"4px 12px",marginBottom:10}}>
            <BarChart2 size={13} color="#0071e3"/>
            <span style={{fontSize:11,fontWeight:700,color:"#0071e3",letterSpacing:"0.5px",textTransform:"uppercase"}}>Detailed Spec Comparison</span>
          </div>
          <h1 style={{fontSize:"clamp(24px,4vw,38px)",fontWeight:800,color:tx,letterSpacing:"-1px",lineHeight:1.15}}>
            Compare Phones Side-By-Side
          </h1>
          <p style={{fontSize:14,color:sb,marginTop:6}}>Select phones to inspect exact technical specs and read expert comparison remarks.</p>
        </div>
        {isModal && (
          <button className="nbtn" onClick={onClose} style={{background:dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.06)",border:"none",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <X size={16} color={tx}/>
          </button>
        )}
      </div>

      {/* Phone Selector Dropdowns / Chips */}
      <div className="au d1" style={{background:cardBg,border:`1px solid ${brd}`,borderRadius:18,padding:"16px 20px",marginBottom:24}}>
        <div style={{fontSize:13,fontWeight:700,color:tx,marginBottom:12,display:"flex",alignItems:"center",gap:6}}>
          <Plus size={14} color="#0071e3"/> Add or Swap Phones to Compare (Up to 4)
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {PHONES.map(ph => {
            const isSelected = !!currentPhones.find(p => p.id === ph.id);
            return (
              <button key={ph.id} onClick={() => onTogglePhone(ph)} className="nbtn" style={{fontSize:12,fontWeight:600,padding:"6px 12px",borderRadius:20,border:`1px solid ${isSelected?"#0071e3":(dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.08)")}`,background:isSelected?(dark?"rgba(0,113,227,.25)":"rgba(0,113,227,.1)"):(dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.03)"),color:isSelected?"#0071e3":tx,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5}}>
                {isSelected ? "✓ " : "+ "}{ph.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Specs Table */}
      <div className="au d2" style={{background:cardBg,border:`1px solid ${brd}`,borderRadius:22,overflow:"hidden",boxShadow:dark?"0 20px 50px rgba(0,0,0,.4)":"0 16px 40px rgba(0,0,0,.05)",marginBottom:36}}>
        <div style={{overflowX:"auto"}}>
          <div style={{minWidth:650,padding:20}}>
            {/* Headers */}
            <div style={{display:"grid",gridTemplateColumns:cols,gap:16,paddingBottom:16,borderBottom:`1px solid ${brd}`,alignItems:"stretch"}}>
              <div style={{display:"flex",alignItems:"center",fontSize:13,fontWeight:800,color:sb,textTransform:"uppercase",letterSpacing:"0.5px"}}>SPECIFICATION</div>
              {currentPhones.map(ph => {
                const [c1,c2]=GR[ph.brand]||["#333","#555"];
                const links=getLinks(ph.name);
                return (
                  <div key={ph.id} style={{background:`linear-gradient(145deg,${c1},${c2})`,borderRadius:16,padding:16,color:"#fff",display:"flex",flexDirection:"column",justifyContent:"space-between",position:"relative"}}>
                    {currentPhones.length > 2 && (
                      <button onClick={() => onTogglePhone(ph)} style={{position:"absolute",top:8,right:8,background:"rgba(255,255,255,.2)",border:"none",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
                        <X size={11} color="#fff"/>
                      </button>
                    )}
                    <div>
                      <span style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,.65)",textTransform:"uppercase",letterSpacing:"0.6px"}}>{ph.brand}</span>
                      <div style={{fontSize:16,fontWeight:800,letterSpacing:"-0.3px",marginTop:2,lineHeight:1.2}}>{ph.name}</div>
                      <div style={{fontSize:14,fontWeight:700,color:"rgba(255,255,255,.85)",marginTop:4}}>{ph.pStr}</div>
                    </div>
                    <div style={{marginTop:12,display:"flex",gap:4}}>
                      <a href={links.amazon} target="_blank" rel="noreferrer" style={{flex:1,textAlign:"center",fontSize:10.5,fontWeight:700,background:"#e47911",color:"#fff",borderRadius:6,padding:"4px 0",textDecoration:"none"}}>Amazon</a>
                      <a href={links.flipkart} target="_blank" rel="noreferrer" style={{flex:1,textAlign:"center",fontSize:10.5,fontWeight:700,background:"#2874f0",color:"#fff",borderRadius:6,padding:"4px 0",textDecoration:"none"}}>Flipkart</a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rows */}
            {specsRows.map(([key, label, renderFn], idx) => (
              <div key={key} style={{display:"grid",gridTemplateColumns:cols,gap:16,padding:"14px 0",borderBottom:idx===specsRows.length-1?"none":`1px solid ${brd}`,alignItems:"center"}}>
                <div style={{fontSize:12.5,fontWeight:700,color:sb}}>{label}</div>
                {currentPhones.map(ph => (
                  <div key={ph.id} style={{fontSize:12.5}}>
                    {renderFn(ph)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━ REMARKS & VERDICT SECTION ━━━━━━━━━━━━━━━━━━━━ */}
      {remarksData && (
        <div className="au d3" style={{background:cardBg,border:`1px solid ${brd}`,borderRadius:22,padding:"28px 24px",boxShadow:dark?"0 20px 50px rgba(0,0,0,.4)":"0 16px 40px rgba(0,0,0,.05)",marginBottom:36}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
            <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#0071e3,#bf5af2)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <Award size={20} color="#fff"/>
            </div>
            <div>
              <h2 style={{fontSize:20,fontWeight:800,color:tx,letterSpacing:"-0.4px"}}>Comparison Remarks & Expert Verdict</h2>
              <p style={{fontSize:12.5,color:sb}}>Automated breakdown of category winners and key takeaways.</p>
            </div>
          </div>

          {/* Verdict Summary Box */}
          <div style={{background:dark?"rgba(0,113,227,.12)":"rgba(0,113,227,.05)",border:`1px solid ${dark?"rgba(0,113,227,.3)":"rgba(0,113,227,.15)"}`,borderRadius:16,padding:"16px 20px",marginBottom:24}}>
            <div style={{fontSize:12,fontWeight:800,color:"#0071e3",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:6}}>Summary Takeaway</div>
            <div style={{fontSize:14.5,fontWeight:600,color:tx,lineHeight:1.6}}>{remarksData.summaryVerdict}</div>
          </div>

          {/* Category Highlights Grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:14,marginBottom:28}}>
            {remarksData.highlights.map(hl => (
              <div key={hl.title} style={{background:dark?"rgba(255,255,255,.03)":"rgba(0,0,0,.02)",border:`1px solid ${dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.06)"}`,borderRadius:16,padding:"16px"}}>
                <div style={{fontSize:12.5,fontWeight:800,color:hl.color,marginBottom:6}}>{hl.title}</div>
                <div style={{fontSize:15,fontWeight:800,color:tx,letterSpacing:"-0.2px",marginBottom:4}}>{hl.phone}</div>
                <span style={{fontSize:11,fontWeight:700,background:dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.06)",color:tx,padding:"2px 8px",borderRadius:10,display:"inline-block",marginBottom:8}}>{hl.badge}</span>
                <p style={{fontSize:12,color:sb,lineHeight:1.5,margin:0}}>{hl.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive User Remarks Box */}
          <div style={{borderTop:`1px solid ${brd}`,paddingTop:22}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
              <div style={{fontSize:14,fontWeight:800,color:tx,display:"flex",alignItems:"center",gap:6}}>
                <Edit3 size={15} color="#0071e3"/> Add Your Personal Notes & Remarks
              </div>
              {savedToast && <span className="ai" style={{fontSize:12,fontWeight:700,color:"#30d158"}}>✓ Saved to browser!</span>}
            </div>
            <textarea
              value={userRemarks}
              onChange={e => setUserRemarks(e.target.value)}
              placeholder="Type your personal observations or decision notes here (e.g. 'Choosing S25 Ultra for S Pen & battery life...')..."
              style={{width:"100%",minHeight:90,borderRadius:12,padding:14,background:dark?"rgba(0,0,0,.4)":"rgba(0,0,0,.03)",border:`1px solid ${brd}`,color:tx,fontSize:13.5,outline:"none",fontFamily:"inherit",resize:"vertical"}}
            />
            <div style={{display:"flex",justifyContent:"flex-end",marginTop:10}}>
              <button className="cta" onClick={saveRemarks} style={{background:"#0071e3",color:"#fff",border:"none",borderRadius:10,padding:"9px 20px",fontSize:13,fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:6}}>
                <MessageSquare size={13}/> Save Remarks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="ai" style={{position:"fixed",inset:0,zIndex:200,background:"rgba(0,0,0,.75)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",overflowY:"auto"}}>
        <div style={{background:bg,minHeight:"100vh"}}>
          {content}
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:bg}}>
      {content}
    </div>
  );
}

function PhoneMediaModal({ phone, dark, onClose }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bg = dark ? "rgba(22,22,26,.94)" : "rgba(255,255,255,.96)";
  const tx = dark ? "#f5f5f7" : "#1d1d1f";
  const brd = dark ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.08)";
  const sb = dark ? "rgba(255,255,255,.5)" : "rgba(0,0,0,.5)";

  useEffect(() => {
    async function fetchImages() {
      try {
        const query = encodeURIComponent(`${phone.brand} ${phone.name} smartphone high quality`);
        const res = await fetch(`/api/fetch-images?q=${query}`);
        const data = await res.json();
        if (res.ok) {
          setImages(data.images || []);
        } else {
          setError(data.error || "Failed to load images.");
        }
      } catch (e) {
        setError("Network error fetching images.");
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [phone]);

  return (
    <div className="ai" style={{position:"fixed",inset:0,zIndex:300,background:"rgba(0,0,0,.8)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div className="as" style={{background:bg,width:"100%",maxWidth:800,maxHeight:"90vh",borderRadius:24,border:\`1px solid \${brd}\`,display:"flex",flexDirection:"column",overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,.4)"}}>
        <div style={{padding:"20px 24px",borderBottom:\`1px solid \${brd}\`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
          <div>
            <div style={{fontSize:12,fontWeight:700,color:sb,textTransform:"uppercase",letterSpacing:"0.5px"}}>{phone.brand}</div>
            <div style={{fontSize:22,fontWeight:800,color:tx,letterSpacing:"-0.5px"}}>{phone.name} Media</div>
          </div>
          <button className="nbtn" onClick={onClose} style={{background:dark?"rgba(255,255,255,.1)":"rgba(0,0,0,.06)",border:"none",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <X size={16} color={tx}/>
          </button>
        </div>
        <div style={{overflowY:"auto",padding:24,flex:1}}>
          <h3 style={{fontSize:16,fontWeight:700,color:tx,display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
            <Youtube size={18} color="#ff0000"/> Top YouTube Review & Trailer
          </h3>
          <div style={{width:"100%",aspectRatio:"16/9",background:"#000",borderRadius:12,overflow:"hidden",marginBottom:32}}>
            <iframe 
              width="100%" 
              height="100%" 
              src={\`https://www.youtube.com/embed?listType=search&list=\${encodeURIComponent(phone.brand + ' ' + phone.name + ' review trailer')}\`} 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen>
            </iframe>
          </div>
          
          <h3 style={{fontSize:16,fontWeight:700,color:tx,display:"flex",alignItems:"center",gap:6,marginBottom:16}}>
            <ImageIcon size={18} color="#0071e3"/> Actual Photos
          </h3>
          {loading ? (
            <div style={{display:"flex",gap:8,padding:"40px 0",justifyContent:"center"}}>
              {["dot1","dot2","dot3"].map(c=><div key={c} className={c} style={{width:8,height:8,borderRadius:"50%",background:"#0071e3"}}/>)}
            </div>
          ) : error ? (
            <div style={{padding:"20px",background:dark?"rgba(255,69,58,.1)":"rgba(255,69,58,.05)",color:"#ff453a",borderRadius:12,fontSize:14,fontWeight:600}}>{error}</div>
          ) : images.length > 0 ? (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12}}>
              {images.map((img, i) => (
                <a key={i} href={img.link} target="_blank" rel="noopener noreferrer" style={{display:"block",borderRadius:12,overflow:"hidden",border:\`1px solid \${brd}\`}}>
                  <img src={img.link} alt={img.title} style={{width:"100%",height:160,objectFit:"cover",display:"block"}} onError={(e) => { e.target.src = img.thumbnail; }}/>
                </a>
              ))}
            </div>
          ) : (
            <div style={{fontSize:14,color:sb}}>No images found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultsPage({ results, dark, onRestart, onOpenCompare, onOpenMedia }) {
  const [cmp, setCmp] = useState([]);
  const [showCmp, setShowCmp] = useState(false);
  const bg=dark?"radial-gradient(ellipse at 20% 50%,rgba(0,113,227,.15) 0%,transparent 52%),radial-gradient(ellipse at 80% 15%,rgba(191,90,242,.1) 0%,transparent 52%),#000":"radial-gradient(ellipse at 20% 50%,rgba(0,113,227,.08) 0%,transparent 52%),radial-gradient(ellipse at 80% 15%,rgba(191,90,242,.06) 0%,transparent 52%),#fbfbfd";
  const tx=dark?"#f5f5f7":"#1d1d1f";
  const sb=dark?"rgba(245,245,247,.52)":"rgba(29,29,31,.52)";
  const brd=dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.07)";
  const top3=results.slice(0,3);
  const rest=results.slice(3,6);
  const toggle=(ph)=>setCmp(c=>c.find(p=>p.id===ph.id)?c.filter(p=>p.id!==ph.id):c.length>=4?c:[...c,ph]);
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
          {top3.map((p,i)=><PhoneCard key={p.id} phone={{...p, onOpenMedia}} rank={i+1} dark={dark} onCompare={toggle} inCompare={!!cmp.find(c=>c.id===p.id)}/>)}
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
        {/* Restart / Compare buttons */}
        <div style={{display:"flex",justifyContent:"center",gap:12,flexWrap:"wrap"}}>
          <button className="nbtn" onClick={onRestart} style={{display:"inline-flex",alignItems:"center",gap:8,background:"transparent",border:`1.5px solid ${dark?"rgba(255,255,255,.18)":"rgba(0,0,0,.14)"}`,borderRadius:980,padding:"12px 28px",fontSize:14,fontWeight:600,color:sb,cursor:"pointer"}}>
            <RotateCcw size={14}/> Start Over
          </button>
          <button className="cta" onClick={() => onOpenCompare(top3)} style={{display:"inline-flex",alignItems:"center",gap:8,background:"#0071e3",color:"#fff",border:"none",borderRadius:980,padding:"12px 28px",fontSize:14,fontWeight:700,cursor:"pointer",boxShadow:"0 6px 20px rgba(0,113,227,.35)"}}>
            <BarChart2 size={15}/> Compare Top Matches in Detail
          </button>
        </div>
      </div>
      {/* Compare bar */}
      {cmp.length>=2&&(
        <div className="au" style={{position:"fixed",bottom:20,left:"50%",transform:"translateX(-50%)",zIndex:50,background:dark?"rgba(28,28,30,.96)":"rgba(255,255,255,.96)",backdropFilter:"blur(22px)",WebkitBackdropFilter:"blur(22px)",border:`1px solid ${dark?"rgba(255,255,255,.14)":"rgba(0,0,0,.12)"}`,borderRadius:980,padding:"9px 9px 9px 18px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 8px 36px rgba(0,0,0,.22)",whiteSpace:"nowrap"}}>
          <span style={{fontSize:13,fontWeight:600,color:tx}}>{cmp.length} phones selected</span>
          <button className="cta" onClick={()=>setShowCmp(true)} style={{background:"#0071e3",color:"#fff",border:"none",borderRadius:980,padding:"9px 18px",fontSize:13,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5,boxShadow:"0 4px 16px rgba(0,113,227,.35)"}}>
            <BarChart2 size={13}/> Compare Specs
          </button>
          <button className="nbtn" onClick={()=>setCmp([])} style={{background:"transparent",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer"}}>
            <X size={13} color={sb}/>
          </button>
        </div>
      )}
      {showCmp&&<CompareStudio selectedPhones={cmp} onTogglePhone={toggle} dark={dark} onClose={()=>setShowCmp(false)} isModal={true}/>}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ APP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function App() {
  const [dark, setDark] = useState(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [page, setPage] = useState("home");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [animDir, setAnimDir] = useState("forward");
  const [compareSelection, setCompareSelection] = useState([PHONES[0], PHONES[1]]);
  const [mediaPhone, setMediaPhone] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => setDark(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

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

  const openCompareStudio = (initialPhones) => {
    if (initialPhones && Array.isArray(initialPhones) && initialPhones.length > 0) {
      setCompareSelection(initialPhones);
    }
    setPage("compare");
  };

  const toggleComparePhone = (ph) => {
    setCompareSelection(curr => {
      if (curr.find(p => p.id === ph.id)) {
        return curr.length > 1 ? curr.filter(p => p.id !== ph.id) : curr;
      } else {
        return curr.length >= 4 ? [...curr.slice(1), ph] : [...curr, ph];
      }
    });
  };

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
      <Navbar dark={dark} setDark={setDark} page={page} onRestart={restart} onOpenCompare={() => openCompareStudio()}/>
      {page==="home"    && <HomePage    onStart={startQuiz} onOpenCompare={() => openCompareStudio()} dark={dark}/>}
      {page==="quiz"    && <QuizPage    step={step} question={curQ} answer={curA} onAnswer={setAnswer} onNext={goNext} onPrev={goPrev} dark={dark} animDir={animDir}/>}
      {page==="loading" && <LoadingPage dark={dark}/>}
      {page==="results" && <ResultsPage results={results} dark={dark} onRestart={restart} onOpenCompare={openCompareStudio} onOpenMedia={setMediaPhone}/>}
      {page==="compare" && <CompareStudio selectedPhones={compareSelection} onTogglePhone={toggleComparePhone} dark={dark} onClose={()=>setPage("home")} isModal={false}/>}
      {mediaPhone && <PhoneMediaModal phone={mediaPhone} dark={dark} onClose={() => setMediaPhone(null)} />}
    </div>
  );
}
