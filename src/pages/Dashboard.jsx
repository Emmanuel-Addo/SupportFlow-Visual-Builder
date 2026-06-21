import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

// Dashboard - the first page users see when they open the app
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* Header - just the app name */}
      <header className="border-b border-gray-200 h-16 flex items-center px-8">
        <span className="font-bold text-lg text-gray-900">SupportFlow AI</span>
      </header>

      {/* Main content - two columns */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-20 flex items-center">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          {/* Left column - welcome text */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              Build support bots visually, not in spreadsheets.
            </h1>

            <p className="text-gray-500 text-base leading-relaxed">
              Design and test automated customer support conversation flows
              using a simple drag-and-view decision tree editor.
            </p>

            {/* Feature checklist */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} /> Visual flowchart editor with connection lines
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} /> Click any card to edit questions and answers
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} /> Preview mode to test the chatbot live
              </div>
            </div>

            {/* Launch button */}
            <Link
              to="/builder"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-all"
            >
              Launch Flow Builder <ArrowRight size={18} />
            </Link>
          </div>

          {/* Right column - info card */}
          <div className="border border-gray-200 rounded-2xl p-8 space-y-4">
            <h3 className="font-bold text-gray-900 text-base border-b border-gray-100 pb-4">
              What you can do
            </h3>

            <div className="space-y-4">
              <div className="p-4 border border-gray-100 rounded-xl">
                <h4 className="font-bold text-gray-900 text-sm">Edit Questions</h4>
                <p className="text-xs text-gray-500 mt-1">Click any node card to change the question text or answer choices.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl">
                <h4 className="font-bold text-gray-900 text-sm">Preview the Bot</h4>
                <p className="text-xs text-gray-500 mt-1">Switch to Preview Mode to simulate the chatbot as a real customer.</p>
              </div>
              <div className="p-4 border border-gray-100 rounded-xl">
                <h4 className="font-bold text-gray-900 text-sm">Search Nodes</h4>
                <p className="text-xs text-gray-500 mt-1">Use the search bar to find any question or answer instantly.</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400">
        SupportFlow AI Visual Builder — React + Tailwind CSS
      </footer>
    </div>
  );
}
