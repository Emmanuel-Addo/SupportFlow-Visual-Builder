import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Canvas from '../components/Canvas';
import Sidebar from '../components/Sidebar';

export default function Builder() {
  const navigate = useNavigate();

  // These are the app's variables (React calls them "state")
  const [flowData, setFlowData]             = useState(null);    // holds all node data
  const [backupData, setBackupData]         = useState(null);    // original copy for reset
  const [selectedNodeId, setSelectedNodeId] = useState(null);    // which card is clicked
  const [searchQuery, setSearchQuery]       = useState('');      // search bar text
  const [lineTrigger, setLineTrigger]       = useState(0);       // used to redraw lines

  // Step 1: Load the JSON file (from localStorage if exists, else fetch)
  useEffect(() => {
    const saved = localStorage.getItem('flow_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFlowData(parsed);
    }
    
    // Always fetch flow_data.json to keep a fresh backup copy
    fetch('/flow_data.json')
      .then(res => res.json())
      .then(data => {
        setBackupData(data);
        if (!saved) {
          setFlowData(data);
        }
      });
  }, []);

  // Step 2: Save flowData to localStorage whenever it changes
  useEffect(() => {
    if (flowData) {
      localStorage.setItem('flow_data', JSON.stringify(flowData));
    }
  }, [flowData]);

  // Step 3: Redraw the SVG lines when anything changes
  useEffect(() => {
    if (flowData) setLineTrigger(t => t + 1);
  }, [flowData, searchQuery]);

  // Navigate to Preview page
  function switchMode(mode) {
    if (mode === 'preview') {
      navigate('/preview');
    }
  }

  // Change the question text of the selected node card
  function updateNodeText(newText) {
    const updatedNodes = [];
    for (let i = 0; i < flowData.nodes.length; i++) {
      const node = flowData.nodes[i];
      if (node.id === selectedNodeId) {
        updatedNodes.push({ ...node, text: newText });
      } else {
        updatedNodes.push(node);
      }
    }
    setFlowData({ ...flowData, nodes: updatedNodes });
  }

  // Change the label of one answer option on the selected node
  function updateOptionText(optionIndex, newLabel) {
    const updatedNodes = [];
    for (let i = 0; i < flowData.nodes.length; i++) {
      const node = flowData.nodes[i];
      if (node.id !== selectedNodeId) {
        updatedNodes.push(node);
        continue;
      }
      const updatedOptions = [];
      for (let j = 0; j < node.options.length; j++) {
        if (j === optionIndex) {
          updatedOptions.push({ ...node.options[j], label: newLabel });
        } else {
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
    if (confirmed && backupData) {
      setFlowData(JSON.parse(JSON.stringify(backupData)));
      localStorage.setItem('flow_data', JSON.stringify(backupData));
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

  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-hidden">

      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentMode="editor"
        switchMode={switchMode}
      />

      <main className="flex-1 flex overflow-hidden">
        <Canvas
          flowData={flowData}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          searchQuery={searchQuery}
          lineTrigger={lineTrigger}
        />
        <Sidebar
          selectedNode={selectedNode}
          updateNodeText={updateNodeText}
          updateOptionText={updateOptionText}
          resetToDefault={resetToDefault}
          currentMode="editor"
        />
      </main>
    </div>
  );
}
