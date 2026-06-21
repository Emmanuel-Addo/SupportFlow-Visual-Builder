import React, { useEffect } from 'react';
import { MessageSquare, RotateCcw, ArrowRight } from 'lucide-react';

export default function ChatPreview({
  flowData,
  chatHistory,
  chatNodeId,
  handleChatChoice,
  restartChat
}) {

  // Auto-scroll the chat window to the bottom when new messages arrive
  useEffect(() => {
    const chatBox = document.getElementById('chat-window-centered');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [chatHistory]);

  // Find the node the chatbot is currently on
  const currentNode = flowData.nodes.find(n => n.id === chatNodeId);

  // Render the choice buttons or the restart button
  function renderChatOptions() {
    if (!currentNode) return null;

    // If there are answer options, render them as selection buttons
    if (currentNode.options.length > 0) {
      return (
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            Choose an answer:
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

    // If it is a leaf (end) node, show the restart button
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
    <div className="flex-1 bg-gray-50 flex items-center justify-center p-6">
      
      {/* Centered chat interface frame */}
      <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col h-[550px] overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-150 px-5 py-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
            <MessageSquare size={16} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xs">SupportFlow AI Chatbot</h3>
            <p className="text-[10px] text-gray-400">Live Simulator</p>
          </div>
        </div>

        {/* Scrollable message container */}
        <div
          id="chat-window-centered"
          className="flex-1 p-5 overflow-y-auto flex flex-col gap-3.5 bg-gray-50/50"
        >
          {chatHistory.map((message, index) => {
            const isBot = message.sender === 'bot';
            return (
              <div
                key={index}
                className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[85%] text-xs leading-relaxed p-3 rounded-2xl ${
                    isBot
                      ? 'bg-white text-gray-800 border border-gray-150 rounded-tl-none shadow-sm'
                      : 'bg-gray-900 text-white rounded-tr-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat input choices area */}
        <div className="p-4 bg-white border-t border-gray-100">
          {renderChatOptions()}
        </div>

      </div>
    </div>
  );
}
