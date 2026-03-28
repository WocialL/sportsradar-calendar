# Sportradar Calendar - Frontend Coding Exercise

## Overview
This project is a responsive sports event calendar application developed as part of the Sportradar Coding Academy excercise. It allows users to browse scheduled and played sports events in a calendar view, check match statistics on a dedicated dashboard, and add new events to the application state during runtime.

## Setup & Installation

To run this project locally on your machine, follow these steps:

1. Clone the repository
   git clone https://github.com/WocialL/sportsradar-calendar.git
   cd sportsradar-calendar

2. Install dependencies:
   Make sure you have Node.js installed, then run:
   npm install

3. Start the development server:
   npm run dev
   The application will typically be available at `http://localhost:5173`.

## Technology Stack
* **Framework:** React 18 (with Vite for fast bundling)
* **Language:** TypeScript
* **Routing:** React Router v6
* **Styling:** Tailwind CSS v4
* **State Management:** React Context API

## Architectural Decisions & Assumptions

As requested in the exercise guidelines, here are the key technical decisions made during development:

1. Vanilla JS Date Manipulation:
I didn't use big libraries like date-fns or moment.js. Instead, I wrote the calendar logic (src/utils/dateUtils.ts) using the plain JavaScript Date object. This makes the app lighter and shows I know basic JavaScript.

2. State Management (Context API):
The task required adding new events without a real database. I used the React Context API (EventProvider) to load the mock JSON data when the app starts. Because the JSON didn't have IDs, the Context adds a UUID to each event. This is needed for React key props and React Router to work properly.

3. Responsive Layout:
To make the app responsive, the layout changes depending on the device:

Mobile: It has a bottom navbar and shows a scrollable list of events instead of a grid, which is easier to read on small screens.

Tablet: The grid columns are adjusted so the text fits well and doesn't break the layout.

Desktop: It has a sidebar menu and a full-screen calendar grid using auto-rows-fr.

4. Component Architecture:
I kept the page components (like EventDetailPage and AddEventPage) in single files (around 200 lines of code) instead of splitting them into many small files. Since parts like the Scoreboard or form inputs are only used once, keeping them together makes the code easier to read and debug.