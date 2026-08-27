Prompt: 1
I want to build a React application called "StudyFlow", a modern student productivity dashboard.

This is an academic assignment where I am using AI as a development assistant, so I want the implementation to be clean, understandable, maintainable, and easy for me to review and modify manually.

Technical requirements:

* Use React with Vite.
* Use JavaScript, not TypeScript.
* Use functional components and React hooks.
* Use React Router for page navigation.
* Use CSS or a clean styling approach that does not make the project unnecessarily complicated.
* Use localStorage for persistence instead of a backend.
* Keep dependencies minimal.
* Make the application responsive for desktop, tablet, and mobile.
* Use reusable components rather than putting everything inside App.jsx.
* Keep business logic separate from UI where practical.
* Use clear and descriptive variable and function names.
* Avoid unnecessary abstractions.
* Do not generate placeholder functionality that does not actually work.

Application pages:

1. Dashboard
2. Tasks
3. Notes
4. Study Sessions
5. Subjects
6. Settings

Core functionality:

* Create, edit, delete, and complete tasks.
* Assign tasks to subjects.
* Add, edit, and delete notes.
* Track study sessions.
* Create and manage subjects.
* Show productivity statistics on the dashboard.
* Persist application data using localStorage.
* Search and filter tasks.
* Show useful empty states when there is no data.
* Add basic form validation.
* Add responsive navigation.
* Add light/dark theme support.

Before writing implementation code, first inspect the current project structure and explain the architecture you recommend.

Then create the project structure and implement only the initial application shell, routing, navigation, layout, and reusable UI structure.

Do not implement every feature yet.

After implementation, explain which files were created and what each file is responsible for.


Prompt 2
Continue working on the existing StudyFlow React project.

Do not rewrite or unnecessarily modify existing working components.

Implement the Dashboard page.

The dashboard should display:

Total tasks
Completed tasks
Pending tasks
Total study time
Number of active subjects
Recent tasks
Upcoming tasks
Recent study sessions
A simple productivity/progress visualization

Use the existing application state and localStorage architecture.

Requirements:

Do not use fake statistics if real application data is available.
Calculate statistics from the stored task, subject, and study-session data.
Create reusable components for statistic cards and dashboard sections.
Handle empty states gracefully.
Make the dashboard responsive.
Avoid duplicated calculations.
Keep the UI accessible.
Do not introduce unnecessary dependencies.

Before coding, inspect the existing state management and data structures and adapt to them rather than creating a second competing data structure.

After implementing the feature, explain the important design decisions and identify areas where I should manually review the generated code.

Prompt 3
Implement the Tasks feature in the existing StudyFlow React application.

Users must be able to:

* Create a task.
* Edit a task.
* Delete a task.
* Mark a task as completed.
* Set a due date.
* Set a priority.
* Assign a subject.
* Search tasks.
* Filter by status.
* Filter by priority.
* Sort tasks by due date or priority.

Task fields:

* id
* title
* description
* subjectId
* priority
* dueDate
* completed
* createdAt

Requirements:

* Use React state/hooks appropriately.
* Persist changes through the existing localStorage/data layer.
* Validate required fields.
* Prevent empty task titles.
* Provide useful feedback after actions.
* Use reusable TaskForm and TaskItem components where appropriate.
* Avoid putting all task logic inside one component.
* Make the feature responsive.
* Handle the case where a task references a subject that no longer exists.
* Do not break existing Dashboard functionality.

Before implementation, inspect the existing project structure and reuse existing components/utilities wherever possible.

After implementation, review the code for duplicated logic, unnecessary state, and components that should be split.

Prompt 4

Implement the Notes feature for StudyFlow.

Users should be able to:

* Create notes.
* Edit notes.
* Delete notes.
* Search notes.
* Assign notes to subjects.
* View notes in a clean card/list layout.

Each note should contain:

* id
* title
* content
* subjectId
* createdAt
* updatedAt

Requirements:

* Persist notes using the existing localStorage architecture.
* Validate the title and content.
* Display an appropriate empty state.
* Add search functionality.
* Allow users to edit existing notes.
* Keep the UI responsive.
* Reuse existing modal, button, input, card, and form components where appropriate.
* Do not duplicate functionality that already exists elsewhere in the application.

Keep the implementation simple and maintainable.

After implementation, inspect the code and identify any areas where manual refactoring would improve readability or maintainability.

Prompt 5 

Implement the Study Sessions feature in the existing StudyFlow React application.

Users should be able to:

* Start a study session.
* Select a subject.
* Set or use a timer.
* Pause/resume the timer.
* Stop the session.
* Save completed sessions.
* View previous study sessions.
* See total study time.

Each saved session should contain:

* id
* subjectId
* duration
* startedAt
* completedAt

Requirements:

* Use React state/hooks appropriately.
* Ensure the timer behaves correctly when the component re-renders.
* Prevent multiple timers from running simultaneously.
* Clean up timers when the component unmounts.
* Persist completed sessions using the existing localStorage architecture.
* Handle browser refresh gracefully where practical.
* Do not create duplicate intervals.
* Keep timer logic separate from presentation logic where reasonable.

Pay particular attention to React effect dependencies and cleanup.

After implementation, explain how the timer state works and point out anything I should manually test.

Prompt 6 

Improve the existing StudyFlow application's visual system.

Add:

* Light mode.
* Dark mode.
* Theme persistence using localStorage.
* Responsive layout.
* Consistent spacing.
* Consistent typography.
* Consistent button styles.
* Consistent cards and form controls.
* Accessible color contrast.
* Mobile-friendly navigation.

Important:

Do not rewrite the application from scratch.

First inspect the existing CSS/components and improve them incrementally.

Avoid hardcoding the same colors and spacing values repeatedly where CSS variables can provide a cleaner solution.

Do not change existing application functionality.

After implementation, identify three visual or UX areas that I should manually review rather than assuming the generated result is perfect.

prompt 7 
Continue working on the existing StudyFlow React application.

Implement the Subjects management feature without rewriting existing working functionality.

Users should be able to:

* Create a subject.
* Edit a subject.
* Delete a subject.
* View all subjects.
* Assign tasks and notes to subjects.
* See basic information about each subject, such as the number of tasks and total study time associated with it.

Each subject should contain:

* id
* name
* description
* createdAt

Requirements:

* Persist subjects using the existing localStorage/data persistence architecture.
* Validate that the subject name is not empty.
* Prevent duplicate subject names where appropriate.
* Provide clear feedback when a subject is created, edited, or deleted.
* Handle deletion safely when existing tasks or notes are associated with the subject.
* Do not leave broken subject references in tasks or notes.
* Reuse existing UI components such as buttons, forms, cards, modals, and empty states.
* Keep the implementation responsive.
* Keep business/data logic separate from presentation logic where practical.
* Do not duplicate localStorage logic if a reusable utility already exists.
* Do not break the Dashboard, Tasks, Notes, or existing application routing.

Before writing code, inspect the existing project structure and data models.

After implementation:

1. Explain which files were changed.
2. Explain how subject relationships with tasks and notes work.
3. Identify any areas that I should manually test.
4. Identify at least two areas where manual refactoring or improvement could be performed after reviewing the AI-generated implementation.

Do not unnecessarily rewrite existing components.


Prompt 8

Act as a senior React developer reviewing the StudyFlow project.

Do not modify the code yet.

Inspect the existing project and identify:

1. Duplicated code.
2. Components that are too large.
3. Unnecessary React state.
4. Incorrect or unnecessary useEffect dependencies.
5. Potential localStorage bugs.
6. Possible race conditions or stale state.
7. Poor naming.
8. Accessibility problems.
9. Responsive design problems.
10. Unnecessary dependencies.
11. Performance problems.
12. Security concerns.
13. Logic that should be extracted into reusable functions/hooks.
14. UI logic mixed with data/business logic.
15. Any code that is difficult for another developer to understand.

Rank the findings by severity:

* Critical
* High
* Medium
* Low

Do not change anything.

For each issue, explain:

* Where it occurs.
* Why it is a problem.
* What you recommend changing.
* Whether the change could affect existing functionality.

Wait for my approval before modifying the code.


Prompt 9

Perform a final engineering review of the completed StudyFlow React application.

Do not immediately modify files.

First inspect the entire application and create a testing checklist covering:

* Application startup.
* Navigation.
* Creating tasks.
* Editing tasks.
* Deleting tasks.
* Completing tasks.
* Searching/filtering tasks.
* Creating/editing/deleting notes.
* Creating subjects.
* Starting/stopping study sessions.
* Timer behavior.
* Dashboard statistics.
* localStorage persistence.
* Theme switching.
* Responsive layout.
* Form validation.
* Empty states.
* Error states.
* Browser refresh behavior.

Then inspect the source code for likely bugs.

For every issue found, provide:

* File.
* Problem.
* Reproduction scenario.
* Severity.
* Recommended fix.

Do not modify the code until I approve the proposed fixes.

Prompt Styling :
The StudyFlow React application is now functionally complete.

I want you to perform a final UI/UX styling and visual-polish pass across the ENTIRE existing application.

IMPORTANT:

* Do NOT rebuild the application.
* Do NOT change the application's existing functionality.
* Do NOT change the data structures, business logic, routing, localStorage behavior, task logic, notes logic, subjects logic, or study-session logic unless a change is absolutely necessary for a visual/UI issue.
* Preserve all currently working features.
* First inspect the entire existing project before making changes.
* Work with the existing components and architecture.
* Prefer improving existing CSS/components instead of creating unnecessary new dependencies.

GOAL:

Make StudyFlow look like a polished, modern, professional student productivity SaaS application suitable for an academic project demonstration.

DESIGN STYLE:

* Modern SaaS dashboard aesthetic.
* Clean and professional.
* Student-focused but not childish.
* Strong visual hierarchy.
* Spacious and uncluttered.
* Consistent rounded cards and controls.
* Subtle borders and shadows.
* Professional typography.
* Consistent spacing.
* Clear primary and secondary actions.
* Subtle hover and transition effects.
* Avoid excessive animations.
* Avoid overly complicated visual effects.

Review and improve the following areas across the entire application:

1. GLOBAL DESIGN SYSTEM

Create or refine CSS variables for:

* Primary color
* Secondary/accent color
* Background colors
* Surface/card colors
* Text colors
* Muted text
* Border colors
* Success/warning/error colors
* Border radius
* Shadows
* Spacing
* Typography scale
* Transition timing

Ensure the same design tokens are reused throughout the application instead of repeatedly hardcoding values.

2. LAYOUT

Improve:

* Main application layout
* Sidebar
* Header
* Main content area
* Page spacing
* Content width
* Section spacing
* Alignment

Make sure all pages feel like part of the same application.

3. NAVIGATION

Improve:

* Sidebar navigation
* Active navigation state
* Hover states
* Icons
* Navigation spacing
* Header controls

Make navigation visually clear and easy to understand.

4. DASHBOARD

Improve the visual presentation of:

* Statistic cards
* Recent tasks
* Upcoming tasks
* Study-session information
* Productivity statistics
* Progress indicators
* Empty states

Make the dashboard feel like the main polished landing page of the application.

5. TASKS

Improve:

* Task cards/list
* Priority indicators
* Completed state
* Due-date presentation
* Search
* Filters
* Sort controls
* Add/edit task forms
* Delete actions
* Empty states

Make task status and priority visually obvious without making the interface cluttered.

6. NOTES

Improve:

* Note cards
* Note titles
* Note content preview
* Subject labels
* Search
* Add/edit forms
* Delete actions
* Empty states

Make notes easy to scan.

7. SUBJECTS

Improve:

* Subject cards
* Subject information
* Task counts
* Study-time information
* Add/edit forms
* Delete actions
* Empty states

8. STUDY SESSIONS

Improve:

* Timer interface
* Start/pause/stop controls
* Current session information
* Subject selection
* Previous sessions
* Duration display
* Empty states

Make the timer visually prominent and easy to use.

9. FORMS

Create a consistent form design for the entire application:

* Labels
* Inputs
* Textareas
* Selects
* Date inputs
* Validation messages
* Buttons
* Focus states
* Error states

Ensure forms are easy to understand and accessible.

10. MODALS

Improve all modals so they have:

* Clear title
* Proper spacing
* Consistent border radius
* Appropriate shadow
* Clear close action
* Proper button placement
* Mobile-friendly sizing

11. BUTTONS

Create consistent button styles for:

* Primary actions
* Secondary actions
* Destructive actions
* Icon buttons
* Disabled states
* Hover states
* Focus states

12. EMPTY AND ERROR STATES

Make empty states useful and visually polished.

Examples:

* No tasks
* No notes
* No subjects
* No study sessions

Use helpful messaging and appropriate actions where existing functionality allows it.

13. RESPONSIVE DESIGN

Thoroughly review the application at:

* Large desktop
* Laptop
* Tablet
* Mobile

Fix:

* Horizontal overflow
* Cards becoming too narrow
* Forms exceeding viewport width
* Long text breaking layouts
* Sidebar problems
* Navigation problems
* Modal sizing
* Button sizing
* Table/list overflow
* Poor spacing on small screens

The application should remain usable on mobile without changing its functionality.

14. ACCESSIBILITY

Improve:

* Color contrast
* Keyboard focus states
* Button labels
* Form labels
* Interactive element accessibility
* Appropriate semantic HTML
* Visible focus indicators

Do not sacrifice accessibility for visual appearance.

15. ANIMATIONS AND MICRO-INTERACTIONS

Add only subtle animations where useful:

* Button hover
* Card hover
* Modal appearance
* Navigation transitions
* Theme transition

Avoid excessive animation.

16. DARK/LIGHT THEME

If the application already has theme functionality, visually refine both themes.

If theme functionality does not exist, add a simple light/dark theme using the existing architecture without changing application functionality.

Persist the selected theme using the existing localStorage approach where appropriate.

Both themes should have:

* Good contrast
* Consistent surfaces
* Readable text
* Clear borders
* Consistent buttons
* Consistent form controls

FINAL REQUIREMENTS:

Before making changes, inspect the existing project.

After making changes:

* Run the application.
* Check for compilation errors.
* Check for console errors.
* Make sure all existing routes still work.
* Make sure existing functionality still works.
* Do not remove any existing features.
* Do not introduce unnecessary packages.

Finally, provide me with a summary containing:

1. Files changed.
2. Major styling improvements.
3. Responsive improvements.
4. Accessibility improvements.
5. Theme improvements.
6. Any potential issues I should manually test.

Remember: this is a final visual refinement of an already completed application, NOT a rewrite.


Final Prompt 
Create a professional README.md for the StudyFlow React project.

The README must document:

1. Project title.
2. Project overview.
3. Purpose of the application.
4. Features.
5. Technology stack.
6. Installation instructions.
7. How to run the project locally.
8. Project structure.
9. Data persistence approach.
10. AI-assisted development workflow.
11. Examples of prompts used with GitHub Copilot.
12. Examples of AI-generated implementation.
13. Examples of manual corrections or refactoring I performed after reviewing AI-generated code.
14. Testing performed.
15. Known limitations.
16. Future improvements.

Important:

Do not claim that AI performed work that it did not perform.

Clearly distinguish between:

* AI-generated code or suggestions.
* My own manual decisions.
* My manual corrections/refactoring.
* Testing and verification I performed.

Keep the documentation honest and suitable for an academic assignment reviewer.
