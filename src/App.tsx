import React from 'react';
import { TaskProvider } from './context/TaskContext'; // Assuming you create a TaskContext similarly
import ProjectDashboard from './components/ProjectDashboard';
import { Toaster } from 'react-hot-toast';
import { ProjectProvider } from './context/ProjectContext ';
import { AIProvider } from './context/AIContext ';

const App: React.FC = () => {
  return (
    // Wrap the app with your context providers
    <ProjectProvider>
      <TaskProvider>
        <AIProvider>
          <div className="bg-gray-900 text-white min-h-screen">
            <header className="p-4 bg-gray-800">
              <h1 className="text-xl font-bold text-center">Task Master PRO</h1>
            </header>
            <main className="p-4">
              <ProjectDashboard />
            </main>
            <Toaster position="bottom-right" />
          </div>
        </AIProvider>
      </TaskProvider>
    </ProjectProvider>
  );
};

export default App;
