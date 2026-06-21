import React from 'react';
import NodeCard from './NodeCard';

// Canvas component - the big board where all the node cards sit
export default function Canvas({ flowData, selectedNodeId, setSelectedNodeId, searchQuery, lineTrigger }) {

  // This function draws the curved lines between parent and child cards
  function drawLines() {
    const lines = []; // We'll collect all SVG lines here

    // Loop through every node
    for (const parentNode of flowData.nodes) {

      // Only draw lines if this node has answer options (children to connect to)
      if (parentNode.options.length === 0) continue;

      // Find this card's HTML element to get its actual width and height
      const parentEl = document.getElementById(`node-${parentNode.id}`);
      if (!parentEl) continue;

      // The line starts from the middle-right edge of the parent card
      const startX = parentNode.position.x + parentEl.offsetWidth;
      const startY = parentNode.position.y + parentEl.offsetHeight / 2;

      // Now loop through each answer option to draw a line to the child node
      for (const option of parentNode.options) {

        // Find the child node this option leads to
        const childNode = flowData.nodes.find(n => n.id === option.nextId);
        if (!childNode) continue;

        const childEl = document.getElementById(`node-${childNode.id}`);
        if (!childEl) continue;

        // The line ends at the middle-left edge of the child card
        const endX = childNode.position.x;
        const endY = childNode.position.y + childEl.offsetHeight / 2;

        // Draw a smooth curved line using SVG bezier curve
        // "M" = move to start point, "C" = curve with two control points
        const path = `M ${startX} ${startY} C ${startX + 50} ${startY}, ${endX - 50} ${endY}, ${endX} ${endY}`;

        // Highlight the line if this parent or child card is selected
        const isActive = parentNode.id === selectedNodeId || childNode.id === selectedNodeId;

        lines.push(
          <path
            key={`${parentNode.id}-${option.nextId}`}
            d={path}
            className={`connection-line ${isActive ? 'active' : ''}`}
          />
        );
      }
    }

    return lines;
  }

  return (
    // The scrollable canvas area - clicking here deselects any selected card
    <div
      className="flex-1 overflow-auto relative bg-white min-w-[1200px] min-h-[800px]"
      onClick={() => setSelectedNodeId(null)}
    >
      {/* SVG layer for drawing connector lines (sits behind the cards) */}
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
        <g key={lineTrigger}>
          {drawLines()}
        </g>
      </svg>

      {/* Card layer - all the node cards sit here on top */}
      <div className="absolute top-0 left-0 w-full h-full z-[2]">
        {flowData.nodes.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            selectedNodeId={selectedNodeId}
            setSelectedNodeId={setSelectedNodeId}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  );
}
