# S&A Kitchen

A shared keto kitchen app for two people: recipes, weekly meal planning, grocery lists and daily check-ins, synced live between two iPhones.

**Live app:** https://sneha-palvai.github.io/sa-kitchen/

It's a web app hosted on GitHub Pages and added to the iPhone home screen. Shared data is stored in Firebase. There is no build step: the files in this repository are the app.

## Features

- **Today:** today's meals with personal portions, reminders (like thawing fish), a daily check-in, and water tracking in ml or oz
- **Recipes:** about 70 keto recipes with diet labels (veg, no onion and garlic, non-veg), search, filters, favorites, Cook mode with timers, shared notes, and your own recipes
- **Plan:** a weekly planner with Suggest my week, Copy a week, a month calendar, leftovers ("make extra for tomorrow"), different meals per person, and daily calorie, protein and net-carb estimates
- **Groceries:** a shared checklist built from the plan or from any recipe, grouped by store section, with keto ratings, food facts, regulars, and "What can I cook?"

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page layout and all styles |
| `app.js` | Screens and interactions |
| `core.js` | Shared logic: planning, nutrition, grocery calculations |
| `recipes.js` | **All built-in recipes.** Edit this to change or add recipes. |
| `foods.js` | **Food database:** nutrition per 100 g, keto ratings, store sections and other names |
| `backend.js` | Connection to Firebase (sign-in and shared data) |
| `sw.js` | Offline support |
| `manifest.webmanifest`, `icon-180.png`, `icon-512.png` | Home-screen app name and icon |
| `firestore.rules` | Template for the Firebase security rules (the live rules are set in the Firebase console) |

## Making changes

1. Edit the file on GitHub (pencil icon) or upload a new version with the same name.
2. If you changed any app file, open `sw.js` and increase the version number in `const CACHE = 'sa-kitchen-v3';` (for example, to `v4`). This makes phones pick up the update quickly.
3. Commit. GitHub Pages updates within a few minutes. Close and reopen the app on each phone, once or twice.

### Editing recipes (`recipes.js`)

Each recipe is one `A({...})` entry. The comment at the top of the file explains every field. In short:

- `i` is the ingredient list: `['foodKey', amount, 'unit']`. Units are `g`, `ml`, `pc`, `tsp`, `tbsp`, `cup`, `pinch` or `taste`. The food key must exist in `foods.js`.
- In steps, `{3}` inserts ingredient number 3 (counting from 0) with its scaled amount.
- `[[regular text||no onion and garlic text]]` switches text for recipes with both versions. Mark version-only ingredients with `'o'` (regular only) or `'n'` (no onion and garlic only).
- A number after a step's text is its timer in seconds.
- Nutrition is calculated automatically from the ingredients, so there's no need to type calories.

### Editing foods (`foods.js`)

Each food is one `F(...)` line with its name, store section, keto rating (`g` great, `a` okay in measured amounts, `r` not in the plan) for the strict keto and exit phases, and nutrition per 100 g. Add other names in `al` so typed grocery items are recognized.

## Data and privacy

- No personal data is stored in this repository.
- Shared data (plans, grocery lists, recipe edits, notes, check-ins) lives in a private Firebase project, readable only by the two accounts listed in its security rules.
- Each user can download a backup from **Settings → Export my data**.

## Security setup (one time, in the Firebase console)

- Authentication: email and password sign-in, with email enumeration protection on
- Authorized domains: `sneha-palvai.github.io` only
- Firestore rules: based on `firestore.rules`, with the two user IDs filled in. Everything else is denied by default.

## Notes

- Nutrition values are estimates from standard food data. Brands vary.
- This app is a planning tool, not medical advice.
- Built with plain HTML, CSS and JavaScript, plus the Firebase JavaScript SDK (version 12.19.0, loaded from Google's CDN).
