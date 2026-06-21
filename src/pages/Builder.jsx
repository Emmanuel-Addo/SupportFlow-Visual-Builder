import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Canvas from '../components/Canvas';
import Sidebar from '../components/Sidebar';

export default function Builder() {

  // These are the app's variables (React calls them "state")
  const [flowData, setFlowData]             = useState(null);    // holds all node data
  const [backupData, setBackupData]         = useState(null);    // original copy for reset
  const [selectedNodeId, setSelectedNodeId] = useState(null);    // which card is clicked
  const [currentMode, setCurrentMode]       = useState('editor'); // editor or preview
  const [searchQuery, setSearchQuery]       = useState('');      // search bar text
  const [chatNodeId, setChatNodeId]         = useState(null);    // current chat node
  const [chatHistory, setChatHistory]       = useState([]);      // list of chat messages
  const [lineTrigger, setLineTrigger]       = useState(0);       // used to redraw lines


  // Step 1: Load the JSON file when the page opens
  useEffect(() => {
    fetch('/flow_data.json')
      .then(res => res.json())
      .then(data => {
        setFlowData(data);
        setBackupData(JSON.parse(JSON.stringify(data))); // save a copy to reset later
      });
  }, []);

  // Step 2: Redraw the SVG lines when anything changes
  useEffect(() => {
    if (flowData) setLineTrigger(t => t + 1);
  }, [flowData, currentMode, searchQuery]);

  // Step 3: Scroll chat to the bottom when a new message is added
  useEffect(() => {
    const chatBox = document.getElementById('chat-window');
    if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
  }, [chatHistory]);


  // Switch between Editor and Preview mode
  function switchMode(mode) {
    setCurrentMode(mode);

    // If switching to preview, start chat from the beginning
    if (mode === 'preview') {
      const startNode = flowData.nodes.find(n => n.type === 'start');
      setChatNodeId(startNode.id);
      setChatHistory([{ sender: 'bot', text: startNode.text }]);
    }
  }


  // User picks an answer in the chatbot preview
  function handleChatChoice(nextId, label) {
    // Find the next node based on the chosen answer
    const nextNode = flowData.nodes.find(n => n.id === nextId);

    // Add the user's choice and the bot's reply to the chat history
    const newHistory = [...chatHistory];
    newHistory.push({ sender: 'user', text: label });
    newHistory.push({ sender: 'bot',  text: nextNode.text });

    setChatHistory(newHistory);
    setChatNodeId(nextId);
  }


  // Restart the chat from node 1
  function restartChat() {
    const startNode = flowData.nodes.find(n => n.type === 'start');
    setChatNodeId(startNode.id);
    setChatHistory([{ sender: 'bot', text: startNode.text }]);
  }


  // Change the question text of the selected node card
  function updateNodeText(newText) {
    // Go through each node one by one
    const updatedNodes = [];

    for (let i = 0; i < flowData.nodes.length; i++) {
      const node = flowData.nodes[i];

      if (node.id === selectedNodeId) {
        // This is the node we are editing — update its text
        updatedNodes.push({ ...node, text: newText });
      } else {
        // This node is not selected — keep it the same
        updatedNodes.push(node);
      }
    }

    setFlowData({ ...flowData, nodes: updatedNodes });
  }


  // Change the label of one answer option on the selected node
  function updateOptionText(optionIndex, newLabel) {
    // Go through each node one by one
    const updatedNodes = [];

    for (let i = 0; i < flowData.nodes.length; i++) {
      const node = flowData.nodes[i];

      if (node.id !== selectedNodeId) {
        // Not the selected node — keep it the same
        updatedNodes.push(node);
        continue;
      }

      // This is the selected node — update one of its options
      const updatedOptions = [];

      for (let j = 0; j < node.options.length; j++) {
        if (j === optionIndex) {
          // This is the option we want to change
          updatedOptions.push({ ...node.options[j], label: newLabel });
        } else {
          // Keep this option the same
          updatedOptions.push(node.options[j]);
        }
      }

      updatedNodes.push({ ...node, options: updatedOptions });
    }

    setFlowData({ ...flowData, nodes: updatedNodes });
  }


  // Reset everything back to the original JSON data
  function resetToDefault() {
    const confirmed = window.confirm('Reset all changes?');
    if (confirmed) {
      setFlowData(JSON.parse(JSON.stringify(backupData)));
      setSelectedNodeId(null);
    }
  }


  // Show loading text while the JSON file is still being fetched
  if (!flowData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    );
  }

  // Find the full data of the selected node (if any card is clicked)
  const selectedNode = flowData.nodes.find(n => n.id === selectedNodeId);


  // Render the page
  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentMode={currentMode}
        switchMode={switchMode}
      />

      <main className="flex-1 flex overflow-hidden">

        {/* Only show the canvas in editor mode */}
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
          chatNodeId={chatNodeId}
          handleChatChoice={handleChatChoice}
          restartChat={restartChat}
        />

      </main>
    </div>
  );
}
