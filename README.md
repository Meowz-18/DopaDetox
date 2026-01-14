# DopaDetox 🧠✨

**Your Companion for Digital Wellness and Dopamine Control.**

DopaDetox is a modern web application designed to help you regain control over your attention span and habits. By tracking "low-dopamine" activities and visualizing your progress, this app aids in resetting your brain's reward system. Built with performance and user experience in mind using the latest web technologies.

---

## 🚀 Key Features

*   **📊 Interactive Dashboard**: Visualise your detox progress, streaks, and statistics with dynamic charts (powered by Chart.js).
*   **🎯 Activity Tracking**: Log and manage curated activities designed to replace high-dopamine habits.
*   **👤 User Profiles**: personalized settings and progress tracking protected by authentication.
*   **📚 Educational Resources**: Access a library of resources to understand dopamine and habit formation.
*   **🔐 Secure Authentication**: Powered by Supabase for reliable user management.
*   **📱 PWA Support**: Installable on mobile and desktop devices for a native-like experience.
*   **🎨 Modern UI/UX**: Built with Tailwind CSS and Framer Motion for a smooth, responsive, and beautiful interface.

## 🛠️ Technology Stack

*   **Frontend Framework**: [React 19](https://react.dev/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [clsx](https://github.com/lukeed/clsx)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Routing**: [React Router v7](https://reactrouter.com/)
*   **Backend / Database**: [Supabase](https://supabase.com/)
*   **State Management**: React Context API
*   **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

A quick look at the top-level files and directories you'll encounter:

```
DopaDetox/
├── src/
│   ├── components/      # Reusable UI components (Layouts, Charts, etc.)
│   ├── context/         # Global state management providers (UseDopaContext)
│   ├── pages/           # Main route components (Dashboard, Home, Activities)
│   ├── App.tsx          # Main application entry point & Routing setup
│   └── main.tsx         # React root rendering
├── deploy.bat           # Windows automation script for git push & deployment
├── package.json         # Project dependencies and scripts
├── .env                 # Environment variables (Supabase keys)
└── vite.config.ts       # Vite configuration
```

## ⚡ Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

*   [Node.js](https://nodejs.org/) (Latest LTS recommended)
*   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd DopaDetox
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📜 Scripts

*   `npm run dev`: Starts the local development server.
*   `npm run build`: Compiles the project for production (TypeScript check + Vite build).
*   `npm run lint`: Runs ESLint to check for code quality and errors.
*   `npm run preview`: Preview the production build locally.

## 🚢 Deployment & Automation

### `deploy.bat`
The project includes a Windows Batch script (`deploy.bat`) to streamline the deployment process. This script automates the following git operations:
1.  Checks `git status`.
2.  Stages all changes (`git add .`).
3.  Prompts for a commit message (defaults to "Auto-update").
4.  Commits the changes.
5.  Pushes to the `main` branch.

**Usage:**
Simply double-click `deploy.bat` or run it from the terminal:
```bash
./deploy.bat
```
*Note: This push is configured to automatically trigger a deployment on Netlify.*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---
*Built with ❤️ by the Antigravity Team*
