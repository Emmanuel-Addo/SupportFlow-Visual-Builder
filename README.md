# SupportFlow AI - Visual Flowchart Builder

SupportFlow AI is a web-based, visual decision-tree chatbot editor designed for customer support automation. It replaces complex, error-prone spreadsheets with an intuitive flowchart canvas where customer support managers can build, edit, and instantly preview support bot dialogue flows in real time.

---

## 🔗 Live Project Links
* **Live Deployment (Vercel):** [https://support-flow-visual-builder-tau.vercel.app/](https://support-flow-visual-builder-tau.vercel.app/)
* **Figma UI Design File:** [Figma Design System & Frames](https://www.figma.com/design/HjkuAIzN9NJBrvDh0KzOVz/Untitled?node-id=6-227&t=INS06fpd0c7s2sAY-1)

---

## 🎨 Design System & Visual Language
The visual design focuses on a clean, high-contrast, minimalist theme (white, off-white, and charcoal black) to keep visual clutter at a minimum:
* **Canvas:** Solid, clean off-white background (`#f8fafc`) ensuring node cards are highly legible.
* **Connectors:** Custom-drawn SVG bezier curves representing dialogue paths. They turn from a light grey to a thick dark charcoal line (`#1F2937`) when a connected node is active.
* **Color Semantics (Borders):**
  - **Emerald Green (`#10B981`):** Denotes the **Start Node** (the entry point of the chatbot).
  - **Charcoal Black (`#1F2937`):** Denotes standard **Question Nodes**.
  - **Rose Red (`#F43F5E`):** Denotes terminal **End Nodes** (leaf nodes where the conversation halts).

---

## 📁 Key File Directory & Architecture
The project is built on **React 18 + Vite + Tailwind CSS** with clean, modular routing:

* **[src/App.jsx](file:///c:/Users/use/Desktop/projects/SupportFlow-Visual-Builder/src/App.jsx):** Set up Router paths mapping `/` to the Dashboard, `/builder` to the Canvas Editor, and `/preview` to the Chatbot Simulator.
* **[src/pages/Dashboard.jsx](file:///c:/Users/use/Desktop/projects/SupportFlow-Visual-Builder/src/pages/Dashboard.jsx):** A premium landing dashboard page introducing the tool and linking directly to the editor.
* **[src/pages/Builder.jsx](file:///c:/Users/use/Desktop/projects/SupportFlow-Visual-Builder/src/pages/Builder.jsx):** The flowchart editor workspace that loads node layouts, computes coordinates, filters searches, and persists real-time text edits to `localStorage`.
* **[src/pages/Preview.jsx](file:///c:/Users/use/Desktop/projects/SupportFlow-Visual-Builder/src/pages/Preview.jsx):** Standalone route for testing the bot. It retrieves the updated configuration tree from `localStorage` to sync live edits instantly.
* **[src/components/Canvas.jsx](file:///c:/Users/use/Desktop/projects/SupportFlow-Visual-Builder/src/components/Canvas.jsx):** Dynamically draws curved SVG connector lines between parent nodes and child options without using external flowcharting libraries.
* **[src/components/NodeCard.jsx](file:///c:/Users/use/Desktop/projects/SupportFlow-Visual-Builder/src/components/NodeCard.jsx):** Renders individual nodes with custom typography, buttons, color border tags, and search highlight styling.
* **[src/components/Sidebar.jsx](file:///c:/Users/use/Desktop/projects/SupportFlow-Visual-Builder/src/components/Sidebar.jsx):** The form-based editing panel on the right side of the canvas for real-time text updates.
* **[src/components/ChatPreview.jsx](file:///c:/Users/use/Desktop/projects/SupportFlow-Visual-Builder/src/components/ChatPreview.jsx):** A centered chatbot chat bubble interface styled like ChatGPT, displaying message feeds and options traversal.
* **[design_system.html](file:///c:/Users/use/Desktop/projects/SupportFlow-Visual-Builder/design_system.html):** A printable specifications sheet of the Canvas, Cards, Connectors, and Swatches used for the Phase 1 deliverable.

---

## 🌟 The "Wildcard" Feature: Search & Highlight

### Why It Was Chosen (Business Value)
In real-world use cases, support trees grow very large (20+ nodes). Locating a specific dialogue box (for example, to update a policy on refund rules or hardware setups) becomes a tedious, slow visual chore. 

To solve this, we implemented **Search & Highlight** directly inside the editor header. It allows admins to search for keywords inside question text and choice button labels to locate correct nodes in milliseconds.

### Technical Implementation & UX Design
1. **Header Search Bar:** Captures input and updates the global `searchQuery` state.
2. **Focused Visual Ring:** When there is an active search, matching node cards scale up slightly (`scale-[1.03]`) and gain a thick black focus outline (`ring-4 ring-gray-900`).
3. **Canvas Dimming:** Non-matching node cards fade to 20% opacity (`opacity-20`) and disable pointer interactions (`pointer-events-none`) to highlight the searched nodes.
4. **Instant Reset:** Clearing the search input immediately restores the canvas opacity and card states.

---

## 🛠️ Getting Started

### Installation
```bash
# Install dependencies
yarn install
```

### Running Locally
```bash
# Launch development server
yarn dev
```
Open **`http://localhost:3000`** in your browser.

### Build Project
```bash
# Compile code bundle
yarn build
```
Vite will output the compiled bundle to the `/dist` directory.
