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
  $("#coupleNames").textContent = `${cfg.yourName || "Quang Thuận"} ❤️ ${cfg.partnerName || "Huỳnh Giao"}`;
  $("#specialDate").textContent = cfg.specialDate || "";
  setTimeout(()=>showScreen("finale"),350);
  for(let i=0;i<35;i++) setTimeout(spawnHeart, i*80);
});

function spawnHeart(){
  const h=document.createElement("span");
  h.className="floating-heart";
  h.textContent=["❤","💗","💕","💖"][Math.floor(Math.random()*4)];
  h.style.left=(Math.random()*100)+"vw";
  h.style.setProperty("--size",(14+Math.random()*22)+"px");
  h.style.setProperty("--duration",(5+Math.random()*4)+"s");
  $("#heartRain").appendChild(h);
  setTimeout(()=>h.remove(),9500);
}
setInterval(()=>{ if(Math.random()>.35) spawnHeart(); },900);

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
