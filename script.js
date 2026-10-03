/* ===== EDIT YOUR CONTENT HERE ===== */
const PHOTO="assets/profile.png";
const EMAIL="tan.johnmichaelg10@gmail.com";
const PROJECTS=[
 {t:"BroShop",c:"Full-stack",d:"Browse and filter a sample catalog, manage a shopping cart, and try the demo checkout.",s:["Product Catalog","Cart","Demo Checkout"],g:"linear-gradient(135deg,#2a1066,#6b2bd1)",url:"projects/broshop.html"},
 {t:"BroTasks",c:"Web App",d:"Create, organize, search, and filter tasks across a simple workflow. Tasks save in your browser.",s:["Task Manager","Local Storage","Drag and Drop"],g:"linear-gradient(135deg,#1b1038,#3d2a8f)",url:"projects/brotasks.html"},
 {t:"BroCrypto",c:"Dashboard",d:"Explore a simulated crypto dashboard with portfolio tracking, conversion, watchlists, and price charts.",s:["Dashboard","Portfolio","Simulated Data"],g:"linear-gradient(135deg,#052a33,#0e6b73)",url:"projects/brocrypto.html"}
];
const STATS=[["4+","Years Experience"],["50+","Projects Completed"],["30+","Happy Clients"],["100%","Client Satisfaction"]];
const SVC=[["🎨","Web design & development","Strategy, UX, visual design, and clean frontend development—shaped into one focused experience that feels distinctly yours.",["UX/UI","React","Next.js"]],
["📱","Responsive websites","Fast, accessible websites that stay clear and polished across desktop, tablet, and every mobile breakpoint.",["Mobile-first","A11y","SEO"]],
["🛒","E-commerce","Conversion-minded storefronts with flexible catalogs, secure checkout, and a smooth path from discovery to purchase.",["Shopify","Stripe","CMS"]],
["📊","SaaS & dashboards","Scalable product interfaces that turn complex workflows and live data into tools people understand immediately.",["SaaS","Analytics","Design systems"]],
["🔌","API integrations","Reliable connections between your product and the services it depends on—from payments and CRM to custom APIs.",["REST","Webhooks","Auth"]],
["🛡️","Ongoing maintenance","Proactive updates, monitoring, performance improvements, and dependable support after your product goes live.",["Support","Performance","Security"]]];
const STEPS=[["🧭","Discover","Align on the goal","We define users, priorities, scope, and what success should look like."],["✏️","Design","Shape the experience","Wireframes and visual direction turn the brief into a clear product system."],["⌨️","Build","Develop with care","Responsive code, integrations, testing, and thoughtful micro-details."],["🚀","Launch","Ship and improve","A smooth handoff, measured launch, and support for what comes next."]];
/* ================================== */

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const FALLBACK="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='38' r='17' fill='%23d9b8ff'/%3E%3Cpath d='M12 100c2-30 18-40 38-40s36 10 38 40z' fill='%23d9b8ff'/%3E%3C/svg%3E";
$$('.me').forEach(i=>{i.src=PHOTO||FALLBACK;i.onerror=()=>{i.onerror=null;i.src=FALLBACK}});

const card=(p,i)=>`<article class="pc"><div class="shot" style="--g:${p.g}"><span></span></div><div class="pb"><div class="row"><span class="num">0${i+1}</span><span class="arr">↗</span></div><h3>${p.t}</h3><p>${p.d}</p><div class="project-actions"><a class="link" href="${p.url}" target="_blank" rel="noopener">Open demo ↗</a><button class="link" data-p="${PROJECTS.indexOf(p)}">Details</button></div></div></article>`;
function fill(el,list){el.innerHTML=list.map(card).join("");const d=el.nextElementSibling;if(d&&d.classList.contains("dots")){d.innerHTML=list.map((_,i)=>`<i class="${i?"":"on"}"></i>`).join("");el.onscroll=()=>{const k=Math.round(el.scrollLeft/(el.scrollWidth/list.length));$$("i",d).forEach((x,j)=>x.classList.toggle("on",j===k))}}}
$$('[data-projects]').forEach(e=>fill(e,PROJECTS.slice(0,+e.dataset.projects)));
fill($("#allp"),PROJECTS);
const cats=["All",...new Set(PROJECTS.map(p=>p.c))];
$("#filters").innerHTML=cats.map((c,i)=>`<button class="${i?"":"on"}">${c}</button>`).join("");
$("#filters").onclick=e=>{const b=e.target.closest("button");if(!b)return;$$("#filters button").forEach(x=>x.classList.toggle("on",x===b));fill($("#allp"),b.textContent=="All"?PROJECTS:PROJECTS.filter(p=>p.c==b.textContent))};
$("#stats").innerHTML=STATS.map(s=>`<div class="stat"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");
$("#svc").innerHTML=SVC.map((s,i)=>`<div class="sc"><div class="row"><div class="ic">${s[0]}</div><small>0${i+1}</small></div><h3>${s[1]}</h3><p>${s[2]}</p><div class="tg">${s[3].map(t=>`<i>${t}</i>`).join("")}</div></div>`).join("");
$("#steps").innerHTML=STEPS.map((s,i)=>`<div class="step"><div class="row"><span>${s[0]}</span><small>0${i+1} / ${s[1]}</small></div><h3>${s[2]}</h3><p>${s[3]}</p></div>`).join("");

/* dialogs */
const pd=$("#pd"),cd=$("#cd");
document.addEventListener("click",e=>{
 const p=e.target.closest("[data-p]");
 if(p){const o=PROJECTS[p.dataset.p];$("#pdShot").style.setProperty("--g",o.g);$("#pdT").textContent=o.t;$("#pdD").textContent=o.d;$("#pdTg").innerHTML=o.s.map(t=>`<i>${t}</i>`).join("");pd.showModal()}
 if(e.target.closest("[data-contact]")){$("#menu").setAttribute("aria-expanded",false);$("#nav").classList.remove("open");cd.showModal()}
 if(e.target.closest("[data-close]"))e.target.closest("dialog").close();
 if(e.target===pd||e.target===cd)e.target.close();
});
$("#cf").addEventListener("submit",()=>{
 const b=encodeURIComponent(`${$("#m").value}\n\nFrom: ${$("#n").value} (${$("#e").value})`);
 location.href=`mailto:${EMAIL}?subject=${encodeURIComponent("Project inquiry from "+$("#n").value)}&body=${b}`;cd.close();
});

/* routing */
const pages=$$(".page").map(p=>p.id),T={home:"Home",about:"About",services:"Services",projects:"Projects"};
function route(){const id=pages.includes(location.hash.slice(1))?location.hash.slice(1):"home";
 $$(".page").forEach(p=>p.classList.toggle("show",p.id===id));
 $$("nav a").forEach(a=>a.classList.toggle("on",a.hash==="#"+id));
 document.title=`Michael | ${T[id]}`;scrollTo({top:0,behavior:"instant"});
 $("#nav").classList.remove("open");$("#menu").setAttribute("aria-expanded",false)}
addEventListener("hashchange",route);route();
$("#menu").onclick=()=>{const o=$("#nav").classList.toggle("open");$("#menu").setAttribute("aria-expanded",o)};

