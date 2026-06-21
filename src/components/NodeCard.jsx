import React from 'react';
import { ArrowRight } from 'lucide-react';

// One card on the flowchart board
export default function NodeCard({ node, selectedNodeId, setSelectedNodeId, searchQuery }) {

  // Does this card match what the user is searching for?
  const isMatch = node.text.toLowerCase().includes(searchQuery.toLowerCase());

  // Is this card currently selected (clicked)?
  const isSelected = selectedNodeId === node.id;

  // Is there an active search happening?
  const isSearching = searchQuery !== '';

  // Styles for each node type (green = start, grey = question, red = end)
  const typeStyles = {
    start:    { border: 'border-t-4 border-t-emerald-500', badge: 'bg-emerald-50 text-emerald-700' },
    question: { border: 'border-t-4 border-t-gray-800',   badge: 'bg-gray-100 text-gray-700'      },
    end:      { border: 'border-t-4 border-t-rose-500',   badge: 'bg-rose-50 text-rose-700'       },
  };

  // Get the style for this card's type
  const style = typeStyles[node.type];

  return (
    <div
      id={`node-${node.id}`}
      onClick={(e) => {
        e.stopPropagation(); // Don't deselect when clicking inside a card
        setSelectedNodeId(node.id);
      }}
      className={`
        absolute w-[250px] bg-white border border-gray-200 rounded-xl p-4
        cursor-pointer shadow-sm hover:shadow-md transition-all duration-200
        ${style.border}
        ${isSelected   ? 'ring-2 ring-gray-900 border-gray-900' : ''}
        ${isSearching && !isMatch ? 'opacity-20 pointer-events-none' : ''}
        ${isSearching &&  isMatch ? 'ring-4 ring-gray-900 scale-[1.03]' : ''}
      `}
      style={{ left: node.position.x, top: node.position.y }}
    >
      {/* Node type label (e.g. "start", "question", "end") */}
      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded inline-block mb-2 ${style.badge}`}>
        {node.type}
      </span>

      {/* The question or message text */}
      <p className="text-gray-800 text-xs font-semibold leading-relaxed">
        {node.text}
      </p>

      {/* Answer options list (only if this node has options) */}
      {node.options.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-100 flex flex-col gap-1.5">
          {node.options.map((opt, i) => (
            <span key={i} className="bg-gray-50 border border-gray-100 text-[10px] text-gray-500 py-1 px-2 rounded-md flex items-center gap-1.5">
              <ArrowRight size={10} className="text-gray-400" />
              {opt.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
