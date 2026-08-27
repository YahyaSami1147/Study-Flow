Development notes

- Prompts used during development: See PROMPTS.md for the full set of prompts used during the project (do not add or duplicate prompts here).

AI assistance summary

- An AI assistant (pair-programmer style) helped scaffold and implement the reset flow: it suggested and generated the UI changes in `src/pages/Settings.jsx`, added a `resetAll` helper in `src/services/storage.js`, and proposed small style updates in `src/styles/settings.css`.
- The AI also used existing app primitives (`ConfirmModal` and `ToastProvider`) to provide a safe, accessible confirmation and feedback experience.

Manual improvements, corrections, and refactorings performed after reviewing AI-generated code

- Ensured `resetAll` only removes the application's keys (tasks, subjects, sessions, notes, active session, and `theme`) rather than clearing all of `localStorage` to avoid affecting unrelated data.
- Integrated the existing `ConfirmModal` and `ToastProvider` patterns to preserve consistent UX and accessibility behavior already present in the app.
- Kept import paths, module exports, and default export signatures consistent with the codebase style.
- Added a small delay and `window.location.reload()` after reset to ensure UI reflects the cleared state; this was chosen instead of a silent in-memory reset to ensure all providers reinitialize cleanly.
- Applied compact, conservative CSS rules for the reset button to match the project's visual language.


