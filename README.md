# StudyFlow

StudyFlow is a lightweight student productivity web application built with React and Vite. It provides task management, note-taking, subject organization, and study session tracking optimized for focused study workflows.

---

## Project overview

StudyFlow is an opinionated productivity app that helps students plan, track, and reflect on their study work. The interface is built for clarity, fast interactions, and offline persistence using the browser's `localStorage`.

This repository contains a working single-page React application (Vite) with client-side routing, reusable UI components, and a small set of custom hooks and services for persistence and timing.


## Purpose

The project is intended as a portfolio-quality small product demonstrating a full-featured, usable productivity experience focusing on:

- Tasks: CRUD tasks with priorities, due dates, and completion.
- Notes: Lightweight note-taking tied to subjects.
- Subjects: Organize tasks, notes, and sessions by subject.
- Sessions: Start/pause/stop study timers and record session durations.
- Dashboard: At-a-glance statistics and recent activity.

This version emphasizes a premium visual polish, accessibility improvements, and subtle micro-interactions while preserving existing app behavior and data models.


## Features

- Create, edit, delete tasks and notes
- Subjects to group content
- Start/pause/stop study sessions with duration tracking
- Local persistence via `localStorage`
- Responsive layout for mobile/tablet/desktop
- Light and dark themes
- Accessible components (focus states, ARIA attributes)
- Subtle motion and polished UI tokens


## Technology stack

- React (via Vite)
- React Router (client-side routing)
- Plain CSS (design tokens and component styles)
- LocalStorage for persistence
- Node + npm for development tooling


## Installation

Make sure you have Node.js and npm installed.

From the repository root:

```bash
npm install
```

If dependency resolution fails with peer dependency warnings, run:

```bash
npm install --legacy-peer-deps
```


## Run locally

```bash
npm run dev
```

Open the URL output by Vite (e.g. `http://localhost:5180/`).

To run the accessibility lint (ESLint with `jsx-a11y`), use:

```bash
npm run a11y
```

Note: In this workspace ESLint v10 uses the flat config format; if `npm run a11y` fails due to configuration format you may need to adjust or run it locally after migration. See Known Limitations below.


## Project structure

- `src/`
	- `main.jsx` — app bootstrap and providers
	- `App.jsx` — routes and layout
	- `pages/` — route pages (Dashboard, Tasks, Notes, Subjects, Sessions, etc.)
	- `components/` — reusable UI pieces and feature components
	- `styles/` — component and page styles
	- `hooks/` — custom hooks (`useLocalStorage`, `useStudyTimer`, etc.)
	- `services/storage.js` — simple persistence helpers and keys
	- `lib/id.js` — `makeId()` utility


## Data persistence

All user data (tasks, notes, subjects, sessions) is stored in the browser `localStorage` using a small wrapper in `src/services/storage.js` and a `useLocalStorage` hook that keeps React state in sync with `localStorage`. No server or external database is used.


## AI-assisted development workflow

This project used GitHub Copilot (AI-assisted) as a development aid for suggestions, code snippets, and iterations during styling and refactors. AI was used to accelerate routine edits and to propose CSS patterns and component skeletons.

Important: all AI suggestions were reviewed and edited manually before being committed. Final code and design decisions are the result of the developer's review and modifications.


### How AI was used (high level)

- Generating initial CSS patterns and token suggestions for a premium theme
- Suggesting small helper components and hooks
- Producing example code snippets or refactors that were then reviewed and adapted
- Speeding up repetitive edits (e.g., converting floating panels into modals)


## Example prompts used with GitHub Copilot

Here are representative prompts used while working with Copilot. These are illustrative — prompts were adapted interactively during development:

- "Polish the app's global CSS tokens into a premium light/dark system with semantic variables and subtle shadows."
- "Convert the floating bottom-right note/subject form into a centered modal overlay with proper ARIA attributes and focus handling." 
- "Create a subtle entrance animation for cards and modals using CSS keyframes and motion tokens." 
- "Make the primary button style refined and consistent across light/dark themes; reduce shadow intensity and add a hover lift." 


## Examples of AI-generated implementation

The AI suggested code fragments and CSS that were used as starting points. Examples include:

- Theme tokens suggestion (example fragment, adapted by hand):

```css
:root { --color-primary: #254e9b; --color-bg: #f6f5f3; --card-radius: 12px; }
html[data-theme='dark'] { --color-bg: #0f1720; --color-surface: #14161a; }
```

- Modal animation suggestion (example):

```css
@keyframes modal-in { from { opacity:0; transform: translateY(8px) scale(.995) } to { opacity:1; transform: none } }
.modal-card { animation: modal-in 220ms cubic-bezier(0.2,0,0,1); }
```

These snippets were generated as suggestions; the final code was adapted to match the project's design tokens and accessibility requirements.


## Manual corrections and refactoring performed after reviewing AI suggestions

All AI suggestions were reviewed and several manual changes were made, including but not limited to:

- Unifying and renaming CSS tokens to semantic names (`--color-surface`, `--color-border`, `--card-radius`, etc.) for consistent theming.
- Converting outdated floating bottom-right form wrappers into centered modal overlays in `src/pages/Notes.jsx` and `src/pages/Subjects.jsx`, ensuring `role="dialog"`, `aria-modal="true"`, and focus/close behavior were preserved.
- Adjusting button and input focus states for sufficient contrast and accessible outlines.
- Softening decorative gradients and reducing shadow intensity to achieve a restrained premium look.
- Fixing a dependency install issue by installing with `--legacy-peer-deps` when npm dependency resolution failed due to peer constraints.
- Iteratively tuning animation durations and easing to make motion feel purposeful, not decorative.

These manual edits ensured correctness, accessibility, and a cohesive visual language.


## Testing performed

- Development server: started with `npm run dev` and verified the app served (Vite output shown on the console). In the development environment the Vite server reported ready at `http://localhost:5180/`.
- Visual checks: navigated through all pages and verified UI elements render, modals open/close, forms submit, and localStorage updates. (These are manual, exploratory checks done during styling.)
- Accessibility lint: attempted to run `npm run a11y` (ESLint with `jsx-a11y`). This produced a configuration error in this workspace due to ESLint flat-config migration. The step was attempted and noted in Known Limitations.
- Functional verification: created/edited/deleted tasks, notes, subjects, and sessions in the browser to confirm persistence and behavior remained unchanged.


## Known limitations

- ESLint config: running the included `a11y` script failed in this environment due to a mismatch with ESLint flat-config `parserOptions`. The lint command was attempted; adjusting the ESLint config to flat-format or downgrading ESLint will resolve it. This does not affect runtime behavior.
- End-to-end automated tests: this project currently lacks automated integration/e2e tests (Cypress, Playwright). Testing performed was manual exploratory testing during development.
- Minor responsive refinements: while the app has been adjusted for common breakpoints, further QA across devices (iOS Safari, older Android) is recommended.


## Future improvements

- Migrate ESLint config to flat-format (or update plugins) so `npm run a11y` can run without error and provide actionable accessibility fixes.
- Add automated tests: unit tests for critical hooks and E2E tests for core flows (tasks, notes, sessions).
- Improve focus-trapping for modals (add an accessible focus-trap utility for better keyboard navigation across modal open/close).
- Add lightweight iconography set and improved illustrations for empty states.
- Add export/import of data (JSON) for portability and backup.
- Small performance tuning: virtualize very long lists if users add large numbers of notes/tasks.


## Attribution and workflow notes

- This repository was developed with the assistance of GitHub Copilot (AI suggestions). All AI-generated suggestions were reviewed and edited manually. Code that landed in the repository reflects the developer's final decisions and hand edits.


---
