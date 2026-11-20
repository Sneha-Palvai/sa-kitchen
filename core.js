/* S&A Kitchen: data helpers shared by the screens */
(function(){
'use strict';
var FD = window.SA_FOODS, FOODS = FD.list;
var C = window.SAK = {};

C.SLOTS = ['B','L','S','D'];
C.SLOTN = {B:'Breakfast', L:'Lunch', S:'Snack', D:'Dinner'};
C.DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
C.DSH = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
C.MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
C.CATS = {b:'Breakfast', m:'Mains', ss:'Soups and salads', sd:'Sides', sn:'Snacks', br:'Breads and wraps', dr:'Drinks'};
C.CAT_ORDER = ['b','m','ss','sd','sn','br','dr'];
C.PROT = {chicken:'Chicken', fish:'Fish and seafood', egg:'Eggs', mutton:'Mutton', paneer:'Paneer', tofu:'Tofu', veg:'Vegetables'};
C.TAGN = {quick:'Under 10 min', make:'Make-ahead', lunch:'Lunchbox', freeze:'Freezer-friendly', week:'Weeknight', heavy:'Heavier', occ:'Occasional', full:'Full meal', add:'Add a protein', thaw:'Needs thawing'};
C.SECS = ['Produce','Dairy and eggs','Meat and fish','Frozen','Pantry','Spices','Household','Other'];

C.D = {profiles:{}, settings:{}, foods:{}, recipes:{}, notes:[], groceries:[], plans:{}, days:{}, checkins:{}};
C.me = null;

/* ---------- text and dates ---------- */
C.esc = function(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
function pad(n){ return (n < 10 ? '0' : '') + n; }
C.ymd = function(d){ return d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate()); };
C.parse = function(s){ var p = s.split('-'); return new Date(+p[0], +p[1]-1, +p[2]); };
C.addD = function(d, n){ var x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate()+n); return x; };
C.monday = function(d){ var x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay()+6)%7)); return x; };
C.wk = function(d){ return C.ymd(C.monday(d)); };
C.di = function(d){ return (d.getDay()+6) % 7; };
C.today = function(){ var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
C.longDate = function(d){ return C.DAYS[C.di(d)] + ', ' + C.MONTHS[d.getMonth()] + ' ' + d.getDate(); };
C.shortDate = function(d){ return C.MONTHS[d.getMonth()].slice(0,3) + ' ' + d.getDate(); };

/* ---------- people ---------- */
C.okId = function(u){ return typeof u === 'string' && /^[A-Za-z0-9]{6,128}$/.test(u); };
C.uids = function(){ var u = Object.keys(C.D.profiles).filter(C.okId); if(C.me && u.indexOf(C.me.uid) < 0) u.unshift(C.me.uid); return u; };
C.prof = function(uid){ return C.D.profiles[uid] || {name:'Me', ini:'?', color:0, portion:1, units:'m'}; };
C.partner = function(){ var me = C.me && C.me.uid; return Object.keys(C.D.profiles).filter(function(u){ return u !== me && C.okId(u); })[0] || null; };
C.portion = function(uid){ var p = C.prof(uid).portion; return p > 0 ? p : 1; };
C.units = function(){ return C.prof(C.me && C.me.uid).units === 'us' ? 'us' : 'm'; };
C.COLORS = [['#E1F5EE','#085041'],['#EEEDFE','#3C3489'],['#FAEEDA','#854F0B'],['#FBEAF0','#72243E'],['#E6F1FB','#0C447C'],['#EAF3DE','#27500A']];
C.avatar = function(uid, size){ var p = C.prof(uid), c = C.COLORS[p.color || 0] || C.COLORS[0]; size = size || 28;
  return '<span class="av" style="width:'+size+'px;height:'+size+'px;font-size:'+Math.round(size*((p.ini || p.name || '?').slice(0,2).length > 1 ? 0.36 : 0.42))+'px;background:'+c[0]+';color:'+c[1]+'" aria-hidden="true">'+C.esc((p.ini || p.name || '?').slice(0,2))+'</span>'; };

/* ---------- foods ---------- */
C.food = function(key){
  if(!key) return null;
  if(FOODS[key]) return FOODS[key];
  var cf = C.D.foods && C.D.foods.custom && C.D.foods.custom[key];
  return cf || null;
};
C.phase = function(){ return C.D.settings.phase === 'exit' ? 'exit' : 'keto'; };
C.rate = function(f){ if(!f) return null; var r = C.phase() === 'exit' ? (f.re || f.rk) : f.rk; return (r === 'g' || r === 'a' || r === 'r') ? r : null; };
C.RATE = {g:['Great for keto','g'], a:['Okay in measured amounts','a'], r:['Not in your plan for now','r']};
C.matchName = function(name){
  var n = FD.norm(name), map = (C.D.foods && C.D.foods.map) || {};
  if(map[n]) return map[n] === 'house' ? {house:true} : {key:map[n]};
  return FD.match(name);
};
C.searchFoods = function(q){
  q = FD.norm(q); var out = [];
  var all = Object.keys(FOODS).map(function(k){ return FOODS[k]; });
  var cust = (C.D.foods && C.D.foods.custom) || {};
  Object.keys(cust).forEach(function(k){ all.push(cust[k]); });
  all.forEach(function(f){ var hay = FD.norm(f.n + ' ' + (f.al || []).join(' ')); if(!q || hay.indexOf(q) >= 0) out.push(f); });
  return out.slice(0, 30);
};

/* ---------- quantities ---------- */
var FR = [[0,''],[0.125,'⅛'],[0.25,'¼'],[1/3,'⅓'],[0.5,'½'],[2/3,'⅔'],[0.75,'¾'],[1,'']];
C.frac = function(v){
  if(v <= 0) return '0';
  var w = Math.floor(v), r = v - w, best = FR[0], bd = 9;
  FR.forEach(function(f){ var d = Math.abs(r - f[0]); if(d < bd){ bd = d; best = f; } });
  if(best[0] === 1){ w += 1; return String(w); }
  if(!w) return best[1] || '0';
  return w + (best[1] ? ' ' + best[1] : '');
};
C.toGrams = function(key, amt, unit){
  var f = C.food(key) || {};
  if(unit === 'g' || unit === 'ml') return amt;
  if(unit === 'pc') return amt * (f.pc || 50);
  if(unit === 'tsp') return amt * (f.tsp || 5);
  if(unit === 'tbsp') return amt * 3 * (f.tsp || 5);
  if(unit === 'cup') return amt * 48 * (f.tsp || 5);
  return 0;
};
function roundG(g){ return g >= 100 ? Math.round(g/10)*10 : g >= 20 ? Math.round(g/5)*5 : Math.round(g); }
C.qty = function(amt, unit, units){
  units = units || C.units();
  if(unit === 'taste') return '';
  if(unit === 'pinch') return 'a pinch of';
  if(unit === 'g'){
    if(units === 'us'){ var oz = amt/28.35; if(oz >= 16) return (Math.round(oz/16*10)/10) + ' lb'; return (oz >= 3 ? Math.round(oz) : Math.round(oz*10)/10) + ' oz'; }
    return amt >= 1000 ? (Math.round(amt/100)/10) + ' kg' : roundG(amt) + ' g';
  }
  if(unit === 'ml'){
    if(units === 'us'){ if(amt >= 60) return C.frac(Math.round(amt/240*4)/4) + ' cup' + (amt > 300 ? 's' : ''); return C.frac(Math.round(amt/15*2)/2) + ' tbsp'; }
    return amt >= 1000 ? (Math.round(amt/100)/10) + ' l' : roundG(amt) + ' ml';
  }
  if(unit === 'pc') return C.frac(amt);
  return C.frac(amt) + ' ' + unit + (unit === 'cup' && amt > 1 ? 's' : '');
};
function lower(s){ if(!s) return s; if(/^(Kashmiri|Dijon|Greek|Brussels)/.test(s)) return s; return s.charAt(0).toLowerCase() + s.slice(1); }
C.ingName = function(ing, amt){
  if(ing[4]) return ing[4];
  var f = C.food(ing[0]); var n = f ? lower(f.n) : (ing[0] || '');
  if(ing[2] === 'pc' && amt <= 1) n = n.replace(/ies$/,'y').replace(/(es)$/,'').replace(/s$/,'');
  if(ing[2] === 'pc' && ing[0] === 'garlic') n = amt <= 1 ? 'garlic clove' : 'garlic cloves';
  if(n === 'tomatoe' || n === 'potatoe') n = n.slice(0,-1);
  return n;
};
C.ingText = function(ing, f){
  var amt = (ing[1] || 0) * f, q = C.qty(amt, ing[2]), n = C.ingName(ing, amt);
  if(ing[2] === 'taste') return {q:'', n:n, t:n + ' to taste'};
  if(ing[2] === 'pinch') return {q:'pinch', n:n, t:'a pinch of ' + n};
  return {q:q, n:n, t:q + ' ' + n};
};

/* ---------- recipes ---------- */
var BUILT = {}; window.SA_RECIPES.forEach(function(r){ BUILT[r.id] = r; });
C.BUILT = BUILT;
C.rec = function(id){
  var o = C.D.recipes[id];
  if(o && o.data) return Object.assign({id:id, _kind:o.kind, _by:o.by}, o.data);
  return BUILT[id] || null;
};
C.all = function(){
  var out = window.SA_RECIPES.map(function(r){ return C.rec(r.id); });
  Object.keys(C.D.recipes).forEach(function(id){ var o = C.D.recipes[id]; if(o && o.kind === 'custom' && o.data) out.push(C.rec(id)); });
  return out.filter(Boolean);
};
C.has = function(r, t){ return (' ' + (r.tags || '') + ' ').indexOf(' ' + t + ' ') >= 0; };
C.dietOk = function(r, diet){
  if(!diet || diet === 'all') return true;
  if(diet === 'veg') return r.d !== 'non';
  if(diet === 'nog') return r.d === 'nog' || !!r.both;
  if(diet === 'non') return r.d === 'non';
  return true;
};
C.ings = function(r, nog){
  return (r.i || []).map(function(ing, ix){ return {ing:ing, ix:ix}; }).filter(function(o){
    var fl = o.ing[3]; if(fl === 'o') return !nog; if(fl === 'n') return !!nog; return true;
  });
};
C.stepText = function(r, s, f, nog, html){
  var t = String(s[0] || '').replace(/\[\[([\s\S]*?)\|\|([\s\S]*?)\]\]/g, function(_, a, b){ return nog ? b : a; });
  t = C.esc(t);
  return t.replace(/\{(\d+)\}/g, function(_, n){
    var ing = (r.i || [])[+n]; if(!ing) return '';
    var x = C.ingText(ing, f);
    if(!x.q || ing[2] === 'pinch' || ing[2] === 'taste') return C.esc(x.n);
    return html ? '<b>' + C.esc(x.q) + ' ' + C.esc(x.n) + '</b>' : x.q + ' ' + x.n;
  }).replace(/ +([,.])/g, '$1').replace(/ {2,}/g, ' ');
};
var NCACHE = typeof WeakMap !== 'undefined' ? new WeakMap() : null;
C.nutri = function(r){
  if(r.k) return {k:r.k, p:r.p || 0, nc:r.nc || 0, est:true};
  if(NCACHE && NCACHE.has(r)) return NCACHE.get(r);
  var out = calcN(r); if(NCACHE) NCACHE.set(r, out); return out;
};
function calcN(r){
  var t = {k:0, p:0, nc:0};
  (r.i || []).forEach(function(ing){ var f = C.food(ing[0]); if(!f || !f.v) return; var g = C.toGrams(ing[0], ing[1] || 0, ing[2]);
    t.k += f.v[0]*g/100; t.p += f.v[1]*g/100; t.nc += f.v[2]*g/100; });
  var sv = r.sv || 2;
  return {k:Math.round(t.k/sv), p:Math.round(t.p/sv), nc:Math.round(t.nc/sv*10)/10, est:true};
}
C.isFav = function(id){ return (C.D.settings.favs || []).indexOf(id) >= 0; };

/* ---------- ingredient line parser (for your own recipes and grocery items) ---------- */
var UF = {'½':0.5,'¼':0.25,'¾':0.75,'⅓':1/3,'⅔':2/3,'⅛':0.125};
C.parseLine = function(line){
  var s = String(line || '').trim(); if(!s) return null;
  var flag = '';
  if(/\(regular only\)\s*$/i.test(s)){ flag = 'o'; s = s.replace(/\(regular only\)\s*$/i,'').trim(); }
  if(/\(no onion (and|&) garlic only\)\s*$/i.test(s)){ flag = 'n'; s = s.replace(/\(no onion (and|&) garlic only\)\s*$/i,'').trim(); }
  s = s.replace(/(\d)\s*([½¼¾⅓⅔⅛])/g, function(_, a, b){ return String(+a + UF[b]); }).replace(/[½¼¾⅓⅔⅛]/g, function(c){ return String(UF[c]); });
  var m = s.match(/^(\d+(?:[.,]\d+)?(?:\s+\d+\/\d+)?|\d+\/\d+)?\s*(kg|g|gm|grams?|ml|l|litres?|liters?|tsp|teaspoons?|tbsp|tablespoons?|cups?|oz|ounces?|lbs?|pounds?|pinch(?:es)?|pieces?|pcs?|cloves?)?\b\.?\s*(?:of\s+)?(.*)$/i);
  var amt = 0, unit = '', name = s;
  if(m){
    if(m[1]){ var a = m[1].replace(',','.'); if(a.indexOf('/') >= 0){ var parts = a.split(/\s+/), tot = 0; parts.forEach(function(p){ if(p.indexOf('/') >= 0){ var q = p.split('/'); tot += (+q[0])/(+q[1]); } else tot += +p; }); amt = tot; } else amt = +a; }
    unit = (m[2] || '').toLowerCase(); name = (m[3] || '').trim() || s;
  }
  var u = 'pc';
  if(/^(kg)$/.test(unit)){ u = 'g'; amt *= 1000; }
  else if(/^(g|gm|grams?)$/.test(unit)) u = 'g';
  else if(/^(ml)$/.test(unit)) u = 'ml';
  else if(/^(l|litres?|liters?)$/.test(unit)){ u = 'ml'; amt *= 1000; }
  else if(/^(tsp|teaspoons?)$/.test(unit)) u = 'tsp';
  else if(/^(tbsp|tablespoons?)$/.test(unit)) u = 'tbsp';
  else if(/^cups?$/.test(unit)) u = 'cup';
  else if(/^(oz|ounces?)$/.test(unit)){ u = 'g'; amt = Math.round(amt*28.35); }
  else if(/^(lbs?|pounds?)$/.test(unit)){ u = 'g'; amt = Math.round(amt*453.6); }
  else if(/^pinch/.test(unit)){ u = 'pinch'; amt = 0; }
  else if(/^cloves?$/.test(unit)){ u = 'pc'; name = 'garlic ' + name; }
  if(/to taste$/i.test(name)){ name = name.replace(/\s*to taste$/i,''); u = 'taste'; amt = 0; }
  if(!amt && u === 'pc') u = 'taste';
  var mt = C.matchName(name);
  var key = mt && mt.key ? mt.key : null;
  var label = name;
  if(key){ var f = C.food(key); if(f && FD.norm(f.n) === FD.norm(name)) label = ''; }
  return [key, amt, u, flag, label];
};
C.lineOf = function(ing){
  var x = C.ingText(ing, 1), t = x.q ? x.q + ' ' + x.n : (ing[2] === 'pinch' ? 'pinch of ' + x.n : x.n + ' to taste');
  if(ing[3] === 'o') t += ' (regular only)';
  if(ing[3] === 'n') t += ' (no onion and garlic only)';
  return t;
};

/* ---------- plan ---------- */
C.plan = function(wk){ return C.D.plans[wk] || {}; };
C.slot = function(wk, di, s){ var d = C.plan(wk)['d' + di]; return d && d[s] ? d[s] : null; };
C.eff = function(sl, uid){ if(!sl) return null; return (sl.p && sl.p[uid]) || sl.r || null; };
C.dayTotal = function(wk, di, uid){
  var t = {k:0, p:0, nc:0, heavy:0, n:0, main:0};
  C.SLOTS.forEach(function(s){ var r = C.rec(C.eff(C.slot(wk, di, s), uid)); if(!r) return; var n = C.nutri(r), m = C.portion(uid);
    t.k += n.k*m; t.p += n.p*m; t.nc += n.nc*m; t.n++; if(s !== 'S') t.main++; if(C.has(r,'heavy')) t.heavy++; });
  return t;
};
C.weekBreads = function(wk){ var n = 0; for(var d=0; d<7; d++) C.SLOTS.forEach(function(s){ var sl = C.slot(wk, d, s); if(!sl) return;
  var ids = [sl.r].concat(sl.p ? Object.keys(sl.p).map(function(k){ return sl.p[k]; }) : []);
  ids.forEach(function(id){ var r = C.rec(id); if(r && C.has(r,'occ')) n++; }); }); return n; };

C.suggestWeek = function(wk, diet){
  var all = C.all().filter(function(r){ return C.dietOk(r, diet); });
  var favs = C.D.settings.favs || [];
  var md = C.parse(wk), recent = {};
  [C.wk(C.addD(md, -7)), C.wk(C.addD(md, 7)), C.wk(C.addD(md, -14))].forEach(function(w){
    var p = C.D.plans[w] || {};
    for(var d=0; d<7; d++){ var dd = p['d'+d] || {}; C.SLOTS.forEach(function(s){ if(dd[s] && dd[s].r) recent[dd[s].r] = 1; }); }
  });
  function shuffle(a){ a = a.slice(); for(var i=a.length-1;i>0;i--){ var j = Math.floor(Math.random()*(i+1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pool(list){ var fresh = list.filter(function(r){ return !recent[r.id]; }); var base = fresh.length >= 3 ? fresh : list;
    var out = []; base.forEach(function(r){ out.push(r); if(favs.indexOf(r.id) >= 0) out.push(r); }); return shuffle(out); }
  var bf = pool(all.filter(function(r){ return r.c === 'b'; }));
  var mains = all.filter(function(r){ return r.c === 'm' && !C.has(r,'occ') && C.fits(r, 'D'); });
  var fulls = pool(all.filter(function(r){ return r.c === 'ss' && C.has(r,'full'); }));
  var order = shuffle(['chicken','fish','paneer','egg','chicken','fish','tofu']);
  var used = {}, mutton = 0, fields = {}, plan = C.plan(wk);
  for(var d=0; d<7; d++){ C.SLOTS.forEach(function(s){ var sl = C.slot(wk, d, s); var id = C.eff(sl, C.me.uid); if(id) used[id] = 1; }); }
  function pickMain(d){
    var want = order[d % order.length];
    var ok = function(r){ return !used[r.id] && (r.pr !== 'mutton' || mutton < 1); };
    var p1 = mains.filter(function(r){ return ok(r) && !recent[r.id] && (r.pr === want || (want === 'tofu' && r.pr === 'paneer')); });
    var p2 = mains.filter(function(r){ return ok(r) && !recent[r.id]; });
    var p3 = mains.filter(ok);
    var pl = p1.length ? p1 : p2.length ? p2 : p3.length ? p3 : mains;
    var r = pl[Math.floor(Math.random()*pl.length)];
    if(r){ used[r.id] = 1; if(r.pr === 'mutton') mutton++; }
    return r;
  }
  var bi = 0, fi = 0, newDinner = {}, lastB = null;
  for(var di=0; di<7; di++){
    var dd = plan['d' + di] || {};
    if(!dd.B && bf.length){ var b = bf[bi % bf.length]; if(b.id === lastB && bf.length > 1){ bi++; b = bf[bi % bf.length]; } fields['d'+di+'.B'] = {r:b.id}; lastB = b.id; bi++; }
    if(!dd.D){ var m = pickMain(di); if(m){ newDinner[di] = m.id; fields['d'+di+'.D'] = {r:m.id}; } }
  }
  for(var dj=0; dj<7; dj++){
    var cur = plan['d' + dj] || {};
    if(cur.L) continue;
    var prevD = dj > 0 ? (newDinner[dj-1] || (plan['d'+(dj-1)] && plan['d'+(dj-1)].D && plan['d'+(dj-1)].D.r)) : null;
    if(prevD){
      fields['d'+dj+'.L'] = {r: prevD, lo: C.DAYS[dj-1] + ' dinner'};
      if(newDinner[dj-1]) fields['d'+(dj-1)+'.D'] = {r: newDinner[dj-1], x: true};
      else if(plan['d'+(dj-1)] && plan['d'+(dj-1)].D){ fields['d'+(dj-1)+'.D'] = Object.assign({}, plan['d'+(dj-1)].D, {x:true}); }
    } else if(fulls.length){ fields['d'+dj+'.L'] = {r: fulls[fi % fulls.length].id}; fi++; }
  }
  return fields;
};
C.LOW_DAY = 1200;
C.lowDay = function(tot, uid){
  if(tot.main < 3) return false;
  return tot.k < C.LOW_DAY * C.portion(uid);
};
C.weekHasPlan = function(wk){ var p = C.D.plans[wk] || {}; for(var d=0; d<7; d++){ var dd = p['d'+d]; if(dd && C.SLOTS.some(function(s){ return dd[s]; })) return true; } return false; };
C.dayHasMeals = function(wk, d){ var dd = C.plan(wk)['d'+d] || {}; return ['B','L','D'].some(function(s){ return dd[s]; }); };
C.needsSig = function(wk, diet){
  var n = C.weekNeeds(wk, diet).map(function(x){ return (x.key || x.name) + ':' + Math.round(x.amt); }).sort().join('|'), h = 5381;
  for(var i=0; i<n.length; i++) h = ((h << 5) + h + n.charCodeAt(i)) | 0;
  return String(h);
};

C.ncLimit = function(uid){ var v = C.prof(uid).ncLimit; return v > 0 ? v : 30; };
C.highCarb = function(tot, uid){ return tot.main >= 2 && tot.nc > C.ncLimit(uid); };
C.bestFor = function(r){
  var SN = {B:'Breakfast', L:'Lunch', D:'Dinner', S:'Snack'};
  var slots, why = r.bw || '';
  if(r.bf) slots = r.bf.split('');
  else if(r.c === 'b') { slots = ['B']; why = why || 'A protein-rich start to the day.'; }
  else if(r.c === 'm' || (r.c === 'ss' && C.has(r,'full'))){
    if(C.has(r,'heavy')){ slots = ['L']; why = why || 'Rich dish, easier to digest earlier in the day.'; }
    else if(C.has(r,'lunch') || C.has(r,'make')){ slots = ['L','D']; why = why || 'Travels well, so great for work lunches too.'; }
    else { slots = ['D','L']; why = why || 'Quick and light, good for dinner.'; }
  }
  else if(r.c === 'ss' || r.c === 'sd'){ slots = ['L','D']; why = why || 'Pair with a protein at lunch or dinner.'; }
  else if(r.c === 'sn'){ slots = ['S']; why = why || 'Between meals, only if you\u2019re hungry.'; }
  else if(r.c === 'br'){ slots = ['B','L','D']; why = why || 'Occasional, up to 2 a week.'; }
  else slots = ['B','L','D','S'];
  var names = slots.map(function(x){ return SN[x]; });
  var text = names.length > 2 ? 'Any meal' : names.join(' or ');
  return {slots:slots, text:text, why:why};
};
C.fits = function(r, slot){ return C.bestFor(r).slots.indexOf(slot) >= 0; };
/* one ingredient as a grocery need (null for pantry basics) */
C.ingNeed = function(ing, f){
  var key = ing[0], food = C.food(key), u = ing[2], amt = (ing[1] || 0) * f;
  if(food && food.st) return null;
  if(key === 'water') return null;
  if(u === 'taste' || u === 'pinch') return {key:key, name: food ? food.n : C.ingName(ing, 1), amt:0, u:'pc', sec: food ? food.s : 'Other'};
  if(food && food.cnt && u === 'pc') return {key:key, name:food.n, amt:amt, u:'pc', sec:food.s};
  if(u === 'ml') return {key:key, name: food ? food.n : C.ingName(ing, amt), amt:amt, u:'ml', sec: food ? food.s : 'Other'};
  return {key:key, name: food ? food.n : C.ingName(ing, amt), amt:C.toGrams(key, amt, u), u:'g', sec: food ? food.s : 'Other'};
};
C.recipeNeeds = function(r, servings, nog){
  var f = servings / (r.sv || 2), out = {};
  C.ings(r, nog).forEach(function(o){
    var n = C.ingNeed(o.ing, f); if(!n) return;
    var k = n.key || ('x:' + n.name);
    if(out[k]){ if(out[k].u !== n.u){ out[k].amt = C.toGrams(n.key, out[k].amt, out[k].u === 'g' ? 'g' : out[k].u); out[k].u = 'g'; n.amt = C.toGrams(n.key, n.amt, n.u === 'g' ? 'g' : n.u); } out[k].amt += n.amt; }
    else out[k] = n;
  });
  return Object.keys(out).map(function(k){ return out[k]; });
};
/* what you have: items bought or marked Have it */
C.haveKeys = function(){
  var h = {}; C.D.groceries.forEach(function(i){ if((i.b || i.h) && i.key) h[i.key] = 1; }); return h;
};
C.cookable = function(diet){
  var have = C.haveKeys(); if(!Object.keys(have).length) return {ready:[], almost:[], any:false};
  var ready = [], almost = [];
  C.all().forEach(function(r){
    if(!C.dietOk(r, diet) || r.c === 'dr') return;
    var needs = {}; C.ings(r, diet === 'nog' && r.both).forEach(function(o){ var f = C.food(o.ing[0]); if(!o.ing[0] || (f && f.st) || o.ing[0] === 'water') return; needs[o.ing[0]] = 1; });
    var keys = Object.keys(needs); if(keys.length < 2) return;
    var miss = keys.filter(function(k){ return !have[k]; }), got = keys.length - miss.length;
    if(!miss.length) ready.push({r:r, miss:[]});
    else if(miss.length <= 2 && got >= 2) almost.push({r:r, miss:miss});
  });
  almost.sort(function(a, b){ return a.miss.length - b.miss.length; });
  return {ready:ready, almost:almost, any:true};
};

/* ---------- groceries from plan ---------- */
C.weekNeeds = function(wk, diet){
  var uids = C.uids(), need = {};
  function add(key, label, amt, u, rname, day){
    var f = C.food(key);
    var k = key || ('x:' + FD.norm(label));
    if(f && f.st) return;
    var n = need[k];
    if(!n){ n = need[k] = {key:key, name: f ? f.n : label, amt:0, u:u, for:[], days:[], sec: f ? f.s : 'Other'}; }
    if(n.u !== u){
      if(n.u !== 'g'){ n.amt = C.toGrams(key, n.amt, n.u); n.u = 'g'; }
      amt = C.toGrams(key, amt, u); u = 'g';
    }
    n.amt += amt;
    if(n.for.indexOf(rname) < 0) n.for.push(rname);
    if(n.days.indexOf(day) < 0) n.days.push(day);
  }
  for(var d=0; d<7; d++){
    C.SLOTS.forEach(function(s){
      var sl = C.slot(wk, d, s); if(!sl || sl.lo) return;
      var por = {};
      uids.forEach(function(u){ var id = C.eff(sl, u); if(!id) return; por[id] = (por[id] || 0) + C.portion(u) * (sl.x ? 2 : 1); });
      Object.keys(por).forEach(function(id){
        var r = C.rec(id); if(!r) return;
        var f = por[id] / (r.sv || 2), nog = diet === 'nog' && r.both;
        C.ings(r, nog).forEach(function(o){
          var n = C.ingNeed(o.ing, f); if(!n) return;
          add(n.key, n.name, n.amt, n.u, r.n, d);
        });
      });
    });
  }
  return Object.keys(need).map(function(k){ return need[k]; });
};
function plural(label, n){
  if(n <= 1) return label;
  if(/^[a-z]+$/i.test(label)) return /(ch|sh|x|s)$/.test(label) ? label + 'es' : label + 's';
  return null;
}
C.storeAmt = function(key, amt, u){
  var f = C.food(key); if(!f || !f.buy || !amt) return '';
  var per = f.buy[0], label = f.buy[1];
  var base = (u === 'pc' && f.cnt) ? amt : C.toGrams(key, amt, u === 'pc' ? 'pc' : 'g');
  if(u === 'ml') base = amt;
  var n = Math.max(1, Math.ceil(base / per - 0.15));
  if(n === 1) return 'about ' + (/^\d/.test(label) ? label : '1 ' + label);
  if(label === 'dozen') return 'about ' + n + ' dozen';
  var pl = plural(label, n);
  return 'about ' + (pl ? n + ' ' + pl : n + ' × ' + label);
};
C.amtText = function(item){
  if(item.note) return item.note;
  if(!item.amt) return '';
  var main;
  if(item.u === 'pc') main = String(Math.ceil(item.amt));
  else main = C.qty(item.amt, item.u);
  var f = C.food(item.key), st;
  if(item.u === 'g' && f && f.cnt && f.pc){ var n = Math.max(1, Math.round(item.amt / f.pc * 2) / 2); var nm = f.n.toLowerCase(); if(n <= 1) nm = nm.replace(/ies$/,'y').replace(/oes$/,'o').replace(/s$/,''); else if(!/s$/.test(nm)) nm += 's'; st = 'about ' + C.frac(n) + ' ' + nm; }
  else st = C.storeAmt(item.key, item.amt, item.u);
  return st ? main + ', ' + st : main;
};
C.groceryText = function(items){
  var lines = ['Groceries to buy', ''];
  C.SECS.forEach(function(sec){
    var its = items.filter(function(i){ return (i.sec || 'Other') === sec; }); if(!its.length) return;
    lines.push(sec);
    its.forEach(function(i){ var a = C.amtText(i); lines.push('- ' + i.n + (a ? ': ' + a : '')); });
    lines.push('');
  });
  return lines.join('\n');
};

/* ---------- reminders for a day ---------- */
C.reminders = function(date){
  var wk = C.wk(date), d = C.di(date), out = [];
  var dn = C.slot(wk, d, 'D');
  if(dn){
    var ids = {}; C.uids().forEach(function(u){ var id = C.eff(dn, u); if(id) ids[id] = 1; });
    Object.keys(ids).forEach(function(id){
      var r = C.rec(id); if(!r || !C.has(r,'thaw') || dn.lo) return;
      var prot = (r.i || []).map(function(i){ return C.food(i[0]); }).filter(function(f){ return f && f.s === 'Meat and fish'; })[0];
      out.push({key:'thaw-' + id, text:'Take ' + (prot ? prot.n.toLowerCase() : 'the protein') + ' out of the freezer', sub:'Before you leave: it\u2019s for tonight\u2019s ' + r.n.toLowerCase() + '. Thaw it in the fridge.'});
    });
  }
  return out;
};
})();
