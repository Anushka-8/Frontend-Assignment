// src/components/Sidebar.jsx
import { Home, Users, ClipboardList } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-700 h-screen p-4 flex flex-col">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Team Pulse
      </h1>
      <nav className="space-y-4">
        <a
          href="#"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <Home size={18} /> Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <Users size={18} /> Team Members
        </a>
        <a
          href="#"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
        >
          <ClipboardList size={18} /> Tasks
        </a>
      </nav>
    </aside>
  );
}
