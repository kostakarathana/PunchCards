# PunchCards 🎴

Generate structured XML task cards for AI coding assistants like GitHub Copilot and Cursor.

## Overview

PunchCards is a web application that helps you create well-structured task instructions for AI coding assistants. It provides three specialized workflows:

- **🐛 Bug Fix**: Systematic debugging with reproduction and verification
- **✨ Feature Request**: Skeleton-of-Thought architecture for new features
- **🔄 Feature Change**: Safe refactoring with impact analysis

## Features

- Simple, intuitive form-based interface
- Three specialized task card types
- Generates properly formatted XML output
- One-click copy to clipboard
- Ready for deployment on Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Deployment on Vercel

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel dashboard
3. Vercel will auto-detect Next.js and configure everything
4. Deploy!

Alternatively, use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Usage

1. Select a task type (Bug Fix, Feature Request, or Feature Change)
2. Fill out the form with relevant details
3. Click "Generate XML" to create the structured task card
4. Copy the XML and paste it into your AI assistant

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **React** - UI library
- **CSS** - Styling

## License

MIT