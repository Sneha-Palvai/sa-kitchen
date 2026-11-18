/* S&A Kitchen built-in recipes
   c: b breakfast, m mains, ss soups and salads, sd sides, sn snacks, br breads and wraps, dr drinks
   d: veg, nog (veg, no onion and garlic), non (non-veg). both: has a no onion and garlic version.
   sv: servings the ingredients make (one serving = a 1x portion). t: minutes.
   k, p, nc: approximate calories, protein (g), net carbs (g) per 1x serving.
   pr: main protein. tags: quick, make (make-ahead), lunch (lunchbox), freeze, week (weeknight),
   heavy, occ (occasional), full (full meal), add (add a protein), thaw (frozen protein).
   fr: days in the fridge. rh: reheating. i: [foodKey, amount, unit, flag, label]
   flag o = only in the regular version, n = only in the no onion and garlic version.
   Steps: {3} shows ingredient 3 with its scaled amount. [[regular||no onion and garlic]] switches text.
   A number after a step is its timer in seconds. */
(function(){
var R = [];
function A(o){ o.sv = o.sv || 2; o.tags = o.tags || ''; R.push(o); }

// Breakfast
A({id:'masala-omelette',n:'Masala omelette',c:'b',d:'non',t:10,k:290,p:20,nc:3,pr:'egg',tags:'quick',
 i:[['egg',6,'pc'],['onion',20,'g'],['tomato',30,'g'],['green-chili',1,'pc'],['coriander',5,'g'],['turmeric',0.125,'tsp'],['ghee',2,'tsp'],['salt',0,'taste']],
 s:[['Whisk {0} with {5}, a pinch of salt and pepper.'],['Finely chop {1}, {2}, {3} and {4}, and stir them into the eggs.'],['Heat half of {6} in a pan on medium heat. Pour in half the mix, cook 2 minutes, fold, and cook 1 more minute. Repeat for the second omelette.',180]],
 tip:'Add a handful of spinach or mushrooms for more volume with almost no carbs.'});
A({id:'scrambled-eggs-cheese',n:'Scrambled eggs with cheese',c:'b',d:'non',t:8,k:360,p:26,nc:2,pr:'egg',tags:'quick',
 i:[['egg',6,'pc'],['cheddar',50,'g'],['spinach',60,'g'],['butter',2,'tsp'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Whisk {0} with a pinch of salt and pepper.'],['Melt {3} in a pan on low heat, add {2} and stir until wilted.',60],['Pour in the eggs and stir slowly until softly set. Turn off the heat and fold in {1}.',150]]});
A({id:'fried-eggs-avocado',n:'Fried eggs and avocado',c:'b',d:'non',t:10,k:380,p:21,nc:3,pr:'egg',tags:'quick',
 i:[['egg',6,'pc'],['avocado',1,'pc'],['spinach',100,'g'],['olive-oil',2,'tsp'],['chili-flakes',0,'taste'],['salt',0,'taste']],
 s:[['Heat half of {3} and sauté {2} with a pinch of salt until wilted. Divide onto two plates.',90],['Add the rest of the oil and fry {0} to your liking.',180],['Slice {1} and serve alongside, with {4}.']]});
A({id:'egg-muffins',n:'Egg muffins',c:'b',d:'non',t:30,k:250,p:18,nc:3,pr:'egg',sv:4,tags:'make lunch',fr:4,rh:'Microwave 30 to 40 seconds.',
 i:[['egg',10,'pc'],['spinach',60,'g'],['bell-pepper',1,'pc'],['onion',40,'g'],['cheddar',60,'g'],['olive-oil',1,'tsp'],['salt',0,'taste'],['black-pepper',0,'taste']],
 s:[['Heat the oven to 375°F (190°C) and grease a 12-cup muffin tray with {5}.'],['Chop {1}, {2} and {3} and divide them into the cups.'],['Whisk {0} with salt and pepper, pour into the cups, and top with {4}.'],['Bake until set in the middle.',1200],['Cool, then store in a container in the fridge. 3 muffins is one serving.']]});
A({id:'sheet-pan-frittata',n:'Sheet-pan frittata',c:'b',d:'non',t:30,k:290,p:19,nc:4,pr:'egg',sv:4,tags:'make lunch',fr:4,rh:'Microwave 40 seconds, or eat cold.',
 i:[['egg',10,'pc'],['heavy-cream',2,'tbsp'],['mushrooms',150,'g'],['zucchini',1,'pc'],['onion',40,'g'],['cheddar',60,'g'],['olive-oil',1,'tbsp'],['salt',0,'taste']],
 s:[['Heat the oven to 375°F (190°C). Line a baking tray with parchment and brush with {6}.'],['Slice {2}, {3} and {4}, spread them on the tray, and roast.',480],['Whisk {0} with {1} and salt, pour over the vegetables, and sprinkle {5}.'],['Bake until set.',900],['Cut into 8 squares. 2 squares is one serving.']]});
A({id:'mug-eggs',n:'Microwave mug eggs',c:'b',d:'non',t:3,k:310,p:22,nc:1,pr:'egg',sv:1,tags:'quick',
 i:[['egg',3,'pc'],['cheddar',20,'g'],['spinach',20,'g'],['butter',0.5,'tsp'],['salt',0,'taste']],
 s:[['Rub a large mug with {3}. Add {0}, {2}, {1} and a pinch of salt, and whisk with a fork.'],['Microwave 45 seconds, stir, then 30 to 45 seconds more until just set.',75]]});
A({id:'hemp-flax-porridge',n:'Hemp and flax porridge',c:'b',d:'nog',t:10,k:360,p:14,nc:3,pr:'veg',sv:1,tags:'quick',
 i:[['hemp-hearts',3,'tbsp'],['flaxseed',1,'tbsp'],['chia',1,'tbsp'],['coconut',1,'tbsp'],['almond-milk',180,'ml'],['cinnamon',0.25,'tsp'],['walnuts',7,'g']],
 s:[['Add {0}, {1}, {2}, {3} and {5} to a small pot with {4}.'],['Simmer on low, stirring, until thick and creamy.',240],['Top with chopped {6}.']],
 tip:'The keto swap for your oatmeal. No fruit on top during keto.'});
A({id:'chia-hemp-jar',n:'Overnight chia and hemp jar',c:'b',d:'nog',t:5,k:340,p:13,nc:3,pr:'veg',sv:1,tags:'quick make',fr:4,rh:'Eat cold, straight from the fridge.',
 i:[['chia',2,'tbsp'],['hemp-hearts',2,'tbsp'],['flaxseed',1,'tbsp'],['almond-milk',180,'ml'],['cinnamon',0.25,'tsp'],['walnuts',7,'g']],
 s:[['In a jar, stir {0}, {1}, {2} and {4} into {3}.'],['Stir again after 5 minutes so the chia doesn\u2019t clump, then close and refrigerate overnight.'],['In the morning, top with chopped {5}.']],
 tip:'Make 3 jars on Sunday. Pair with 1 or 2 boiled eggs for a full breakfast.'});
A({id:'paneer-bhurji',n:'Paneer bhurji',c:'b',d:'veg',both:1,t:15,k:370,p:31,nc:6,pr:'paneer',tags:'quick',
 i:[['paneer-lowfat',300,'g'],['onion',60,'g','o'],['hing',0,'pinch','n'],['tomato',60,'g'],['green-chili',1,'pc'],['ginger',1,'tsp'],['turmeric',0.25,'tsp'],['cumin-seeds',0.5,'tsp'],['ghee',2,'tsp'],['coriander',5,'g'],['salt',0,'taste']],
 s:[['Crumble {0} with your fingers.'],['Heat {8} and add {7}. [[Add {1} and sauté until soft.||Add a pinch of {2}.]]',150],['Add {5}, {4} and {3}. Cook until soft, then add {6} and salt.',180],['Add the paneer and cook 2 minutes, stirring. Finish with {9}.',120]]});
A({id:'tofu-bhurji',n:'Tofu bhurji',c:'b',d:'nog',t:15,k:315,p:29,nc:4,pr:'tofu',tags:'quick',
 i:[['tofu',400,'g'],['tomato',60,'g'],['spinach',60,'g'],['ginger',1,'tsp'],['green-chili',1,'pc'],['hing',0,'pinch'],['turmeric',0.25,'tsp'],['cumin-seeds',0.5,'tsp'],['olive-oil',2,'tsp'],['coriander',5,'g'],['salt',0,'taste']],
 s:[['Press {0} dry with a towel and crumble it.'],['Heat {8}, add {7} and {5}, then {3}, {4} and {1}. Cook until soft.',180],['Add the tofu, {6} and salt. Cook, stirring, then fold in {2}.',240],['Finish with {9}.']]});
A({id:'cauliflower-upma',n:'Cauliflower upma',c:'b',d:'veg',both:1,t:15,k:150,p:5,nc:6,pr:'veg',tags:'',
 i:[['cauliflower-rice',340,'g'],['peanuts',20,'g'],['mustard-seeds',0.5,'tsp'],['curry-leaves',1,'pc'],['green-chili',1,'pc'],['ginger',1,'tsp'],['onion',40,'g','o'],['hing',0,'pinch','n'],['ghee',2,'tsp'],['lemon',0.5,'pc'],['coriander',5,'g'],['salt',0,'taste']],
 s:[['Heat {8}, add {2} and let them pop. Add {3}, {1}, {4} and {5}.',90],['[[Add {6} and sauté until soft.||Add a pinch of {7}.]]',120],['Add {0} and salt, and cook until tender but not mushy.',300],['Squeeze {9} over it and add {10}.']],
 tip:'Low in protein, so have it with 2 boiled eggs or a little paneer.'});

// Mains
A({id:'chicken-curry',n:'Chicken curry',c:'m',d:'non',t:40,k:410,p:39,nc:9,pr:'chicken',tags:'make lunch freeze',fr:3,rh:'Reheat on the stove with a splash of water.',
 i:[['chicken-thigh',400,'g'],['onion',80,'g'],['tomato',100,'g'],['ginger',1,'tbsp'],['garlic',3,'pc'],['green-chili',1,'pc'],['turmeric',0.5,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1.5,'tsp'],['garam-masala',0.5,'tsp'],['cumin-seeds',0.5,'tsp'],['ghee',1,'tbsp'],['coriander',10,'g'],['cauliflower-rice',340,'g'],['salt',0,'taste']],
 s:[['Cut {0} into bite-size pieces.'],['Heat {11}, add {10}, then {1}. Sauté until golden.',360],['Add {3}, {4} and {5}. Cook 1 minute, then add {2}, {6}, {7}, {8} and salt.',300],['Add the chicken, stir to coat, add ½ cup water, cover and simmer.',1200],['Stir in {9} and {12}. Cook {13} separately and serve together.',300]]});
A({id:'egg-curry',n:'Egg curry',c:'m',d:'non',t:30,k:450,p:21,nc:9,pr:'egg',tags:'make lunch',fr:2,rh:'Reheat gently on the stove.',
 i:[['egg',6,'pc'],['onion',80,'g'],['tomato',120,'g'],['coconut-milk',100,'ml'],['ginger',1,'tsp'],['garlic',2,'pc'],['green-chili',1,'pc'],['turmeric',0.25,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['curry-leaves',1,'pc'],['ghee',1,'tbsp'],['cauliflower-rice',340,'g'],['salt',0,'taste']],
 s:[['Boil {0}, cool in cold water, peel, and make small slits in each.',600],['Heat {12}, add {11} and {1}, and sauté until soft.',300],['Add {4}, {5}, {6}, then {2} with {7}, {8}, {9} and salt. Cook until thick.',300],['Pour in {3}, add the eggs, and simmer. Finish with {10}.',300],['Serve with {13}.']]});
A({id:'tilapia-curry',n:'Coconut tilapia curry',c:'m',d:'non',t:30,k:480,p:42,nc:7,pr:'fish',tags:'make thaw',fr:2,rh:'Reheat gently on the stove.',
 i:[['tilapia',400,'g'],['coconut-milk',200,'ml'],['onion',60,'g'],['tomato',80,'g'],['ginger',1,'tsp'],['garlic',2,'pc'],['green-chili',2,'pc'],['turmeric',0.25,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['mustard-seeds',0.5,'tsp'],['curry-leaves',1,'pc'],['coconut-oil',1,'tbsp'],['lemon',0.5,'pc'],['salt',0,'taste']],
 s:[['Cut {0} into large pieces and rub with a pinch of {7} and salt.'],['Heat {12}, add {10} and {11}, then {2}. Sauté until soft.',240],['Add {4}, {5}, {6} and {3}, then the rest of the spices. Cook until soft.',240],['Pour in {1} with ½ cup water and bring to a gentle simmer.',180],['Slide in the fish and simmer without stirring until it flakes. Finish with {13}.',480]],
 tip:'Serve with cabbage poriyal or cauliflower rice.'});
A({id:'chicken-keema',n:'Chicken keema',c:'m',d:'non',t:30,k:435,p:40,nc:6,pr:'chicken',tags:'make lunch freeze',fr:3,rh:'Reheat on the stove or microwave.',
 i:[['chicken-mince',450,'g'],['onion',80,'g'],['tomato',100,'g'],['ginger',1,'tsp'],['garlic',3,'pc'],['green-chili',1,'pc'],['turmeric',0.25,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['ghee',1,'tbsp'],['coriander',10,'g'],['lettuce',1,'pc','','lettuce (for cups)'],['salt',0,'taste']],
 s:[['Heat {10} and sauté {1} until golden.',300],['Add {3}, {4} and {5}, then {2} with {6}, {7}, {8} and salt. Cook until soft.',240],['Add {0}, break it up, and cook until no longer pink and the liquid dries up.',600],['Stir in {9} and {11}.'],['Serve in leaves from {12}, or with cauliflower rice.']]});
A({id:'palak-paneer',n:'Palak paneer',c:'m',d:'veg',both:1,t:35,k:340,p:23,nc:6,pr:'paneer',tags:'make lunch',fr:3,rh:'Reheat on the stove with a splash of water. To freeze, freeze the gravy without paneer for up to 1 month.',
 i:[['spinach',300,'g'],['paneer-lowfat',200,'g'],['onion',40,'g','o'],['garlic',3,'pc','o'],['hing',0,'pinch','n'],['ginger',1,'tbsp'],['green-chili',1,'pc'],['tomato',40,'g'],['ghee',2,'tsp'],['cumin-seeds',1,'tsp'],['turmeric',0.25,'tsp'],['garam-masala',0.5,'tsp'],['kasuri-methi',1,'tsp'],['heavy-cream',2,'tbsp'],['salt',0,'taste']],
 s:[['Boil {0} for 2 minutes, move it to cold water, then blend with {6} until smooth.',120],['Heat {8} and add {9}. [[Add {2} and {3}, and sauté until soft.||Add a pinch of {4}.]]',240],['Add {5}, {7} and {10}. Cook until the tomato softens.',180],['Pour in the spinach purée with salt and simmer on low heat.',300],['Add {1}, {12} and {11}. Simmer, then turn off the heat and stir in {13}.',180]],
 tip:'Serve with cauliflower rice or a keto roti. Swap the cream for 2 tbsp Greek yogurt, stirred in off the heat, to save calories.'});
A({id:'grilled-chicken-veg',n:'Grilled chicken and roasted vegetables',c:'m',d:'non',t:35,k:380,p:47,nc:7,pr:'chicken',tags:'make lunch',fr:3,rh:'Microwave 1 minute, or eat cold.',
 i:[['chicken-breast',400,'g'],['broccoli',200,'g'],['zucchini',1,'pc'],['bell-pepper',1,'pc'],['olive-oil',1.5,'tbsp'],['lemon',1,'pc'],['garlic',2,'pc'],['paprika',1,'tsp'],['oregano',0.5,'tsp'],['salt',0,'taste'],['black-pepper',0,'taste']],
 s:[['Heat the oven to 425°F (220°C). Mix half of {4} with the juice of {5}, grated {6}, {7}, {8}, salt and pepper.'],['Coat {0} in the mix and set aside.'],['Chop {1}, {2} and {3}, toss with the rest of the oil and salt, and spread on a tray.'],['Roast the vegetables, add the chicken to the tray, and roast together until the chicken is cooked through.',1500],['Rest the chicken 5 minutes, then slice.',300]]});
A({id:'chicken-tikka',n:'Chicken tikka',c:'m',d:'non',t:30,k:380,p:55,nc:4,pr:'chicken',tags:'make lunch',fr:3,rh:'Microwave 1 minute, or eat cold in a salad.',
 i:[['chicken-breast',450,'g'],['greek-yogurt',100,'g'],['ginger',1,'tbsp'],['garlic',3,'pc'],['chili-powder',1,'tsp'],['garam-masala',1,'tsp'],['cumin-powder',0.5,'tsp'],['lemon',0.5,'pc'],['mustard-oil',1,'tbsp'],['salt',0,'taste']],
 s:[['Cut {0} into cubes.'],['Mix {1}, grated {2} and {3}, {4}, {5}, {6}, juice of {7}, half of {8} and salt. Coat the chicken and marinate at least 30 minutes, or overnight.'],['Thread onto skewers or spread on a lined tray, and brush with the rest of the oil.'],['Bake at 450°F (230°C) or air-fry at 400°F (200°C), turning once, until charred at the edges.',900]],
 tip:'Serve with kachumber and cucumber raita, or in lettuce wraps.'});
A({id:'paneer-tikka',n:'Paneer tikka',c:'m',d:'veg',both:1,t:30,k:345,p:29,nc:6,pr:'paneer',tags:'make',fr:2,rh:'Air-fry 3 minutes to crisp up again.',
 i:[['paneer-lowfat',250,'g'],['greek-yogurt',60,'g'],['bell-pepper',1,'pc'],['onion',60,'g','o'],['ginger',1,'tsp'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['kasuri-methi',1,'tsp'],['lemon',0.5,'pc'],['mustard-oil',2,'tsp'],['salt',0,'taste']],
 s:[['Cut {0}, {2}[[ and {3}|| ]] into chunks.'],['Mix {1}, {4}, [[{5}||{6}]], {7}, {8}, {9}, juice of {10}, {11} and salt. Coat everything and marinate 20 minutes.',1200],['Bake at 450°F (230°C) or air-fry at 400°F (200°C) until charred at the edges.',720]]});
A({id:'tofu-tikka',n:'Tofu tikka',c:'m',d:'nog',t:30,k:330,p:31,nc:5,pr:'tofu',tags:'make',fr:3,rh:'Air-fry 3 minutes to crisp up again.',
 i:[['tofu',400,'g'],['greek-yogurt',60,'g'],['bell-pepper',1,'pc'],['ginger',1,'tsp'],['hing',0,'pinch'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['kasuri-methi',1,'tsp'],['lemon',0.5,'pc'],['olive-oil',2,'tsp'],['salt',0,'taste']],
 s:[['Press {0} dry and cut into cubes. Cut {2} into chunks.'],['Mix {1}, {3}, {4}, {5}, {6}, {7}, juice of {8}, {9} and salt. Coat and marinate 20 minutes.',1200],['Bake at 450°F (230°C) or air-fry at 400°F (200°C) until golden.',900]]});
A({id:'baked-salmon',n:'Baked salmon with spinach',c:'m',d:'non',t:25,k:450,p:37,nc:2,pr:'fish',tags:'thaw',fr:2,rh:'Eat cold in a salad, or warm gently.',
 i:[['salmon',2,'pc'],['butter',1,'tbsp'],['lemon',1,'pc'],['garlic',2,'pc'],['spinach',200,'g'],['olive-oil',1,'tsp'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Heat the oven to 400°F (200°C). Place {0} on a lined tray, season with salt and pepper.'],['Melt {1} with grated {3} and the juice of half of {2}, and spoon over the salmon.'],['Bake until it flakes easily.',780],['Meanwhile, sauté {4} in {5} with a pinch of salt.',120],['Serve with the remaining lemon in wedges.']]});
A({id:'lemon-garlic-tilapia',n:'Lemon garlic tilapia',c:'m',d:'non',t:20,k:350,p:52,nc:6,pr:'fish',tags:'week thaw',fr:2,rh:'Warm gently, or flake into a salad.',
 i:[['tilapia',500,'g'],['butter',1,'tbsp'],['olive-oil',1,'tsp'],['lemon',1,'pc'],['garlic',3,'pc'],['paprika',0.5,'tsp'],['green-beans',250,'g'],['salt',0,'taste']],
 s:[['Pat {0} dry and season with {5} and salt.'],['Heat {2} in a large pan and cook the fish 3 minutes per side.',360],['Lower the heat, add {1} and sliced {4}, and spoon over the fish. Squeeze in the juice of {3}.',60],['Steam or sauté {6} on the side.',360]]});
A({id:'tilapia-masala-fry',n:'Tilapia masala fry',c:'m',d:'non',t:25,k:310,p:51,nc:2,pr:'fish',tags:'week thaw',fr:2,rh:'Re-crisp in a pan or air fryer.',
 i:[['tilapia',500,'g'],['turmeric',0.25,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['ginger',1,'tsp'],['garlic',2,'pc'],['lemon',0.5,'pc'],['mustard-oil',1,'tbsp'],['salt',0,'taste']],
 s:[['Mix {1}, {2}, {3}, grated {4} and {5}, the juice of {6} and salt into a paste.'],['Coat {0} and rest 10 minutes.',600],['Heat {7} in a pan and fry the fish until crisp and cooked through. No rava or besan coating.',420]]});
A({id:'tandoori-fish',n:'Tandoori fish',c:'m',d:'non',t:30,k:325,p:54,nc:3,pr:'fish',tags:'thaw',fr:2,rh:'Air-fry 3 minutes.',
 i:[['tilapia',500,'g'],['greek-yogurt',80,'g'],['ginger',1,'tsp'],['garlic',2,'pc'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['turmeric',0.25,'tsp'],['lemon',0.5,'pc'],['mustard-oil',2,'tsp'],['salt',0,'taste']],
 s:[['Mix {1}, {2}, {3}, {4}, {5}, {6}, juice of {7}, {8} and salt.'],['Coat {0} and marinate 20 minutes.',1200],['Bake at 450°F (230°C) or air-fry at 400°F (200°C) until charred at the edges.',600]],
 tip:'Works with salmon too. Serve with kachumber and raita.'});
A({id:'garlic-butter-shrimp',n:'Garlic butter shrimp with zucchini noodles',c:'m',d:'non',t:20,k:280,p:42,nc:5,pr:'fish',tags:'week thaw',fr:2,
 i:[['shrimp',400,'g'],['butter',1.5,'tbsp'],['garlic',4,'pc'],['chili-flakes',0.25,'tsp'],['lemon',0.5,'pc'],['zucchini',2,'pc'],['coriander',5,'g'],['salt',0,'taste']],
 s:[['Spiralize or thinly slice {5} into noodles.'],['Melt half of {1}, add sliced {2} and {3}, then {0}. Cook until pink.',240],['Remove the shrimp. Add the rest of the butter and toss the zucchini noodles until just warm.',120],['Return the shrimp, add the juice of {4}, salt and {6}.']]});
A({id:'prawn-masala',n:'Prawn masala',c:'m',d:'non',t:30,k:270,p:42,nc:8,pr:'fish',tags:'thaw',fr:2,rh:'Reheat gently on the stove.',
 i:[['shrimp',400,'g'],['onion',80,'g'],['tomato',120,'g'],['ginger',1,'tsp'],['garlic',3,'pc'],['green-chili',1,'pc'],['turmeric',0.25,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['coconut-oil',1,'tbsp'],['curry-leaves',1,'pc'],['coriander',10,'g'],['salt',0,'taste']],
 s:[['Heat {10}, add {11} and {1}. Sauté until golden.',300],['Add {3}, {4} and {5}, then {2} with {6}, {7}, {8} and salt. Cook until thick.',300],['Add {0} and cook until pink and curled.',300],['Finish with {9} and {12}.']],
 tip:'Serve with cabbage poriyal.'});
A({id:'lemon-pepper-chicken',n:'Lemon pepper chicken with broccoli',c:'m',d:'non',t:25,k:385,p:54,nc:5,pr:'chicken',tags:'week lunch',fr:3,rh:'Microwave 1 minute.',
 i:[['chicken-breast',450,'g'],['butter',1,'tbsp'],['olive-oil',1,'tsp'],['lemon',1,'pc'],['black-pepper',1,'tsp'],['garlic',2,'pc'],['broccoli',250,'g'],['salt',0,'taste']],
 s:[['Slice {0} into thin cutlets and season with {4} and salt.'],['Heat {2} and cook the chicken 4 minutes per side.',480],['Lower the heat, add {1}, grated {5}, and the juice and zest of {3}. Spoon over the chicken.',60],['Steam {6} and serve together.',300]]});
A({id:'baked-drumsticks',n:'Baked masala drumsticks',c:'m',d:'non',t:45,k:395,p:37,nc:2,pr:'chicken',tags:'make lunch',fr:3,rh:'Oven or air fryer for 5 minutes.',
 i:[['drumsticks',4,'pc'],['greek-yogurt',2,'tbsp'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['turmeric',0.25,'tsp'],['ginger',1,'tsp'],['garlic',2,'pc'],['lemon',0.5,'pc'],['olive-oil',2,'tsp'],['salt',0,'taste']],
 s:[['Make cuts in {0}.'],['Mix {1}, {2}, {3}, {4}, {5}, {6}, juice of {7}, {8} and salt. Coat the chicken and marinate at least 20 minutes.',1200],['Bake at 425°F (220°C), turning once, until cooked through.',2100]]});
A({id:'paneer-stir-fry',n:'Paneer stir-fry',c:'m',d:'veg',both:1,t:20,k:330,p:29,nc:8,pr:'paneer',tags:'week',
 i:[['paneer-lowfat',250,'g'],['bell-pepper',2,'pc'],['broccoli',150,'g'],['onion',60,'g','o'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['ginger',1,'tsp'],['soy-sauce',1,'tbsp'],['chili-flakes',0.25,'tsp'],['olive-oil',2,'tsp']],
 s:[['Cube {0}. Slice {1}[[ and {3}|| ]], and cut {2} into small florets.'],['Heat {9} on high heat. [[Add {4} and {6}.||Add {6} and a pinch of {5}.]]',30],['Add the vegetables and stir-fry until crisp-tender.',240],['Add the paneer, {7} and {8}. Toss 2 minutes.',120]]});
A({id:'mutton-curry',n:'Mutton curry',c:'m',d:'non',t:75,k:380,p:53,nc:9,pr:'mutton',tags:'make freeze heavy',fr:3,rh:'Reheat on the stove.',
 i:[['mutton',500,'g'],['onion',100,'g'],['tomato',120,'g'],['ginger',1,'tbsp'],['garlic',4,'pc'],['green-chili',1,'pc'],['turmeric',0.5,'tsp'],['chili-powder',1.5,'tsp'],['coriander-powder',1.5,'tsp'],['garam-masala',1,'tsp'],['ghee',1,'tbsp'],['coriander',10,'g'],['salt',0,'taste']],
 s:[['Heat {10} and brown {1} well.',480],['Add {3}, {4} and {5}, then {2} with {6}, {7}, {8} and salt. Cook until the oil separates.',300],['Add {0} and sear on high heat.',300],['Add 1½ cups water. Pressure cook 6 to 7 whistles (about 25 minutes), or simmer covered until tender.',1500],['Stir in {9} and {11}.']],
 tip:'Richer than other curries, so once a week.'});
A({id:'kadai-paneer',n:'Kadai paneer',c:'m',d:'veg',both:1,t:30,k:340,p:29,nc:9,pr:'paneer',tags:'make',fr:3,rh:'Reheat on the stove.',
 i:[['paneer-lowfat',250,'g'],['bell-pepper',2,'pc'],['onion',60,'g','o'],['tomato',150,'g'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['ginger',1,'tsp'],['coriander-powder',1,'tsp'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['kasuri-methi',1,'tsp'],['ghee',2,'tsp'],['salt',0,'taste']],
 s:[['Cut {0} and {1} into chunks.[[ Slice {2} the same size.|| ]]'],['Heat {11}. [[Add {4} and {6}, then the onion.||Add a pinch of {5} and {6}.]] Sauté until fragrant.',120],['Add {3}, {7}, {8} and salt. Cook into a thick masala.',360],['Add the peppers and cook until just tender, then the paneer, {9} and {10}.',300]]});
A({id:'veg-kurma',n:'Vegetable kurma with paneer',c:'m',d:'veg',both:1,t:35,k:470,p:25,nc:11,pr:'paneer',tags:'make heavy',fr:3,rh:'Reheat on the stove.',
 i:[['cauliflower',300,'g'],['green-beans',150,'g'],['bell-pepper',1,'pc'],['paneer-lowfat',200,'g'],['coconut-milk',150,'ml'],['onion',50,'g','o'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['ginger',1,'tsp'],['green-chili',1,'pc'],['turmeric',0.25,'tsp'],['garam-masala',0.5,'tsp'],['coconut-oil',1,'tbsp'],['salt',0,'taste']],
 s:[['Cut {0} into florets, {1} into pieces, and {2} and {3} into cubes.'],['Heat {12}. [[Add {5} and {6}, and sauté until soft.||Add a pinch of {7}.]] Add {8} and {9}.',180],['Add the vegetables, {10}, salt and ½ cup water. Cover and cook until tender.',600],['Stir in {4}, the paneer and {11}. Simmer 3 minutes.',180]]});
A({id:'chicken-stir-fry',n:'Chicken stir-fry',c:'m',d:'non',t:20,k:340,p:49,nc:8,pr:'chicken',tags:'week lunch',fr:3,rh:'Microwave 1 minute.',
 i:[['chicken-breast',400,'g'],['broccoli',200,'g'],['bell-pepper',1,'pc'],['mushrooms',150,'g'],['soy-sauce',1.5,'tbsp'],['ginger',1,'tsp'],['garlic',2,'pc'],['chili-flakes',0.25,'tsp'],['olive-oil',1,'tbsp']],
 s:[['Slice {0} thinly. Cut {1}, {2} and {3}.'],['Heat {8} on high heat and stir-fry the chicken until cooked. Remove.',300],['Add {5}, {6} and the vegetables, and stir-fry until crisp-tender.',240],['Return the chicken, add {4} and {7}, and toss.',60]]});

// Soups and salads
A({id:'chicken-pepper-soup',n:'Chicken pepper soup',c:'ss',d:'non',t:35,k:330,p:40,nc:5,pr:'chicken',tags:'full make freeze',fr:3,rh:'Reheat on the stove.',
 i:[['chicken-thigh',400,'g'],['onion',50,'g'],['tomato',60,'g'],['ginger',1,'tsp'],['garlic',3,'pc'],['black-pepper',1.5,'tsp'],['cumin-seeds',0.5,'tsp'],['turmeric',0.25,'tsp'],['curry-leaves',1,'pc'],['ghee',1,'tsp'],['chicken-broth',500,'ml'],['coriander',5,'g'],['salt',0,'taste']],
 s:[['Crush {5} and {6} coarsely.'],['Heat {9}, add {8} and {1}. Sauté until soft.',180],['Add {3}, {4}, {2}, {7} and half the pepper mix.',120],['Add {0} in pieces, {10} and 1 cup water. Simmer until the chicken is tender.',1200],['Add the rest of the pepper, salt to taste, and {11}.']]});
A({id:'chicken-zoodle-soup',n:'Chicken zoodle soup',c:'ss',d:'non',t:30,k:330,p:47,nc:6,pr:'chicken',tags:'full make',fr:3,rh:'Reheat on the stove.',
 i:[['chicken-breast',400,'g'],['zucchini',2,'pc'],['celery',100,'g'],['onion',50,'g'],['garlic',2,'pc'],['chicken-broth',1000,'ml'],['olive-oil',2,'tsp'],['lemon',0.5,'pc'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Heat {6} and sauté {3}, {4} and {2}.',240],['Add {5} and {0} whole. Simmer until cooked, then shred the chicken.',1080],['Spiralize {1}, add to the pot, and cook just 2 minutes.',120],['Finish with the juice of {7}, pepper and salt.']]});
A({id:'lemon-coriander-soup',n:'Lemon coriander chicken soup',c:'ss',d:'non',t:30,k:275,p:40,nc:5,pr:'chicken',tags:'full',fr:3,rh:'Reheat on the stove, then add fresh lemon.',
 i:[['chicken-breast',350,'g'],['cabbage',100,'g'],['bell-pepper',0.5,'pc'],['mushrooms',80,'g'],['ginger',1,'tsp'],['garlic',2,'pc'],['chicken-broth',1000,'ml'],['lemon',1,'pc'],['coriander',20,'g'],['olive-oil',1,'tsp'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Simmer {0} in {6} until cooked, then shred.',900],['In {9}, sauté {4}, {5}, finely chopped {1}, {2} and {3}.',180],['Add the broth and chicken, and simmer. No cornflour.',300],['Turn off the heat, add the juice of {7}, chopped {8} and pepper.']]});
A({id:'broccoli-cheddar-soup',n:'Broccoli cheddar soup',c:'ss',d:'veg',both:1,t:25,k:400,p:18,nc:7,pr:'veg',tags:'add heavy',fr:3,rh:'Reheat gently on low heat.',
 i:[['broccoli',300,'g'],['cheddar',100,'g'],['heavy-cream',4,'tbsp'],['onion',40,'g','o'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['butter',1,'tbsp'],['water',400,'ml'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Melt {6}. [[Sauté {3} and {4} until soft.||Add a pinch of {5}.]]',180],['Add {0} and {7}. Simmer until tender.',600],['Blend half the soup, then return it to the pot.'],['On low heat, stir in {2}, then {1} until melted. No flour.',120]],
 tip:'Creamy and rich: 1 cup per serving, 2 to 3 times a week. Pair with a protein.'});
A({id:'cream-of-mushroom',n:'Cream of mushroom soup',c:'ss',d:'veg',both:1,t:25,k:240,p:6,nc:5,pr:'veg',tags:'add heavy',fr:3,rh:'Reheat gently.',
 i:[['mushrooms',340,'g'],['heavy-cream',4,'tbsp'],['onion',40,'g','o'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['butter',1,'tbsp'],['water',400,'ml'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Melt {5}. [[Sauté {2} and {3}.||Add a pinch of {4}.]]',120],['Add sliced {0} and cook until browned.',480],['Add {6} and simmer, then blend until smooth.',600],['Stir in {1}, salt and pepper.']],
 tip:'1 cup per serving. Pair with a protein like chicken tikka or an omelette.'});
A({id:'cream-of-spinach',n:'Cream of spinach soup',c:'ss',d:'veg',both:1,t:20,k:160,p:5,nc:3,pr:'veg',tags:'add',fr:2,rh:'Reheat gently.',
 i:[['spinach',300,'g'],['heavy-cream',3,'tbsp'],['butter',2,'tsp'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['ginger',0.5,'tsp'],['water',400,'ml'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Melt {2}. [[Add {3} and {5}.||Add {5} and a pinch of {4}.]]',60],['Add {0} and {6}. Simmer until wilted, then blend.',300],['Stir in {1}, salt and pepper.']]});
A({id:'kachumber',n:'Kachumber',c:'ss',d:'veg',both:1,t:10,k:40,p:1,nc:5,pr:'veg',tags:'add quick',
 i:[['cucumber',1,'pc'],['tomato',1,'pc'],['onion',30,'g','o'],['green-chili',1,'pc'],['lemon',0.5,'pc'],['chaat-masala',0.5,'tsp'],['coriander',5,'g'],['salt',0,'taste']],
 s:[['Finely dice {0}, {1}[[, {2}|| ]] and {3}.'],['Toss with the juice of {4}, {5}, {6} and salt. Mostly cucumber, less tomato.']]});
A({id:'avocado-chaat',n:'Avocado chaat salad',c:'ss',d:'veg',both:1,t:10,k:150,p:2,nc:4,pr:'veg',tags:'add quick',
 i:[['avocado',1,'pc'],['cucumber',0.5,'pc'],['tomato',0.5,'pc'],['onion',20,'g','o'],['green-chili',1,'pc'],['lemon',0.5,'pc'],['chaat-masala',0.5,'tsp'],['coriander',5,'g'],['salt',0,'taste']],
 s:[['Dice {0}, {1}, {2}[[ and {3}|| ]].'],['Toss gently with {4}, the juice of {5}, {6}, {7} and salt.']]});
A({id:'chicken-avocado-salad',n:'Grilled chicken avocado salad',c:'ss',d:'non',t:20,k:450,p:47,nc:4,pr:'chicken',tags:'full lunch',
 i:[['chicken-breast',400,'g'],['avocado',1,'pc'],['lettuce',200,'g'],['cucumber',0.5,'pc'],['olive-oil',1,'tbsp'],['lemon',1,'pc'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Season {0} and pan-grill until cooked through. Rest and slice.',720],['Chop {2} and {3}, and slice {1}.'],['Whisk {4} with the juice of {5}, salt and pepper. Toss everything together.']],
 tip:'For work, pack the dressing separately.'});
A({id:'egg-salad',n:'Egg salad',c:'ss',d:'non',t:15,k:320,p:20,nc:2,pr:'egg',tags:'full make lunch',fr:3,rh:'Eat cold.',
 i:[['egg',6,'pc'],['mayonnaise',2,'tbsp'],['dijon',1,'tsp'],['celery',50,'g'],['paprika',0.25,'tsp'],['lettuce',100,'g'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Hard-boil {0}, cool and peel.',600],['Chop the eggs and {3}, and mix with {1}, {2}, salt and pepper.'],['Serve on {5}, sprinkled with {4}.']]});
A({id:'warm-spinach-egg-salad',n:'Warm spinach and egg salad',c:'ss',d:'non',t:15,k:285,p:19,nc:3,pr:'egg',tags:'full quick',
 i:[['egg',4,'pc'],['spinach',200,'g'],['mushrooms',150,'g'],['olive-oil',1,'tbsp'],['garlic',2,'pc'],['lemon',0.5,'pc'],['parmesan',20,'g'],['salt',0,'taste']],
 s:[['Soft-boil {0}, cool and peel.',420],['Sauté {2} and {4} in {3} until golden.',300],['Add {1} and toss just until wilted. Add the juice of {5} and salt.',60],['Top with the halved eggs and {6}.']]});
A({id:'roasted-veg-paneer-salad',n:'Roasted vegetable paneer salad',c:'ss',d:'veg',both:1,t:30,k:320,p:26,nc:9,pr:'paneer',tags:'full lunch',fr:2,rh:'Eat warm or cold.',
 i:[['cauliflower',250,'g'],['broccoli',200,'g'],['bell-pepper',1,'pc'],['paneer-lowfat',200,'g'],['spinach',60,'g'],['olive-oil',1,'tbsp'],['garlic',2,'pc','o'],['cumin-powder',0.5,'tsp'],['chili-flakes',0.25,'tsp'],['lemon',0.5,'pc'],['salt',0,'taste']],
 s:[['Heat the oven to 425°F (220°C). Toss {0}, {1}, {2} and cubed {3} with {5}, {7}, {8}[[, chopped {6}|| ]] and salt.'],['Roast until golden at the edges.',1500],['Serve warm over {4} with the juice of {9}.']]});
A({id:'fish-salad',n:'Salmon or tilapia salad',c:'ss',d:'non',t:10,k:260,p:26,nc:3,pr:'fish',tags:'full quick lunch',
 i:[['tilapia',250,'g','','tilapia or salmon, cooked'],['lettuce',150,'g'],['cucumber',0.5,'pc'],['avocado',0.5,'pc'],['olive-oil',1,'tbsp'],['lemon',1,'pc'],['salt',0,'taste']],
 s:[['Flake {0}. Leftover baked or pan-fried fish is perfect.'],['Toss {1}, {2} and {3} with {4}, the juice of {5} and salt. Top with the fish.']]});
A({id:'cucumber-raita',n:'Cucumber raita',c:'ss',d:'nog',t:5,k:100,p:7,nc:5,pr:'veg',tags:'add quick',
 i:[['cucumber',1,'pc'],['greek-yogurt',150,'g'],['cumin-powder',0.5,'tsp'],['mint',5,'g'],['salt',0,'taste']],
 s:[['Grate {0} and squeeze out the water.'],['Mix into {1} with {2}, chopped {3} and salt.']]});

// Sides
A({id:'jeera-cauliflower-rice',n:'Jeera cauliflower rice',c:'sd',d:'nog',t:10,k:65,p:3,nc:5,pr:'veg',tags:'quick',fr:3,rh:'Microwave 1 minute.',
 i:[['cauliflower-rice',340,'g'],['ghee',1,'tsp'],['cumin-seeds',0.5,'tsp'],['coriander',5,'g'],['salt',0,'taste']],
 s:[['Heat {1} and add {2}.',30],['Add {0} and salt, and cook until just tender, not mushy.',300],['Finish with {3}.']]});
A({id:'garlic-green-beans',n:'Garlic green beans',c:'sd',d:'veg',both:1,t:15,k:90,p:3,nc:6,pr:'veg',tags:'week',fr:3,
 i:[['green-beans',300,'g'],['garlic',3,'pc','o'],['ginger',1,'tsp','n'],['olive-oil',2,'tsp'],['chili-flakes',0.25,'tsp'],['lemon',0.5,'pc'],['salt',0,'taste']],
 s:[['Trim {0} and steam until bright green.',300],['Heat {3}, add [[sliced {1}||{2}]] and {4}, then the beans and salt.',180],['Finish with the juice of {5}.']]});
A({id:'cabbage-poriyal',n:'Cabbage poriyal',c:'sd',d:'veg',both:1,t:20,k:120,p:3,nc:7,pr:'veg',tags:'make',fr:3,rh:'Microwave 1 minute.',
 i:[['cabbage',400,'g'],['coconut',2,'tbsp'],['mustard-seeds',0.5,'tsp'],['curry-leaves',1,'pc'],['green-chili',1,'pc'],['onion',30,'g','o'],['hing',0,'pinch','n'],['turmeric',0.25,'tsp'],['coconut-oil',2,'tsp'],['salt',0,'taste']],
 s:[['Finely shred {0}.'],['Heat {8}, add {2}, {3} and {4}. [[Add {5}.||Add a pinch of {6}.]]',90],['Add the cabbage, {7} and salt. Cover and cook until tender.',480],['Stir in {1}.']]});
A({id:'roasted-broccoli',n:'Roasted broccoli with parmesan',c:'sd',d:'nog',t:20,k:155,p:8,nc:6,pr:'veg',tags:'week',
 i:[['broccoli',300,'g'],['olive-oil',1,'tbsp'],['parmesan',20,'g'],['lemon',0.5,'pc'],['black-pepper',0,'taste'],['salt',0,'taste']],
 s:[['Toss {0} florets with {1}, salt and pepper.'],['Roast at 425°F (220°C) until browned at the edges.',1080],['Top with {2} and the juice of {3}.']]});
A({id:'mushroom-masala',n:'Mushroom masala',c:'sd',d:'veg',both:1,t:20,k:105,p:6,nc:6,pr:'veg',tags:'',fr:3,
 i:[['mushrooms',340,'g'],['onion',50,'g','o'],['tomato',80,'g'],['ginger',1,'tsp'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['chili-powder',0.5,'tsp'],['garam-masala',0.5,'tsp'],['turmeric',0.25,'tsp'],['ghee',2,'tsp'],['coriander',5,'g'],['salt',0,'taste']],
 s:[['Heat {9}. [[Add {1} and {4}, and sauté until soft.||Add a pinch of {5}.]]',180],['Add {3}, {2}, {6}, {8} and salt. Cook until soft.',180],['Add sliced {0} and cook until the liquid dries up.',420],['Finish with {7} and {10}.']]});
A({id:'bhindi-fry',n:'Bhindi fry',c:'sd',d:'veg',both:1,t:25,k:115,p:3,nc:7,pr:'veg',tags:'',
 i:[['okra',300,'g'],['onion',40,'g','o'],['hing',0,'pinch','n'],['cumin-seeds',0.5,'tsp'],['turmeric',0.25,'tsp'],['chili-powder',0.5,'tsp'],['mustard-oil',1,'tbsp'],['salt',0,'taste']],
 s:[['Wash {0}, dry completely, and slice into rounds.'],['Heat {6}, add {3} [[and {1}||and a pinch of {2}]].',120],['Add the okra and cook uncovered, stirring now and then, until crisp. Add salt only at the end so it stays crisp.',900],['Add {4} and {5} in the last 2 minutes.',120]]});

// Snacks
A({id:'cucumber-chaat',n:'Cucumber chaat',c:'sn',d:'nog',t:5,k:25,p:1,nc:4,pr:'veg',tags:'quick',
 i:[['cucumber',1,'pc'],['lemon',0.5,'pc'],['chaat-masala',0.5,'tsp'],['chili-powder',0,'pinch']],
 s:[['Slice {0} into sticks or rounds.'],['Sprinkle with the juice of {1}, {2} and a pinch of chili powder.']]});
A({id:'boiled-eggs',n:'Boiled eggs',c:'sn',d:'non',t:12,k:143,p:13,nc:1,pr:'egg',tags:'quick make',fr:7,rh:'Keep peeled or unpeeled in the fridge.',
 i:[['egg',4,'pc'],['chaat-masala',0,'taste'],['black-pepper',0,'taste']],
 s:[['Boil {0} for 10 minutes, then cool in cold water.',600],['Peel and sprinkle with chaat masala or pepper. 2 eggs is one snack.']]});
A({id:'masala-almonds',n:'Masala roasted almonds',c:'sn',d:'nog',t:15,k:75,p:3,nc:1,pr:'veg',sv:8,tags:'make',fr:14,rh:'Store airtight at room temperature.',
 i:[['almonds',100,'g'],['ghee',1,'tsp'],['chili-powder',0.5,'tsp'],['chaat-masala',0.5,'tsp'],['salt',0,'pinch']],
 s:[['Toss {0} with {1}, {2} and a pinch of salt.'],['Roast in a pan on low heat, stirring, until fragrant.',480],['Toss with {3}, cool, and portion into small containers of 10 almonds.']]});
A({id:'spiced-pumpkin-seeds',n:'Spiced pumpkin seeds',c:'sn',d:'nog',t:10,k:95,p:5,nc:1,pr:'veg',sv:6,tags:'make',fr:14,
 i:[['pumpkin-seeds',100,'g'],['olive-oil',1,'tsp'],['chili-powder',0.5,'tsp'],['cumin-powder',0.5,'tsp'],['salt',0,'pinch']],
 s:[['Toss {0} with {1}, {2}, {3} and a pinch of salt.'],['Toast in a dry pan on low heat until they start to pop.',300],['Cool and portion into 2 tbsp servings.']]});
A({id:'edamame-snack',n:'Masala edamame',c:'sn',d:'nog',t:5,k:91,p:9,nc:3,pr:'veg',tags:'quick',
 i:[['edamame',150,'g'],['lemon',0.5,'pc'],['chaat-masala',0.5,'tsp'],['chili-flakes',0,'pinch']],
 s:[['Microwave or boil {0} until hot.',180],['Toss with the juice of {1}, {2} and chili flakes. ½ cup is one serving.']]});
A({id:'guacamole-cucumber',n:'Guacamole with cucumber sticks',c:'sn',d:'veg',both:1,t:10,k:95,p:1,nc:3,pr:'veg',sv:3,tags:'quick',
 i:[['avocado',1,'pc'],['lime',0.5,'pc'],['onion',20,'g','o'],['cumin-powder',0.25,'tsp','n'],['green-chili',1,'pc'],['coriander',5,'g'],['cucumber',1,'pc'],['salt',0,'taste']],
 s:[['Mash {0} with the juice of {1} and salt.'],['Mix in {4}, {5} [[and finely chopped {2}||and {3}]].'],['Serve with {6} cut into sticks. 2 to 3 tbsp is one serving.']]});
A({id:'chia-pudding-cup',n:'Chia pudding cup',c:'sn',d:'nog',t:5,k:105,p:3,nc:2,pr:'veg',tags:'make',fr:4,
 i:[['chia',3,'tbsp'],['almond-milk',240,'ml'],['cinnamon',0.25,'tsp']],
 s:[['Stir {0} and {2} into {1}. Stir again after 5 minutes.'],['Divide into 2 small cups and refrigerate at least 2 hours.']]});
A({id:'masala-tofu-cubes',n:'Masala tofu cubes',c:'sn',d:'nog',t:20,k:150,p:14,nc:2,pr:'tofu',tags:'make',fr:3,
 i:[['tofu',200,'g'],['olive-oil',1,'tsp'],['chili-powder',0.5,'tsp'],['turmeric',0.25,'tsp'],['chaat-masala',0.5,'tsp'],['salt',0,'pinch']],
 s:[['Press {0} dry and cut into cubes.'],['Toss with {1}, {2}, {3} and salt.'],['Air-fry at 400°F (200°C) or bake until crisp. Sprinkle {4}.',900]]});
A({id:'paneer-cubes',n:'Pepper paneer cubes',c:'sn',d:'nog',t:5,k:100,p:10,nc:2,pr:'paneer',tags:'quick',
 i:[['paneer-lowfat',100,'g'],['black-pepper',0,'taste'],['chili-flakes',0,'pinch'],['salt',0,'pinch']],
 s:[['Cube {0}. Toss with pepper, chili flakes and a pinch of salt. 50 g is one snack.']]});

// Breads and wraps (occasional)
A({id:'keto-roti',n:'Keto roti',c:'br',d:'nog',t:25,k:160,p:5,nc:2,pr:'veg',sv:4,tags:'occ',fr:3,rh:'Warm on a tawa for 20 seconds per side.',
 i:[['almond-flour',100,'g'],['psyllium',2,'tbsp'],['water',120,'ml','','warm water'],['ghee',1,'tsp'],['salt',0,'pinch']],
 s:[['Mix {0}, {1} and a pinch of salt. Add {2} and knead into a soft dough. Rest 5 minutes.',300],['Divide into 4 balls and roll each between two sheets of parchment.'],['Cook on a hot tawa about 1 minute per side, brushing lightly with {3}.',240]],
 tip:'Occasional, about 1 to 2 times a week. 1 roti is one serving.'});
A({id:'mug-bread',n:'90-second mug bread',c:'br',d:'non',t:3,k:310,p:12,nc:3,pr:'egg',sv:1,tags:'occ quick',
 i:[['almond-flour',3,'tbsp'],['egg',1,'pc'],['butter',1,'tbsp'],['baking-powder',0.5,'tsp'],['salt',0,'pinch']],
 s:[['Melt {2} in a mug. Add {0}, {1}, {3} and salt, and mix well.'],['Microwave 90 seconds. Cool, slice in half, and toast if you like.',90]],
 tip:'Occasional. High in calories, so a once-in-a-while sandwich.'});
A({id:'cloud-bread',n:'Cloud bread',c:'br',d:'non',t:35,k:140,p:7,nc:1,pr:'egg',sv:3,tags:'occ make',fr:3,
 i:[['egg',3,'pc'],['cream-cheese',60,'g'],['baking-powder',0.25,'tsp']],
 s:[['Separate {0}. Whisk the whites with {2} until stiff.'],['Mix the yolks with {1} until smooth, then gently fold into the whites.'],['Spoon 6 rounds onto a lined tray and bake at 300°F (150°C) until golden.',1800]],
 tip:'Lighter than other keto breads. 2 pieces is one serving.'});
A({id:'egg-wraps',n:'Egg wraps',c:'br',d:'non',t:10,k:160,p:13,nc:1,pr:'egg',tags:'occ quick',
 i:[['egg',4,'pc'],['water',2,'tbsp'],['butter',1,'tsp'],['salt',0,'pinch']],
 s:[['Whisk {0} with {1} and salt.'],['Brush a nonstick pan with {2}, pour in a thin layer, swirl, and cook until set. Flip briefly.',90],['Repeat to make 4 thin wraps. Fill with keema, tikka or salad.']]});
A({id:'lettuce-wraps',n:'Lettuce wraps',c:'br',d:'nog',t:5,k:25,p:2,nc:2,pr:'veg',tags:'quick',
 i:[['lettuce',1,'pc']],
 s:[['Separate the leaves of {0}, wash and pat dry.'],['Use as wraps for keema, tikka, egg salad or burger patties.']],
 tip:'The lightest bread swap, fine any day.'});

// Drinks
A({id:'keto-chai',n:'Keto masala chai',c:'dr',d:'nog',t:8,k:15,p:1,nc:1,pr:'veg',tags:'quick',
 i:[['tea',2,'tsp'],['water',300,'ml'],['almond-milk',200,'ml'],['ginger',1,'tsp'],['cardamom',2,'pc']],
 s:[['Boil {1} with {3} and crushed {4}.',120],['Add {0} and simmer, then add {2} and bring to a boil. No sugar.',120],['Strain into 2 cups.']]});
A({id:'ginger-lemon-tea',n:'Ginger lemon tea',c:'dr',d:'nog',t:8,k:5,p:0,nc:1,pr:'veg',tags:'quick',
 i:[['ginger',1,'tbsp'],['water',500,'ml'],['lemon',0.5,'pc'],['cinnamon',0.25,'tsp']],
 s:[['Simmer sliced {0} and {3} in {1}.',360],['Strain and add the juice of {2}.']]});

window.SA_RECIPES = R;
})();
