/* S&A Kitchen built-in recipes (version 2: complete plates, detailed method)
   c: b breakfast, m mains, ss soups and salads, sd sides, sn snacks, br breads and wraps, dr drinks
   d: veg, nog (veg, no onion and garlic), non (non-veg). both: also has a no onion and garlic version.
   sv: servings the ingredients make (one serving = a 1x portion). t: minutes.
   Nutrition is calculated from the ingredients (foods.js), so there are no hand-typed numbers here.
   pr: main protein. tags: quick, make, lunch, freeze, week, heavy, occ, full, add, thaw.
   bf: best time (B breakfast, L lunch, D dinner, S snack) and bw: why. Optional; sensible defaults apply.
   fr: days in the fridge. rh: reheating. i: [foodKey, amount, unit, flag, label]
   flag o = only in the regular version, n = only in the no onion and garlic version.
   Steps: {3} shows ingredient 3 with its scaled amount. [[regular||no onion and garlic]] switches text.
   A number after a step is its timer in seconds. */
(function(){
var R = [];
function A(o){ o.sv = o.sv || 2; o.tags = o.tags || ''; R.push(o); }
var SALT = ['salt',0,'taste'], PEP = ['black-pepper',0,'taste'];

/* ===================== Breakfast ===================== */
A({id:'masala-omelette',n:'Masala omelette with avocado',c:'b',d:'non',t:12,pr:'egg',tags:'quick',
 i:[['egg',6,'pc'],['onion',30,'g'],['tomato',40,'g'],['green-chili',1,'pc'],['coriander',6,'g'],['turmeric',0.25,'tsp'],['chili-powder',0.25,'tsp'],['black-pepper',0.25,'tsp'],['ghee',2,'tsp'],['avocado',1,'pc'],SALT],
 s:[['Finely chop {1}, {2}, {3} and {4}.'],
    ['Whisk {0} with {5}, {6}, {7} and a good pinch of salt until frothy, then stir in the chopped vegetables.'],
    ['Heat half of {8} in a nonstick pan over medium heat until it shimmers. Pour in half the egg mix and tilt the pan to spread it evenly.'],
    ['Cook without stirring until the edges are set and the top is almost firm. Fold in half and cook 30 seconds more.',150],
    ['Repeat with the rest of the ghee and egg mix. Serve each omelette with half of {9}, sliced and sprinkled with salt.']],
 tip:'Medium heat keeps the eggs tender; high heat makes them rubbery and brown.'});

A({id:'scrambled-eggs-cheese',n:'Creamy scrambled eggs with spinach',c:'b',d:'non',t:10,pr:'egg',tags:'quick',
 i:[['egg',6,'pc'],['heavy-cream',2,'tbsp'],['cheddar',50,'g'],['spinach',80,'g'],['butter',2,'tsp'],PEP,SALT],
 s:[['Whisk {0} with {1}, a pinch of salt and pepper.'],
    ['Melt {4} in a nonstick pan over medium-low heat. Add {3} and stir until just wilted.',60],
    ['Pour in the eggs. Every few seconds, slowly push the eggs from the edges to the middle with a spatula, making large soft curds.',150],
    ['Take the pan off the heat while the eggs still look slightly wet. Fold in grated {2}; the heat finishes cooking them.']],
 tip:'Low heat and patience give creamy eggs. They keep cooking after you take them off the heat.'});

A({id:'fried-eggs-avocado',n:'Fried eggs, avocado and garlicky spinach',c:'b',d:'non',t:10,pr:'egg',tags:'quick',
 i:[['egg',6,'pc'],['avocado',1,'pc'],['spinach',150,'g'],['garlic',1,'pc'],['olive-oil',3,'tsp'],['chili-flakes',0.25,'tsp'],PEP,SALT],
 s:[['Heat 1 tsp of the oil in a pan over medium heat. Add sliced {3} for 20 seconds, then {2} and a pinch of salt. Toss until wilted, then divide between two plates.',90],
    ['Add the rest of {4} to the pan. Crack in {0}, season with salt and pepper, and cover with a lid.'],
    ['Cook until the whites are set but the yolks are still runny, or longer if you prefer.',180],
    ['Slice {1} and serve alongside, sprinkled with {5} and salt.']]});

A({id:'egg-muffins',n:'Egg muffins',c:'b',d:'non',t:30,pr:'egg',sv:4,tags:'make lunch',fr:4,rh:'Microwave 30 to 40 seconds, or eat cold.',
 i:[['egg',12,'pc'],['spinach',60,'g'],['bell-pepper',1,'pc'],['onion',40,'g'],['mushrooms',80,'g'],['cheddar',80,'g'],['olive-oil',1,'tsp'],['salt',0.5,'tsp'],['black-pepper',0.25,'tsp']],
 s:[['Heat the oven to 375°F (190°C). Brush a 12-cup muffin tray with {6}, or use silicone or paper liners.'],
    ['Finely chop {1}, {2}, {3} and {4}, and divide them between the cups.'],
    ['Whisk {0} with {7} and {8}. Pour over the vegetables until each cup is about three-quarters full, then top with grated {5}.'],
    ['Bake until puffed and set in the center: a knife pushed in should come out clean.',1200],
    ['Cool 5 minutes, then loosen with a knife. Store in a container in the fridge. 3 muffins is one serving.']],
 tip:'Pat the vegetables dry after chopping, or the muffins turn watery.'});

A({id:'sheet-pan-frittata',n:'Sheet-pan frittata',c:'b',d:'non',t:35,pr:'egg',sv:4,tags:'make lunch',fr:4,rh:'Microwave 40 seconds, or eat cold.',
 i:[['egg',10,'pc'],['heavy-cream',4,'tbsp'],['mushrooms',150,'g'],['zucchini',1,'pc'],['onion',50,'g'],['spinach',60,'g'],['cheddar',80,'g'],['olive-oil',1,'tbsp'],['salt',0.5,'tsp'],['black-pepper',0.25,'tsp']],
 s:[['Heat the oven to 375°F (190°C). Brush a 9×13 inch (23×33 cm) baking dish with half of {7}.'],
    ['Slice {2}, {3} and {4}. Toss with the rest of the oil and a pinch of salt, spread in the dish and roast until they soften and release their water.',600],
    ['Whisk {0} with {1}, {8} and {9}. Scatter {5} over the vegetables, pour in the eggs and sprinkle with grated {6}.'],
    ['Bake until just set in the middle and lightly golden.',1200],
    ['Rest 5 minutes, then cut into 8 squares. 2 squares is one serving.']]});

A({id:'mug-eggs',n:'Microwave mug eggs',c:'b',d:'non',t:3,pr:'egg',sv:1,tags:'quick',
 i:[['egg',3,'pc'],['cheddar',20,'g'],['spinach',20,'g'],['butter',1,'tsp'],SALT,PEP],
 s:[['Rub the inside of a large mug with {3}. Add {0}, chopped {2}, a pinch of salt and pepper, and whisk with a fork.'],
    ['Microwave 45 seconds, stir, then 30 to 45 seconds more until just set. Microwaves vary, so check early.',80],
    ['Top with grated {1} and let it melt for a minute.']]});

A({id:'hemp-flax-porridge',n:'Hemp and flax porridge',c:'b',d:'nog',t:10,pr:'veg',sv:1,tags:'quick',
 i:[['hemp-hearts',3,'tbsp'],['flaxseed',1,'tbsp'],['chia',1,'tbsp'],['coconut',1,'tbsp'],['almond-milk',200,'ml'],['cinnamon',0.25,'tsp'],['walnuts',10,'g'],['salt',0,'pinch']],
 s:[['In a small pot, stir {0}, {1}, {2}, {3}, {5} and a pinch of salt into {4}.'],
    ['Simmer on low heat, stirring often, until thick and creamy. Add a splash more milk if it gets too thick.',240],
    ['Pour into a bowl and top with chopped {6}.']],
 tip:'The keto swap for your oatmeal. Pair with a boiled egg for more protein.'});

A({id:'chia-hemp-jar',n:'Overnight chia and hemp jar',c:'b',d:'nog',t:5,pr:'veg',sv:1,tags:'quick make',fr:4,rh:'Eat cold, straight from the fridge.',
 i:[['chia',2,'tbsp'],['hemp-hearts',2,'tbsp'],['flaxseed',1,'tbsp'],['almond-milk',200,'ml'],['cinnamon',0.25,'tsp'],['walnuts',10,'g']],
 s:[['In a jar, stir {0}, {1}, {2} and {4} into {3}.'],
    ['Wait 5 minutes and stir again, so the chia doesn\u2019t settle into clumps. Close and refrigerate overnight.'],
    ['In the morning, stir and top with chopped {5}.']],
 tip:'Make 3 jars on Sunday. Add 1 or 2 boiled eggs on the side for a fuller breakfast.'});

A({id:'paneer-bhurji',n:'Paneer bhurji',c:'b',d:'veg',both:1,t:15,pr:'paneer',tags:'quick',
 i:[['paneer-lowfat',300,'g'],['onion',60,'g','o'],['hing',0,'pinch','n'],['tomato',80,'g'],['green-chili',1,'pc'],['ginger',1,'tsp'],['turmeric',0.25,'tsp'],['cumin-seeds',0.5,'tsp'],['garam-masala',0.25,'tsp'],['ghee',3,'tsp'],['coriander',6,'g'],SALT],
 s:[['Crumble {0} with your fingers into small pieces. Finely chop {3} and {4}[[ and {1}|| ]].'],
    ['Heat {9} in a pan over medium heat. Add {7} and let them sizzle. [[Add {1} and cook until soft and light golden.||Add a pinch of {2}.]]',180],
    ['Add grated {5}, the green chili and tomato. Cook until the tomato softens, then add {6} and salt.',180],
    ['Add the paneer and toss gently for 2 minutes, just until heated through. Overcooking makes paneer rubbery.',120],
    ['Finish with {8} and chopped {10}.']]});

A({id:'tofu-bhurji',n:'Tofu bhurji',c:'b',d:'nog',t:15,pr:'tofu',tags:'quick',
 i:[['tofu',400,'g'],['tomato',80,'g'],['spinach',80,'g'],['ginger',1,'tsp'],['green-chili',1,'pc'],['hing',0,'pinch'],['turmeric',0.5,'tsp'],['cumin-seeds',0.5,'tsp'],['olive-oil',3,'tsp'],['coriander',6,'g'],SALT],
 s:[['Wrap {0} in a clean towel and press for 5 minutes to remove water, then crumble it.'],
    ['Heat {8} in a pan over medium heat. Add {7} and {5}, then grated {3} and chopped {4}. Cook 30 seconds.',30],
    ['Add chopped {1} and cook until soft.',120],
    ['Add the tofu, {6} and salt. Cook, stirring, until it looks like scrambled eggs and any water has evaporated.',240],
    ['Fold in {2} until wilted, and finish with {9}.']]});

A({id:'cauliflower-upma',n:'Cauliflower upma with paneer',c:'b',d:'veg',both:1,t:18,pr:'paneer',tags:'',
 i:[['cauliflower-rice',300,'g'],['paneer-lowfat',150,'g'],['peanuts',30,'g'],['mustard-seeds',0.5,'tsp'],['curry-leaves',1,'pc'],['green-chili',1,'pc'],['ginger',1,'tsp'],['onion',40,'g','o'],['hing',0,'pinch','n'],['ghee',3,'tsp'],['lemon',0.5,'pc'],['coriander',6,'g'],SALT],
 s:[['Cut {1} into small cubes.'],
    ['Heat {9} in a wide pan over medium heat. Add {3}; when they pop, add {4}, {2}, chopped {5} and grated {6}. Stir until the peanuts are golden.',90],
    ['[[Add chopped {7} and cook until soft.||Add a pinch of {8}.]]',120],
    ['Add {0} and salt. Cook on medium-high, stirring, until just tender with a little bite. Don\u2019t let it go mushy.',300],
    ['Fold in the paneer, squeeze over {10} and finish with {11}.']]});

/* ===================== Mains (complete plates) ===================== */
A({id:'chicken-curry',n:'Chicken curry with cauliflower rice',c:'m',d:'non',t:45,pr:'chicken',tags:'make lunch freeze',fr:3,rh:'Reheat on the stove with a splash of water.',
 i:[['chicken-thigh',450,'g'],['onion',70,'g'],['tomato',90,'g'],['ginger',1,'tbsp'],['garlic',4,'pc'],['green-chili',1,'pc'],['turmeric',0.5,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1.5,'tsp'],['garam-masala',0.5,'tsp'],['cumin-seeds',0.5,'tsp'],['ghee',1,'tbsp'],['coriander',10,'g'],['cauliflower-rice',250,'g'],SALT],
 s:[['Pat {0} dry and cut into bite-size pieces. Finely chop {1} and {2}; grate {3} and {4}.'],
    ['Heat {11} in a heavy pot over medium heat. Add {10} and let them sizzle for 30 seconds.'],
    ['Add the onion and cook, stirring often, until deep golden. This step builds most of the flavor, so don\u2019t rush it.',540],
    ['Add the ginger, garlic and slit {5}, and cook 1 minute until fragrant.',60],
    ['Add the tomato, {6}, {7}, {8} and salt. Cook until the tomato breaks down and oil shows at the edges. Add a splash of water if it sticks.',300],
    ['Add the chicken and stir to coat. Cook 3 minutes, then add ½ cup water, cover and simmer on low until tender.',1020],
    ['Stir in {9} and chopped {12}.'],
    ['Meanwhile, cook {13} in a dry pan over medium-high heat with a pinch of salt until just tender, then serve with the curry.',300]],
 tip:'Thighs stay juicy. If you use breast, simmer only 10 minutes.'});

A({id:'egg-curry',n:'Egg curry with cauliflower rice',c:'m',d:'non',t:35,pr:'egg',tags:'make lunch',fr:2,rh:'Reheat gently on the stove.',
 i:[['egg',6,'pc'],['onion',60,'g'],['tomato',90,'g'],['coconut-milk',120,'ml'],['ginger',1,'tsp'],['garlic',3,'pc'],['green-chili',1,'pc'],['turmeric',0.25,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['curry-leaves',1,'pc'],['coconut-oil',1,'tbsp'],['cauliflower-rice',250,'g'],SALT],
 s:[['Lower {0} into boiling water and cook 10 minutes. Move to cold water, peel, and make 2 or 3 shallow slits in each.',600],
    ['Heat {12} in a pan over medium heat. Add {11} and chopped {1}, and cook until golden.',420],
    ['Add grated {4} and {5} and slit {6}. Cook 1 minute, then add chopped {2}, {7}, {8}, {9} and salt. Cook until thick and the oil separates.',300],
    ['Pour in {3} with ¼ cup water, add the eggs and simmer gently.',300],
    ['Finish with {10}. Cook {13} in a dry pan with a pinch of salt until just tender, and serve together.',300]]});

A({id:'tilapia-curry',n:'Coconut tilapia curry with cauliflower rice',c:'m',d:'non',t:35,pr:'fish',tags:'make thaw',fr:2,rh:'Reheat gently on the stove.',
 i:[['tilapia',500,'g'],['coconut-milk',200,'ml'],['onion',50,'g'],['tomato',80,'g'],['ginger',1,'tsp'],['garlic',3,'pc'],['green-chili',2,'pc'],['turmeric',0.5,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['mustard-seeds',0.5,'tsp'],['curry-leaves',1,'pc'],['coconut-oil',1,'tbsp'],['lemon',0.5,'pc'],['cauliflower-rice',250,'g'],SALT],
 s:[['Pat {0} dry, cut into large pieces and rub with half of {7} and a pinch of salt.'],
    ['Heat {12} in a wide pan over medium heat. Add {10}; when they pop, add {11} and sliced {2}. Cook until soft.',240],
    ['Add grated {4} and {5}, slit {6} and chopped {3}, then the rest of the turmeric, {8}, {9} and salt. Cook until soft.',240],
    ['Pour in {1} with ½ cup water and bring to a gentle simmer. Don\u2019t boil hard, or the coconut milk can split.',180],
    ['Slide in the fish in one layer and simmer without stirring until it turns opaque and flakes easily, 145°F (63°C) inside. Shake the pan instead of stirring so the fish stays whole.',480],
    ['Squeeze over {13}. Cook {14} in a dry pan with a pinch of salt and serve together.',300]]});

A({id:'chicken-keema',n:'Chicken keema lettuce cups',c:'m',d:'non',t:30,pr:'chicken',tags:'make lunch freeze',fr:3,rh:'Reheat on the stove or in the microwave. Keep the lettuce separate.',
 i:[['chicken-mince',500,'g'],['onion',60,'g'],['tomato',80,'g'],['ginger',1,'tsp'],['garlic',3,'pc'],['green-chili',1,'pc'],['turmeric',0.25,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['ghee',1,'tbsp'],['coriander',10,'g'],['lettuce',1,'pc'],['lemon',0.5,'pc'],SALT],
 s:[['Heat {10} in a pan over medium heat and cook chopped {1} until golden.',300],
    ['Add grated {3} and {4} and chopped {5}, then chopped {2} with {6}, {7}, {8} and salt. Cook until soft and jammy.',240],
    ['Turn the heat to medium-high, add {0} and break it up with a spoon. Cook until no pink remains and the liquid has cooked off.',600],
    ['Stir in {9}, chopped {11} and a squeeze of {13}.'],
    ['Separate the leaves of {12} and spoon the keema into them.']]});

A({id:'palak-paneer',n:'Palak paneer with cauliflower rice',c:'m',d:'veg',both:1,t:35,pr:'paneer',tags:'make lunch',fr:3,rh:'Reheat on the stove with a splash of water. To freeze, freeze the gravy without paneer for up to 1 month.',
 i:[['spinach',400,'g'],['paneer-lowfat',250,'g'],['onion',40,'g','o'],['garlic',3,'pc','o'],['hing',0,'pinch','n'],['ginger',1,'tbsp'],['green-chili',1,'pc'],['tomato',60,'g'],['ghee',3,'tsp'],['cumin-seeds',1,'tsp'],['turmeric',0.25,'tsp'],['garam-masala',0.5,'tsp'],['kasuri-methi',1,'tsp'],['heavy-cream',2,'tbsp'],['cauliflower-rice',250,'g'],SALT],
 s:[['Bring a large pot of water to a boil. Add {0}, cook 2 minutes, then move it straight into ice-cold water. This keeps it bright green.',120],
    ['Squeeze the spinach lightly and blend with {6} and 2 tbsp water until smooth.'],
    ['Heat {8} in a pan over medium heat and add {9}. [[Add chopped {2} and {3} and cook until soft.||Add a pinch of {4}.]]',240],
    ['Add grated {5}, chopped {7} and {10}. Cook until the tomato softens.',180],
    ['Pour in the spinach purée with salt and simmer on low heat. Too long and the color dulls.',300],
    ['Add cubed {1}, crushed {12} and {11}. Simmer 3 minutes, turn off the heat and stir in {13}.',180],
    ['Cook {14} in a dry pan with a pinch of salt and serve together.',300]],
 tip:'For fewer calories, swap the cream for 2 tbsp Greek yogurt, stirred in off the heat so it doesn\u2019t split.'});

A({id:'grilled-chicken-veg',n:'Herb-roasted chicken and vegetables',c:'m',d:'non',t:40,pr:'chicken',tags:'make lunch',fr:3,rh:'Microwave 1 minute, or eat cold.',
 i:[['chicken-breast',450,'g'],['broccoli',250,'g'],['zucchini',1,'pc'],['bell-pepper',1,'pc'],['olive-oil',2,'tbsp'],['lemon',1,'pc'],['garlic',2,'pc'],['paprika',1,'tsp'],['oregano',0.5,'tsp'],['black-pepper',0.25,'tsp'],['salt',0.75,'tsp']],
 s:[['Heat the oven to 425°F (220°C). If {0} is thicker than 2 cm, slice it in half horizontally so it cooks evenly. Pat dry.'],
    ['Mix half of {4} with the juice of half of {5}, grated {6}, {7}, {8}, {9} and half of {10}. Rub over the chicken.'],
    ['Cut {1}, {2} and {3} into even pieces, toss with the rest of the oil and salt, and spread on a large tray in one layer.'],
    ['Roast the vegetables first.',600],
    ['Push them aside, add the chicken to the tray and roast until it reaches 165°F (74°C) inside, or the juices run clear.',1080],
    ['Rest the chicken 5 minutes, then slice. Squeeze over the remaining lemon.',300]],
 tip:'Don\u2019t crowd the tray: crowded vegetables steam instead of browning. Use two trays if needed.'});

A({id:'chicken-tikka',n:'Chicken tikka with kachumber',c:'m',d:'non',t:35,pr:'chicken',tags:'make lunch',fr:3,rh:'Microwave 1 minute, or eat cold in a salad.',
 i:[['chicken-breast',450,'g'],['greek-yogurt',80,'g'],['ginger',1,'tbsp'],['garlic',3,'pc'],['chili-powder',1,'tsp'],['garam-masala',1,'tsp'],['cumin-powder',0.5,'tsp'],['lemon',1,'pc'],['mustard-oil',1,'tbsp'],['cucumber',0.5,'pc'],['tomato',0.5,'pc'],['onion',30,'g'],['chaat-masala',0.5,'tsp'],['salt',0.75,'tsp']],
 s:[['Cut {0} into 4 cm cubes and pat dry.'],
    ['Mix {1}, grated {2} and {3}, {4}, {5}, {6}, the juice of half of {7}, half of {8} and the salt. Coat the chicken and marinate at least 30 minutes, or up to overnight in the fridge.'],
    ['Heat the oven to 450°F (230°C) or an air fryer to 400°F (200°C). Thread the chicken on skewers or spread on a lined tray, and brush with the rest of the oil.'],
    ['Cook, turning once, until charred at the edges and 165°F (74°C) inside.',900],
    ['For the kachumber, dice {9}, {10} and {11}, and toss with {12} and the rest of the lemon juice. Serve together.']],
 tip:'Mustard oil gives the classic dhaba flavor. Heat it until it just smokes and cool it first for a milder taste.'});

A({id:'paneer-tikka',n:'Paneer tikka with cucumber salad',c:'m',d:'veg',both:1,t:35,pr:'paneer',tags:'make',fr:2,rh:'Air-fry 3 minutes to crisp up again.',
 i:[['paneer-lowfat',300,'g'],['greek-yogurt',60,'g'],['bell-pepper',1,'pc'],['onion',60,'g','o'],['ginger',1,'tsp'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['kasuri-methi',1,'tsp'],['lemon',1,'pc'],['mustard-oil',3,'tsp'],['cucumber',0.5,'pc'],['chaat-masala',0.5,'tsp'],SALT],
 s:[['Cut {0} and {2}[[ and {3}|| ]] into 3 cm chunks.'],
    ['Mix {1}, grated {4}, [[{5}||a pinch of {6}]], {7}, {8}, crushed {9}, the juice of half of {10}, {11} and salt. Gently coat everything and marinate 20 minutes.',1200],
    ['Thread on skewers or spread on a lined tray. Bake at 450°F (230°C) or air-fry at 400°F (200°C) until charred at the edges.',720],
    ['Slice {12}, sprinkle with {13} and the rest of the lemon juice, and serve alongside.']],
 tip:'Thick yogurt clings better. If it\u2019s runny, strain it in a sieve for 10 minutes first.'});

A({id:'tofu-tikka',n:'Tofu tikka with cucumber salad',c:'m',d:'nog',t:35,pr:'tofu',tags:'make',fr:3,rh:'Air-fry 3 minutes to crisp up again.',
 i:[['tofu',450,'g'],['greek-yogurt',60,'g'],['bell-pepper',1,'pc'],['ginger',1,'tsp'],['hing',0,'pinch'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['kasuri-methi',1,'tsp'],['lemon',1,'pc'],['olive-oil',3,'tsp'],['cucumber',0.5,'pc'],['chaat-masala',0.5,'tsp'],SALT],
 s:[['Press {0} wrapped in a towel under something heavy for 15 minutes, then cut into cubes. Pressing helps the marinade soak in.',900],
    ['Mix {1}, grated {3}, {4}, {5}, {6}, crushed {7}, the juice of half of {8}, {9} and salt. Coat the tofu and chunks of {2}, and marinate 20 minutes.',1200],
    ['Bake at 450°F (230°C) or air-fry at 400°F (200°C) until golden at the edges.',900],
    ['Slice {10}, sprinkle with {11} and the rest of the lemon juice, and serve alongside.']]});

A({id:'baked-salmon',n:'Lemon butter salmon with spinach',c:'m',d:'non',t:25,pr:'fish',tags:'thaw',fr:2,rh:'Eat cold in a salad, or warm gently so it doesn\u2019t dry out.',
 i:[['salmon',2,'pc'],['butter',1,'tbsp'],['lemon',1,'pc'],['garlic',2,'pc'],['spinach',250,'g'],['olive-oil',1,'tsp'],PEP,SALT],
 s:[['Heat the oven to 400°F (200°C). Pat {0} dry, place skin-side down on a lined tray and season with salt and pepper.'],
    ['Melt {1} with grated {3} and the juice of half of {2}. Spoon over the salmon.'],
    ['Bake until it flakes easily and is just opaque in the center, 145°F (63°C).',720],
    ['Meanwhile, heat {5} in a pan and toss {4} with a pinch of salt just until wilted.',120],
    ['Serve the salmon on the spinach with the remaining lemon in wedges.']],
 tip:'Salmon keeps cooking as it rests, so take it out when the center is still slightly glossy.'});

A({id:'lemon-garlic-tilapia',n:'Lemon garlic tilapia with green beans',c:'m',d:'non',t:20,pr:'fish',tags:'week thaw',fr:2,rh:'Warm gently, or flake into a salad.',
 i:[['tilapia',500,'g'],['butter',1.5,'tbsp'],['olive-oil',2,'tsp'],['lemon',1,'pc'],['garlic',3,'pc'],['paprika',0.5,'tsp'],['green-beans',300,'g'],PEP,SALT],
 s:[['Trim {6} and steam or boil until bright green and just tender, then drain.',300],
    ['Pat {0} very dry and season both sides with {5}, salt and pepper. Dry fish browns; wet fish steams.'],
    ['Heat {2} in a large nonstick pan over medium-high heat. Lay in the fish and cook without moving it until golden, then flip.',180],
    ['Cook the second side until the fish flakes easily.',150],
    ['Lower the heat, add {1} and sliced {4}, and spoon the foaming butter over the fish for 30 seconds. Squeeze in the juice of {3}.',30],
    ['Toss the beans in the pan juices and serve together.']]});

A({id:'tilapia-masala-fry',n:'Tilapia masala fry with cabbage',c:'m',d:'non',t:30,pr:'fish',tags:'week thaw',fr:2,rh:'Re-crisp in a pan or air fryer.',
 i:[['tilapia',500,'g'],['turmeric',0.25,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['ginger',1,'tsp'],['garlic',2,'pc'],['lemon',1,'pc'],['mustard-oil',1.5,'tbsp'],['cabbage',300,'g'],['mustard-seeds',0.5,'tsp'],['curry-leaves',1,'pc'],SALT],
 s:[['Mix {1}, {2}, {3}, grated {4} and {5}, the juice of half of {6} and salt into a thick paste.'],
    ['Pat {0} dry, coat with the paste and rest 10 minutes. No rava or besan coating, so it stays keto.',600],
    ['Heat 1 tbsp of {7} in a nonstick pan over medium-high heat. Fry the fish until crisp, then flip carefully with a wide spatula.',240],
    ['Cook the second side until the fish flakes easily, 145°F (63°C).',180],
    ['In another pan, heat the rest of the oil, add {9} and {10}, then finely shredded {8} and salt. Stir-fry until just tender.',300],
    ['Serve with lemon wedges.']]});

A({id:'tandoori-fish',n:'Tandoori fish with kachumber',c:'m',d:'non',t:35,pr:'fish',tags:'thaw',fr:2,rh:'Air-fry 3 minutes.',
 i:[['tilapia',500,'g'],['greek-yogurt',80,'g'],['ginger',1,'tsp'],['garlic',2,'pc'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['turmeric',0.25,'tsp'],['lemon',1,'pc'],['mustard-oil',3,'tsp'],['cucumber',0.5,'pc'],['tomato',0.5,'pc'],['onion',30,'g'],['chaat-masala',0.5,'tsp'],SALT],
 s:[['Pat {0} dry. Mix {1}, grated {2} and {3}, {4}, {5}, {6}, the juice of half of {7}, {8} and salt.'],
    ['Coat the fish and marinate 20 minutes. Fish is delicate, so don\u2019t marinate it longer than an hour.',1200],
    ['Bake on a lined tray at 450°F (230°C), or air-fry at 400°F (200°C), until charred at the edges and flaking.',600],
    ['Dice {9}, {10} and {11}, and toss with {12} and the rest of the lemon juice. Serve together.']],
 tip:'Works with salmon too: add 2 minutes to the cooking time.'});

A({id:'garlic-butter-shrimp',n:'Garlic butter shrimp with zucchini noodles',c:'m',d:'non',t:20,pr:'fish',tags:'week thaw',fr:2,
 i:[['shrimp',450,'g'],['butter',2,'tbsp'],['olive-oil',1,'tsp'],['garlic',5,'pc'],['chili-flakes',0.25,'tsp'],['lemon',0.5,'pc'],['zucchini',3,'pc'],['parmesan',20,'g'],['coriander',5,'g'],SALT],
 s:[['Spiralize {6} into noodles, or use a peeler for ribbons. Toss with a pinch of salt in a colander and leave 10 minutes, then pat dry. This stops them going watery.',600],
    ['Pat {0} dry. Heat {2} and half of {1} in a large pan over medium-high heat.'],
    ['Add the shrimp in one layer and cook 1 to 2 minutes per side until pink and curled into a C. An O shape means overcooked.',180],
    ['Lower the heat, add the rest of the butter, sliced {3} and {4}. Cook 30 seconds, then take the shrimp out.',30],
    ['Toss the zucchini noodles in the garlic butter just until warm.',90],
    ['Return the shrimp, add the juice of {5}, grated {7} and {8}.']]});

A({id:'prawn-masala',n:'Prawn masala with cauliflower rice',c:'m',d:'non',t:30,pr:'fish',tags:'thaw',fr:2,rh:'Reheat gently on the stove.',
 i:[['shrimp',450,'g'],['onion',60,'g'],['tomato',90,'g'],['coconut-milk',60,'ml'],['ginger',1,'tsp'],['garlic',3,'pc'],['green-chili',1,'pc'],['turmeric',0.25,'tsp'],['chili-powder',1,'tsp'],['coriander-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['coconut-oil',1,'tbsp'],['curry-leaves',1,'pc'],['coriander',10,'g'],['cauliflower-rice',250,'g'],SALT],
 s:[['Toss {0} with a pinch of {7} and salt.'],
    ['Heat {11} over medium heat. Add {12} and chopped {1}, and cook until golden.',300],
    ['Add grated {4} and {5} and slit {6}, then chopped {2} with the rest of the turmeric, {8}, {9} and salt. Cook until thick and the oil separates.',300],
    ['Stir in {3} and bring to a simmer.',60],
    ['Add the prawns and cook just until pink and curled, stirring once.',240],
    ['Finish with {10} and {13}. Cook {14} in a dry pan with a pinch of salt and serve together.',300]]});

A({id:'lemon-pepper-chicken',n:'Lemon pepper chicken with broccoli',c:'m',d:'non',t:25,pr:'chicken',tags:'week lunch',fr:3,rh:'Microwave 1 minute.',
 i:[['chicken-breast',450,'g'],['butter',1,'tbsp'],['olive-oil',2,'tsp'],['lemon',1,'pc'],['black-pepper',1,'tsp'],['garlic',2,'pc'],['broccoli',300,'g'],['parmesan',20,'g'],['salt',0.75,'tsp']],
 s:[['Slice {0} horizontally into thin cutlets and pat dry. Season with {4}, the zest of {3} and {8}.'],
    ['Heat {2} in a large pan over medium-high heat and cook the chicken without moving it until golden.',240],
    ['Flip and cook until 165°F (74°C) inside.',180],
    ['Lower the heat, add {1}, grated {5} and the juice of the lemon, and spoon it over the chicken.',60],
    ['Steam {6} until bright green and just tender, then toss with grated {7}.',300]]});

A({id:'baked-drumsticks',n:'Masala drumsticks with roasted cauliflower',c:'m',d:'non',t:50,pr:'chicken',tags:'make lunch',fr:3,rh:'Oven or air fryer for 5 minutes.',
 i:[['drumsticks',4,'pc'],['greek-yogurt',2,'tbsp'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['turmeric',0.25,'tsp'],['ginger',1,'tsp'],['garlic',2,'pc'],['lemon',0.5,'pc'],['olive-oil',3,'tsp'],['cauliflower',300,'g'],['cumin-seeds',0.5,'tsp'],['salt',0.75,'tsp']],
 s:[['Make 2 or 3 deep cuts in each of {0} so the marinade gets in and they cook evenly.'],
    ['Mix {1}, {2}, {3}, {4}, grated {5} and {6}, the juice of {7}, 1 tsp of {8} and most of {11}. Coat the chicken and marinate at least 20 minutes.',1200],
    ['Heat the oven to 425°F (220°C). Toss {9} florets with the rest of the oil, {10} and a pinch of salt.'],
    ['Roast the chicken and cauliflower on a lined tray, turning once, until the chicken is 165°F (74°C) near the bone.',2100]],
 tip:'Each serving is 2 drumsticks.'});

A({id:'paneer-stir-fry',n:'Paneer and vegetable stir-fry',c:'m',d:'veg',both:1,t:20,pr:'paneer',tags:'week',
 i:[['paneer-lowfat',300,'g'],['bell-pepper',1.5,'pc'],['broccoli',200,'g'],['onion',60,'g','o'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['ginger',1,'tsp'],['soy-sauce',1,'tbsp'],['chili-flakes',0.25,'tsp'],['olive-oil',1,'tbsp']],
 s:[['Cube {0}. Slice {1}[[ and {3}|| ]] and cut {2} into small florets.'],
    ['Heat half of {9} in a wok or large pan over high heat. Sear the paneer until golden on two sides, then take it out.',180],
    ['Add the rest of the oil. [[Add sliced {4} and grated {6}.||Add grated {6} and a pinch of {5}.]] Stir 20 seconds.',20],
    ['Add the vegetables and stir-fry until crisp-tender and slightly charred.',240],
    ['Return the paneer, add {7} and {8}, and toss 1 minute. Soy sauce is salty, so taste before adding any salt.',60]]});

A({id:'mutton-curry',n:'Mutton curry with cauliflower rice',c:'m',d:'non',t:80,pr:'mutton',tags:'make freeze heavy',bf:'L',bw:'Rich dish, easier to digest earlier in the day.',fr:3,rh:'Reheat on the stove. It tastes even better the next day.',
 i:[['mutton',500,'g'],['onion',80,'g'],['tomato',90,'g'],['ginger',1,'tbsp'],['garlic',5,'pc'],['green-chili',1,'pc'],['turmeric',0.5,'tsp'],['chili-powder',1.5,'tsp'],['coriander-powder',1.5,'tsp'],['garam-masala',1,'tsp'],['ghee',1,'tbsp'],['coriander',10,'g'],['cauliflower-rice',250,'g'],SALT],
 s:[['Heat {10} in a pressure cooker or heavy pot over medium heat. Brown sliced {1} well, to a deep golden.',480],
    ['Add grated {3} and {4} and slit {5}, then chopped {2} with {6}, {7}, {8} and salt. Cook until the oil separates.',300],
    ['Add {0} and sear on high heat, stirring, until it changes color all over.',300],
    ['Add 1½ cups water. Pressure cook 6 to 7 whistles (about 25 minutes), or simmer covered for 60 to 75 minutes until very tender.',1500],
    ['Stir in {9} and {11}. Cook {12} in a dry pan with a pinch of salt and serve together.',300]],
 tip:'Richer than other curries, so once a week, ideally at lunch.'});

A({id:'kadai-paneer',n:'Kadai paneer with cauliflower rice',c:'m',d:'veg',both:1,t:30,pr:'paneer',tags:'make',fr:3,rh:'Reheat on the stove.',
 i:[['paneer-lowfat',300,'g'],['bell-pepper',1.5,'pc'],['onion',60,'g','o'],['tomato',100,'g'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['ginger',1,'tsp'],['coriander-powder',1,'tsp'],['chili-powder',1,'tsp'],['garam-masala',0.5,'tsp'],['kasuri-methi',1,'tsp'],['ghee',3,'tsp'],['cauliflower-rice',250,'g'],SALT],
 s:[['Cut {0} and {1} into 3 cm chunks.[[ Cut {2} the same size.|| ]] Purée or finely chop {3}.'],
    ['Heat {11} over medium heat. [[Add grated {4} and {6}, then the onion.||Add a pinch of {5} and grated {6}.]] Cook until fragrant.',120],
    ['Add the tomato, {7}, {8} and salt. Cook into a thick masala until the oil separates.',360],
    ['Add the peppers and cook on high heat until just tender with some char.',180],
    ['Add the paneer, {9} and crushed {10}. Toss 2 minutes. Cook {12} in a dry pan and serve together.',120]]});

A({id:'veg-kurma',n:'Vegetable kurma with paneer',c:'m',d:'veg',both:1,t:35,pr:'paneer',tags:'make heavy',bf:'L',bw:'Coconut-rich, so lighter on the stomach at lunch.',fr:3,rh:'Reheat on the stove.',
 i:[['cauliflower',250,'g'],['green-beans',150,'g'],['bell-pepper',1,'pc'],['paneer-lowfat',250,'g'],['coconut-milk',150,'ml'],['onion',50,'g','o'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['ginger',1,'tsp'],['green-chili',1,'pc'],['turmeric',0.25,'tsp'],['garam-masala',0.5,'tsp'],['coconut-oil',1,'tbsp'],SALT],
 s:[['Cut {0} into florets, {1} into 3 cm pieces, and {2} and {3} into cubes.'],
    ['Heat {12} over medium heat. [[Add chopped {5} and {6} and cook until soft.||Add a pinch of {7}.]] Add grated {8} and slit {9}.',180],
    ['Add the vegetables, {10}, salt and ½ cup water. Cover and cook until just tender.',600],
    ['Stir in {4}, the paneer and {11}. Simmer gently, without boiling hard.',180]]});

A({id:'chicken-stir-fry',n:'Chicken stir-fry with cauliflower rice',c:'m',d:'non',t:25,pr:'chicken',tags:'week lunch',fr:3,rh:'Microwave 1 minute.',
 i:[['chicken-breast',450,'g'],['broccoli',200,'g'],['bell-pepper',1,'pc'],['mushrooms',150,'g'],['soy-sauce',1.5,'tbsp'],['ginger',1,'tsp'],['garlic',2,'pc'],['chili-flakes',0.25,'tsp'],['olive-oil',1.5,'tbsp'],['cauliflower-rice',250,'g']],
 s:[['Slice {0} thinly against the grain and pat dry. Cut {1}, {2} and {3} into bite-size pieces.'],
    ['Heat 1 tbsp of {8} in a wok or large pan over high heat until it shimmers. Stir-fry the chicken in one layer until cooked through, then take it out.',300],
    ['Add the rest of the oil, grated {5} and {6}, then the vegetables. Stir-fry until crisp-tender.',240],
    ['Return the chicken, add {4} and {7}, and toss. Taste before adding salt.',60],
    ['Cook {9} in a dry pan and serve together.',300]]});

/* ===================== Soups and salads ===================== */
A({id:'chicken-pepper-soup',n:'Chicken pepper soup',c:'ss',d:'non',t:40,pr:'chicken',tags:'full make freeze',fr:3,rh:'Reheat on the stove.',
 i:[['chicken-thigh',400,'g'],['onion',50,'g'],['tomato',60,'g'],['cabbage',100,'g'],['ginger',1,'tsp'],['garlic',3,'pc'],['black-pepper',1.5,'tsp'],['cumin-seeds',0.5,'tsp'],['turmeric',0.25,'tsp'],['curry-leaves',1,'pc'],['ghee',2,'tsp'],['chicken-broth',500,'ml'],['coriander',5,'g'],SALT],
 s:[['Coarsely crush {6} and {7} in a mortar, or pulse briefly in a grinder.'],
    ['Heat {10} in a pot over medium heat. Add {9} and chopped {1}, and cook until soft.',180],
    ['Add grated {4} and {5}, chopped {2}, {8} and half the pepper mix. Cook 2 minutes.',120],
    ['Add {0} cut into pieces, shredded {3}, {11} and 1 cup water. Simmer partly covered until the chicken is tender.',1200],
    ['Add the rest of the pepper, salt to taste and chopped {12}.']],
 tip:'The pepper should be warming, not harsh. Adding the second half at the end gives a fresh kick.'});

A({id:'chicken-zoodle-soup',n:'Chicken zoodle soup',c:'ss',d:'non',t:35,pr:'chicken',tags:'full make',fr:3,rh:'Reheat on the stove. Add fresh zucchini noodles when reheating if you like them crisp.',
 i:[['chicken-breast',400,'g'],['zucchini',2,'pc'],['celery',100,'g'],['onion',50,'g'],['garlic',2,'pc'],['chicken-broth',1000,'ml'],['olive-oil',1,'tbsp'],['lemon',0.5,'pc'],['oregano',0.25,'tsp'],PEP,SALT],
 s:[['Heat {6} in a pot over medium heat. Cook chopped {3}, {4} and {2} until soft but not brown.',300],
    ['Add {5}, {8} and {0} whole. Simmer gently until the chicken is cooked, 165°F (74°C).',1080],
    ['Take out the chicken, shred it with two forks and return it to the pot.'],
    ['Spiralize {1}, add to the pot and cook just 2 minutes so it keeps some bite.',120],
    ['Finish with the juice of {7}, pepper and salt.']]});

A({id:'lemon-coriander-soup',n:'Lemon coriander chicken soup',c:'ss',d:'non',t:30,pr:'chicken',tags:'full',bf:'D',bw:'Light and warming, good for dinner.',fr:3,rh:'Reheat on the stove, then add fresh lemon.',
 i:[['chicken-breast',350,'g'],['cabbage',100,'g'],['bell-pepper',0.5,'pc'],['mushrooms',80,'g'],['ginger',1,'tsp'],['garlic',2,'pc'],['chicken-broth',1000,'ml'],['lemon',1,'pc'],['coriander',20,'g'],['olive-oil',2,'tsp'],PEP,SALT],
 s:[['Simmer {0} in {6} until cooked, then shred it.',900],
    ['In a pan, heat {9} and sauté grated {4} and {5}, finely chopped {1}, {2} and {3} until just soft.',180],
    ['Add the vegetables and chicken to the broth and simmer. No cornflour.',300],
    ['Turn off the heat, then add the juice of {7}, chopped {8} and pepper. Lemon added off the heat stays bright.']]});

A({id:'broccoli-cheddar-soup',n:'Broccoli cheddar soup',c:'ss',d:'veg',both:1,t:25,pr:'veg',tags:'add heavy',bf:'L',bw:'Rich and creamy, better at lunch.',fr:3,rh:'Reheat gently on low heat, stirring, so the cheese doesn\u2019t separate.',
 i:[['broccoli',300,'g'],['cheddar',100,'g'],['heavy-cream',4,'tbsp'],['onion',40,'g','o'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['butter',1,'tbsp'],['water',400,'ml'],PEP,SALT],
 s:[['Melt {6} over medium heat. [[Cook chopped {3} and {4} until soft.||Add a pinch of {5}.]]',180],
    ['Add {0}, chopped, with {7} and a pinch of salt. Simmer until tender.',600],
    ['Blend half the soup until smooth and return it to the pot, for a creamy soup with some texture.'],
    ['On low heat, stir in {2}, then grated {1} a handful at a time until melted. Don\u2019t let it boil. No flour.',120]],
 tip:'1 cup per serving, 2 to 3 times a week. Pair with a protein like chicken tikka or eggs.'});

A({id:'cream-of-mushroom',n:'Cream of mushroom soup',c:'ss',d:'veg',both:1,t:25,pr:'veg',tags:'add heavy',fr:3,rh:'Reheat gently.',
 i:[['mushrooms',340,'g'],['heavy-cream',4,'tbsp'],['onion',40,'g','o'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['butter',1,'tbsp'],['water',400,'ml'],['oregano',0.25,'tsp'],PEP,SALT],
 s:[['Melt {5} over medium-high heat. Add sliced {0} in one layer and leave them until well browned before stirring. Browning gives the soup its depth.',480],
    ['[[Add chopped {2} and {3} and cook until soft.||Add a pinch of {4}.]] Add {7}.',120],
    ['Add {6} and simmer, then blend until smooth.',600],
    ['Stir in {1}, salt and pepper.']],
 tip:'1 cup per serving. Pair with a protein.'});

A({id:'cream-of-spinach',n:'Cream of spinach soup',c:'ss',d:'veg',both:1,t:20,pr:'veg',tags:'add',fr:2,rh:'Reheat gently.',
 i:[['spinach',300,'g'],['heavy-cream',3,'tbsp'],['butter',2,'tsp'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['ginger',0.5,'tsp'],['water',400,'ml'],PEP,SALT],
 s:[['Melt {2} over medium heat. [[Add sliced {3} and {5}.||Add {5} and a pinch of {4}.]]',60],
    ['Add {0} and {6}. Simmer just until wilted, then blend until smooth. Short cooking keeps it green.',240],
    ['Stir in {1}, salt and pepper.']]});

A({id:'kachumber',n:'Kachumber',c:'ss',d:'veg',both:1,t:10,pr:'veg',tags:'add quick',
 i:[['cucumber',1,'pc'],['tomato',1,'pc'],['onion',30,'g','o'],['green-chili',1,'pc'],['lemon',0.5,'pc'],['chaat-masala',0.5,'tsp'],['coriander',5,'g'],SALT],
 s:[['Finely dice {0}, {1}[[, {2}|| ]] and {3}. Mostly cucumber, less tomato.'],
    ['Just before serving, toss with the juice of {4}, {5}, chopped {6} and salt. Salt draws out water, so add it last.']]});

A({id:'avocado-chaat',n:'Avocado chaat salad',c:'ss',d:'veg',both:1,t:10,pr:'veg',tags:'add quick',
 i:[['avocado',1,'pc'],['cucumber',0.5,'pc'],['tomato',0.5,'pc'],['onion',20,'g','o'],['green-chili',1,'pc'],['lemon',0.5,'pc'],['chaat-masala',0.5,'tsp'],['coriander',5,'g'],SALT],
 s:[['Dice {1}, {2}[[ and {3}|| ]], and chop {4}.'],
    ['Cube {0} last so it doesn\u2019t brown, and fold everything gently with the juice of {5}, {6}, {7} and salt.']]});

A({id:'chicken-avocado-salad',n:'Grilled chicken avocado salad',c:'ss',d:'non',t:25,pr:'chicken',tags:'full lunch',
 i:[['chicken-breast',400,'g'],['olive-oil',1,'tsp','','olive oil (for the chicken)'],['paprika',0.5,'tsp'],['garlic-powder',0.5,'tsp'],['black-pepper',0.25,'tsp'],['salt',0.5,'tsp'],['lemon',1,'pc'],['lettuce',200,'g'],['cucumber',0.5,'pc'],['avocado',1,'pc'],['olive-oil',1,'tbsp','','olive oil (for the dressing)'],['dijon',0.25,'tsp']],
 s:[['If {0} is thicker than 2 cm, slice it horizontally or pound it to an even thickness. Pat dry.'],
    ['Rub with {1}, {2}, {3}, {4}, {5} and the zest of {6}. Rest 10 minutes, or marinate overnight for more flavor.',600],
    ['Heat a grill pan or skillet over medium-high heat until very hot. Cook the chicken without pressing or moving it until it releases easily, then flip.',330],
    ['Cook the second side until 165°F (74°C) inside, or the juices run clear.',330],
    ['Rest 5 minutes, then slice against the grain.',300],
    ['Whisk {10} with the juice of the lemon, {11} and a pinch of salt and pepper.'],
    ['Toss chopped {7} and {8} with half the dressing. Slice {9} last, top with the chicken, and drizzle the rest.']],
 tip:'For work lunches, pack the dressing separately and squeeze lemon over the avocado so it doesn\u2019t brown.'});

A({id:'egg-salad',n:'Egg salad lettuce cups',c:'ss',d:'non',t:20,pr:'egg',tags:'full make lunch',fr:3,rh:'Eat cold.',
 i:[['egg',6,'pc'],['mayonnaise',2,'tbsp'],['greek-yogurt',2,'tbsp'],['dijon',1,'tsp'],['celery',50,'g'],['paprika',0.25,'tsp'],['lettuce',150,'g'],PEP,SALT],
 s:[['Lower {0} into boiling water and cook 10 minutes, then move to ice water. Ice water makes them easy to peel.',600],
    ['Peel and chop the eggs. Mix with {1}, {2}, {3}, finely chopped {4}, salt and pepper.'],
    ['Spoon into leaves of {6} and sprinkle with {5}.']],
 tip:'The yogurt makes it lighter than all-mayo egg salad.'});

A({id:'warm-spinach-egg-salad',n:'Warm spinach, mushroom and egg salad',c:'ss',d:'non',t:20,pr:'egg',tags:'full quick',
 i:[['egg',6,'pc'],['spinach',200,'g'],['mushrooms',150,'g'],['olive-oil',1,'tbsp'],['garlic',2,'pc'],['lemon',0.5,'pc'],['parmesan',20,'g'],PEP,SALT],
 s:[['Lower {0} into boiling water for 7 minutes for jammy yolks, then cool in cold water and peel.',420],
    ['Heat {3} in a wide pan over medium-high heat. Brown sliced {2}, then add sliced {4} for 30 seconds.',300],
    ['Turn off the heat and toss in {1} just until it starts to wilt. Add the juice of {5}, salt and pepper.',30],
    ['Top with the halved eggs and grated {6}.']]});

A({id:'roasted-veg-paneer-salad',n:'Roasted vegetable paneer salad',c:'ss',d:'veg',both:1,t:35,pr:'paneer',tags:'full lunch',fr:2,rh:'Eat warm or cold.',
 i:[['cauliflower',200,'g'],['broccoli',200,'g'],['bell-pepper',1,'pc'],['paneer-lowfat',250,'g'],['spinach',60,'g'],['olive-oil',1,'tbsp'],['garlic',2,'pc','o'],['cumin-powder',0.5,'tsp'],['chili-flakes',0.25,'tsp'],['lemon',0.5,'pc'],SALT],
 s:[['Heat the oven to 425°F (220°C). Toss {0}, {1} and {2}, cut into bite-size pieces, with most of {5}, {7}, {8}[[, chopped {6}|| ]] and salt.'],
    ['Roast in one layer until golden at the edges.',900],
    ['Add cubed {3}, tossed in the rest of the oil, and roast 10 minutes more. Adding paneer later keeps it soft.',600],
    ['Serve warm over {4} with the juice of {9}.']]});

A({id:'fish-salad',n:'Pan-seared fish salad',c:'ss',d:'non',t:20,pr:'fish',tags:'full quick lunch thaw',
 i:[['tilapia',400,'g'],['paprika',0.5,'tsp'],['olive-oil',1,'tsp','','olive oil (for the fish)'],['lettuce',150,'g'],['cucumber',0.5,'pc'],['avocado',0.5,'pc'],['olive-oil',1,'tbsp','','olive oil (for the dressing)'],['lemon',1,'pc'],PEP,SALT],
 s:[['Pat {0} dry and season with {1}, salt and pepper. Leftover salmon or tilapia also works; skip to step 3.'],
    ['Heat {2} in a nonstick pan over medium-high heat. Cook the fish until golden, flip, and cook until it flakes easily.',300],
    ['Whisk {6} with the juice of {7}, salt and pepper.'],
    ['Toss {3}, {4} and {5} with the dressing and top with the fish, broken into large flakes.']]});

A({id:'cucumber-raita',n:'Cucumber raita',c:'ss',d:'nog',t:5,pr:'veg',tags:'add quick',
 i:[['cucumber',1,'pc'],['greek-yogurt',150,'g'],['cumin-powder',0.5,'tsp'],['mint',5,'g'],SALT],
 s:[['Grate {0} and squeeze out the water with your hands, so the raita stays thick.'],
    ['Mix into {1} with {2}, chopped {3} and salt. Toasting the cumin in a dry pan first makes it more fragrant.']]});

/* ===================== Sides ===================== */
A({id:'jeera-cauliflower-rice',n:'Jeera cauliflower rice',c:'sd',d:'nog',t:10,pr:'veg',tags:'quick',fr:3,rh:'Microwave 1 minute.',
 i:[['cauliflower-rice',340,'g'],['ghee',1,'tsp'],['cumin-seeds',0.5,'tsp'],['coriander',5,'g'],SALT],
 s:[['Heat {1} over medium heat and add {2}. Let them sizzle until fragrant.',30],
    ['Add {0} and salt, and cook on medium-high, stirring, until just tender. It goes mushy if covered or overcooked.',300],
    ['Finish with {3}.']]});

A({id:'garlic-green-beans',n:'Garlic green beans',c:'sd',d:'veg',both:1,t:15,pr:'veg',tags:'week',fr:3,
 i:[['green-beans',300,'g'],['garlic',3,'pc','o'],['ginger',1,'tsp','n'],['olive-oil',2,'tsp'],['chili-flakes',0.25,'tsp'],['lemon',0.5,'pc'],SALT],
 s:[['Trim {0} and boil or steam until bright green and just tender, then drain well.',300],
    ['Heat {3} over medium heat, add [[sliced {1}||grated {2}]] and {4} for 30 seconds, then the beans and salt.',120],
    ['Finish with the juice of {5}.']]});

A({id:'cabbage-poriyal',n:'Cabbage poriyal',c:'sd',d:'veg',both:1,t:20,pr:'veg',tags:'make',fr:3,rh:'Microwave 1 minute.',
 i:[['cabbage',400,'g'],['coconut',2,'tbsp'],['mustard-seeds',0.5,'tsp'],['curry-leaves',1,'pc'],['green-chili',1,'pc'],['onion',30,'g','o'],['hing',0,'pinch','n'],['turmeric',0.25,'tsp'],['coconut-oil',2,'tsp'],SALT],
 s:[['Finely shred {0}.'],
    ['Heat {8} over medium heat. Add {2}; when they pop, add {3} and slit {4}. [[Add chopped {5}.||Add a pinch of {6}.]]',90],
    ['Add the cabbage, {7} and salt. Cover and cook on low until tender, stirring once or twice.',480],
    ['Stir in {1}.']]});

A({id:'roasted-broccoli',n:'Roasted broccoli with parmesan',c:'sd',d:'nog',t:20,pr:'veg',tags:'week',
 i:[['broccoli',300,'g'],['olive-oil',1,'tbsp'],['parmesan',20,'g'],['lemon',0.5,'pc'],PEP,SALT],
 s:[['Heat the oven to 425°F (220°C). Cut {0} into florets and dry them well.'],
    ['Toss with {1}, salt and pepper and spread on a tray with space between the pieces.'],
    ['Roast until browned at the edges.',1080],
    ['Top with grated {2} and the juice of {3}.']]});

A({id:'mushroom-masala',n:'Mushroom masala',c:'sd',d:'veg',both:1,t:20,pr:'veg',tags:'',fr:3,
 i:[['mushrooms',340,'g'],['onion',50,'g','o'],['tomato',80,'g'],['ginger',1,'tsp'],['garlic',2,'pc','o'],['hing',0,'pinch','n'],['chili-powder',0.5,'tsp'],['garam-masala',0.5,'tsp'],['turmeric',0.25,'tsp'],['ghee',2,'tsp'],['coriander',5,'g'],SALT],
 s:[['Heat {9} over medium heat. [[Add chopped {1} and {4} and cook until soft.||Add a pinch of {5}.]]',180],
    ['Add grated {3}, chopped {2}, {6}, {8} and salt. Cook until the tomato softens.',180],
    ['Add sliced {0} and cook on medium-high until the liquid evaporates and they brown.',420],
    ['Finish with {7} and {10}.']]});

A({id:'bhindi-fry',n:'Bhindi fry',c:'sd',d:'veg',both:1,t:25,pr:'veg',tags:'',
 i:[['okra',300,'g'],['onion',40,'g','o'],['hing',0,'pinch','n'],['cumin-seeds',0.5,'tsp'],['turmeric',0.25,'tsp'],['chili-powder',0.5,'tsp'],['mustard-oil',1,'tbsp'],SALT],
 s:[['Wash {0} and dry completely with a towel before cutting. Wet okra turns slimy. Slice into rounds.'],
    ['Heat {6} in a wide pan over medium heat. Add {3}, then [[sliced {1}||a pinch of {2}]].',120],
    ['Add the okra in a single layer and cook uncovered, stirring now and then, until crisp. Never cover it.',900],
    ['Add {4}, {5} and salt in the last 2 minutes. Salt added early makes it soggy.',120]]});

/* ===================== Snacks ===================== */
A({id:'cucumber-chaat',n:'Cucumber chaat',c:'sn',d:'nog',t:5,pr:'veg',tags:'quick',
 i:[['cucumber',1,'pc'],['lemon',0.5,'pc'],['chaat-masala',0.5,'tsp'],['chili-powder',0,'pinch']],
 s:[['Cut {0} into sticks or rounds.'],['Sprinkle with the juice of {1}, {2} and a pinch of chili powder just before eating.']]});
A({id:'boiled-eggs',n:'Boiled eggs',c:'sn',d:'non',t:12,pr:'egg',tags:'quick make',fr:7,rh:'Keep in the fridge, peeled or unpeeled.',
 i:[['egg',4,'pc'],['chaat-masala',0,'taste'],PEP],
 s:[['Lower {0} into boiling water and cook 10 minutes for firm yolks, or 7 for jammy ones.',600],['Move to ice water for 5 minutes, then peel. 2 eggs is one snack, with chaat masala or pepper.']]});
A({id:'masala-almonds',n:'Masala roasted almonds',c:'sn',d:'nog',t:15,pr:'veg',sv:8,tags:'make',fr:14,rh:'Store airtight at room temperature.',
 i:[['almonds',100,'g'],['ghee',1,'tsp'],['chili-powder',0.5,'tsp'],['chaat-masala',0.5,'tsp'],['salt',0,'pinch']],
 s:[['Toss {0} with {1}, {2} and a pinch of salt.'],['Roast in a pan on low heat, stirring often, until fragrant and a shade darker. They burn quickly, so stay close.',480],['Toss with {3}, cool completely, and portion into small containers of about 10 almonds.']]});
A({id:'spiced-pumpkin-seeds',n:'Spiced pumpkin seeds',c:'sn',d:'nog',t:10,pr:'veg',sv:6,tags:'make',fr:14,
 i:[['pumpkin-seeds',100,'g'],['olive-oil',1,'tsp'],['chili-powder',0.5,'tsp'],['cumin-powder',0.5,'tsp'],['salt',0,'pinch']],
 s:[['Toss {0} with {1}, {2}, {3} and a pinch of salt.'],['Toast in a dry pan on low heat, shaking often, until they start to pop.',300],['Cool and portion into 2 tbsp servings.']]});
A({id:'edamame-snack',n:'Masala edamame',c:'sn',d:'nog',t:5,pr:'veg',tags:'quick',
 i:[['edamame',150,'g'],['lemon',0.5,'pc'],['chaat-masala',0.5,'tsp'],['chili-flakes',0,'pinch']],
 s:[['Microwave or boil {0} until hot.',180],['Toss with the juice of {1}, {2} and a pinch of chili flakes. ½ cup is one serving.']]});
A({id:'guacamole-cucumber',n:'Guacamole with cucumber sticks',c:'sn',d:'veg',both:1,t:10,pr:'veg',sv:3,tags:'quick',
 i:[['avocado',1,'pc'],['lime',0.5,'pc'],['onion',20,'g','o'],['cumin-powder',0.25,'tsp','n'],['green-chili',1,'pc'],['coriander',5,'g'],['cucumber',1,'pc'],SALT],
 s:[['Mash {0} with the juice of {1} and salt, leaving some texture.'],['Mix in finely chopped {4}, {5} [[and {2}||and {3}]].'],['Serve with {6} cut into sticks. 2 to 3 tbsp is one serving.']]});
A({id:'chia-pudding-cup',n:'Chia pudding cup',c:'sn',d:'nog',t:5,pr:'veg',tags:'make',fr:4,
 i:[['chia',3,'tbsp'],['almond-milk',240,'ml'],['cinnamon',0.25,'tsp']],
 s:[['Stir {0} and {2} into {1}. Stir again after 5 minutes to stop clumps.'],['Divide into 2 small cups and refrigerate at least 2 hours.']]});
A({id:'masala-tofu-cubes',n:'Crispy masala tofu cubes',c:'sn',d:'nog',t:25,pr:'tofu',tags:'make',fr:3,
 i:[['tofu',200,'g'],['olive-oil',1,'tsp'],['chili-powder',0.5,'tsp'],['turmeric',0.25,'tsp'],['chaat-masala',0.5,'tsp'],['salt',0,'pinch']],
 s:[['Press {0} dry for 10 minutes and cut into 2 cm cubes.',600],['Toss with {1}, {2}, {3} and a pinch of salt.'],['Air-fry at 400°F (200°C), shaking halfway, or bake until crisp. Sprinkle {4}.',900]]});
A({id:'paneer-cubes',n:'Pepper paneer cubes',c:'sn',d:'nog',t:5,pr:'paneer',tags:'quick',
 i:[['paneer-lowfat',100,'g'],['black-pepper',0,'taste'],['chili-flakes',0,'pinch'],['salt',0,'pinch']],
 s:[['Cube {0} and toss with pepper, chili flakes and a pinch of salt. 50 g is one snack.']]});

/* ===================== Breads and wraps (occasional) ===================== */
A({id:'keto-roti',n:'Keto roti',c:'br',d:'nog',t:25,pr:'veg',sv:4,tags:'occ',fr:3,rh:'Warm on a tawa for 20 seconds per side.',
 i:[['almond-flour',110,'g'],['psyllium',2,'tbsp'],['water',120,'ml','','warm water'],['ghee',1,'tsp'],['salt',0,'pinch']],
 s:[['Mix {0}, {1} and a pinch of salt. Add {2} and knead into a soft dough. Rest 5 minutes so the psyllium can bind it.',300],
    ['Divide into 4 balls and roll each between two sheets of parchment paper into thin rounds.'],
    ['Cook on a hot tawa over medium heat about 1 minute per side, until speckled. Brush lightly with {3}.',240]],
 tip:'Occasional, about 1 to 2 times a week. 1 roti is one serving.'});
A({id:'mug-bread',n:'90-second mug bread',c:'br',d:'non',t:5,pr:'egg',sv:1,tags:'occ quick',
 i:[['almond-flour',3,'tbsp'],['egg',1,'pc'],['butter',1,'tbsp'],['baking-powder',0.5,'tsp'],['salt',0,'pinch']],
 s:[['Melt {2} in a wide mug. Add {0}, {1}, {3} and a pinch of salt, and mix until smooth.'],
    ['Microwave until set and springy.',90],
    ['Turn out, cool 2 minutes, slice in half, and toast in a dry pan if you like.']],
 tip:'High in calories, so an occasional sandwich.'});
A({id:'cloud-bread',n:'Cloud bread',c:'br',d:'non',t:40,pr:'egg',sv:3,tags:'occ make',fr:3,
 i:[['egg',3,'pc'],['cream-cheese',85,'g'],['baking-powder',0.25,'tsp']],
 s:[['Heat the oven to 300°F (150°C). Separate {0}, making sure no yolk gets into the whites.'],
    ['Whisk the whites with {2} until stiff peaks form: when you lift the whisk, the peaks stand up straight.'],
    ['Beat the yolks with softened {1} until smooth, then gently fold into the whites in two batches.'],
    ['Spoon 6 rounds onto a lined tray and bake until golden.',1800],
    ['Cool on the tray, as they firm up as they cool. 2 pieces is one serving.']]});
A({id:'egg-wraps',n:'Egg wraps',c:'br',d:'non',t:10,pr:'egg',tags:'occ quick',
 i:[['egg',4,'pc'],['water',2,'tbsp'],['butter',1,'tsp'],['salt',0,'pinch']],
 s:[['Whisk {0} with {1} and a pinch of salt until completely smooth.'],
    ['Brush a nonstick pan with a little {2} over medium-low heat. Pour in a quarter of the mix and swirl into a thin round.'],
    ['Cook until set, flip for 10 seconds, and slide out. Repeat to make 4.',90],
    ['Fill with keema, tikka or salad and roll up.']]});
A({id:'lettuce-wraps',n:'Lettuce wraps',c:'br',d:'nog',t:5,pr:'veg',tags:'quick',
 i:[['lettuce',1,'pc']],
 s:[['Separate the leaves of {0}, wash and pat completely dry.'],['Use as wraps for keema, tikka, egg salad or burger patties.']],
 tip:'The lightest bread swap, fine any day.'});

/* ===================== Drinks ===================== */
A({id:'keto-chai',n:'Keto masala chai',c:'dr',d:'nog',t:8,pr:'veg',tags:'quick',bf:'B',bw:'Has caffeine, so best before 2 pm for good sleep.',
 i:[['tea',2,'tsp'],['water',300,'ml'],['almond-milk',200,'ml'],['ginger',1,'tsp'],['cardamom',2,'pc']],
 s:[['Bring {1} to a boil with grated {3} and crushed {4}.',120],['Add {0} and simmer 1 minute, then add {2} and bring just to a boil. No sugar.',120],['Strain into 2 cups.']]});
A({id:'ginger-lemon-tea',n:'Ginger lemon tea',c:'dr',d:'nog',t:8,pr:'veg',tags:'quick',bf:'BLDS',bw:'Caffeine-free, so fine any time, even in the evening.',
 i:[['ginger',1,'tbsp'],['water',500,'ml'],['lemon',0.5,'pc'],['cinnamon',0.25,'tsp']],
 s:[['Simmer sliced {0} and {3} in {1}.',360],['Strain and add the juice of {2}.']]});

window.SA_RECIPES = R;
})();
