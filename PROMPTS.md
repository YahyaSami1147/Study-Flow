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
