import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Edit3, Play, ArrowLeft } from 'lucide-react';

// Header component shown at the top of the Builder page
// It receives data and functions from the Builder page via "props"
export default function Header({ searchQuery, setSearchQuery, currentMode, switchMode }) {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between">

      {/* LEFT SIDE - Back link and app name */}
      <div className="flex items-center gap-4">

        {/* Link to go back to the Dashboard page */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors text-xs font-semibold"
        >
          <ArrowLeft size={16} /> Dashboard
        </Link>

        {/* Vertical divider line */}
        <div className="h-4 w-px bg-gray-200"></div>

        {/* App name - text only, no icon */}
        <span className="font-bold text-base text-gray-900 tracking-tight">
          SupportFlow AI
        </span>
      </div>

      {/* MIDDLE - Search bar (Wildcard Feature) */}
      {/* When the user types here, matching node cards glow on the canvas */}
      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-72 focus-within:border-gray-900 focus-within:bg-white transition-all">
        <Search className="text-gray-400 mr-2" size={15} />
        <input
          type="text"
          placeholder="Search questions or answers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-gray-800 text-xs w-full"
        />
      </div>

      {/* RIGHT SIDE - Editor / Preview mode toggle */}
      <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 gap-1">

        {/* Editor Mode button */}
        <button
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md font-semibold text-xs transition-all ${
            currentMode === 'editor'
              ? 'bg-white text-gray-900 shadow-sm'  // Active state
              : 'text-gray-500 hover:text-gray-800'  // Inactive state
          }`}
          onClick={() => switchMode('editor')}
        >
          <Edit3 size={14} /> Editor
        </button>

        {/* Preview Mode button */}
        <button
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-md font-semibold text-xs transition-all ${
            currentMode === 'preview'
              ? 'bg-white text-gray-900 shadow-sm'  // Active state
              : 'text-gray-500 hover:text-gray-800'  // Inactive state
          }`}
          onClick={() => switchMode('preview')}
        >
          <Play size={14} /> Preview
        </button>
      </div>

    </header>
  );
}
