/* S&A Kitchen: screens */
(function(){
'use strict';
var C = window.SAK, D = C.D, esc = C.esc, FD = window.SA_FOODS;
var B = null, phase = 'loading', authMode = 'in', authErr = '', subs = {}, view = {tab:'today', page:null}, ui = {};
var cook = null, AC = null, WL = null;
var LS = {get:function(k, d){ try{ var v = localStorage.getItem('sak_' + k); return v == null ? d : JSON.parse(v); }catch(e){ return d; } },
          set:function(k, v){ try{ localStorage.setItem('sak_' + k, JSON.stringify(v)); }catch(e){} }};
var pref = {diet: LS.get('diet', 'all'), planWeek: 0};

/* ---------- small helpers ---------- */
function $(id){ return document.getElementById(id); }
function I(n, sz){
  var P = {
    check:'<path d="M5 12l5 5L20 7"/>', x:'<path d="M6 6l12 12M18 6L6 18"/>', back:'<path d="M15 6l-6 6 6 6"/>', right:'<path d="M9 6l6 6-6 6"/>',
    star:'<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9z"/>',
    starf:'<path fill="currentColor" d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8-4.3-4.1 5.9-.9z"/>',
    edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>', plus:'<path d="M12 5v14M5 12h14"/>', minus:'<path d="M5 12h14"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>', filter:'<path d="M4 6h16M7 12h10M10 18h4"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    book:'<path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 1-4-4z"/><path d="M5 16a4 4 0 0 1 4-4h10"/>',
    cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    cart:'<path d="M3 4h2l2.4 11h11L21 7H6"/><circle cx="9" cy="19.5" r="1.5"/><circle cx="17" cy="19.5" r="1.5"/>',
    chef:'<path d="M7 14a4 4 0 0 1-1-7.9A5 5 0 0 1 15.6 5 4 4 0 0 1 17 14"/><path d="M7 14v6h10v-6"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', play:'<path d="M7 4l13 8-13 8z"/>', pause:'<path d="M7 4v16M17 4v16"/>',
    share:'<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v7h14v-7"/>', snow:'<path d="M12 2v20M4 7l16 10M20 7L4 17"/>',
    alert:'<path d="M12 3l10 18H2z"/><path d="M12 10v4M12 17.5v.5"/>', drop:'<path d="M12 3s7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 7-12 7-12z"/>',
    gym:'<path d="M4 9v6M8 7v10M16 7v10M20 9v6M8 12h8"/>', trash:'<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    leaf:'<path d="M5 19c0-9 6-14 15-14-1 9-6 15-15 14z"/><path d="M5 19l8-8"/>', info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
    copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
    sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>', fridge:'<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M6 10h12M9 6v2M9 13v3"/>'
  };
  sz = sz || 20;
  return '<svg viewBox="0 0 24 24" width="'+sz+'" height="'+sz+'" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(P[n]||'')+'</svg>';
}
function mark(d){
  if(d === 'non') return '<svg class="mark" width="15" height="15" viewBox="0 0 16 16" role="img" aria-label="Non-veg"><rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="#A32D2D" stroke-width="1.6"/><path d="M8 4l4.2 7.5H3.8z" fill="#A32D2D"/></svg>';
  var leaf = d === 'nog';
  return '<svg class="mark" width="'+(leaf?24:15)+'" height="15" viewBox="0 0 '+(leaf?26:16)+' 16" role="img" aria-label="'+(leaf?'Veg, no onion and garlic':'Veg')+'"><rect x="1" y="1" width="14" height="14" rx="2" fill="none" stroke="#1D9E75" stroke-width="1.6"/><circle cx="8" cy="8" r="3.6" fill="#1D9E75"/>'+(leaf?'<path d="M18 13c0-5 3-9 7-10-1 5-3 9-7 10z" fill="#5DCAA5"/>':'')+'</svg>';
}
function dot(key, house){
  if(house) return '';
  var f = C.food(key), r = f ? C.rate(f) : null;
  var lab = r ? C.RATE[r][0] : 'Not rated yet';
  return '<span class="kd '+(r || 'n')+'" role="img" aria-label="'+lab+'"></span>';
}
function toast(msg){ var t = $('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(function(){ t.classList.remove('on'); }, 2400); }
function fail(e){ console.warn(e); if(e && e.code === 'permission-denied'){ phase = 'waiting'; render(); } }
function uid(){ return C.me && C.me.uid; }
function fmtN(n){ return Math.round(n).toLocaleString(); }

/* ---------- data writes (save locally first, sync when online) ---------- */
var W = {
  set:function(p, d, m){ B.set(p, d, m).catch(fail); },
  upd:function(p, f){ B.update(p, f).catch(fail); },
  ensure:function(p, base){ B.set(p, base || {}, true).catch(fail); },
  slot:function(wk, d, s, val){ W.ensure('plans/' + wk, {wk:wk}); var f = {}; f['d'+d+'.'+s] = val == null ? B.DEL : val; W.upd('plans/' + wk, f); },
  many:function(wk, fields){ W.ensure('plans/' + wk, {wk:wk}); if(Object.keys(fields).length) W.upd('plans/' + wk, fields); }
};

/* ---------- subscriptions ---------- */
function sub(key, path, cb, col){
  if(subs[key]) return;
  subs[key] = (col ? B.subCol : B.sub).call(B, path, function(d){ cb(d); scheduleRender(); }, function(e){ fail(e); });
}
function unsubAll(){ Object.keys(subs).forEach(function(k){ try{ subs[k](); }catch(e){} }); subs = {}; }
function startSubs(){
  sub('profiles', 'meta/profiles', function(d){ D.profiles = d || {}; if(phase === 'app' || phase === 'setup' || phase === 'syncing'){ phase = D.profiles[uid()] ? 'app' : 'setup'; } });
  sub('settings', 'meta/settings', function(d){ D.settings = d || {}; });
  sub('foods', 'meta/foods', function(d){ D.foods = d || {}; });
  sub('recipes', 'recipes', function(list){ var m = {}; list.forEach(function(o){ m[o.id] = o; }); D.recipes = m; }, true);
  sub('notes', 'notes', function(list){ D.notes = list; }, true);
  sub('groceries', 'groceries', function(list){ D.groceries = list; }, true);
}
function ensureDaySubs(){
  if(phase !== 'app') return;
  var t = C.today(), tk = C.ymd(t);
  [C.wk(t), C.wk(C.addD(t, 7)), C.wk(C.addD(t, -7)), planWk(), C.wk(C.addD(C.parse(planWk()), -7)), C.wk(C.addD(C.parse(planWk()), 7))].forEach(function(wk){
    sub('plan:' + wk, 'plans/' + wk, function(d){ D.plans[wk] = d || {}; });
  });
  sub('day:' + tk, 'days/' + tk, function(d){ D.days[tk] = d || {}; });
  C.uids().forEach(function(u){ var k = tk + '_' + u; sub('ci:' + k, 'checkins/' + k, function(d){ D.checkins[k] = d || {}; }); });
}
var rq = false;
function scheduleRender(){ if(rq) return; rq = true; requestAnimationFrame(function(){ rq = false; render(); }); }

/* ---------- auth flow ---------- */
function onUser(u){
  C.me = u; unsubAll(); D.plans = {}; D.days = {}; D.checkins = {};
  if(!u){ phase = 'auth'; render(); return; }
  phase = 'checking'; render();
  B.check().then(function(ok){
    if(!ok){ phase = 'waiting'; render(); return; }
    phase = 'syncing'; startSubs(); render();
  }).catch(function(e){ console.warn(e); phase = 'offline'; render(); });
}

/* ---------- screens ---------- */
function planWk(){ return C.wk(C.addD(C.today(), 7 * pref.planWeek)); }

function renderAuth(){
  var up = authMode === 'up';
  return '<div class="auth"><img src="icon-180.png" alt="" width="88" height="88" class="logo">'
    + '<h1 class="h1 center">S&amp;A Kitchen</h1><p class="muted center" style="margin:4px 0 22px">Your shared keto kitchen</p>'
    + '<form class="card" id="authf" novalidate>'
    + '<label class="lbl" for="em">Email</label><input class="in" id="em" type="email" autocomplete="email" inputmode="email" required>'
    + '<label class="lbl" for="pw">Password</label><input class="in" id="pw" type="password" autocomplete="'+(up?'new-password':'current-password')+'" required minlength="8">'
    + (up ? '<p class="small muted" style="margin-top:6px">At least 8 characters. Use a password you don\u2019t use anywhere else.</p>' : '')
    + '<p class="err">'+esc(authErr)+'</p>'
    + '<button class="btn pri full" type="submit">'+(up?'Create account':'Sign in')+'</button>'
    + (up ? '' : '<button class="link" type="button" data-act="forgot">Forgot password?</button>')
    + '</form>'
    + '<p class="center small" style="margin-top:14px">'+(up?'Already have an account? ':'New here? ')+'<button class="link" data-act="authMode">'+(up?'Sign in':'Create an account')+'</button></p></div>';
}
function renderWaiting(){
  return '<div class="auth"><img src="icon-180.png" alt="" width="72" height="72" class="logo"><h1 class="h2 center">Almost there</h1>'
    + '<div class="card" style="margin-top:16px"><p>Your account is created, but it doesn\u2019t have access to the shared kitchen yet.</p>'
    + '<p class="muted small" style="margin-top:8px">The person who set up S&amp;A Kitchen adds this ID to the Firebase security rules once. Then tap Check again.</p>'
    + '<label class="lbl">Your user ID</label><div class="idbox"><code>'+esc(uid())+'</code><button class="ib" data-act="copyId" aria-label="Copy user ID">'+I('copy')+'</button></div>'
    + '<button class="btn pri full" style="margin-top:16px" data-act="recheck">Check again</button>'
    + '<button class="btn full" style="margin-top:8px" data-act="signout">Sign out</button></div></div>';
}
function renderOffline(){
  return '<div class="auth"><h1 class="h2 center">Can\u2019t connect right now</h1><div class="card" style="margin-top:16px"><p>Check your internet connection and try again. Once you\u2019ve signed in once, the app also works offline.</p>'
    + '<button class="btn pri full" style="margin-top:14px" data-act="recheck">Try again</button></div></div>';
}
function profileForm(p, isSetup){
  p = p || {};
  var cols = C.COLORS.map(function(c, i){ return '<button type="button" class="sw'+((p.color||0)===i?' on':'')+'" data-act="pcolor" data-i="'+i+'" style="background:'+c[0]+';color:'+c[1]+'" aria-label="Color '+(i+1)+'">'+esc((p.ini||'S').slice(0,2))+'</button>'; }).join('');
  var pors = [1,1.25,1.5,1.75,2].map(function(v){ return '<button type="button" class="chip'+((p.portion||1)===v?' on':'')+'" data-act="pport" data-v="'+v+'">'+v+'×</button>'; }).join('');
  return '<label class="lbl" for="pn">Name</label><input class="in" id="pn" value="'+esc(p.name||'')+'" placeholder="Your name" autocomplete="given-name">'
    + '<label class="lbl" for="pi">Initial shown in the app</label><input class="in" id="pi" maxlength="2" value="'+esc(p.ini||'')+'" style="width:90px">'
    + '<p class="lbl">Color</p><div class="row fw">'+cols+'</div>'
    + '<p class="lbl">Portion size</p><div class="row fw">'+pors+'</div><p class="small muted" style="margin-top:6px">Nutrition and grocery amounts use this. Many men use 1.5×.</p>'
    + '<p class="lbl">Units</p><div class="seg"><button type="button" class="'+(p.units!=='us'?'on':'')+'" data-act="punits" data-v="m">Grams and ml</button><button type="button" class="'+(p.units==='us'?'on':'')+'" data-act="punits" data-v="us">Cups and ounces</button></div>'
    + (isSetup ? '<button class="btn pri full" style="margin-top:20px" data-act="saveProfile">Start cooking</button>' : '<button class="btn pri full" style="margin-top:18px" data-act="saveProfile">Save profile</button>');
}
function renderSetup(){
  if(!ui.pf) ui.pf = {name:'', ini:'', color:Object.keys(D.profiles).length ? 2 : 0, portion:1, units:'m'};
  return '<div class="auth"><img src="icon-180.png" alt="" width="72" height="72" class="logo"><h1 class="h2 center">Set up your profile</h1>'
    + '<p class="muted center small" style="margin:4px 0 16px">You can change all of this later in settings.</p><div class="card">'+profileForm(ui.pf, true)+'</div></div>';
}

/* Today */
function renderToday(){
  var t = C.today(), tk = C.ymd(t), wk = C.wk(t), d = C.di(t), me = uid(), pt = C.partner();
  var h = '<header class="top"><div><p class="muted small">'+C.longDate(t)+'</p><h1 class="h1">Today</h1></div>'+profBtn()+'</header>';
  var rems = C.reminders(t), done = (D.days[tk] && D.days[tk].rem) || {};
  if(rems.length){
    h += '<p class="sec-h">Before you leave</p>';
    rems.forEach(function(r){
      var dn = done[r.key];
      h += '<div class="rem'+(dn?' done':'')+'"><span class="remi">'+I(r.key.indexOf('thaw')===0?'snow':'cal',18)+'</span><div class="grow"><p class="nm">'+esc(r.text)+'</p><p class="sub">'+(dn ? 'Done by ' + esc(C.prof(dn.by).name) : esc(r.sub))+'</p></div>'
        + (r.act ? '<button class="btn sm" data-act="'+r.act+'">Plan</button>' : '<button class="ck'+(dn?' on':'')+'" data-act="remDone" data-k="'+esc(r.key)+'" aria-label="Mark done">'+I('check',16)+'</button>')+'</div>';
    });
  }
  var ci = D.checkins[tk + '_' + me] || {}, ate = ci.ate || [];
  var tot = C.dayTotal(wk, d, me);
  h += '<p class="sec-h">Today\u2019s meals <span class="muted small" style="font-weight:400">your portion ('+C.portion(me)+'×)</span></p><div class="card list">';
  C.SLOTS.forEach(function(s){
    var sl = C.slot(wk, d, s), id = C.eff(sl, me), r = C.rec(id);
    if(!r){ h += '<div class="item"><span class="sl">'+C.SLOTN[s]+'</span><div class="grow"><p class="muted">Nothing planned</p></div><button class="btn sm" data-act="planSlot" data-d="'+d+'" data-s="'+s+'" data-wk="'+wk+'">Add</button></div>'; return; }
    var n = C.nutri(r), m = C.portion(me), pack = s === 'L' && (sl.lo || C.has(r,'lunch'));
    var sub = sl.lo ? 'Leftovers from ' + sl.lo.toLowerCase() : (s === 'S' ? 'Only if hungry' : r.t + ' min');
    h += '<div class="item"><span class="sl">'+C.SLOTN[s]+'</span><button class="grow tl" data-act="openRec" data-id="'+esc(r.id)+'"><p class="nm">'+esc(r.n)+(pack?' <span class="pill blue">Pack it</span>':'')+'</p><p class="sub">'+esc(sub)+'</p><p class="sub">≈'+fmtN(n.k*m)+' kcal, '+fmtN(n.p*m)+' g protein</p></button>'
      + '<button class="ck'+(ate.indexOf(s)>=0?' on':'')+'" data-act="ate" data-s="'+s+'" aria-label="Mark '+C.SLOTN[s].toLowerCase()+' eaten">'+I('check',16)+'</button></div>';
  });
  h += '</div>';
  if(tot.n) h += '<p class="small muted" style="margin:-4px 2px 0">Planned today: ≈'+fmtN(tot.k)+' kcal, '+fmtN(tot.p)+' g protein</p>';
  h += '<p class="sec-h">Check-in</p><div class="card">';
  h += '<p>Did you follow the plan today?</p><div class="seg" style="margin:8px 0 14px">'+['yes','partly','no'].map(function(v){ return '<button class="'+(ci.plan===v?'on':'')+'" data-act="ciPlan" data-v="'+v+'">'+v.charAt(0).toUpperCase()+v.slice(1)+'</button>'; }).join('')+'</div>';
  var w = ci.water || 0;
  h += '<p>Water <span class="muted small">'+w+' of 10 glasses</span></p><div class="glasses">';
  for(var g=1; g<=10; g++) h += '<button class="'+(g<=w?'on':'')+'" data-act="water" data-v="'+g+'" aria-label="'+g+' glasses">'+I('drop',16)+'</button>';
  h += '</div><div class="row between" style="border-top:1px solid var(--line);padding-top:12px;margin-top:12px"><span class="row" style="gap:8px">'+I('gym',18)+' Workout done today?</span><button class="btn sm'+(ci.wo?' pri':'')+'" data-act="wo">'+(ci.wo?'Done ✓':'Mark done')+'</button></div></div>';
  if(pt){
    var pc = D.checkins[tk + '_' + pt];
    h += '<p class="row small muted" style="margin:12px 2px;gap:8px">'+C.avatar(pt, 22)+(pc && (pc.plan || pc.water) ? esc(C.prof(pt).name) + ' checked in today' + (pc.water ? ', ' + pc.water + ' glasses of water' : '') : esc(C.prof(pt).name) + ' hasn\u2019t checked in yet')+'</p>';
  }
  return h;
}
function profBtn(){ return '<button class="profb" data-act="settings" aria-label="Profile and settings">'+C.avatar(uid(), 28)+'<span>'+esc(C.prof(uid()).name)+'</span></button>'; }

/* Recipes */
function filtered(){
  var f = ui.rf || {}, q = FD.norm(ui.q || ''), diet = pref.diet;
  return C.all().filter(function(r){
    if(!C.dietOk(r, diet)) return false;
    if(f.cat && r.c !== f.cat) return false;
    if(f.prot && r.pr !== f.prot) return false;
    if(f.time === 10 && r.t > 10) return false;
    if(f.time === 30 && r.t > 30) return false;
    var tg = f.tags || []; for(var i=0;i<tg.length;i++){ if(!C.has(r, tg[i])) return false; }
    if(f.fav && !C.isFav(r.id)) return false;
    if(f.own && r._kind !== 'custom') return false;
    if(f.edited && r._kind !== 'edit') return false;
    if(q){ var hay = FD.norm(r.n + ' ' + (r.i||[]).map(function(i){ var fd = C.food(i[0]); return (fd ? fd.n : '') + ' ' + (i[4]||''); }).join(' ')); if(hay.indexOf(q) < 0) return false; }
    return true;
  });
}
function activeFilters(){ var f = ui.rf || {}, n = 0; ['cat','prot','time','fav','own','edited'].forEach(function(k){ if(f[k]) n++; }); n += (f.tags || []).length; return n; }
function rcard(r, wide){
  var n = C.nutri(r), m = C.portion(uid());
  return '<button class="rc'+(wide?' wide':'')+'" data-act="openRec" data-id="'+esc(r.id)+'">'+mark(r.d)+'<span class="nm">'+esc(r.n)+'</span><span class="sub">'+r.t+' min, ≈'+fmtN(n.k*m)+' kcal, '+fmtN(n.p*m)+' g protein</span>'
    + (wide ? tagChips(r) : '') + (C.isFav(r.id) ? '<span class="fv">'+I('starf',14)+'</span>' : '') + '</button>';
}
function tagChips(r){
  var t = []; if(r.both) t.push('<span class="pill green">Also no onion and garlic</span>');
  ['make','lunch','freeze','full','occ','heavy'].forEach(function(k){ if(C.has(r,k)) t.push('<span class="pill'+(k==='heavy'||k==='occ'?' amber':' blue')+'">'+C.TAGN[k]+'</span>'); });
  if(r._kind === 'custom') t.push('<span class="pill">Our recipe</span>'); if(r._kind === 'edit') t.push('<span class="pill">Edited</span>');
  return t.length ? '<span class="tags">'+t.join('')+'</span>' : '';
}
function renderRecipes(){
  var h = '<header class="top"><h1 class="h1">Recipes</h1><div class="row" style="gap:6px"><button class="ib" data-act="newRec" aria-label="Add your own recipe">'+I('plus',22)+'</button>'+profBtn()+'</div></header>';
  var na = activeFilters();
  h += '<div class="row" style="gap:8px;margin-bottom:10px"><label class="search grow">'+I('search',18)+'<input id="rq" type="search" placeholder="Search recipes or ingredients" value="'+esc(ui.q||'')+'" aria-label="Search recipes"></label>'
    + '<button class="btn sm" data-act="filters">'+I('filter',18)+' Filters'+(na?' <span class="badge">'+na+'</span>':'')+'</button></div>';
  h += '<div class="chips scroll" role="group" aria-label="Diet">'+[['all','All'],['veg','Veg'],['nog','No onion and garlic'],['non','Non-veg']].map(function(o){ return '<button class="chip'+(pref.diet===o[0]?' on':'')+'" data-act="diet" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</div>';
  var list = filtered();
  if(ui.q || na){
    h += '<p class="small muted" style="margin:10px 2px">'+list.length+' recipe'+(list.length===1?'':'s')+(na?' <button class="link" data-act="clearF">Clear filters</button>':'')+'</p>';
    h += list.length ? '<div class="col">'+list.map(function(r){ return rcard(r, true); }).join('')+'</div>' : '<p class="empty">No recipes match. Try fewer filters.</p>';
    return h;
  }
  var rows = [];
  var fav = list.filter(function(r){ return C.isFav(r.id); }); if(fav.length) rows.push(['Favorites', fav, {fav:true}]);
  var quick = list.filter(function(r){ return r.t <= 10; }); rows.push(['Quick, under 10 min', quick, {time:10}]);
  C.CAT_ORDER.forEach(function(c){ var l = list.filter(function(r){ return r.c === c; }); if(l.length) rows.push([C.CATS[c], l, {cat:c}]); });
  var own = list.filter(function(r){ return r._kind === 'custom'; }); if(own.length) rows.push(['Our recipes', own, {own:true}]);
  rows.forEach(function(row, i){
    h += '<div class="rowh"><h2 class="h3">'+row[0]+'</h2><button class="link" data-act="seeAll" data-i="'+i+'">See all</button></div><div class="hs">'+row[1].slice(0, 8).map(function(r){ return rcard(r); }).join('')+'</div>';
  });
  ui._rows = rows;
  return h;
}
function filterSheet(){
  var f = ui.rf || {};
  function chip(act, v, label, on){ return '<button class="chip'+(on?' on':'')+'" data-act="'+act+'" data-v="'+v+'">'+label+'</button>'; }
  var h = '<div class="sh-h"><h2 class="h3">Filters</h2><button class="link" data-act="clearF">Clear all</button></div>';
  h += '<p class="lbl">Meal</p><div class="chips">'+C.CAT_ORDER.map(function(c){ return chip('fCat', c, C.CATS[c], f.cat===c); }).join('')+'</div>';
  h += '<p class="lbl">Protein</p><div class="chips">'+Object.keys(C.PROT).map(function(p){ return chip('fProt', p, C.PROT[p], f.prot===p); }).join('')+'</div>';
  h += '<p class="lbl">Time</p><div class="chips">'+chip('fTime', 10, 'Under 10 min', f.time===10)+chip('fTime', 30, 'Under 30 min', f.time===30)+'</div>';
  h += '<p class="lbl">Type</p><div class="chips">'+['make','freeze','lunch','week','full','occ'].map(function(t){ return chip('fTag', t, C.TAGN[t], (f.tags||[]).indexOf(t)>=0); }).join('')+'</div>';
  h += '<p class="lbl">Show</p><div class="chips">'+chip('fFlag','fav','Favorites',f.fav)+chip('fFlag','own','Our own recipes',f.own)+chip('fFlag','edited','Recipes we edited',f.edited)+'</div>';
  h += '<button class="btn pri full" style="margin-top:18px" data-act="closeSheet">Show '+filtered().length+' recipes</button>';
  return h;
}

/* Recipe page */
function renderRecipe(){
  var r = C.rec(view.page.id); if(!r){ view.page = null; return renderRecipes(); }
  if(!ui.rp || ui.rp.id !== r.id){
    var hh = C.uids().reduce(function(t, u){ return t + C.portion(u); }, 0);
    var forAll = (r.c === 'm' || r.c === 'ss' || r.c === 'sd') && !C.has(r, 'make') && (r.sv || 2) === 2;
    ui.rp = {id:r.id, nog: pref.diet === 'nog' && !!r.both, sv: forAll ? Math.max(1, Math.round(hh*2)/2) : (r.sv || 2), who:uid()};
  }
  var st = ui.rp;
  var f = st.sv / (r.sv || 2), n = C.nutri(r), wm = C.portion(st.who), pt = C.partner();
  var h = '<header class="top"><button class="ib" data-act="back" aria-label="Back">'+I('back',22)+'</button><div class="row" style="gap:4px"><button class="ib" data-act="editRec" aria-label="Edit recipe">'+I('edit')+'</button>'
    + '<button class="ib'+(C.isFav(r.id)?' fav':'')+'" data-act="fav" data-id="'+esc(r.id)+'" aria-label="'+(C.isFav(r.id)?'Remove from favorites':'Add to favorites')+'" aria-pressed="'+C.isFav(r.id)+'">'+I(C.isFav(r.id)?'starf':'star')+'</button></div></header>';
  h += '<div class="row" style="gap:6px">'+mark(st.nog ? 'nog' : r.d)+'<span class="small muted">'+C.CATS[r.c]+(r.c==='m'?', lunch or dinner':'')+'</span></div>';
  h += '<h1 class="h1" style="margin:6px 0 2px">'+esc(r.n)+'</h1><p class="muted small">'+r.t+' min'+(r._kind==='custom'?', added by '+esc(C.prof(r._by).name):'')+(r._kind==='edit'?', edited by '+esc(C.prof(r._by).name):'')+'</p>';
  h += '<div class="por"><div class="row between"><span class="small" style="font-weight:600">'+(st.who===uid()?'Your portion':esc(C.prof(st.who).name)+'\u2019s portion')+' ('+wm+'×)</span>'
    + (pt ? '<div class="seg mini">'+[uid(), pt].map(function(u){ return '<button class="'+(st.who===u?'on':'')+'" data-act="who" data-v="'+u+'">'+esc(C.prof(u).name)+'</button>'; }).join('')+'</div>' : '')+'</div>'
    + '<div class="nu"><span>≈'+fmtN(n.k*wm)+' kcal</span><span>'+fmtN(n.p*wm)+' g protein</span><span>'+(Math.round(n.nc*wm*10)/10)+' g net carbs</span></div><p class="tiny muted">Estimates</p></div>';
  h += tagChips(r);
  if(r.both) h += '<div class="swr"><div><p class="nm" style="color:var(--leaf)">No onion and garlic version</p><p class="tiny" style="color:var(--leaf)">Uses hing and ginger instead</p></div><button class="tog'+(st.nog?' on':'')+'" data-act="nog" role="switch" aria-checked="'+st.nog+'" aria-label="No onion and garlic version"></button></div>';
  h += '<div class="row between" style="margin:16px 0 4px"><div class="stp"><button class="ib sm" data-act="sv" data-v="-1" aria-label="Fewer servings">'+I('minus',18)+'</button><span>'+C.frac(st.sv)+' serving'+(st.sv===1?'':'s')+'</span><button class="ib sm" data-act="sv" data-v="1" aria-label="More servings">'+I('plus',18)+'</button></div>'
    + '<div class="seg mini"><button class="'+(C.units()!=='us'?'on':'')+'" data-act="units" data-v="m">g, ml</button><button class="'+(C.units()==='us'?'on':'')+'" data-act="units" data-v="us">cups, oz</button></div></div>';
  h += '<h2 class="h3 mt">Ingredients</h2><ul class="ing">';
  C.ings(r, st.nog).forEach(function(o){ var x = C.ingText(o.ing, f), fd = C.food(o.ing[0]);
    h += '<li>'+(fd ? '<button class="tl ingb" data-act="facts" data-key="'+esc(o.ing[0])+'">' : '<span class="ingb">')+'<span>'+esc(x.n.charAt(0).toUpperCase()+x.n.slice(1))+'</span>'+(fd?dot(o.ing[0]):'')+(fd?'</button>':'</span>')+'<b>'+esc(x.q || (o.ing[2]==='taste'?'to taste':''))+'</b></li>'; });
  h += '</ul><h2 class="h3 mt">Steps</h2><ol class="steps">';
  (r.s || []).forEach(function(s){ h += '<li>'+C.stepText(r, s, f, st.nog, true)+(s[1]?' <span class="tm">'+I('clock',13)+' '+(s[1]>=60?Math.round(s[1]/60)+' min':s[1]+' sec')+'</span>':'')+'</li>'; });
  h += '</ol>';
  if(r.tip) h += '<h2 class="h3 mt">Tips</h2><div class="box">'+esc(r.tip)+'</div>';
  if(r.fr || r.rh) h += '<h2 class="h3 mt">Storing and reheating</h2><div class="box">'+(r.fr?'Keeps '+r.fr+' days in the fridge. ':'')+esc(r.rh||'')+'</div>';
  var notes = D.notes.filter(function(x){ return x.rid === r.id; }).sort(function(a,b){ return (a.ts||0)-(b.ts||0); });
  h += '<h2 class="h3 mt">Our notes</h2>';
  notes.forEach(function(nt){ h += '<div class="note">'+C.avatar(nt.by, 24)+'<p class="grow">'+esc(nt.t)+'</p>'+(nt.by===uid()?'<button class="ib sm" data-act="delNote" data-id="'+esc(nt.id)+'" aria-label="Delete note">'+I('x',16)+'</button>':'')+'</div>'; });
  h += '<div class="row" style="gap:8px;margin-top:6px"><input class="in grow" id="noteIn" placeholder="Add a note, like \u201cless chili\u201d" aria-label="Add a note"><button class="btn sm" data-act="addNote">Add</button></div>';
  h += '<div class="foot"><button class="btn" data-act="toPlan">Add to plan</button><button class="btn pri" data-act="cook">'+I('chef',18)+' Cook mode</button></div>';
  return h;
}
function factsSheet(key, item){
  var f = C.food(key);
  if(!f){
    var h0 = '<div class="sh-h"><h2 class="h3">'+esc(item ? item.n : 'Food facts')+'</h2><button class="link" data-act="closeSheet">Close</button></div>';
    h0 += '<p class="muted">This item isn\u2019t recognized yet. Pick the closest match, or enter the numbers from its label.</p>';
    return h0 + matchPicker(item) + labelForm(item);
  }
  var per = ui.per || 'p', g = per === 'p' ? f.por[1] : 100, k = g/100, v = f.v, r = C.rate(f);
  function nf(x){ return (Math.round(x*k*10)/10).toString(); }
  var h = '<div class="sh-h"><h2 class="h3">'+esc(f.n)+'</h2><button class="link" data-act="closeSheet">Close</button></div>';
  h += '<div class="seg" style="margin:10px 0"><button class="'+(per==='p'?'on':'')+'" data-act="per" data-v="p">Per '+esc(f.por[0])+'</button><button class="'+(per==='h'?'on':'')+'" data-act="per" data-v="h">Per 100 g</button></div>';
  h += '<div class="grid3"><div class="m"><p class="tiny muted">Calories</p><p class="v">'+Math.round(v[0]*k)+'</p></div><div class="m"><p class="tiny muted">Net carbs</p><p class="v">'+nf(v[2])+' g</p></div><div class="m"><p class="tiny muted">Protein</p><p class="v">'+nf(v[1])+' g</p></div>'
    + '<div class="m"><p class="tiny muted">Fat</p><p class="v">'+nf(v[3])+' g</p></div><div class="m"><p class="tiny muted">Fiber</p><p class="v">'+nf(v[4])+' g</p></div><div class="m"><p class="tiny muted">Glycemic index</p><p class="tiny">'+esc(f.gi||'Not known')+'</p></div></div>';
  if(r) h += '<p class="kn '+r+'"><b>'+C.RATE[r][0]+'.</b> '+esc(f.note||'')+'</p>';
  if(f.tip) h += '<p class="small muted" style="margin-top:8px">Label check: '+esc(f.tip)+'</p>';
  h += '<p class="tiny muted" style="margin-top:10px">Approximate values from standard food data. Brands may differ.</p>';
  if(item) h += '<button class="link" style="margin-top:8px" data-act="rematch">Not the right food? Change match</button>' + (ui.rematch ? matchPicker(item) : '');
  return h;
}
function matchPicker(item){
  var q = ui.mq || (item ? item.n : '');
  var res = C.searchFoods(q).slice(0, 8);
  return '<div style="margin-top:12px"><label class="search">'+I('search',16)+'<input id="mq" type="search" value="'+esc(q)+'" placeholder="Search foods" aria-label="Search foods"></label><div class="col" style="margin-top:8px">'
    + res.map(function(fd){ return '<button class="opt" data-act="setMatch" data-key="'+esc(fd.k)+'">'+dot(fd.k)+' '+esc(fd.n)+'</button>'; }).join('') + '<button class="opt" data-act="setHouse">Not food (household item)</button></div></div>';
}
function labelForm(item){
  return '<details style="margin-top:14px"><summary class="link">Enter label values instead</summary><div class="grid2" style="margin-top:10px">'
    + '<label>Serving size (g)<input class="in" id="lf_g" type="number" inputmode="decimal"></label><label>Calories<input class="in" id="lf_k" type="number" inputmode="decimal"></label>'
    + '<label>Net carbs (g)<input class="in" id="lf_c" type="number" inputmode="decimal"></label><label>Protein (g)<input class="in" id="lf_p" type="number" inputmode="decimal"></label></div>'
    + '<label class="row" style="gap:8px;margin-top:10px"><input type="checkbox" id="lf_s"> Has added sugar, honey or maltitol</label>'
    + '<button class="btn pri full" style="margin-top:12px" data-act="saveLabel">Save food</button></details>';
}

/* Cook mode */
function renderCook(){
  var r = C.rec(cook.id), st = ui.rp, f = st.sv / (r.sv || 2), s = r.s[cook.step] || [''], n = r.s.length;
  var h = '<div class="cook"><div class="row between"><button class="ib" data-act="cookClose" aria-label="Close Cook mode">'+I('x',22)+'</button><span class="small muted">Step '+(cook.step+1)+' of '+n+'</span><button class="btn sm" data-act="cookIngs">Ingredients</button></div>';
  h += '<p class="tiny muted center" style="margin-top:4px">'+I('sun',12)+' Screen stays on. Timers beep, so turn off silent mode to hear them.</p>';
  h += '<div class="timers" id="timers">'+timerChips()+'</div>';
  h += '<p class="big-step">'+C.stepText(r, s, f, st.nog, true)+'</p>';
  if(s[1] && !cook.timers.some(function(t){ return t.step === cook.step; })) h += '<div class="center"><button class="btn" data-act="startTimer">'+I('clock',18)+' Start '+(s[1]>=60?Math.round(s[1]/60)+' min':s[1]+' sec')+' timer</button></div>';
  h += '<div class="cooknav"><button class="btn" data-act="cookPrev"'+(cook.step===0?' disabled':'')+'>Back</button><button class="btn pri" data-act="cookNext">'+(cook.step===n-1?'Done':'Next')+'</button></div></div>';
  return h;
}
function timerChips(){ return cook.timers.map(function(t){ var left = Math.max(0, Math.ceil((t.end - Date.now())/1000)); return '<span class="tc'+(left<=0?' dn':'')+'">'+esc(t.label)+' '+(left<=0?'done':Math.floor(left/60)+':'+('0'+left%60).slice(-2))+'</span>'; }).join(''); }
function cookIngsSheet(){
  var r = C.rec(cook.id), st = ui.rp, f = st.sv / (r.sv || 2);
  return '<div class="sh-h"><h2 class="h3">Ingredients</h2><button class="link" data-act="closeSheet">Done</button></div>' + C.ings(r, st.nog).map(function(o){ var x = C.ingText(o.ing, f), on = cook.checked[o.ix];
    return '<label class="chkrow"><input type="checkbox" data-act="cookChk" data-i="'+o.ix+'"'+(on?' checked':'')+'><span class="grow">'+esc(x.n)+'</span><span class="muted">'+esc(x.q)+'</span></label>'; }).join('');
}

/* Plan */
function renderPlan(){
  var wk = planWk(), md = C.parse(wk), today = C.today(), sel = ui.pd == null ? (pref.planWeek === 0 ? C.di(today) : 0) : ui.pd, who = ui.pwho || uid(), pt = C.partner();
  var h = '<header class="top"><div><p class="muted small">'+C.shortDate(md)+' to '+C.shortDate(C.addD(md, 6))+'</p><h1 class="h1">Plan</h1></div><div class="row" style="gap:2px"><button class="ib" data-act="wkPrev" aria-label="Previous week">'+I('back')+'</button><button class="ib" data-act="wkNext" aria-label="Next week">'+I('right')+'</button></div></header>';
  h += '<div class="row" style="gap:8px;margin-bottom:12px"><button class="btn sm grow" data-act="suggest">'+I('sparkle',16)+' Suggest my week</button><button class="btn sm grow" data-act="copyWeek">'+I('copy',16)+' Copy last week</button></div>';
  h += '<div class="days">'; for(var d=0; d<7; d++){ var full = C.SLOTS.every(function(s){ return C.slot(wk, d, s); }); var isT = C.ymd(C.addD(md, d)) === C.ymd(today);
    h += '<button class="'+(d===sel?'on':'')+(isT?' today':'')+'" data-act="pday" data-v="'+d+'"><span>'+C.DSH[d]+'</span><span class="dd">'+C.addD(md, d).getDate()+'</span><span class="pd'+(full?' f':'')+'"></span></button>'; }
  h += '</div>';
  var tot = C.dayTotal(wk, sel, who);
  h += '<div class="tot"><span>'+C.DAYS[sel]+(pt?' <span class="seg mini inl">'+[uid(), pt].map(function(u){ return '<button class="'+(who===u?'on':'')+'" data-act="pwho" data-v="'+u+'">'+esc(C.prof(u).name)+'</button>'; }).join('')+'</span>':'')+'</span><b>≈'+fmtN(tot.k)+' kcal, '+fmtN(tot.p)+' g protein</b></div>';
  if(tot.heavy) h += '<p class="flag">'+I('alert',16)+' Heavier day: a creamy or rich dish is planned. Keep the other meals light.</p>';
  h += '<div class="card list">';
  C.SLOTS.forEach(function(s){
    var sl = C.slot(wk, sel, s), id = C.eff(sl, who), r = C.rec(id);
    if(!sl){ h += '<button class="item tl" data-act="slot" data-s="'+s+'"><span class="sl">'+C.SLOTN[s]+'</span><span class="muted grow">+ Add a meal</span></button>'; return; }
    var others = sl.p ? Object.keys(sl.p).filter(function(u){ return sl.p[u] && sl.p[u] !== sl.r; }) : [];
    h += '<button class="item tl" data-act="slot" data-s="'+s+'"><span class="sl">'+C.SLOTN[s]+'</span><span class="grow"><span class="nm">'+esc(r ? r.n : (others.length ? 'Nothing for ' + C.prof(who).name : 'Recipe removed'))+'</span>'
      + others.map(function(u){ var rr = C.rec(sl.p[u]); return '<span class="sub">'+esc(C.prof(u).name)+': '+esc(rr ? rr.n : '')+'</span>'; }).join('')
      + (sl.lo ? '<span class="pill blue">Leftovers from '+esc(sl.lo.toLowerCase())+'</span>' : '') + (sl.x ? '<span class="pill green">Make extra for tomorrow</span>' : '') + (r && C.has(r,'occ') ? '<span class="pill amber">Occasional</span>' : '')
      + '</span>'+I('right',18)+'</button>';
  });
  h += '</div><p class="small muted center" style="margin-top:10px">Breads and wraps this week: '+C.weekBreads(wk)+' of 2</p>';
  return h;
}
function slotSheet(s){
  var wk = planWk(), d = ui.pd == null ? (pref.planWeek === 0 ? C.di(C.today()) : 0) : ui.pd, sl = C.slot(wk, d, s), r = sl && C.rec(sl.r), pt = C.partner();
  if(!sl || ui.picking) return pickerSheet(s, d);
  var h = '<div class="sh-h"><h2 class="h3">'+C.DAYS[d]+' '+C.SLOTN[s].toLowerCase()+'</h2><button class="link" data-act="closeSheet">Close</button></div>';
  h += '<p class="nm" style="margin:4px 0 8px">'+esc(r ? r.n : 'Not set for everyone')+'</p>';
  h += '<button class="opt" data-act="slotChange">Change meal'+I('right',16)+'</button>';
  if(s === 'D') h += '<button class="opt" data-act="slotExtra">Make extra for tomorrow\u2019s lunch<span class="muted">'+(sl.x?'On':'Off')+'</span></button>';
  C.uids().forEach(function(u){ if(!pt && u === uid()) return; var o = sl.p && sl.p[u]; h += '<button class="opt" data-act="slotDiff" data-u="'+u+'">Different meal for '+esc(C.prof(u).name)+'<span class="muted">'+(o ? esc((C.rec(o)||{}).n||'') : 'Off')+'</span></button>'; });
  if(r) h += '<button class="opt" data-act="openRec" data-id="'+esc(r.id)+'">Open recipe'+I('right',16)+'</button>';
  h += '<button class="opt danger" data-act="slotRemove">Remove</button>';
  return h;
}
function pickerSheet(s, d){
  var cats = s === 'B' ? ['b'] : s === 'S' ? ['sn','dr'] : ['m','ss','br','sd'];
  var q = FD.norm(ui.pq || ''), cat = ui.pcat || cats[0];
  var list = C.all().filter(function(r){ return C.dietOk(r, pref.diet) && (q ? FD.norm(r.n).indexOf(q) >= 0 : r.c === cat); });
  var forU = ui.pfor;
  var h = '<div class="sh-h"><h2 class="h3">'+(forU ? 'Meal for ' + esc(C.prof(forU).name) : C.DAYS[d] + ' ' + C.SLOTN[s].toLowerCase())+'</h2><button class="link" data-act="closeSheet">Cancel</button></div>';
  h += '<label class="search" style="margin:8px 0">'+I('search',16)+'<input id="pq" type="search" placeholder="Search all recipes" value="'+esc(ui.pq||'')+'" aria-label="Search recipes"></label>';
  if(!q) h += '<div class="chips scroll">'+cats.map(function(c){ return '<button class="chip'+(c===cat?' on':'')+'" data-act="pcat" data-v="'+c+'">'+C.CATS[c]+'</button>'; }).join('')+'</div>';
  h += '<div class="col" style="margin-top:8px">'+list.map(function(r){ var n = C.nutri(r); return '<button class="opt" data-act="pick" data-id="'+esc(r.id)+'"><span class="row" style="gap:8px">'+mark(r.d)+esc(r.n)+'</span><span class="muted small">≈'+fmtN(n.k*C.portion(uid()))+' kcal</span></button>'; }).join('')+(list.length?'':'<p class="empty">No recipes found.</p>')+'</div>';
  return h;
}
function toPlanSheet(){
  var r = C.rec(view.page.id), tp = ui.tp = ui.tp || {w:0, d:C.di(C.today()), s: r.c === 'b' ? 'B' : r.c === 'sn' || r.c === 'dr' ? 'S' : 'D', who:'all'};
  var md = C.monday(C.addD(C.today(), tp.w*7));
  var h = '<div class="sh-h"><h2 class="h3">Add to plan</h2><button class="link" data-act="closeSheet">Cancel</button></div>';
  h += '<div class="seg" style="margin:8px 0">'+['This week','Next week'].map(function(l, i){ return '<button class="'+(tp.w===i?'on':'')+'" data-act="tpW" data-v="'+i+'">'+l+'</button>'; }).join('')+'</div>';
  h += '<div class="days">'+C.DSH.map(function(n, i){ return '<button class="'+(tp.d===i?'on':'')+'" data-act="tpD" data-v="'+i+'"><span>'+n+'</span><span class="dd">'+C.addD(md, i).getDate()+'</span></button>'; }).join('')+'</div>';
  h += '<p class="lbl">Meal</p><div class="seg">'+C.SLOTS.map(function(s){ return '<button class="'+(tp.s===s?'on':'')+'" data-act="tpS" data-v="'+s+'">'+C.SLOTN[s]+'</button>'; }).join('')+'</div>';
  if(C.partner()){ h += '<p class="lbl">For</p><div class="seg"><button class="'+(tp.who==='all'?'on':'')+'" data-act="tpWho" data-v="all">Both of us</button>'+C.uids().map(function(u){ return '<button class="'+(tp.who===u?'on':'')+'" data-act="tpWho" data-v="'+u+'">'+esc(C.prof(u).name)+' only</button>'; }).join('')+'</div>'; }
  var ex = C.slot(C.wk(md), tp.d, tp.s);
  if(ex && tp.who === 'all') h += '<p class="small muted" style="margin-top:8px">This replaces '+esc((C.rec(ex.r)||{}).n||'the current meal')+'.</p>';
  h += '<button class="btn pri full" style="margin-top:16px" data-act="tpAdd">Add</button>';
  return h;
}

/* Groceries */
function gVisible(i){
  var st = ui.gst || 'buy', rg = ui.grg || 'all';
  if(rg !== 'all' && i.src === 'plan' && i.days && i.days.length){ var a = rg === 'mw' ? [0,1,2] : [3,4,5,6]; if(!i.days.some(function(d){ return a.indexOf(d) >= 0; })) return false; }
  if(st === 'buy') return !i.b && !i.h; if(st === 'got') return !!i.b; if(st === 'have') return !!i.h; return true;
}
function renderGroceries(){
  var items = D.groceries.slice().sort(function(a,b){ return (a.ts||0)-(b.ts||0); });
  var left = items.filter(function(i){ return !i.b && !i.h; }).length;
  var h = '<header class="top"><div><p class="muted small">'+left+' item'+(left===1?'':'s')+' to buy'+(C.partner()?', shared with '+esc(C.prof(C.partner()).name):'')+'</p><h1 class="h1">Groceries</h1></div><button class="ib" data-act="share" aria-label="Share list">'+I('share')+'</button></header>';
  h += '<div class="row" style="gap:8px;margin-bottom:10px"><button class="btn sm grow" data-act="review">'+I('cal',16)+' From your plan</button><button class="btn sm grow" data-act="regulars">'+I('star',16)+' Regulars</button></div>';
  h += '<div class="chips scroll">'+[['all','Whole week'],['mw','Mon to Wed'],['tw','Thu to Sun']].map(function(o){ return '<button class="chip'+((ui.grg||'all')===o[0]?' on':'')+'" data-act="grg" data-v="'+o[0]+'">'+o[1]+'</button>'; }).join('')+'</div>';
  var cnt = {buy:items.filter(function(i){ return !i.b && !i.h; }).length, got:items.filter(function(i){ return i.b; }).length, have:items.filter(function(i){ return i.h; }).length, all:items.length};
  h += '<div class="chips scroll" style="margin-top:6px">'+[['buy','To buy'],['got','Bought'],['have','Have it'],['all','All']].map(function(o){ return '<button class="chip'+((ui.gst||'buy')===o[0]?' on':'')+'" data-act="gst" data-v="'+o[0]+'">'+o[1]+' '+cnt[o[0]]+'</button>'; }).join('')+'</div>';
  h += '<div class="prog"><div style="width:'+(items.length?Math.round((cnt.got+cnt.have)/items.length*100):0)+'%"></div></div>';
  var vis = items.filter(gVisible), any = false;
  C.SECS.forEach(function(sec){
    var its = vis.filter(function(i){ return (i.sec || 'Other') === sec; }); if(!its.length) return; any = true;
    h += '<p class="sec-h row between"><span>'+sec+'</span><span class="muted small">'+its.length+'</span></p><div class="card list">';
    its.forEach(function(i){
      var open = ui.gopen === i.id, a = C.amtText(i);
      h += '<div class="gi'+(i.b?' done':'')+'"><div class="row" style="gap:10px"><button class="ck'+(i.b?' on':'')+'" data-act="gBuy" data-id="'+esc(i.id)+'" aria-label="Mark '+esc(i.n)+' bought" aria-pressed="'+!!i.b+'">'+I('check',16)+'</button>'
        + '<button class="grow tl" data-act="gOpen" data-id="'+esc(i.id)+'"><span class="nm">'+esc(i.n)+'</span>'+(a?'<span class="sub">'+esc(a)+'</span>':'')+(i.b && i.by ? '<span class="sub row" style="gap:4px">'+C.avatar(i.by, 16)+' Bought by '+esc(C.prof(i.by).name)+'</span>' : '')+'</button>'
        + dot(i.key, i.sec === 'Household') + (i.b ? '' : '<button class="btn sm'+(i.h?' on':'')+'" data-act="gHave" data-id="'+esc(i.id)+'">'+(i.h?'Have it ✓':'Have it')+'</button>')+'</div>';
      if(open){
        h += '<div class="gx">' + (i.for && i.for.length ? '<p class="small muted">For: '+esc(i.for.join(', '))+'</p>' : '')
          + '<div class="row" style="gap:8px;margin-top:8px"><input class="in grow" id="gAmt" value="'+esc(i.note || a)+'" aria-label="Amount" placeholder="Amount, like 2 bags"><button class="btn sm" data-act="gSaveAmt" data-id="'+esc(i.id)+'">Save</button></div>'
          + '<div class="row fw" style="gap:8px;margin-top:8px">'+(i.sec !== 'Household' ? '<button class="btn sm" data-act="gFacts" data-id="'+esc(i.id)+'">'+I('info',16)+' Food facts</button>' : '')
          + '<button class="btn sm" data-act="gRegular" data-id="'+esc(i.id)+'">'+I('star',16)+' Save as regular</button><button class="btn sm danger-o" data-act="gDel" data-id="'+esc(i.id)+'">'+I('trash',16)+' Remove</button></div></div>';
      }
      h += '</div>';
    });
    h += '</div>';
  });
  if(!any) h += '<p class="empty">'+((ui.gst||'buy')==='buy' ? 'Nothing left to buy. Add items below, or tap From your plan.' : 'Nothing here.')+'</p>';
  if(cnt.got) h += '<button class="btn sm full" style="margin-top:12px" data-act="gClear">Clear '+cnt.got+' bought item'+(cnt.got===1?'':'s')+'</button>';
  h += '<div class="addbar"><input class="in grow" id="gAdd" placeholder="Add an item, like 2 lb chicken" aria-label="Add an item"><button class="btn pri" data-act="gAdd">Add</button></div>';
  return h;
}
function reviewSheet(){
  var rv = ui.rv = ui.rv || {w:0, off:{}};
  var wk = C.wk(C.addD(C.today(), rv.w*7)), needs = C.weekNeeds(wk, pref.diet);
  var h = '<div class="sh-h"><h2 class="h3">From your plan</h2><button class="link" data-act="closeSheet">Cancel</button></div>';
  h += '<div class="seg" style="margin:8px 0">'+['This week','Next week'].map(function(l, i){ return '<button class="'+(rv.w===i?'on':'')+'" data-act="rvW" data-v="'+i+'">'+l+'</button>'; }).join('')+'</div>';
  if(!needs.length) return h + '<p class="empty">Nothing planned for this week yet. Plan some meals first.</p>';
  h += '<p class="small muted">Untick anything you already have. Pantry basics like salt, oil and spices are left out.</p>';
  C.SECS.forEach(function(sec){
    var its = needs.filter(function(n){ return n.sec === sec; }); if(!its.length) return;
    h += '<p class="sec-h">'+sec+'</p>';
    its.forEach(function(n){ var k = n.key || n.name, off = rv.off[k], it = {key:n.key, amt:n.amt, u:n.u};
      h += '<label class="chkrow"><input type="checkbox" data-act="rvT" data-k="'+esc(k)+'"'+(off?'':' checked')+'><span class="grow"><span class="nm">'+esc(n.name)+'</span><span class="sub">'+esc(C.amtText(it))+'</span><span class="sub">For: '+esc(n.for.join(', '))+'</span></span>'+dot(n.key)+'</label>'; });
  });
  var on = needs.filter(function(n){ return !rv.off[n.key || n.name]; }).length;
  h += '<button class="btn pri full" style="margin-top:14px" data-act="rvAdd">Add '+on+' item'+(on===1?'':'s')+' to list</button>';
  ui._needs = needs; ui._rvwk = wk;
  return h;
}
function regularsSheet(){
  var regs = (D.settings.regulars || []);
  var h = '<div class="sh-h"><h2 class="h3">Regulars</h2><button class="link" data-act="closeSheet">Close</button></div>';
  if(!regs.length) return h + '<p class="muted">No regulars yet. Open any item on your list and tap Save as regular. Things like eggs or almond milk you buy every week.</p>';
  h += '<div class="col">'+regs.map(function(r, i){ return '<div class="row between opt"><span>'+esc(r.n)+(r.note?' <span class="muted small">'+esc(r.note)+'</span>':'')+'</span><button class="ib sm" data-act="regDel" data-i="'+i+'" aria-label="Remove regular">'+I('x',16)+'</button></div>'; }).join('')+'</div>';
  h += '<button class="btn pri full" style="margin-top:14px" data-act="regAdd">Add all to list</button>';
  return h;
}

/* Settings */
function renderSettings(){
  if(!ui.pf) ui.pf = Object.assign({}, C.prof(uid()));
  var pt = C.partner();
  var h = '<header class="top"><button class="ib" data-act="back" aria-label="Back">'+I('back',22)+'</button><h1 class="h2 grow" style="margin-left:6px">Settings</h1></header>';
  h += '<div class="card"><h2 class="h3">Your profile</h2>'+profileForm(ui.pf)+'</div>';
  h += '<div class="card"><h2 class="h3">Plan phase</h2><p class="small muted">Changes the keto colors for both of you.</p><div class="seg" style="margin-top:10px"><button class="'+(C.phase()==='keto'?'on':'')+'" data-act="phase" data-v="keto">Strict keto</button><button class="'+(C.phase()==='exit'?'on':'')+'" data-act="phase" data-v="exit">Exit phase</button></div></div>';
  if(pt) h += '<div class="card"><h2 class="h3">Shared with</h2><p class="row" style="gap:8px;margin-top:6px">'+C.avatar(pt, 28)+esc(C.prof(pt).name)+' <span class="muted small">('+C.portion(pt)+'× portion)</span></p></div>';
  h += '<div class="card"><h2 class="h3">Your account</h2><p class="small muted">'+esc(C.me.email||'')+'</p><label class="lbl">Your user ID</label><div class="idbox"><code>'+esc(uid())+'</code><button class="ib" data-act="copyId" aria-label="Copy user ID">'+I('copy')+'</button></div>'
    + '<button class="btn full" style="margin-top:14px" data-act="export">Export my data</button><button class="btn full" style="margin-top:8px" data-act="signout">Sign out</button></div>';
  h += '<p class="tiny muted center" style="margin:10px 0 20px">S&amp;A Kitchen, stage 1. Nutrition values are estimates from standard food data.</p>';
  return h;
}

/* Recipe editor */
function renderEditor(){
  var e = ui.ed;
  var cats = C.CAT_ORDER.map(function(c){ return '<option value="'+c+'"'+(e.c===c?' selected':'')+'>'+C.CATS[c]+'</option>'; }).join('');
  var est = C.nutri({i:(e.ingText||'').split('\n').map(C.parseLine).filter(Boolean), sv:+e.sv||2});
  var reds = (e.ingText||'').split('\n').map(C.parseLine).filter(function(x){ return x && x[0] && C.rate(C.food(x[0])) === 'r'; }).map(function(x){ return C.food(x[0]).n; });
  var h = '<header class="top"><button class="ib" data-act="back" aria-label="Cancel">'+I('x',22)+'</button><h1 class="h2 grow" style="margin-left:6px">'+(e.mode==='new'?'New recipe':'Edit recipe')+'</h1><button class="btn pri sm" data-act="saveRec">Save</button></header>';
  if(e.mode === 'edit' && e.builtin) h += '<p class="small muted" style="margin-bottom:10px">Your changes are saved for both of you. You can restore the original anytime.</p>';
  h += '<div class="card"><label class="lbl" for="e_n">Name</label><input class="in" id="e_n" value="'+esc(e.n)+'">'
    + '<div class="grid2"><label>Meal<select class="in" id="e_c">'+cats+'</select></label><label>Diet<select class="in" id="e_d"><option value="veg"'+(e.d==='veg'?' selected':'')+'>Veg</option><option value="nog"'+(e.d==='nog'?' selected':'')+'>Veg, no onion and garlic</option><option value="non"'+(e.d==='non'?' selected':'')+'>Non-veg</option></select></label>'
    + '<label>Minutes<input class="in" id="e_t" type="number" inputmode="numeric" value="'+esc(e.t)+'"></label><label>Servings it makes<input class="in" id="e_sv" type="number" inputmode="numeric" value="'+esc(e.sv)+'"></label></div></div>';
  h += '<div class="card"><label class="lbl" for="e_i">Ingredients, one per line</label><p class="tiny muted">Like \u201c300 g spinach\u201d, \u201c2 tsp ghee\u201d or \u201c4 eggs\u201d.</p><textarea class="in" id="e_i" rows="8">'+esc(e.ingText)+'</textarea>'
    + (reds.length ? '<p class="kn r" style="margin-top:8px">'+I('alert',14)+' Not in your keto plan: '+esc(reds.join(', '))+'. You can still save it.</p>' : '')
    + '<label class="lbl" for="e_s">Steps, one per line</label><p class="tiny muted">Add a timer by ending a step with [5 min].</p><textarea class="in" id="e_s" rows="7">'+esc(e.stepText)+'</textarea>'
    + '<label class="lbl" for="e_tip">Tips (optional)</label><textarea class="in" id="e_tip" rows="2">'+esc(e.tip||'')+'</textarea></div>';
  h += '<div class="card"><p class="lbl" style="margin-top:0">Tags</p><div class="chips">'+['quick','make','lunch','freeze','week','full','add','occ','heavy','thaw'].map(function(t){ return '<button class="chip'+((e.tags||'').split(' ').indexOf(t)>=0?' on':'')+'" data-act="eTag" data-v="'+t+'">'+C.TAGN[t]+'</button>'; }).join('')+'</div>'
    + '<p class="lbl">Nutrition per serving (optional)</p><p class="tiny muted">Leave blank to use the estimate: ≈'+est.k+' kcal, '+est.p+' g protein, '+est.nc+' g net carbs.</p>'
    + '<div class="grid3"><label>kcal<input class="in" id="e_k" type="number" inputmode="numeric" value="'+esc(e.k||'')+'"></label><label>Protein g<input class="in" id="e_p" type="number" inputmode="numeric" value="'+esc(e.p||'')+'"></label><label>Net carbs g<input class="in" id="e_nc" type="number" inputmode="decimal" value="'+esc(e.nc||'')+'"></label></div></div>';
  if(e.mode === 'edit' && e.builtin && D.recipes[e.id]) h += '<button class="btn full" data-act="restoreRec">Restore original recipe</button>';
  if(e.mode === 'edit' && !e.builtin) h += '<button class="btn full danger-o" data-act="delRec">Delete this recipe</button>';
  return h;
}
function editorFrom(r){
  var tm = function(s){ return s[1] ? ' [' + (s[1] >= 60 ? Math.round(s[1]/60) + ' min' : s[1] + ' sec') + ']' : ''; };
  var steps = (r.s || []).map(function(s){
    var t = String(s[0]).replace(/\[\[([\s\S]*?)\|\|([\s\S]*?)\]\]/g, function(_, a, b){ return r.both ? a + (b.trim() ? ' (No onion and garlic: ' + b.trim() + ')' : '') : a; });
    t = t.replace(/\{(\d+)\}/g, function(_, n){ var ing = (r.i||[])[+n]; if(!ing) return ''; var x = C.ingText(ing, 1); return x.q && ing[2] !== 'pinch' ? x.q + ' ' + x.n : x.n; });
    return t.replace(/ {2,}/g, ' ') + tm(s);
  });
  return {mode:'edit', id:r.id, builtin:!!C.BUILT[r.id], n:r.n, c:r.c, d:r.d, t:r.t, sv:r.sv || 2, tags:r.tags || '', k:r.k||'', p:r.p||'', nc:r.nc||'', tip:r.tip||'', both:r.both,
    ingText:(r.i||[]).map(C.lineOf).join('\n'), stepText:steps.join('\n'), fr:r.fr, rh:r.rh, pr:r.pr};
}
function readEditor(){
  var e = ui.ed; if(!$('e_n')) return;
  e.n = $('e_n').value.trim(); e.c = $('e_c').value; e.d = $('e_d').value; e.t = +$('e_t').value || 0; e.sv = +$('e_sv').value || 2;
  e.ingText = $('e_i').value; e.stepText = $('e_s').value; e.tip = $('e_tip').value.trim();
  e.k = $('e_k').value; e.p = $('e_p').value; e.nc = $('e_nc').value;
}

/* ---------- render ---------- */
function render(){
  var app = $('app'), tabs = $('tabbar'), act = document.activeElement, focusId = act && act.id, selS = act && act.selectionStart;
  if(phase === 'loading' || phase === 'checking' || phase === 'syncing'){ app.innerHTML = '<div class="auth"><img src="icon-180.png" alt="" width="72" height="72" class="logo"><p class="muted center">Loading your kitchen\u2026</p></div>'; tabs.hidden = true; return; }
  if(phase === 'auth'){ app.innerHTML = renderAuth(); tabs.hidden = true; return; }
  if(phase === 'waiting'){ app.innerHTML = renderWaiting(); tabs.hidden = true; return; }
  if(phase === 'offline'){ app.innerHTML = renderOffline(); tabs.hidden = true; return; }
  if(phase === 'setup'){ if(D.profiles[uid()]){ phase = 'app'; } else { app.innerHTML = renderSetup(); tabs.hidden = true; return; } }
  ensureDaySubs();
  var h;
  if(cook){ h = renderCook(); }
  else if(view.page && view.page.t === 'recipe') h = renderRecipe();
  else if(view.page && view.page.t === 'settings') h = renderSettings();
  else if(view.page && view.page.t === 'editor') h = renderEditor();
  else if(view.tab === 'recipes') h = renderRecipes();
  else if(view.tab === 'plan') h = renderPlan();
  else if(view.tab === 'groceries') h = renderGroceries();
  else h = renderToday();
  app.innerHTML = h;
  tabs.hidden = !!(cook || view.page);
  Array.prototype.forEach.call(tabs.querySelectorAll('[data-tab]'), function(b){ var on = b.getAttribute('data-tab') === view.tab && !view.page; b.classList.toggle('on', on); if(on) b.setAttribute('aria-current','page'); else b.removeAttribute('aria-current'); });
  var sh = $('sheet'), sc = $('scrim');
  if(ui.sheet){
    var s = ui.sheet, c = '';
    if(s.t === 'filters') c = filterSheet(); else if(s.t === 'facts') c = factsSheet(s.key, s.item); else if(s.t === 'slot') c = slotSheet(s.s);
    else if(s.t === 'toPlan') c = toPlanSheet(); else if(s.t === 'review') c = reviewSheet(); else if(s.t === 'regulars') c = regularsSheet();
    else if(s.t === 'cookIngs') c = cookIngsSheet(); else if(s.t === 'made') c = '<h2 class="h3">Nicely done!</h2><p class="muted" style="margin:6px 0 14px">Did you make extra?</p><button class="btn full" data-act="madeExtra">Yes, plan it for tomorrow\u2019s lunch</button><button class="btn full" style="margin-top:8px" data-act="madeNo">No leftovers</button>';
    sh.innerHTML = '<div class="grab" aria-hidden="true"></div>' + c; sh.hidden = false; sc.hidden = false;
  } else { sh.hidden = true; sc.hidden = true; }
  if(focusId){ var el = $(focusId); if(el && el.focus){ el.focus(); try{ if(selS != null) el.setSelectionRange(selS, selS); }catch(e){} } }
}

/* ---------- timers, sound, screen ---------- */
function ac(){ try{ if(!AC){ var Ctx = window.AudioContext || window.webkitAudioContext; if(Ctx) AC = new Ctx(); } if(AC && AC.state === 'suspended') AC.resume(); }catch(e){} }
function beep(n){ if(!AC) return; try{ for(var i=0;i<(n||1);i++){ var o = AC.createOscillator(), g = AC.createGain(), t = AC.currentTime + i*0.25; o.frequency.value = 880; o.connect(g); g.connect(AC.destination); g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.35,t+0.02); g.gain.exponentialRampToValueAtTime(0.0001,t+0.2); o.start(t); o.stop(t+0.22); } }catch(e){} }
function wake(){ try{ if('wakeLock' in navigator) navigator.wakeLock.request('screen').then(function(l){ WL = l; }).catch(function(){}); }catch(e){} }
function unwake(){ try{ if(WL) WL.release(); }catch(e){} WL = null; }
document.addEventListener('visibilitychange', function(){ if(document.visibilityState === 'visible'){ if(cook) wake(); scheduleRender(); } });
setInterval(function(){
  if(!cook) return;
  var changed = false;
  cook.timers.forEach(function(t){ if(!t.done && Date.now() >= t.end){ t.done = true; changed = true; beep(3); toast(t.label + ' timer done'); } });
  var el = $('timers'); if(el) el.innerHTML = timerChips();
}, 500);

/* ---------- actions ---------- */
function setCheckin(fields){ var k = C.ymd(C.today()) + '_' + uid(); D.checkins[k] = Object.assign({}, D.checkins[k] || {}, fields); W.set('checkins/' + k, Object.assign({uid:uid(), date:C.ymd(C.today())}, fields), true); render(); }
function toggleFav(id){ var f = (D.settings.favs || []).slice(), i = f.indexOf(id); if(i >= 0) f.splice(i, 1); else f.push(id); D.settings.favs = f; W.set('meta/settings', {favs:f}, true); }
function closeSheet(){ ui.sheet = null; ui.picking = false; ui.pfor = null; ui.pq = ''; ui.pcat = null; ui.rematch = false; ui.mq = ''; render(); }
function addGrocery(o){ var data = Object.assign({b:false, h:false, ts:Date.now(), by:null}, o); B.add('groceries', data).catch(fail); }

document.addEventListener('click', function(ev){
  var t = ev.target.closest('[data-act],[data-tab]'); if(!t) { if(ev.target.id === 'scrim') closeSheet(); return; }
  if(t.hasAttribute('data-tab')){ view.tab = t.getAttribute('data-tab'); view.page = null; ui = {}; render(); window.scrollTo(0,0); return; }
  var a = t.getAttribute('data-act'), v = t.getAttribute('data-v'), id = t.getAttribute('data-id');
  if(t.tagName === 'A') ev.preventDefault();
  switch(a){
    case 'authMode': authMode = authMode === 'in' ? 'up' : 'in'; authErr = ''; render(); return;
    case 'forgot':
      var em = ($('em')||{}).value; if(!em){ authErr = 'Type your email above first.'; render(); return; }
      B.reset(em).then(function(){ authErr = ''; toast('Password reset email sent'); }).catch(function(){ authErr = 'Couldn\u2019t send the email. Check the address.'; render(); }); return;
    case 'copyId': copyText(uid(), 'User ID copied'); return;
    case 'recheck': onUser(C.me); return;
    case 'signout': B.signOut(); ui = {}; view = {tab:'today', page:null}; return;
    case 'pcolor': readProfile(); ui.pf.color = +t.getAttribute('data-i'); render(); return;
    case 'pport': readProfile(); ui.pf.portion = +v; render(); return;
    case 'punits': readProfile(); ui.pf.units = v; render(); return;
    case 'saveProfile':
      readProfile(); if(!ui.pf.name){ toast('Add your name first'); return; }
      ui.pf.ini = (ui.pf.ini || ui.pf.name.charAt(0)).toUpperCase();
      var pd = {}; pd[uid()] = ui.pf; D.profiles[uid()] = ui.pf; W.set('meta/profiles', pd, true);
      phase = 'app'; ui = {}; if(view.page && view.page.t === 'settings') toast('Profile saved'); view.page = null; render(); return;
    case 'settings': ui = {}; view.page = {t:'settings'}; render(); window.scrollTo(0,0); return;
    case 'back': if(cook) return; if(view.page && view.page.t === 'editor' && ui.edBack){ view.page = ui.edBack; ui.ed = null; } else view.page = null; ui.pf = null; render(); window.scrollTo(0,0); return;
    case 'phase': W.set('meta/settings', {phase:v}, true); D.settings.phase = v; render(); return;
    case 'export': exportData(); return;
    case 'remDone':
      var tk = C.ymd(C.today()), k = t.getAttribute('data-k'), cur = D.days[tk] && D.days[tk].rem && D.days[tk].rem[k];
      var f = {}; f['rem.' + k] = cur ? B.DEL : {by:uid()}; W.ensure('days/' + tk, {date:tk}); W.upd('days/' + tk, f); return;
    case 'gotoPlan': view.tab = 'plan'; render(); return;
    case 'ate': var ci = D.checkins[C.ymd(C.today()) + '_' + uid()] || {}, ate = (ci.ate || []).slice(), ix = ate.indexOf(t.getAttribute('data-s')); if(ix >= 0) ate.splice(ix, 1); else ate.push(t.getAttribute('data-s')); setCheckin({ate:ate}); return;
    case 'ciPlan': var c0 = D.checkins[C.ymd(C.today()) + '_' + uid()] || {}; setCheckin({plan: c0.plan === v ? null : v}); return;
    case 'water': var c1 = D.checkins[C.ymd(C.today()) + '_' + uid()] || {}; setCheckin({water: c1.water === +v ? +v - 1 : +v}); return;
    case 'wo': var c2 = D.checkins[C.ymd(C.today()) + '_' + uid()] || {}; setCheckin({wo: !c2.wo}); return;
    case 'planSlot': view.tab = 'plan'; pref.planWeek = 0; ui.pd = +t.getAttribute('data-d'); ui.sheet = {t:'slot', s:t.getAttribute('data-s')}; ui.picking = true; render(); return;
    case 'openRec': ui.sheet = null; ui.rp = null; view.page = {t:'recipe', id:id}; render(); window.scrollTo(0,0); return;
    case 'diet': pref.diet = v; LS.set('diet', v); render(); return;
    case 'filters': ui.sheet = {t:'filters'}; render(); return;
    case 'clearF': ui.rf = {}; render(); return;
    case 'seeAll': var row = ui._rows[+t.getAttribute('data-i')]; ui.rf = Object.assign({}, row[2]); render(); window.scrollTo(0,0); return;
    case 'fCat': ui.rf = ui.rf || {}; ui.rf.cat = ui.rf.cat === v ? null : v; render(); return;
    case 'fProt': ui.rf = ui.rf || {}; ui.rf.prot = ui.rf.prot === v ? null : v; render(); return;
    case 'fTime': ui.rf = ui.rf || {}; ui.rf.time = ui.rf.time === +v ? null : +v; render(); return;
    case 'fTag': ui.rf = ui.rf || {}; var tg = (ui.rf.tags || []).slice(), ti = tg.indexOf(v); if(ti >= 0) tg.splice(ti, 1); else tg.push(v); ui.rf.tags = tg; render(); return;
    case 'fFlag': ui.rf = ui.rf || {}; ui.rf[v] = !ui.rf[v]; render(); return;
    case 'closeSheet': closeSheet(); return;
    case 'fav': toggleFav(id); render(); return;
    case 'who': ui.rp.who = v; render(); return;
    case 'nog': ui.rp.nog = !ui.rp.nog; render(); return;
    case 'sv': ui.rp.sv = Math.max(0.5, Math.min(12, ui.rp.sv + (+v) * (ui.rp.sv < 2 && +v < 0 ? 0.5 : 1))); ui.rp.sv0 = ui.rp.sv; render(); return;
    case 'units': var pu = {}; pu[uid()] = {units:v}; D.profiles[uid()] = Object.assign({}, C.prof(uid()), {units:v}); W.set('meta/profiles', pu, true); render(); return;
    case 'facts': ui.per = 'p'; ui.sheet = {t:'facts', key:t.getAttribute('data-key')}; render(); return;
    case 'per': ui.per = v; render(); return;
    case 'addNote': var nt = ($('noteIn')||{}).value; if(!nt || !nt.trim()) return; B.add('notes', {rid:view.page.id, by:uid(), t:nt.trim(), ts:Date.now()}).catch(fail); $('noteIn').value = ''; return;
    case 'delNote': B.del('notes/' + id).catch(fail); return;
    case 'toPlan': ui.tp = null; ui.sheet = {t:'toPlan'}; render(); return;
    case 'tpW': ui.tp.w = +v; render(); return;
    case 'tpD': ui.tp.d = +v; render(); return;
    case 'tpS': ui.tp.s = v; render(); return;
    case 'tpWho': ui.tp.who = v; render(); return;
    case 'tpAdd':
      var tp = ui.tp, wk = C.wk(C.addD(C.today(), tp.w*7)), ex = C.slot(wk, tp.d, tp.s);
      if(tp.who === 'all') W.slot(wk, tp.d, tp.s, {r:view.page.id});
      else { var nv = Object.assign({}, ex || {}); nv.p = Object.assign({}, nv.p || {}); nv.p[tp.who] = view.page.id; if(!nv.r && !ex) nv.r = null; W.slot(wk, tp.d, tp.s, nv); }
      toast('Added to ' + C.DAYS[tp.d] + ' ' + C.SLOTN[tp.s].toLowerCase()); closeSheet(); return;
    case 'cook': ac(); wake(); cook = {id:view.page.id, step:0, timers:[], checked:{}}; ui.sheet = null; render(); window.scrollTo(0,0); return;
    case 'cookClose': cook = null; unwake(); ui.sheet = null; render(); return;
    case 'cookPrev': if(cook.step > 0){ cook.step--; render(); } return;
    case 'cookNext': var rr = C.rec(cook.id); if(cook.step < rr.s.length - 1){ cook.step++; render(); } else { ui.sheet = {t:'made'}; render(); } return;
    case 'startTimer': ac(); var cr = C.rec(cook.id), secs = cr.s[cook.step][1]; cook.timers.push({step:cook.step, end:Date.now()+secs*1000, label:'Step ' + (cook.step+1)}); render(); return;
    case 'cookIngs': ui.sheet = {t:'cookIngs'}; render(); return;
    case 'madeExtra':
      var tm = C.addD(C.today(), 1), twk = C.wk(tm), cur2 = C.slot(twk, C.di(tm), 'L');
      if(!cur2) W.slot(twk, C.di(tm), 'L', {r:cook.id, lo:'Today\u2019s cooking'});
      toast(cur2 ? 'Tomorrow\u2019s lunch is already planned' : 'Planned for tomorrow\u2019s lunch'); cook = null; unwake(); ui.sheet = null; render(); return;
    case 'madeNo': cook = null; unwake(); ui.sheet = null; render(); return;
    case 'wkPrev': pref.planWeek--; ui.pd = 0; render(); return;
    case 'wkNext': pref.planWeek++; ui.pd = 0; render(); return;
    case 'pday': ui.pd = +v; render(); return;
    case 'pwho': ui.pwho = v; render(); return;
    case 'suggest':
      var fields = C.suggestWeek(planWk(), pref.diet), n = Object.keys(fields).length;
      if(!n){ toast('Your week is already full'); return; }
      W.many(planWk(), fields); applyLocal(planWk(), fields); toast('Week filled. Tap any meal to change it.'); render(); return;
    case 'copyWeek':
      var prev = C.plan(C.wk(C.addD(C.parse(planWk()), -7))), cf = {};
      for(var d=0; d<7; d++) C.SLOTS.forEach(function(s){ var p0 = prev['d'+d] && prev['d'+d][s]; if(p0 && !C.slot(planWk(), d, s)) cf['d'+d+'.'+s] = p0; });
      if(!Object.keys(cf).length){ toast('Nothing to copy into empty slots'); return; }
      W.many(planWk(), cf); applyLocal(planWk(), cf); toast('Copied last week into empty slots'); render(); return;
    case 'slot': ui.sheet = {t:'slot', s:t.getAttribute('data-s')}; ui.picking = false; render(); return;
    case 'slotChange': ui.picking = true; ui.pfor = null; render(); return;
    case 'slotDiff': ui.picking = true; ui.pfor = t.getAttribute('data-u'); render(); return;
    case 'slotRemove': W.slot(planWk(), curDay(), ui.sheet.s, null); setLocalSlot(planWk(), curDay(), ui.sheet.s, null); closeSheet(); return;
    case 'slotExtra':
      var s0 = ui.sheet.s, sl0 = Object.assign({}, C.slot(planWk(), curDay(), s0)); sl0.x = !sl0.x;
      W.slot(planWk(), curDay(), s0, sl0); setLocalSlot(planWk(), curDay(), s0, sl0);
      var nd = C.addD(C.addD(C.parse(planWk()), curDay()), 1), nwk = C.wk(nd), nl = C.slot(nwk, C.di(nd), 'L');
      if(sl0.x && !nl){ var lv = {r:sl0.r, lo:C.DAYS[curDay()] + ' dinner'}; W.slot(nwk, C.di(nd), 'L', lv); setLocalSlot(nwk, C.di(nd), 'L', lv); }
      if(!sl0.x && nl && nl.lo === C.DAYS[curDay()] + ' dinner'){ W.slot(nwk, C.di(nd), 'L', null); setLocalSlot(nwk, C.di(nd), 'L', null); }
      render(); return;
    case 'pcat': ui.pcat = v; render(); return;
    case 'pick':
      var ps = ui.sheet.s, cur3 = C.slot(planWk(), curDay(), ps), val;
      if(ui.pfor){ val = Object.assign({}, cur3 || {}); val.p = Object.assign({}, val.p || {}); val.p[ui.pfor] = id; if(val.r === undefined) val.r = null; }
      else { val = Object.assign({}, cur3 || {}, {r:id}); delete val.lo; }
      W.slot(planWk(), curDay(), ps, val); setLocalSlot(planWk(), curDay(), ps, val); closeSheet(); return;
    case 'share': var txt = C.groceryText(D.groceries.filter(function(i){ return !i.b && !i.h; }));
      if(navigator.share){ navigator.share({title:'Groceries', text:txt}).catch(function(){}); } else copyText(txt, 'List copied'); return;
    case 'review': ui.rv = null; ui.sheet = {t:'review'}; render(); return;
    case 'rvW': ui.rv.w = +v; ui.rv.off = {}; render(); return;
    case 'rvAdd': addFromPlan(); return;
    case 'regulars': ui.sheet = {t:'regulars'}; render(); return;
    case 'regDel': var regs = (D.settings.regulars || []).slice(); regs.splice(+t.getAttribute('data-i'), 1); D.settings.regulars = regs; W.set('meta/settings', {regulars:regs}, true); render(); return;
    case 'regAdd':
      var have = D.groceries.filter(function(i){ return !i.b; }).map(function(i){ return FD.norm(i.n); });
      var added = 0; (D.settings.regulars || []).forEach(function(r){ if(have.indexOf(FD.norm(r.n)) >= 0) return; addGrocery({n:r.n, key:r.key || null, note:r.note || '', sec:r.sec || 'Other', src:'reg'}); added++; });
      toast(added ? added + ' regular' + (added===1?'':'s') + ' added' : 'Regulars are already on the list'); closeSheet(); return;
    case 'grg': ui.grg = v; render(); return;
    case 'gst': ui.gst = v; render(); return;
    case 'gOpen': ui.gopen = ui.gopen === id ? null : id; render(); return;
    case 'gBuy': var gi = gItem(id); if(gi){ var nb = !gi.b; gi.b = nb; gi.by = nb ? uid() : null; if(nb) gi.h = false; B.update('groceries/' + id, {b:nb, by:nb ? uid() : null, h:false}).catch(fail); render(); } return;
    case 'gHave': var gh = gItem(id); if(gh){ gh.h = !gh.h; B.update('groceries/' + id, {h:gh.h}).catch(fail); render(); } return;
    case 'gDel': B.del('groceries/' + id).catch(fail); ui.gopen = null; return;
    case 'gSaveAmt': var ga = ($('gAmt')||{}).value || ''; B.update('groceries/' + id, {note:ga.trim()}).catch(fail); ui.gopen = null; toast('Amount saved'); return;
    case 'gRegular': var gr = gItem(id); if(gr){ var rl = (D.settings.regulars || []).slice(); if(!rl.some(function(x){ return FD.norm(x.n) === FD.norm(gr.n); })){ rl.push({n:gr.n, key:gr.key || null, note:gr.note || '', sec:gr.sec}); D.settings.regulars = rl; W.set('meta/settings', {regulars:rl}, true); } toast('Saved as a regular'); } return;
    case 'gFacts': var gf = gItem(id); ui.per = 'p'; ui.mq = ''; ui.sheet = {t:'facts', key:gf.key, item:gf}; render(); return;
    case 'gClear': D.groceries.filter(function(i){ return i.b; }).forEach(function(i){ B.del('groceries/' + i.id).catch(fail); }); toast('Bought items cleared'); return;
    case 'gAdd': addManual(); return;
    case 'rematch': ui.rematch = true; ui.mq = ''; render(); return;
    case 'setMatch': setMatch(t.getAttribute('data-key')); return;
    case 'setHouse': setMatch('house'); return;
    case 'saveLabel': saveLabel(); return;
    case 'newRec': ui.edBack = null; ui.ed = {mode:'new', n:'', c:'m', d:'non', t:20, sv:2, tags:'', ingText:'', stepText:''}; view.page = {t:'editor'}; render(); window.scrollTo(0,0); return;
    case 'editRec': ui.edBack = view.page; ui.ed = editorFrom(C.rec(view.page.id)); view.page = {t:'editor'}; render(); window.scrollTo(0,0); return;
    case 'eTag': readEditor(); var et = (ui.ed.tags || '').split(' ').filter(Boolean), ei = et.indexOf(v); if(ei >= 0) et.splice(ei, 1); else et.push(v); ui.ed.tags = et.join(' '); render(); return;
    case 'saveRec': saveRecipe(); return;
    case 'restoreRec': B.del('recipes/' + ui.ed.id).catch(fail); delete D.recipes[ui.ed.id]; toast('Original recipe restored'); view.page = {t:'recipe', id:ui.ed.id}; ui.ed = null; ui.rp = null; render(); return;
    case 'delRec': if(!confirm('Delete this recipe for both of you?')) return; B.del('recipes/' + ui.ed.id).catch(fail); delete D.recipes[ui.ed.id]; view.page = null; ui.ed = null; view.tab = 'recipes'; toast('Recipe deleted'); render(); return;
  }
});
document.addEventListener('change', function(ev){
  var t = ev.target;
  if(t.getAttribute('data-act') === 'cookChk'){ cook.checked[t.getAttribute('data-i')] = t.checked; }
  if(t.getAttribute('data-act') === 'rvT'){ ui.rv.off[t.getAttribute('data-k')] = !t.checked; render(); }
  if(view.page && view.page.t === 'editor' && t.id === 'e_i'){ readEditor(); render(); }
});
document.addEventListener('input', function(ev){
  var t = ev.target;
  if(t.id === 'rq'){ ui.q = t.value; render(); }
  if(t.id === 'pq'){ ui.pq = t.value; render(); }
  if(t.id === 'mq'){ ui.mq = t.value; render(); }
});
document.addEventListener('submit', function(ev){
  if(ev.target.id !== 'authf') return; ev.preventDefault();
  var em = $('em').value.trim(), pw = $('pw').value;
  if(!em || !pw){ authErr = 'Enter your email and password.'; render(); return; }
  if(authMode === 'up' && pw.length < 8){ authErr = 'Use at least 8 characters.'; render(); return; }
  authErr = '';
  (authMode === 'up' ? B.signUp(em, pw) : B.signIn(em, pw)).catch(function(e){
    var c = (e && e.code) || '';
    authErr = c.indexOf('email-already') >= 0 ? 'That email already has an account. Sign in instead.' : c.indexOf('weak-password') >= 0 ? 'Choose a longer password.' : c.indexOf('too-many') >= 0 ? 'Too many attempts. Wait a few minutes and try again.' : c.indexOf('network') >= 0 ? 'No internet connection.' : authMode === 'up' ? 'Couldn\u2019t create the account. Check the email address.' : 'Email or password doesn\u2019t match.';
    render();
  });
});
document.addEventListener('keydown', function(ev){
  if(ev.key === 'Enter' && ev.target.id === 'gAdd'){ ev.preventDefault(); addManual(); }
  if(ev.key === 'Enter' && ev.target.id === 'noteIn'){ ev.preventDefault(); var b = document.querySelector('[data-act="addNote"]'); if(b) b.click(); }
  if(ev.key === 'Escape' && ui.sheet) closeSheet();
});

function curDay(){ return ui.pd == null ? (pref.planWeek === 0 ? C.di(C.today()) : 0) : ui.pd; }
function setLocalSlot(wk, d, s, val){ var p = D.plans[wk] = D.plans[wk] || {}; var dd = p['d'+d] = Object.assign({}, p['d'+d] || {}); if(val == null) delete dd[s]; else dd[s] = val; }
function applyLocal(wk, fields){ Object.keys(fields).forEach(function(k){ var m = k.match(/^d(\d)\.(\w)$/); if(m) setLocalSlot(wk, +m[1], m[2], fields[k]); }); }
function gItem(id){ return D.groceries.filter(function(i){ return i.id === id; })[0]; }
function readProfile(){ if(!$('pn')) return; ui.pf = ui.pf || {}; ui.pf.name = $('pn').value.trim(); ui.pf.ini = $('pi').value.trim(); }
function copyText(txt, msg){
  if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function(){ toast(msg); }).catch(function(){ prompt('Copy this:', txt); });
  else prompt('Copy this:', txt);
}
function addManual(){
  var el = $('gAdd'); if(!el) return; var txt = el.value.trim(); if(!txt) return;
  var qm = txt.match(/^\s*((?:\d+(?:[.,]\d+)?|\d+\/\d+|[½¼¾⅓⅔⅛])(?:\s*(?:\d+\/\d+|[½¼¾⅓⅔⅛]))?\s*(?:kg|g|gm|grams?|ml|l|litres?|liters?|tsp|tbsp|cups?|oz|ounces?|lbs?|pounds?|packs?|packets?|bags?|bunch(?:es)?|dozen|cans?|bottles?|jars?|boxes|box|heads?|blocks?|cartons?)?\b\.?)\s*(?:of\s+)?(.+)$/i);
  var note = qm ? qm[1].trim() : '', rest = qm ? qm[2].trim() : txt;
  var mt = C.matchName(rest), key = mt && mt.key, f = C.food(key);
  var name = f ? f.n : rest.charAt(0).toUpperCase() + rest.slice(1);
  addGrocery({n:name, key:key || null, note:note, sec: mt && mt.house ? 'Household' : f ? f.s : 'Other', src:'me'});
  el.value = ''; toast('Added ' + name);
  if(f && C.rate(f) === 'r') setTimeout(function(){ toast(f.n + ' isn\u2019t in your keto plan'); }, 2500);
}
function addFromPlan(){
  var rv = ui.rv, needs = ui._needs || [], wk = ui._rvwk, added = 0, updated = 0;
  needs.forEach(function(n){
    if(rv.off[n.key || n.name]) return;
    var ex = D.groceries.filter(function(i){ return !i.b && i.src === 'plan' && i.wk === wk && ((n.key && i.key === n.key) || (!n.key && FD.norm(i.n) === FD.norm(n.name))); })[0];
    var data = {n:n.name, key:n.key || null, amt:Math.round(n.amt*10)/10, u:n.u, sec:n.sec, src:'plan', wk:wk, days:n.days, for:n.for};
    if(ex){ B.update('groceries/' + ex.id, data).catch(fail); updated++; } else { addGrocery(data); added++; }
  });
  toast((added ? added + ' added' : '') + (added && updated ? ', ' : '') + (updated ? updated + ' updated' : '') || 'Nothing to add');
  closeSheet();
}
function setMatch(key){
  var it = ui.sheet && ui.sheet.item; if(!it) return;
  var map = {}; map['map.' + FD.norm(it.n)] = key;
  W.ensure('meta/foods', {}); W.upd('meta/foods', map);
  if(key === 'house') B.update('groceries/' + it.id, {key:null, sec:'Household'}).catch(fail);
  else { var f = C.food(key); B.update('groceries/' + it.id, {key:key, sec: f ? f.s : 'Other'}).catch(fail); }
  toast('Match saved for next time'); closeSheet();
}
function saveLabel(){
  var it = ui.sheet && ui.sheet.item; if(!it) return;
  var g = +$('lf_g').value, k = +$('lf_k').value, c = +$('lf_c').value, p = +$('lf_p').value, sug = $('lf_s').checked;
  if(!g || !k){ toast('Add the serving size and calories'); return; }
  var per = 100/g, nc100 = c*per, rk = sug ? 'r' : nc100 <= 5 ? 'g' : nc100 <= 10 ? 'a' : 'r';
  if(rk === 'g' && k*per > 400) rk = 'a';
  var key = 'c_' + FD.norm(it.n).replace(/ /g,'_');
  var food = {k:key, n:it.n, s:it.sec && it.sec !== 'Other' ? it.sec : 'Pantry', rk:rk, re:rk === 'r' && !sug ? 'a' : rk, v:[Math.round(k*per), Math.round(p*per*10)/10, Math.round(nc100*10)/10, 0, 0], por:['1 serving', g],
    gi:'Not known', note: sug ? 'Has added sugar or sweeteners, so it\u2019s not in your plan.' : rk === 'g' ? 'Low in carbs per your label.' : rk === 'a' ? 'Moderate carbs or calorie-dense. Measure portions.' : 'Too many carbs for keto.', al:[]};
  var upd = {}; upd['custom.' + key] = food; upd['map.' + FD.norm(it.n)] = key;
  W.ensure('meta/foods', {}); W.upd('meta/foods', upd);
  B.update('groceries/' + it.id, {key:key}).catch(fail);
  toast('Food saved'); closeSheet();
}
function saveRecipe(){
  readEditor(); var e = ui.ed;
  if(!e.n){ toast('Add a name first'); return; }
  var ings = (e.ingText || '').split('\n').map(C.parseLine).filter(Boolean);
  var steps = (e.stepText || '').split('\n').map(function(l){ return l.trim(); }).filter(Boolean).map(function(l){
    var m = l.match(/\[(\d+)\s*(min|mins|minutes|sec|secs|seconds)\]\s*$/i), secs = 0;
    if(m){ secs = +m[1] * (/^s/i.test(m[2]) ? 1 : 60); l = l.replace(m[0], '').trim(); }
    return secs ? [l.replace(/[{}]/g,''), secs] : [l.replace(/[{}]/g,'')];
  });
  var est = C.nutri({i:ings, sv:+e.sv || 2});
  var data = {n:e.n, c:e.c, d:e.d, t:+e.t || 0, sv:+e.sv || 2, tags:e.tags || '', i:ings, s:steps, tip:e.tip || '',
    k:+e.k || est.k, p:+e.p || est.p, nc:+e.nc || est.nc, pr: e.pr || guessProt(ings), both: ings.some(function(x){ return x[3] === 'n' || x[3] === 'o'; }) ? 1 : 0};
  if(e.fr) data.fr = e.fr; if(e.rh) data.rh = e.rh;
  var rid = e.mode === 'new' ? 'c-' + Date.now().toString(36) + Math.random().toString(36).slice(2,6) : e.id;
  var kind = e.mode === 'new' ? 'custom' : (C.BUILT[rid] ? 'edit' : 'custom');
  var doc = {kind:kind, data:JSON.parse(JSON.stringify(data)), by:uid(), ts:Date.now()};
  D.recipes[rid] = doc; W.set('recipes/' + rid, doc);
  toast(e.mode === 'new' ? 'Recipe added' : 'Recipe saved');
  view.page = {t:'recipe', id:rid}; ui.ed = null; ui.rp = null; render(); window.scrollTo(0,0);
}
function guessProt(ings){ var keys = ings.map(function(x){ return x[0]; }).join(' ');
  if(/chicken|turkey|drum/.test(keys)) return 'chicken'; if(/tilapia|salmon|shrimp|tuna/.test(keys)) return 'fish'; if(/mutton/.test(keys)) return 'mutton';
  if(/paneer/.test(keys)) return 'paneer'; if(/tofu/.test(keys)) return 'tofu'; if(/egg/.test(keys)) return 'egg'; return 'veg'; }
function exportData(){
  var data = JSON.stringify({exported:new Date().toISOString(), profiles:D.profiles, settings:D.settings, foods:D.foods, recipes:D.recipes, notes:D.notes, groceries:D.groceries, plans:D.plans, checkins:D.checkins}, null, 2);
  try{
    var blob = new Blob([data], {type:'application/json'}), a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = 'sa-kitchen-backup-' + C.ymd(C.today()) + '.json'; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 1000); toast('Backup downloaded');
  }catch(e){ copyText(data, 'Backup copied'); }
}

/* ---------- start ---------- */
function boot(){ if(B) return; B = window.Backend; phase = 'loading'; render(); B.onAuth(onUser); }
if(window.Backend) boot(); else window.addEventListener('backend-ready', boot);
setTimeout(function(){ if(!B){ phase = 'offline'; render(); } }, 15000);
window.SAK_APP = {render:render, state:function(){ return {phase:phase, view:view, ui:ui, cook:cook}; }};
})();
