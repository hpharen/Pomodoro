# Pomodoro Redesign
### Fixing Gulf of Evaluation:
- **Issue**:  
  User is able to press "Start" when the timer is running and "Stop" when the timer is paused. They are unaware of the states of the buttons.
- **Improvement**:  
  - The "Start" button is disabled and greyed out when the timer is running.  
  - The "Stop" button is disabled and greyed out when the timer is paused.  

### Adding Progressive Disclosure:
- **Issue**:  
  The user can see the "How to" section along with the timer, which may overload them with too much information for a very simple app.
- **Improvement**:  
  - When the website is loaded, only the timer section is visible.  
  - The "How to" section is shown only when scrolling down.

### UI Frameworks
  We utilized open-source resources for UI frameworks in order to help keep consistency across different areas of the application.

### Menus
- **Issue**:
  An issue with the original app was that it had menus within other menus, which made the whole process of utilizing the application for it's purpose very tedious just to add a simple task. Another issue was having to confirm deletion everytime you wanted to finish or get rid of a task.
- **Improvement**:
  - Had a one-level menu for tasks instead of nesting a menu within the menu.
  - Once a task is complete, click to cross it off and then have the option to remove it on the side, out of the way.
