# Pomodoro Redesign
### Fixing Gulf of Evaluation:
- **Issue**:  
  User is able to press "Start" when the timer is running and "Stop" when the timer is paused. They are unaware of the states of the buttons.
- **Improvement**:  
  - The "Start" and "Stop" have been merged into one button because user does not need both options at the same time ever 
  - Timer shows play icon when timer is not on, and pause icon when timer is running

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
  An issue with the original app was that it had menus within other menus (nested), which made the whole process of utilizing the application for it's purpose very tedious just to add a simple task. Another issue was having to confirm deletion everytime you wanted to finish or get rid of a task.
- **Improvement**:
  - Had a one-level menu for tasks instead of nesting a menu within the menu.
  - Once a task is complete, click to cross it off and then have the option to remove it on the side, out of the way.

## Working Memory Optimization
- **Issue**:  
  Users had to manually track Pomodoro cycles and remember break schedules.
- **Improvement**:  
  - System automatically counts Pomodoros and switches to long breaks after 4 cycles  
  - Visual progress circle eliminates mental time calculation  
  - Persistent task list maintains context between sessions

## Affordance Enhancement
- **Issue**:  
  Interface elements didn't clearly indicate their functionality.
- **Improvement**:  
  - Play/pause button uses universal icons (▶️/⏸️)  
  - Red timer circle communicates urgency  
  - Input fields show clear min/max constraints (1-120 mins)

## Constraint Implementation
- **Issue**:  
  Users could attempt invalid actions like starting a running timer.
- **Improvement**:  
  - Play button disabled while timer is running  
  - Number inputs restrict values to 1-120 minutes  
  - Break buttons only appear when relevant

## Mapping Clarity
- **Issue**:  
  Controls didn't clearly relate to their functions.
- **Improvement**:  
  - Clearly labeled timer modes (Pomodoro/Short Break/Long Break)  
  - Progress circle directly visualizes time remaining  
  - Color-coded modes (red for work, blue for breaks)

## Consistency Improvements
- **Issue**:  
  Inconsistent styling created visual noise.
- **Improvement**:  
  - Single font family throughout application  
  - Uniform red accent color scheme  
  - Standardized button and input styles

## Control Enhancement
- **Issue**:  
  Limited user customization options.
- **Improvement**:  
  - Adjustable timer durations for all modes  
  - Manual break override capability  
  - Dark/light mode toggle

## Feedback Systems
- **Issue**:  
  Lack of clear system status indicators.
- **Improvement**:  
  - Audible chime on timer completion  
  - Animated progress circle  
  - Live tab title updates  
  - Visual mode indicators

## Fitts' Law Application
- **Issue**:  
  Important controls were too small or distant.
- **Improvement**:  
  - Large central timer display  
  - Oversized control buttons  
  - Tight grouping of related functions  
  - Optimal scroll target placement

## 80/20 Rule Implementation
- **Issue**:  
  Secondary features competed with core functionality.
- **Improvement**:  
  - Timer occupies prime visual real estate  
  - Non-essential features (tasks, help) tucked away  
  - Minimalist interface design

## Visibility Enhancements
- **Issue**:  
  System status wasn't always apparent.
- **Improvement**:  
  - Progress circle shows elapsed time  
  - Play/pause icon state changes  
  - Active mode highlighting  
  - Tab title reflects current timer

## Representation Improvements
- **Issue**:  
  Time representation was one-dimensional.
- **Improvement**:  
  - Dual time display (graphical + digital)  
  - Color-coded modes  
  - Animated state transitions  
  - Clear visual hierarchy

## Suggested Improvements
- Mode Visibility: Add subtle color changes to background when in break mode
- Cycle Tracking: Visual indicator of Pomodoro count (e.g., "3/4 Pomodoros completed")
- Break Skipping: Option to skip breaks when in flow state