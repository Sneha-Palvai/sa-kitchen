/* S&A Kitchen food database
   Approximate values per 100 g from standard (USDA-style) food data. Brands differ.
   F(key, name, section, ratingKeto, ratingExit, [kcal, protein, netCarbs, fat, fiber], [portionLabel, portionGrams], extra)
   Ratings: g = great, a = okay in measured amounts, r = not in this plan phase.
   extra: pc = grams per piece, tsp = grams per teaspoon, cnt = buy by count,
          buy = [amount per store unit, 'store unit'], st = pantry basic (not added from plans),
          gi, note, tip, al = other names. */
(function(){
var L = {};
function F(k, n, s, rk, re, v, por, x){ x = x || {}; L[k] = {k:k, n:n, s:s, rk:rk, re:re, v:v, por:por, pc:x.pc, tsp:x.tsp, cnt:x.cnt, buy:x.buy, st:x.st, gi:x.gi, note:x.note, tip:x.tip, al:x.al || []}; }
var P='Produce', D='Dairy and eggs', M='Meat and fish', Z='Frozen', A='Pantry', S='Spices';
var NO='Not applicable, almost no carbs';

// Produce
F('spinach','Spinach',P,'g','g',[23,2.9,1.4,0.4,2.2],['1 cup cooked',180],{buy:[300,'bunch'],gi:NO,note:'Very low in carbs, rich in iron and potassium. Eat freely.',al:['palak']});
F('methi','Fenugreek leaves',P,'g','g',[49,4.4,1.8,0.9,4],['1 cup',40],{buy:[150,'bunch'],gi:NO,note:'Low in carbs. Great in curries and parathas later.',al:['methi leaves','fenugreek']});
F('cauliflower','Cauliflower',P,'g','g',[25,1.9,3,0.3,2],['1 cup',100],{pc:600,buy:[600,'head'],gi:'Low, about 15',note:'The keto swap for rice and potatoes.',al:['gobi']});
F('broccoli','Broccoli',P,'g','g',[34,2.8,4,0.4,2.6],['1 cup',90],{pc:300,buy:[300,'head'],gi:'Low, about 15',note:'Great keto vegetable with fiber and vitamin C.'});
F('cabbage','Cabbage',P,'g','g',[25,1.3,3.3,0.1,2.5],['1 cup shredded',90],{buy:[900,'head'],gi:'Low, about 10',note:'Cheap, filling and low in carbs.',al:['patta gobi']});
F('green-beans','Green beans',P,'g','g',[31,1.8,4.3,0.2,2.7],['1 cup',110],{buy:[450,'1 lb bag'],gi:'Low, about 15',note:'Fine in normal portions.',al:['beans','french beans']});
F('zucchini','Zucchini',P,'g','g',[17,1.2,2.1,0.3,1],['1 medium',200],{pc:200,cnt:1,gi:'Low, about 15',note:'Great for noodles and soups.',al:['courgette']});
F('bell-pepper','Bell pepper',P,'g','g',[24,1,3.5,0.2,1.8],['1 medium',150],{pc:150,cnt:1,gi:'Low, about 15',note:'Green has the fewest carbs, red is sweeter.',al:['capsicum','pepper']});
F('mushrooms','Mushrooms',P,'g','g',[22,3.1,2.3,0.3,1],['1 cup',70],{buy:[225,'8 oz pack'],gi:NO,note:'Very low in carbs, adds meaty texture.',al:['mushroom']});
F('cucumber','Cucumber',P,'g','g',[15,0.7,3.1,0.1,0.5],['1 medium',300],{pc:300,cnt:1,gi:'Low, about 15',note:'Light, hydrating snack.',al:['kheera']});
F('tomato','Tomatoes',P,'a','g',[18,0.9,2.7,0.2,1.2],['1 medium',120],{pc:120,cnt:1,gi:'Low, about 15',note:'Fine in curries and salads in moderate amounts. Carbs add up in large portions.',al:['tomato','tamatar']});
F('onion','Onion',P,'a','g',[40,1.1,7.6,0.1,1.7],['1 small',70],{pc:110,cnt:1,gi:'Low, about 10',note:'Higher in carbs than most vegetables. Use moderate amounts for flavor.',al:['onions','pyaz']});
F('garlic','Garlic',P,'g','g',[149,6.4,31,0.5,2.1],['1 clove',3],{pc:3,buy:[40,'bulb'],gi:NO,note:'Used in tiny amounts, so it barely adds carbs.',al:['garlic cloves','lehsun']});
F('ginger','Ginger',P,'g','g',[80,1.8,16,0.8,2],['1 tsp grated',5],{tsp:5,buy:[60,'piece'],gi:NO,note:'Used in small amounts. Great for digestion.',al:['adrak']});
F('green-chili','Green chilies',P,'g','g',[40,2,8,0.2,1.5],['1 chili',5],{pc:5,buy:[100,'small pack'],gi:NO,note:'Used in small amounts.',al:['green chilli','mirchi']});
F('coriander','Fresh coriander',P,'g','g',[23,2.1,0.9,0.5,2.8],['2 tbsp',5],{buy:[50,'bunch'],gi:NO,note:'Herb, almost no carbs.',al:['cilantro','dhania']});
F('curry-leaves','Curry leaves',P,'g','g',[108,6,6,1,6],['1 sprig',2],{pc:2,buy:[20,'pack'],gi:NO,note:'Herb, used for flavor.',al:['kadi patta']});
F('mint','Mint leaves',P,'g','g',[44,3.3,1.4,0.7,6.8],['2 tbsp',5],{buy:[50,'bunch'],gi:NO,note:'Herb, almost no carbs.',al:['pudina']});
F('lemon','Lemons',P,'g','a',[29,1.1,6.5,0.3,2.8],['juice of ½ lemon',30],{pc:60,cnt:1,gi:'Low',note:'Great for flavor. Lemon juice has very few carbs.',al:['lemon','nimbu']});
F('lime','Limes',P,'g','a',[30,0.7,7.7,0.2,2.8],['juice of 1 lime',30],{pc:45,cnt:1,gi:'Low',note:'Great for flavor, very few carbs in the juice.',al:['lime']});
F('avocado','Avocados',P,'g','g',[160,2,1.8,14.7,6.7],['½ avocado',75],{pc:150,cnt:1,gi:NO,note:'The classic keto food. High in calories, so about half per serving.',al:['avocado']});
F('lettuce','Lettuce',P,'g','g',[17,1.2,1.2,0.3,2.1],['2 cups',80],{pc:300,buy:[300,'head'],gi:NO,note:'Use freely. Great for wraps.',al:['romaine','lettuce leaves']});
F('kale','Kale',P,'g','g',[35,2.9,1,1.5,4],['1 cup',20],{buy:[280,'bunch'],gi:NO,note:'Very low in net carbs.'});
F('celery','Celery',P,'g','g',[14,0.7,1.4,0.2,1.6],['2 stalks',80],{pc:40,buy:[450,'bunch'],gi:NO,note:'Crunchy, almost no carbs.'});
F('okra','Okra',P,'g','g',[33,1.9,4.3,0.2,3.2],['1 cup',100],{buy:[450,'1 lb bag'],gi:'Low, about 20',note:'Fine in normal portions.',al:['bhindi','lady finger']});
F('eggplant','Eggplant',P,'g','g',[25,1,2.9,0.2,3],['1 cup',80],{pc:450,buy:[450,'eggplant'],gi:'Low, about 15',note:'Low in carbs. Soaks up oil, so measure it.',al:['baingan','brinjal']});
F('lauki','Bottle gourd',P,'g','g',[14,0.6,2.9,0,0.5],['1 cup',120],{buy:[800,'gourd'],gi:'Low',note:'Very light vegetable.',al:['lauki','dudhi','bottle gourd']});
F('asparagus','Asparagus',P,'g','g',[20,2.2,1.8,0.1,2.1],['6 spears',100],{buy:[450,'bunch'],gi:'Low',note:'Very low in carbs.'});
F('brussels-sprouts','Brussels sprouts',P,'a','g',[43,3.4,5.2,0.3,3.8],['1 cup',90],{buy:[450,'1 lb bag'],gi:'Low',note:'A bit higher in carbs, keep portions small.'});
F('pumpkin','Pumpkin',P,'a','g',[26,1,6,0.1,0.5],['1 cup',115],{gi:'Medium, about 65',note:'Moderate carbs. Small amounts only.',al:['kaddu']});
F('radish','Radish',P,'g','g',[16,0.7,1.8,0.1,1.6],['1 cup',115],{gi:'Low',note:'Very low in carbs.',al:['mooli']});

// Fruit
F('strawberries','Strawberries',P,'r','g',[32,0.7,5.7,0.3,2],['6 medium',70],{buy:[450,'1 lb box'],gi:'Low, about 40',note:'Lowest-sugar fruits. Not in your strict plan for now, but first to come back after keto.'});
F('raspberries','Raspberries',P,'r','g',[52,1.2,5.4,0.7,6.5],['½ cup',60],{buy:[170,'box'],gi:'Low, about 25',note:'High in fiber. First fruit to add back after keto.'});
F('blackberries','Blackberries',P,'r','g',[43,1.4,4.9,0.5,5.3],['½ cup',70],{buy:[170,'box'],gi:'Low, about 25',note:'High in fiber. First fruit to add back after keto.'});
F('blueberries','Blueberries',P,'r','a',[57,0.7,12,0.3,2.4],['¼ cup',37],{buy:[170,'box'],gi:'Low, about 50',note:'Sweeter than other berries. Small handful after keto.'});
F('apple','Apples',P,'r','a',[52,0.3,11.4,0.2,2.4],['1 medium',180],{pc:180,cnt:1,gi:'Low, about 36',note:'About 20 g net carbs per apple.'});
F('banana','Bananas',P,'r','a',[89,1.1,20,0.3,2.6],['1 medium',118],{pc:118,cnt:1,gi:'Medium, about 51',note:'About 24 g net carbs per banana. Occasional only after keto.'});
F('mango','Mangoes',P,'r','a',[60,0.8,13.4,0.4,1.6],['1 cup',165],{pc:300,cnt:1,gi:'Medium, about 51',note:'Very sweet. Small portion, occasionally, after keto.',al:['aam']});
F('orange','Oranges',P,'r','a',[47,0.9,9.4,0.1,2.4],['1 medium',130],{pc:130,cnt:1,gi:'Low, about 43',note:'About 12 g net carbs each.'});
F('grapes','Grapes',P,'r','r',[69,0.7,17,0.2,0.9],['1 cup',150],{buy:[900,'bag'],gi:'Medium, about 53',note:'High in sugar and easy to overeat.'});
F('pear','Pears',P,'r','a',[57,0.4,12,0.1,3.1],['1 medium',180],{pc:180,cnt:1,gi:'Low, about 38',note:'About 20 g net carbs each.'});
F('watermelon','Watermelon',P,'r','a',[30,0.6,7.2,0.2,0.4],['1 cup',150],{gi:'High, about 72',note:'Mostly water, but sugar adds up in big bowls.'});
F('cantaloupe','Cantaloupe',P,'r','a',[34,0.8,7.3,0.2,0.9],['1 cup',160],{gi:'Medium, about 65',note:'A few cubes after keto.'});
F('guava','Guava',P,'r','a',[68,2.6,8.9,1,5.4],['1 medium',55],{pc:55,cnt:1,gi:'Low',note:'High in fiber and vitamin C. A few slices after keto.',al:['amrood','amrud']});
F('papaya','Papaya',P,'r','a',[43,0.5,9.1,0.3,1.7],['1 cup',145],{gi:'Medium, about 60',note:'A few slices after keto.'});
F('pineapple','Pineapple',P,'r','a',[50,0.5,11.7,0.1,1.4],['1 cup',165],{gi:'Medium, about 59',note:'High in sugar.'});
F('persimmon','Persimmons',P,'r','a',[70,0.6,15,0.2,3.6],['1 medium',170],{pc:170,cnt:1,gi:'Medium',note:'About 25 g net carbs each. Half a persimmon, occasionally, after keto.'});
F('cherries','Cherries',P,'r','a',[63,1.1,14,0.2,2.1],['1 cup',150],{gi:'Low, about 22',note:'Sweet. Small handful after keto.'});
F('lychee','Lychees',P,'r','r',[66,0.8,15,0.4,1.3],['5 lychees',50],{gi:'Medium',note:'Very sweet.'});
F('chikoo','Chikoo',P,'r','r',[83,0.4,14.6,1.1,5.3],['1 fruit',100],{gi:'Medium',note:'Very sweet.',al:['sapota','sapodilla']});
F('dates','Dates',A,'r','r',[282,2.5,67,0.4,8],['2 dates',16],{gi:'Medium, about 42',note:'Concentrated sugar.',al:['khajur']});
F('raisins','Raisins',A,'r','r',[299,3,75,0.5,3.7],['1 tbsp',9],{gi:'Medium, about 64',note:'Concentrated sugar.',al:['kishmish']});

// Dairy and eggs
F('egg','Eggs',D,'g','g',[143,12.6,0.7,9.5,0],['2 eggs',100],{pc:50,cnt:1,buy:[12,'dozen'],gi:NO,note:'Cheap, filling protein.',al:['eggs','anda']});
F('paneer-lowfat','Low-fat paneer',D,'g','g',[200,20,3,10,0],['100 g',100],{buy:[200,'block'],gi:NO,note:'Good protein. Measure about 100 g per meal.',tip:'Compare fat per 100 g; lower-fat paneer saves calories.',al:['paneer low fat','light paneer']});
F('paneer','Paneer',D,'a','a',[296,18,3.6,23,0],['100 g',100],{buy:[200,'block'],gi:NO,note:'Keto, but high in calories. Low-fat paneer is the better everyday choice.',al:['cottage cheese indian']});
F('greek-yogurt','Plain Greek yogurt',D,'a','g',[97,9,3.9,5,0],['½ cup',120],{tsp:5,buy:[900,'tub'],gi:'Low',note:'Small amounts in raita and marinades during keto.',tip:'Plain and unsweetened only. Avoid flavored or "fruit on the bottom".',al:['greek yoghurt','hung curd']});
F('yogurt','Plain yogurt',D,'a','g',[61,3.5,4.7,3.3,0],['½ cup',120],{tsp:5,buy:[900,'tub'],gi:'Low',note:'Small amounts only during keto.',tip:'Plain and unsweetened only.',al:['dahi','curd']});
F('heavy-cream','Heavy cream',D,'a','a',[340,2.8,2.8,36,0],['1 tbsp',15],{tsp:5,buy:[240,'small carton'],gi:NO,note:'Keto, but very high in calories. About 1 tbsp per serving.',tip:'Ingredients should be just cream. Avoid coffee creamers and anything sweetened.',al:['cream','whipping cream','heavy whipping cream']});
F('cheddar','Cheddar cheese',D,'a','a',[403,25,1.3,33,0],['30 g',30],{buy:[225,'8 oz block'],gi:NO,note:'Keto, but high in calories and salt. Measure it.',al:['cheese','cheddar']});
F('mozzarella','Mozzarella',D,'a','a',[280,28,3,17,0],['30 g',30],{buy:[225,'8 oz pack'],gi:NO,note:'Keto, measure portions.',al:['string cheese']});
F('parmesan','Parmesan',D,'a','a',[431,38,4,29,0],['2 tbsp grated',10],{tsp:2,buy:[140,'small wedge'],gi:NO,note:'Strong flavor, so a little goes a long way.'});
F('feta','Feta',D,'a','a',[264,14,4,21,0],['30 g',30],{buy:[170,'pack'],gi:NO,note:'Salty, measure it.'});
F('cream-cheese','Cream cheese',D,'a','a',[342,6,4,34,0],['2 tbsp',30],{tsp:5,buy:[225,'8 oz block'],gi:NO,note:'Keto, but high in calories.'});
F('butter','Butter',D,'a','a',[717,0.9,0.1,81,0],['1 tsp',5],{tsp:5,buy:[450,'1 lb pack'],gi:NO,note:'Keto fat. Measure it with a spoon.'});
F('milk','Whole milk',D,'a','g',[61,3.2,4.8,3.3,0],['½ cup',120],{tsp:5,buy:[1890,'half gallon'],gi:'Low',note:'Has milk sugar. Small splash in tea only during keto.',al:['doodh']});
F('almond-milk','Unsweetened almond milk',D,'g','g',[15,0.6,0.3,1.2,0.3],['1 cup',240],{tsp:5,buy:[1890,'carton'],gi:NO,note:'Very low in carbs and calories.',tip:'Must say unsweetened. Original or vanilla versions contain sugar.',al:['almond milk']});
F('tofu','Firm tofu',D,'g','g',[130,14,1.5,7,1.5],['100 g',100],{buy:[400,'block'],gi:NO,note:'Low-carb vegetarian protein.',al:['tofu','extra firm tofu']});

// Meat and fish
F('chicken-breast','Chicken breast',M,'g','g',[120,22.5,0,2.6,0],['palm-sized, 120 g',120],{gi:NO,note:'Lean protein, zero carbs.',al:['chicken breast','boneless chicken']});
F('chicken-thigh','Chicken thighs, boneless',M,'g','g',[135,19,0,6,0],['palm-sized, 120 g',120],{gi:NO,note:'Juicier than breast, a little more fat.',al:['chicken thighs','chicken thigh']});
F('drumsticks','Chicken drumsticks',M,'g','g',[161,17,0,10,0],['2 drumsticks',220],{pc:110,cnt:1,gi:NO,note:'Zero carbs. Skin adds fat.',al:['chicken drumsticks','chicken legs']});
F('chicken-mince','Ground chicken',M,'g','g',[143,17.4,0,8.1,0],['120 g',120],{gi:NO,note:'Great for keema.',al:['chicken keema','chicken mince','minced chicken']});
F('turkey-mince','Ground turkey',M,'g','g',[150,19,0,8,0],['120 g',120],{gi:NO,note:'Lean, cooks like chicken.',al:['turkey mince','ground turkey']});
F('mutton','Goat meat',M,'g','g',[109,20.6,0,2.3,0],['120 g',120],{gi:NO,note:'Zero carbs. Curries tend to be richer, so once a week.',al:['mutton','goat','lamb']});
F('tilapia','Tilapia fillets',M,'g','g',[96,20,0,1.7,0],['palm-sized, 120 g',120],{buy:[450,'1 lb pack'],gi:NO,note:'Lean, low-mercury fish.',al:['tilapia','fish fillets']});
F('salmon','Salmon fillets',M,'g','g',[208,20,0,13,0],['1 fillet',170],{pc:170,cnt:1,gi:NO,note:'Rich in omega-3 fats. Great twice a week.',al:['salmon']});
F('shrimp','Shrimp',M,'g','g',[85,20,0,0.5,0],['120 g',120],{buy:[450,'1 lb bag'],gi:NO,note:'Very lean, quick to cook.',al:['prawns','prawn','jhinga']});
F('tuna-can','Canned tuna',A,'g','g',[116,26,0,0.8,0],['1 can',140],{pc:140,cnt:1,gi:NO,note:'Handy protein.',tip:'Choose tuna in water, and check the salt.',al:['tuna','canned tuna']});
F('chicken-broth','Low-sodium chicken broth',A,'g','g',[6,1,0.5,0.2,0],['1 cup',240],{buy:[950,'carton'],gi:NO,note:'Warming, and helps with keto flu.',tip:'Choose low-sodium, with no added sugar.',al:['chicken stock','broth','bone broth','stock']});

// Frozen
F('cauliflower-rice','Cauliflower rice',Z,'g','g',[25,1.9,3,0.3,2],['1 cup',110],{buy:[340,'bag'],gi:'Low',note:'The easy rice swap.',al:['cauli rice','riced cauliflower']});
F('edamame','Edamame, shelled',Z,'a','g',[121,11.9,3.7,5.2,5.2],['½ cup',75],{buy:[340,'bag'],gi:'Low, about 18',note:'Keto in measured portions, about ½ cup.',tip:'Avoid seasoned or glazed packs with added sugar.'});

// Pantry
F('almonds','Almonds',A,'a','a',[579,21,9.1,50,12.5],['10 almonds',12],{tsp:3,buy:[450,'1 lb bag'],gi:NO,note:'Keto, but calorie-dense. About 10 per snack.',tip:'Plain or lightly salted, not honey-roasted.',al:['badam']});
F('walnuts','Walnuts',A,'a','a',[654,15,7,65,6.7],['7 halves',14],{tsp:3,buy:[450,'1 lb bag'],gi:NO,note:'Healthy fats, but calorie-dense. Small handful.',al:['akhrot']});
F('peanuts','Peanuts',A,'a','a',[567,26,9,49,8.5],['2 tbsp',18],{tsp:3,buy:[450,'jar'],gi:'Low',note:'Small amounts only.',al:['moongphali','groundnuts']});
F('peanut-butter','Peanut butter',A,'a','a',[588,25,14,50,6],['1 tbsp',16],{tsp:5,buy:[450,'jar'],gi:'Low',note:'Very easy to overeat, so left out of your strict plan.',tip:'Only peanuts and salt in the ingredients.'});
F('pumpkin-seeds','Pumpkin seeds',A,'a','a',[559,30,4.7,49,6],['2 tbsp',16],{tsp:3,buy:[340,'bag'],gi:NO,note:'Good protein and magnesium. Small handful.',al:['pepitas']});
F('chia','Chia seeds',A,'g','g',[486,17,8,31,34],['2 tbsp',24],{tsp:4,buy:[340,'bag'],gi:NO,note:'Very high in fiber, so net carbs are low.',al:['chia seeds']});
F('flaxseed','Ground flaxseed',A,'g','g',[534,18,1.6,42,27],['1 tbsp',7],{tsp:2.3,buy:[450,'bag'],gi:NO,note:'Fiber and omega-3s.',al:['flax','alsi','flax seeds']});
F('hemp-hearts','Hemp hearts',A,'g','g',[553,32,4.7,49,4],['3 tbsp',30],{tsp:3.3,buy:[340,'bag'],gi:NO,note:'High protein, almost no carbs. Base for keto porridge.',al:['hemp seeds']});
F('almond-flour','Almond flour',A,'a','a',[571,21,10,50,11],['¼ cup',28],{tsp:2.3,buy:[450,'1 lb bag'],gi:'Low',note:'Keto, but very high in calories. Occasional breads only.'});
F('coconut-flour','Coconut flour',A,'a','a',[443,19,21,14,39],['2 tbsp',14],{tsp:2.3,buy:[450,'bag'],gi:'Low',note:'Absorbs a lot of liquid. Small amounts.'});
F('psyllium','Psyllium husk',A,'g','g',[200,1.5,4,0.6,80],['1 tbsp',5],{tsp:1.7,buy:[340,'bag'],gi:NO,note:'Mostly fiber. Makes keto roti soft.',al:['isabgol','psyllium husk']});
F('coconut','Unsweetened coconut',A,'a','a',[660,6.9,7,64,16],['1 tbsp',5],{tsp:1.7,buy:[225,'bag'],gi:'Low',note:'Keto, but high in calories.',tip:'Unsweetened only.',al:['desiccated coconut','grated coconut','nariyal']});
F('coconut-milk','Coconut milk, canned',A,'a','a',[197,2,2.8,21,0],['¼ cup',60],{tsp:5,buy:[400,'can'],gi:'Low',note:'Keto, but rich. Measure it.',tip:'Full-fat canned, no added sugar. Not the sweetened drink.'});
F('olives','Olives',A,'g','g',[115,0.8,3.1,10.7,3.2],['5 olives',20],{buy:[300,'jar'],gi:NO,note:'Healthy fats, but salty.'});
F('pickles','Dill pickles',A,'g','g',[12,0.5,1.4,0.3,1],['1 spear',35],{buy:[700,'jar'],gi:NO,note:'Fine on keto.',tip:'Check for no added sugar. Sweet pickles are not keto.'});
F('mayonnaise','Mayonnaise',A,'a','a',[680,1,0.6,75,0],['1 tbsp',14],{tsp:5,buy:[450,'jar'],gi:NO,note:'Keto, but very high in calories.',tip:'Avocado-oil or olive-oil mayo with no sugar is best.',al:['mayo']});
F('dijon','Dijon mustard',A,'g','g',[66,4,3,4,3],['1 tsp',5],{tsp:5,buy:[225,'jar'],gi:NO,note:'Fine on keto.',al:['mustard']});
F('soy-sauce','Soy sauce',A,'g','g',[53,8,4.9,0.6,0.8],['1 tbsp',16],{tsp:5,buy:[450,'bottle'],gi:NO,note:'Fine in small amounts, but salty.',tip:'Low-sodium soy sauce helps with your salt goal.'});
F('tomato-puree','Tomato purée',A,'a','g',[32,1.6,5,0.3,1.9],['¼ cup',60],{tsp:5,buy:[400,'can'],gi:'Low',note:'Moderate amounts.',tip:'No added sugar.',al:['crushed tomatoes','canned tomatoes']});
F('lupini','Lupini beans',A,'g','g',[119,15.6,0.5,2.9,4.8],['½ cup',85],{buy:[450,'jar'],gi:NO,note:'High protein, very low carb. Unlike most beans.',al:['lupini beans']});
F('baking-powder','Baking powder',A,'g','g',[53,0,28,0,0],['½ tsp',2],{tsp:4.6,buy:[230,'can'],st:1,gi:NO,note:'Used in tiny amounts.'});
F('tea','Tea leaves',A,'g','g',[1,0,0.3,0,0],['1 tsp',2],{tsp:2,buy:[450,'box'],st:1,gi:NO,note:'Zero carbs without sugar.',al:['chai patti','tea bags','green tea']});
F('water','Water',A,'g','g',[0,0,0,0,0],['1 cup',240],{tsp:5,st:1,gi:NO,note:''});
F('ghee','Ghee',A,'a','a',[900,0,0,100,0],['1 tsp',5],{tsp:5,buy:[450,'jar'],st:1,gi:NO,note:'Keto fat with great flavor. Measure with a spoon.'});
F('olive-oil','Olive oil',A,'a','a',[884,0,0,100,0],['1 tsp',4.5],{tsp:4.5,buy:[500,'bottle'],st:1,gi:NO,note:'Healthy fat. Measure with a spoon, never pour.'});
F('mustard-oil','Mustard oil',A,'a','a',[884,0,0,100,0],['1 tsp',4.5],{tsp:4.5,buy:[1000,'bottle'],st:1,gi:NO,note:'Good for Indian cooking. Measure it.',al:['sarson oil']});
F('coconut-oil','Coconut oil',A,'a','a',[892,0,0,100,0],['1 tsp',4.5],{tsp:4.5,buy:[400,'jar'],st:1,gi:NO,note:'Keto fat. Measure it.'});

// Spices (pantry basics)
function SP(k,n,al){ F(k,n,S,'g','g',[300,10,30,10,20],['1 tsp',2],{tsp:2.5,st:1,gi:NO,note:'Spice, used in tiny amounts.',al:al||[]}); }
SP('salt','Salt',['namak']); SP('black-pepper','Black pepper',['kali mirch','pepper powder']); SP('turmeric','Turmeric',['haldi']);
SP('cumin-seeds','Cumin seeds',['jeera']); SP('cumin-powder','Ground cumin',['jeera powder']); SP('coriander-powder','Coriander powder',['dhania powder']);
SP('garam-masala','Garam masala'); SP('chili-powder','Kashmiri chili powder',['red chili powder','lal mirch']); SP('mustard-seeds','Mustard seeds',['rai','sarson']);
SP('hing','Hing',['asafoetida']); SP('kasuri-methi','Kasuri methi',['dried fenugreek']); SP('chaat-masala','Chaat masala');
SP('cinnamon','Cinnamon',['dalchini']); SP('paprika','Paprika'); SP('oregano','Oregano'); SP('chili-flakes','Chili flakes',['red pepper flakes']);
SP('cardamom','Cardamom',['elaichi']); SP('garlic-powder','Garlic powder');

// Not keto
F('rice','Rice',A,'r','a',[365,7,79,0.7,1.3],['½ cup cooked',90],{buy:[2270,'5 lb bag'],gi:'High, about 73',note:'Not keto. One small portion uses most of a day\u2019s carbs.',al:['chawal','basmati','white rice','brown rice']});
F('oats','Oats',A,'r','a',[379,13,57,6.5,10],['½ cup dry',40],{buy:[1130,'canister'],gi:'Medium, about 55',note:'Not keto. One portion uses most of your daily carb limit.',al:['oatmeal','rolled oats']});
F('atta','Wheat flour',A,'r','a',[340,13,61,2.5,11],['1 chapati worth',30],{buy:[4500,'10 lb bag'],gi:'Medium, about 62',note:'Not keto.',al:['chapati flour','whole wheat flour','atta']});
F('chapati','Chapati',A,'r','a',[297,9,46,7,4],['1 chapati',40],{pc:40,cnt:1,gi:'Medium',note:'About 18 g net carbs each. Not keto.',al:['roti','paratha','naan']});
F('bread','Bread',A,'r','a',[265,9,46,3.2,2.7],['1 slice',30],{pc:30,buy:[600,'loaf'],gi:'High, about 70',note:'Not keto, even whole wheat or multigrain.',al:['multigrain bread','whole wheat bread','buns','tortilla','tortillas','wraps']});
F('pasta','Pasta and noodles',A,'r','a',[371,13,72,1.5,3.2],['1 cup cooked',140],{buy:[450,'1 lb box'],gi:'Medium',note:'Not keto. Use zucchini noodles instead.',al:['noodles','spaghetti','macaroni','maggi']});
F('potato','Potatoes',P,'r','a',[77,2,15,0.1,2.2],['1 medium',170],{pc:170,cnt:1,gi:'High, about 78',note:'Not keto. Cauliflower is the swap.',al:['aloo','potatoes']});
F('sweet-potato','Sweet potatoes',P,'r','a',[86,1.6,17,0.1,3],['1 medium',130],{pc:130,cnt:1,gi:'Medium, about 63',note:'Not keto.',al:['shakarkandi']});
F('corn','Corn',Z,'r','a',[86,3.3,16.9,1.4,2],['½ cup',80],{gi:'Medium, about 52',note:'Not keto.',al:['sweet corn','makka']});
F('peas','Green peas',Z,'r','a',[81,5.4,9,0.4,5.1],['½ cup',80],{gi:'Low, about 51',note:'Not keto. Too many carbs per portion.',al:['matar']});
F('chickpeas','Chickpeas',A,'r','a',[139,7,15,2.6,7],['½ cup',85],{gi:'Low, about 28',note:'Not keto. Hummus is made from these.',al:['chana','chole','hummus','kabuli chana']});
F('rajma','Kidney beans',A,'r','a',[127,8.7,16,0.5,6.4],['½ cup',90],{gi:'Low',note:'Not keto.',al:['rajma','kidney beans','black beans','beans canned']});
F('dal','Lentils and dal',A,'r','a',[343,22,48,1.5,15],['½ cup cooked',100],{buy:[900,'2 lb bag'],gi:'Low, about 30',note:'Not keto. Healthy, but too many carbs for now.',al:['toor dal','moong dal','masoor dal','lentils','chana dal','urad dal']});
F('besan','Besan',A,'r','a',[387,22,47,6.7,11],['2 tbsp',15],{buy:[900,'2 lb bag'],gi:'Low',note:'Not keto. Never use it to thicken or coat.',al:['gram flour','chickpea flour']});
F('rava','Rava',A,'r','r',[360,12.7,69,1,3.9],['2 tbsp',20],{buy:[900,'2 lb bag'],gi:'High',note:'Not keto.',al:['suji','semolina','sooji']});
F('maida','All-purpose flour',A,'r','r',[364,10,73,1,2.7],['2 tbsp',16],{buy:[2270,'5 lb bag'],gi:'High',note:'Not keto.',al:['maida','plain flour']});
F('cornflour','Cornflour',A,'r','r',[381,0.3,90,0.1,0.9],['1 tbsp',8],{buy:[450,'box'],gi:'High',note:'Not keto. Never use it to thicken soups or curries.',al:['cornstarch','corn starch']});
F('sugar','Sugar',A,'r','r',[387,0,100,0,0],['1 tsp',4],{tsp:4,buy:[1800,'4 lb bag'],gi:'High',note:'Not keto, in any form.',al:['brown sugar','cheeni']});
F('jaggery','Jaggery',A,'r','r',[383,0.4,98,0.1,0],['1 tsp',5],{gi:'High',note:'Sugar, not keto.',al:['gur']});
F('honey','Honey',A,'r','r',[304,0.3,82,0,0.2],['1 tsp',7],{gi:'Medium',note:'Sugar, not keto.',al:['shahad']});
F('makhana','Makhana',A,'r','a',[347,9.7,65,0.1,14],['1 cup',8],{gi:'Low',note:'Not strictly keto. Small bowl after keto.',al:['fox nuts','lotus seeds']});
F('sabudana','Sabudana',A,'r','r',[358,0.2,88,0,0.9],['¼ cup',40],{gi:'High',note:'Not keto.',al:['tapioca pearls']});
F('juice','Fruit juice',A,'r','r',[45,0.7,10.4,0.2,0.2],['1 cup',240],{gi:'Medium',note:'Sugar without the fiber. Not keto.',al:['orange juice','apple juice']});
F('soda','Soda',A,'r','r',[41,0,10.6,0,0],['1 can',355],{gi:'High',note:'Not keto. Sparkling water is the swap.',al:['coke','cola','soft drink','pepsi','sprite']});
F('kombucha','Kombucha',A,'a','a',[13,0,3,0,0],['1 cup',240],{gi:'Low',note:'Most bottles have sugar. Zero-sugar ones occasionally.',tip:'Look for 0 to 2 g sugar per serving.'});
F('dark-chocolate','Dark chocolate 85%',A,'r','a',[600,8,14,46,11],['2 squares',20],{gi:'Low',note:'Left out of your strict plan to help sweet cravings fade.'});
F('chips','Chips',A,'r','r',[536,7,48,35,4],['1 small bag',28],{gi:'High',note:'Not keto.',al:['crisps','namkeen','chakli','mixture','banana chips']});
F('biscuits','Biscuits and cookies',A,'r','r',[480,6,68,20,2],['2 biscuits',20],{gi:'High',note:'Not keto.',al:['cookies','biscuit','rusk','cake']});
F('keto-bar','Keto bars and treats',A,'r','r',[400,15,8,25,10],['1 bar',45],{gi:'Varies',note:'Left out of your plan: high in calories and often use sweeteners like maltitol.',al:['protein bar','fat bomb','keto cookies']});

var HOUSE = ['soap','detergent','paper towel','tissue','toilet paper','foil','zip','ziploc','trash bag','garbage bag','sponge','dish','cleaner','shampoo','toothpaste','napkin','wrap film','cling'];

function norm(s){ return String(s||'').toLowerCase().replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim(); }
function sing(s){ return s.replace(/ies$/,'y').replace(/oes$/,'o').replace(/s$/,''); }
var INDEX = [];
Object.keys(L).forEach(function(k){
  var f = L[k], names = [f.n].concat(f.al).concat([k.replace(/-/g,' ')]);
  names.forEach(function(nm){ var t = norm(nm); if(t) INDEX.push([t, k]); });
});
INDEX.sort(function(a,b){ return b[0].length - a[0].length; });

function match(text){
  var t = norm(text); if(!t) return null;
  for(var h=0; h<HOUSE.length; h++){ if(t.indexOf(HOUSE[h]) >= 0) return {house:true}; }
  var ts = t.split(' ').map(sing).join(' ');
  for(var i=0;i<INDEX.length;i++){
    var n = INDEX[i][0], ns = n.split(' ').map(sing).join(' ');
    if(t===n || ts===ns) return {key:INDEX[i][1]};
  }
  for(var j=0;j<INDEX.length;j++){
    var n2 = INDEX[j][0], n2s = n2.split(' ').map(sing).join(' ');
    var re = new RegExp('(^| )' + n2s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&') + '( |$)');
    if(re.test(ts)) return {key:INDEX[j][1]};
  }
  return null;
}

window.SA_FOODS = {list:L, match:match, norm:norm};
})();
