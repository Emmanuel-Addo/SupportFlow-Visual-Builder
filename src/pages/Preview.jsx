import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ChatPreview from '../components/ChatPreview';

export default function Preview() {
  const navigate = useNavigate();

  // Component state
  const [flowData, setFlowData] = useState(null);
  const [chatNodeId, setChatNodeId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Dummy state for header component

  // Load the flow data from localStorage (or fallback to the JSON file)
  useEffect(() => {
    const saved = localStorage.getItem('flow_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFlowData(parsed);
      initializeChat(parsed);
    } else {
      fetch('/flow_data.json')
        .then(res => res.json())
        .then(data => {
          setFlowData(data);
          initializeChat(data);
        });
    }
  }, []);

  // Set up the initial greeting message when the chat loads
  function initializeChat(data) {
    const startNode = data.nodes.find(n => n.type === 'start');
    if (startNode) {
      setChatNodeId(startNode.id);
      setChatHistory([{ sender: 'bot', text: startNode.text }]);
    }
  }

  // Handle route switching between Editor and Preview
  function switchMode(mode) {
    if (mode === 'editor') {
      navigate('/builder');
    }
  }

  // Advance chat traversing based on selection choices
  function handleChatChoice(nextId, label) {
    const nextNode = flowData.nodes.find(n => n.id === nextId);
    if (!nextNode) return;

    const newHistory = [...chatHistory];
    newHistory.push({ sender: 'user', text: label });
    newHistory.push({ sender: 'bot', text: nextNode.text });

    setChatHistory(newHistory);
    setChatNodeId(nextId);
  }

  // Restart chat back from start node
  function restartChat() {
    if (flowData) {
      initializeChat(flowData);
    }
  }

  // Show a simple loading state while data fetches
  if (!flowData) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 text-sm">Loading Preview...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">
      
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentMode="preview"
        switchMode={switchMode}
      />

      <main className="flex-1 flex overflow-hidden">
        <ChatPreview
          flowData={flowData}
          chatHistory={chatHistory}
          chatNodeId={chatNodeId}
          handleChatChoice={handleChatChoice}
          restartChat={restartChat}
        />
      </main>

    </div>
  );
}
