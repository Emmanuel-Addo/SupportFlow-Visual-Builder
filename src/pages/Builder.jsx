import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Canvas from '../components/Canvas';
import Sidebar from '../components/Sidebar';

// Builder page - this is the main flowchart editor
// It holds all the state (data) and passes it down to the components
export default function Builder() {

  // ---- STATE (the app's memory) ----
  const [flowData, setFlowData]             = useState(null);   // All the node data
  const [backupData, setBackupData]         = useState(null);   // Original data for reset
  const [selectedNodeId, setSelectedNodeId] = useState(null);   // Which card is selected
  const [currentMode, setCurrentMode]       = useState('editor'); // 'editor' or 'preview'
  const [searchQuery, setSearchQuery]       = useState('');     // Search text
  const [chatCurrentNodeId, setChatCurrentNodeId] = useState(null); // Chat position
  const [chatHistory, setChatHistory]       = useState([]);     // Chat messages
  const [lineTrigger, setLineTrigger]       = useState(0);      // Forces lines to redraw

  // ---- LOAD DATA ON STARTUP ----
  useEffect(() => {
    fetch('/flow_data.json')
      .then(res => res.json())
      .then(data => {
        setFlowData(data);
        setBackupData(JSON.parse(JSON.stringify(data))); // deep copy as backup
      });
  }, []);

  // ---- REDRAW LINES when data or search changes ----
  useEffect(() => {
    if (flowData) setLineTrigger(t => t + 1);
  }, [flowData, currentMode, searchQuery]);

  // ---- REDRAW LINES when window is resized ----
  useEffect(() => {
    window.addEventListener('resize', () => setLineTrigger(t => t + 1));
  }, []);

  // ---- SCROLL CHAT TO BOTTOM when new messages appear ----
  useEffect(() => {
    const chatWin = document.getElementById('chat-window');
    if (chatWin) chatWin.scrollTop = chatWin.scrollHeight;
  }, [chatHistory]);

  // ---- SWITCH MODE between editor and preview ----
  function switchMode(mode) {
    setCurrentMode(mode);

    // When switching to preview, start the chatbot from the beginning
    if (mode === 'preview') {
      const startNode = flowData.nodes.find(n => n.type === 'start');
      setChatCurrentNodeId(startNode.id);
      setChatHistory([{ sender: 'bot', text: startNode.text }]);
    }
  }

  // ---- CHATBOT: user clicks an answer option ----
  function handleChatChoice(nextId, choiceLabel) {
    const nextNode = flowData.nodes.find(n => n.id === nextId);

    setChatHistory([
      ...chatHistory,
      { sender: 'user', text: choiceLabel },      // Add user's choice
      { sender: 'bot',  text: nextNode.text },    // Add bot's reply
    ]);
    setChatCurrentNodeId(nextId);
  }

  // ---- CHATBOT: restart from the beginning ----
  function restartChatSimulation() {
    const startNode = flowData.nodes.find(n => n.type === 'start');
    setChatCurrentNodeId(startNode.id);
    setChatHistory([{ sender: 'bot', text: startNode.text }]);
  }

  // ---- EDIT a node's question text ----
  function updateNodeText(newText) {
    const updatedNodes = flowData.nodes.map(node => {
      if (node.id === selectedNodeId) return { ...node, text: newText };
      return node;
    });
    setFlowData({ ...flowData, nodes: updatedNodes });
  }

  // ---- EDIT an answer option label ----
  function updateOptionText(optionIndex, newLabel) {
    const updatedNodes = flowData.nodes.map(node => {
      if (node.id !== selectedNodeId) return node;
      const updatedOptions = node.options.map((opt, i) => {
        if (i === optionIndex) return { ...opt, label: newLabel };
        return opt;
      });
      return { ...node, options: updatedOptions };
    });
    setFlowData({ ...flowData, nodes: updatedNodes });
  }

  // ---- RESET all edits back to the original JSON data ----
  function resetToDefault() {
    if (window.confirm('Reset all changes back to the default data?')) {
      setFlowData(JSON.parse(JSON.stringify(backupData)));
      setSelectedNodeId(null);
    }
  }

  // Show a loading message while data is being fetched
  if (!flowData) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  // Find the full data object of the selected node
  const selectedNode = flowData.nodes.find(n => n.id === selectedNodeId);

  // ---- RENDER ----
  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentMode={currentMode}
        switchMode={switchMode}
      />

      <main className="flex-1 flex overflow-hidden">

        {/* Show canvas only in editor mode */}
        {currentMode === 'editor' && (
          <Canvas
            flowData={flowData}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
            searchQuery={searchQuery}
            lineTrigger={lineTrigger}
          />
        )}

        <Sidebar
          flowData={flowData}
          selectedNode={selectedNode}
          updateNodeText={updateNodeText}
          updateOptionText={updateOptionText}
          resetToDefault={resetToDefault}
          currentMode={currentMode}
          chatHistory={chatHistory}
          chatCurrentNodeId={chatCurrentNodeId}
          handleChatChoice={handleChatChoice}
          restartChatSimulation={restartChatSimulation}
        />

      </main>
    </div>
  );
}
