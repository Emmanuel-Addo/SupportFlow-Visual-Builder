import React from 'react';
import { Edit3, RotateCcw, HelpCircle, MessageSquare, ArrowRight } from 'lucide-react';

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

  // This function shows the answer buttons OR the restart button in chat
  function renderChatButtons() {
    // Find the node the chatbot is currently on
    const currentNode = flowData.nodes.find(n => n.id === chatNodeId);
    if (!currentNode) return null;

    // If this node has answer options, show them as buttons
    if (currentNode.options.length > 0) {
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

    // If no options, this is an end node — show the restart button
    return (
      <button
        onClick={restartChat}
        className="w-full bg-gray-900 hover:bg-gray-700 text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
      >
        <RotateCcw size={14} /> Restart Simulation
      </button>
    );
  }


  return (
    <aside className="w-[380px] bg-white border-l border-gray-200 flex flex-col p-6 overflow-y-auto">


      {/* ======= EDITOR MODE SIDEBAR ======= */}
      {currentMode === 'editor' && (
        <div className="flex-1 flex flex-col h-full">

          {/* If a card is selected, show its edit form */}
          {selectedNode ? (
            <div className="flex-1 space-y-5">

              {/* Title */}
              <div className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3">
                <Edit3 size={18} />
                Edit Node #{selectedNode.id}
              </div>

              {/* Text area to edit the question */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Question Text
                </label>
                <textarea
                  value={selectedNode.text}
                  onChange={(e) => updateNodeText(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-800 focus:border-gray-900 focus:bg-white outline-none h-24 resize-none transition-all"
                />
              </div>

              {/* Inputs to edit each answer option */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Answer Choices
                </label>

                {selectedNode.options.length > 0 ? (
                  <div className="space-y-3">
                    {selectedNode.options.map((opt, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-600 bg-gray-100 border border-gray-200 py-1.5 px-2 rounded-md font-mono shrink-0">
                          → #{opt.nextId}
                        </span>
                        <input
                          type="text"
                          value={opt.label}
                          onChange={(e) => updateOptionText(index, e.target.value)}
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 text-xs text-gray-800 focus:border-gray-900 focus:bg-white outline-none transition-all"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    End node — no answer choices.
                  </p>
                )}
              </div>
            </div>

          ) : (
            /* No card selected — show a hint */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
              <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
                <HelpCircle size={28} />
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Click a card to edit it</h3>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed max-w-[220px]">
                Select any node on the canvas to edit its question and answers.
              </p>
            </div>
          )}

          {/* Reset button at the bottom */}
          <div className="pt-4 border-t border-gray-100 mt-4">
            <button
              onClick={resetToDefault}
              className="w-full bg-white border border-gray-200 hover:border-gray-400 text-gray-500 hover:text-gray-900 text-xs font-semibold py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw size={14} /> Reset to Default
            </button>
          </div>
        </div>
      )}


      {/* ======= PREVIEW MODE SIDEBAR (CHATBOT) ======= */}
      {currentMode === 'preview' && (
        <div className="flex-1 flex flex-col h-full">

          {/* Title */}
          <div className="font-bold text-gray-900 text-base flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
            <MessageSquare size={18} />
            Bot Preview
          </div>

          {/* Chat message window */}
          <div
            id="chat-window"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-4 overflow-y-auto flex flex-col gap-3 mb-4 max-h-[440px]"
          >
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] text-xs leading-relaxed p-3 rounded-xl ${
                  message.sender === 'bot'
                    ? 'bg-white text-gray-800 self-start border border-gray-200 rounded-bl-none'
                    : 'bg-gray-900 text-white self-end rounded-br-none'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Answer buttons or Restart button */}
          {renderChatButtons()}

        </div>
      )}

    </aside>
  );
}
