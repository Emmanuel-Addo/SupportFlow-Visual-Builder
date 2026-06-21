import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, LayoutGrid, FileEdit, Play } from 'lucide-react';

// This is the main welcome page users see when they open the app
export default function Dashboard() {
  return (
    // Full page container - white background, dark text
    <div className="min-h-screen bg-white text-gray-900 font-sans flex flex-col">

      {/* ===== TOP HEADER BAR ===== */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8">
        {/* App name only - no icon */}
        <span className="font-bold text-lg text-gray-900 tracking-tight">SupportFlow AI</span>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-16 flex flex-col justify-center">

        {/* Two-column layout: left = text, right = template cards */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE - Welcome text and launch button */}
          <div className="space-y-6">

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Build support bots visually, not in spreadsheets.
            </h1>

            {/* Short description */}
            <p className="text-gray-500 text-base leading-relaxed">
              Design, test, and edit conversation flows in real-time. 
              Replace messy Excel sheets with a simple visual decision tree editor.
            </p>

            {/* Feature list */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} className="text-gray-900" />
                <span>Visual Flow Editor with connection lines</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} className="text-gray-900" />
                <span>Live Chatbot preview simulator</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} className="text-gray-900" />
                <span>Real-time text and branch editing</span>
              </div>
            </div>

            {/* Button to go to the Builder page */}
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold px-6 py-3.5 rounded-lg transition-all"
            >
              Launch Flow Builder <ArrowRight size={18} />
            </Link>
          </div>

          {/* RIGHT SIDE - Template cards panel */}
          <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">

            {/* Panel title */}
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
              <LayoutGrid size={18} /> Choose a Template
            </h3>

            {/* Template 1 - Active (links to builder) */}
            <Link
              to="/builder"
              className="group flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-900 transition-all"
            >
              <div className="p-3 bg-gray-100 text-gray-900 rounded-lg">
                <LayoutGrid size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-sm">Default Support Tree</h4>
                <p className="text-xs text-gray-500 mt-1">Billing and router connectivity support flow.</p>
              </div>
              <ArrowRight size={16} className="text-gray-300 group-hover:text-gray-900 mt-1 transition-colors" />
            </Link>

            {/* Template 2 - Disabled preview card */}
            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 opacity-50">
              <div className="p-3 bg-gray-100 text-gray-400 rounded-lg">
                <FileEdit size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Lead Generation Flow</h4>
                <p className="text-xs text-gray-400 mt-1">Pre-qualify new visitors automatically.</p>
              </div>
            </div>

            {/* Template 3 - Disabled preview card */}
            <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 opacity-50">
              <div className="p-3 bg-gray-100 text-gray-400 rounded-lg">
                <Play size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Feedback Collector</h4>
                <p className="text-xs text-gray-400 mt-1">Gather ratings from customers post-purchase.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-gray-200 py-5 text-center text-xs text-gray-400">
        SupportFlow AI Visual Builder — Built in React + Tailwind CSS
      </footer>
    </div>
  );
}
