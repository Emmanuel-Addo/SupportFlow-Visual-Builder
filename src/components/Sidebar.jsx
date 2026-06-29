import React from 'react';
import { Edit3, RotateCcw, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';

// Sidebar component - shown on the right side of the Builder page
// In Editor mode: shows a form to edit the selected node
// In Preview mode: shows the chatbot simulator
export default function Sidebar({
  flowData,
  selectedNode,
  updateNodeText,
  updateOptionText,
  resetToDefault,
  currentMode,
  chatHistory,
  chatNodeId,
  handleChatChoice,
  restartChat
}) {
  return (
    <aside className="w-[380px] bg-white border-l border-gray-200 flex flex-col p-6 overflow-y-auto">

      {/*
          SECTION 1: EDITOR SIDEBAR
          Shown when the user is in "Editor Mode"
       */}
      {currentMode === 'editor' && (
        <div className="flex-1 flex flex-col h-full">

          {/* If a node card is selected, show its edit form */}
          {selectedNode ? (
            <div className="flex-1 space-y-5">

              {/* Sidebar title */}
              <div className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3">
                <Edit3 size={18} />
                Edit Node #{selectedNode.id}
              </div>

              {/* Text area to edit the question text */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Question / Prompt Text
                </label>
                <textarea
                  value={selectedNode.text}
                  onChange={(e) => updateNodeText(e.target.value)}
                  placeholder="Type the chatbot question here..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-800 focus:border-gray-900 focus:bg-white outline-none h-24 resize-none transition-all"
                />
              </div>

              {/* Inputs to edit each answer option */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Answer Choices
                </label>

                {/* Show inputs if there are options, otherwise show a message */}
                {selectedNode.options && selectedNode.options.length > 0 ? (
                  <div className="space-y-3">
                    {selectedNode.options.map((opt, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {/* Shows which node this answer leads to */}
                        <span className="text-[10px] font-bold text-gray-600 bg-gray-100 border border-gray-200 py-1.5 px-2 rounded-md font-mono shrink-0">
                          → Node #{opt.nextId}
                        </span>
                        {/* Editable answer label */}
                        <input
                          type="text"
                          value={opt.label}
                          onChange={(e) => updateOptionText(index, e.target.value)}
                          placeholder="Answer text..."
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-800 focus:border-gray-900 focus:bg-white outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  // Message for end nodes (no answer choices)
                  <p className="text-xs text-gray-400 italic">
                    This is an end node — no answer choices needed.
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* If no card is selected, show a guide message */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
                <HelpCircle size={28} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Visual Editor</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-[220px]">
                Click on any card in the flowchart to edit its question text and answer choices.
              </p>
            </div>
          )}

          {/* Reset button - always visible at the bottom */}
          <div className="pt-4 border-t border-gray-100 mt-4">
            <button
              onClick={resetToDefault}
              className="w-full bg-white border border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-900 text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw size={14} /> Reset to Default Data
            </button>
          </div>
        </div>
      )}

      {/*
          SECTION 2: PREVIEW CHATBOT SIMULATOR
          Shown when the user is in "Preview Mode"
       */}
      {currentMode === 'preview' && (
        <div className="flex-1 flex flex-col h-full">

          {/* Sidebar title */}
          <div className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
            <MessageSquare size={18} />
            Bot Preview Simulator
          </div>

          {/* Chat message history window */}
          <div
            id="chat-window"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-y-auto flex flex-col gap-3 mb-4 max-h-[440px]"
          >
            {chatHistory.map((message, index) => {
              const isBot = message.sender === 'bot';
              return (
                <div
                  key={index}
                  className={`max-w-[85%] text-xs leading-relaxed p-3 rounded-xl ${isBot
                    ? 'bg-white text-gray-800 self-start border border-gray-200 rounded-bl-none'  // Bot message: left side
                    : 'bg-gray-900 text-white self-end rounded-br-none'                            // User message: right side
                    }`}
                >
                  {message.text}
                </div>
              );
            })}
          </div>

          {/* Answer choice buttons OR Restart button */}
          <div>
            {/* Find the current node the chatbot is on */}
            {(() => {
              const currentNode = flowData.nodes.find(n => n.id === chatNodeId);

              if (!currentNode) return null;

              // If this node has answer options, show choice buttons
              if (currentNode.options && currentNode.options.length > 0) {
                return (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Select an answer:
                    </p>
                    {currentNode.options.map((opt, index) => (
                      <button
                        key={index}
                        onClick={() => handleChatChoice(opt.nextId, opt.label)}
                        className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-900 text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-between transition-all group"
                      >
                        <span>{opt.label}</span>
                        <ArrowRight size={13} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
                      </button>
                    ))}
                  </div>
                );
              }

              // If this is an end node (no answers), show the Restart button
              return (
                <button
                  onClick={restartChat}
                  className="w-full bg-gray-900 hover:bg-gray-700 text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw size={14} /> Restart Simulation
                </button>
              );
            })()}
          </div>

        </div>
      )}

    </aside>
  );
}
