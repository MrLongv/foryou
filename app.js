const cfg = window.LOVE_CONFIG || {};
const $ = s => document.querySelector(s);
const screens = ["intro","story","question","finale"];

function showScreen(id){
  screens.forEach(x => $("#"+x).classList.toggle("active", x===id));
}

const envelope = $("#envelope");
const typing = $("#typing");
const nextBtn = $("#nextBtn");
let msgIndex = 0;
let typingTimer;

function typeText(text, done){
  clearInterval(typingTimer);
  typing.textContent = "";
  let i=0;
  typingTimer = setInterval(()=>{
    typing.textContent += text.charAt(i++);
    if(i >= text.length){
      clearInterval(typingTimer);
      done && done();
    }
  }, 48);
}

envelope.addEventListener("click", ()=>{
  envelope.classList.add("open");
  romanticBurst(18);
  setTimeout(()=>{
    showScreen("story");
    msgIndex = 0;
    typeText(cfg.messages?.[msgIndex] || "Anh có một điều muốn nói với em…", ()=>{
      nextBtn.classList.remove("hidden");
    });
  }, 1350);
});

nextBtn.addEventListener("click", ()=>{
  nextBtn.classList.add("hidden");
  msgIndex++;
  if(msgIndex < (cfg.messages?.length || 0)){
    typeText(cfg.messages[msgIndex], ()=>nextBtn.classList.remove("hidden"));
  }else{
    romanticBurst(20);
    showScreen("question");
  }
});

$("#thinkBtn").addEventListener("click", ()=>{
  $("#thinkMsg").textContent = cfg.thinkMessage || "Anh vẫn sẽ chờ câu trả lời của em ❤️";
  $("#thinkBtn").animate(
    [{transform:"translateX(0)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0)"}],
    {duration:420}
  );
});

$("#yesBtn").addEventListener("click", ()=>{
  burstConfetti();
  romanticBurst(56);
  $("#coupleNames").textContent = `${cfg.yourName || "ANH"} ❤️ ${cfg.partnerName || "EM"}`;
  $("#specialDate").textContent = cfg.specialDate || "";
  setTimeout(()=>{
    showScreen("finale");
    romanticBurst(42);
  },420);
});

const HEARTS = ["❤","♥","♡","💗","💕","💖","💞"];
let ambientMode = true;

function spawnHeart(intense=false){
  const h=document.createElement("span");
  h.className="floating-heart";

  const icon=HEARTS[Math.floor(Math.random()*HEARTS.length)];
  h.textContent=icon;

  const size=intense ? 18+Math.random()*34 : 12+Math.random()*27;
  const duration=intense ? 4.2+Math.random()*3.2 : 5.3+Math.random()*4.2;

  h.style.left=(Math.random()*100)+"vw";
  h.style.setProperty("--size",size+"px");
  h.style.setProperty("--duration",duration+"s");
  h.style.setProperty("--drift1",(-45+Math.random()*90)+"px");
  h.style.setProperty("--drift2",(-85+Math.random()*170)+"px");

  const styleRoll=Math.random();
  if(styleRoll>.72) h.classList.add("heart-glow");
  else if(styleRoll>.42) h.classList.add("heart-soft");
  else h.classList.add("heart-outline");

  // small random depth effect
  h.style.opacity=(.66+Math.random()*.34).toFixed(2);
  $("#heartRain").appendChild(h);
  setTimeout(()=>h.remove(),10000);
}

function spawnSparkle(){
  const s=document.createElement("span");
  s.className="sparkle-dot";
  s.style.left=(Math.random()*100)+"vw";
  s.style.setProperty("--dot",(1.5+Math.random()*3.8)+"px");
  s.style.setProperty("--duration",(4.5+Math.random()*4.5)+"s");
  s.style.setProperty("--drift",(-55+Math.random()*110)+"px");
  $("#heartRain").appendChild(s);
  setTimeout(()=>s.remove(),9500);
}

// richer ambient stream: dense enough to feel magical, still mobile friendly
setInterval(()=>{
  if(!ambientMode) return;
  spawnHeart(false);
  if(Math.random()>.35) spawnHeart(false);
  if(Math.random()>.42) spawnSparkle();
},360);

function romanticBurst(count=44){
  const ring=document.createElement("div");
  ring.className="love-ring";
  document.body.appendChild(ring);
  setTimeout(()=>ring.remove(),1300);

  for(let i=0;i<count;i++){
    const h=document.createElement("span");
    h.className="heart-burst";
    h.textContent=HEARTS[Math.floor(Math.random()*HEARTS.length)];

    const angle=Math.random()*Math.PI*2;
    const distance=95+Math.random()*Math.min(innerWidth,innerHeight)*.62;
    const x=Math.cos(angle)*distance;
    const y=Math.sin(angle)*distance;

    h.style.setProperty("--x",x+"px");
    h.style.setProperty("--y",y+"px");
    h.style.setProperty("--rot",(-120+Math.random()*240)+"deg");
    h.style.setProperty("--size",(18+Math.random()*34)+"px");
    h.style.setProperty("--duration",(1.15+Math.random()*1.55)+"s");

    document.body.appendChild(h);
    setTimeout(()=>h.remove(),2900);
  }

  // Follow-up wave for a fuller, more luxurious finale
  for(let i=0;i<26;i++){
    setTimeout(()=>spawnHeart(true),i*55);
  }
}

function burstConfetti(){
  for(let i=0;i<90;i++){
    const c=document.createElement("i");
    c.className="confetti";
    c.style.left=Math.random()*100+"vw";
    c.style.setProperty("--h",Math.floor(Math.random()*360));
    c.style.setProperty("--d",(2.4+Math.random()*2.6)+"s");
    c.style.setProperty("--r",(Math.random()*180)+"deg");
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),5200);
  }
}

// starfield
const canvas=$("#stars"), ctx=canvas.getContext("2d");
let stars=[];
function resize(){
  const dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=innerWidth*dpr; canvas.height=innerHeight*dpr;
  canvas.style.width=innerWidth+"px"; canvas.style.height=innerHeight+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
  stars=Array.from({length:Math.min(110,Math.floor(innerWidth/4))},()=>({
    x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:.4+Math.random()*1.4,a:.2+Math.random()*.8,s:.002+Math.random()*.008
  }));
}
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  stars.forEach(s=>{
    s.a += s.s; if(s.a>1||s.a<.18) s.s*=-1;
    ctx.beginPath(); ctx.fillStyle=`rgba(255,235,246,${s.a})`; ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(draw);
}
addEventListener("resize",resize); resize(); draw();

// optional local music
let audio=null, musicOn=false;
const musicBtn=$("#musicBtn");
if(cfg.enableLocalMusic){
  audio=new Audio("music.mp3"); audio.loop=true; audio.volume=.45;
}
musicBtn.addEventListener("click", async ()=>{
  if(!audio){
    musicBtn.textContent="♡";
    return;
  }
  if(musicOn){ audio.pause(); musicOn=false; musicBtn.textContent="♫"; }
  else{
    try{ await audio.play(); musicOn=true; musicBtn.textContent="❚❚"; }catch(e){}
  }
});
