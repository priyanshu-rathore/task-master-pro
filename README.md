# Project & Task Management UI

This is the frontend for a MERN stack project management application. It is a single-page application (SPA) built with React and TypeScript, designed to provide a rich user interface for interacting with the backend API.

The application features full CRUD (Create, Read, Update, Delete) functionality for managing projects and tasks, a drag-and-drop Kanban board, and a dedicated panel for interacting with the Gemini AI assistant.

## Features

-   **Modern UI**: Clean and responsive interface built with Tailwind CSS.
-   **React & TypeScript**: A robust and type-safe codebase.
-   **Full CRUD Functionality**: Create, read, update, and delete projects and tasks through intuitive modals and UI controls.
-   **Kanban Board**: A visual drag-and-drop board to manage task status.
-   **State Management**: Uses React Context for clean, centralized state management.
-   **AI Integration**: A dedicated UI panel to interact with the backend's Gemini AI features for project summaries and Q&A.
-   **User-Friendly Notifications**: Provides clear feedback to the user via `react-hot-toast` notifications.

## Tech Stack

-   **Framework**: React.js
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **State Management**: React Context API
-   **API Communication**: Axios
-   **Notifications**: `react-hot-toast`

---

## Local Installation and Setup Guide

Follow these steps to get the frontend application running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.x or later recommended)
-   [Yarn](https://yarnpkg.com/) (or `npm`)
-   The **backend server must be running** for the frontend to fetch data. Please follow the backend's README to set it up first.

### Step 1: Clone the Repository

If you haven't already, clone the project repository. This guide assumes you are in the `frontend` directory.

git clone [https://github.com/priyanshu-rathore/task-master-pro.git]
cd task-master-pro


### Step 2: Install Dependencies

Install all the necessary project dependencies using Yarn or npm.

Using Yarn
yarn install

Or using npm
npm install


### Step 3: Configure Environment Variable (Optional)

The frontend is configured to connect to the backend API at `http://localhost:5000/api`. If your backend is running on a different port or URL, you can create a `.env` file in the `frontend` root directory to override this.

frontend/.env
REACT_APP_API_URL=http://localhost:5000/api


If you don't create this file, the application will default to the correct URL for the local backend setup.

### Step 4: Run the Development Server

Start the React development server.

yarn start


This will automatically open the application in your default web browser, usually at [**http://localhost:3000**](http://localhost:3000).

The application will now be running, connected to your local backend server. You can start creating projects, adding tasks, and interacting with the AI assistant.

### Available Scripts

-   `yarn start`: Starts the application in development mode.
-   `yarn build`: Creates a production-ready build of the application in the `build` folder.
-   `yarn test`: Runs the test suite (if any tests are configured).
