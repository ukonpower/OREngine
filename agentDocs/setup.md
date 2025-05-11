# OREngine Setup Guide

## Prerequisites

- Node.js (latest LTS version recommended)
- npm or yarn
- Modern web browser with WebGL 2.0 support

## Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd OREngine
```

2. Install dependencies:

```bash
npm install
```

3. Build the packages:

```bash
npm run build
```

## Development Setup

1. Start the development server:

```bash
npm run dev
```

2. Access the editor:

- Open `http://localhost:5173` in your web browser
- The editor interface should now be visible

## Project Configuration

Key configuration files:

- `vite.config.ts`: Main build configuration
- `tsconfig.json`: TypeScript configuration
- `.env`: Environment variables

## Building for Production

1. Create a production build:

```bash
npm run build
```

2. The built files will be located in the `dist` directory

## Testing

Run the test suites:

```bash
npm run test        # Run all tests
npm run test:e2e    # Run end-to-end tests
npm run test:unit   # Run unit tests
```

## Development Workflow

1. Make code changes in the appropriate package:

   - `packages/glpower/`: Core WebGL functionality
   - `packages/maxpower/`: Component system and features
   - `packages/orengine/`: Main engine and editor

2. Start the development server to see changes in real-time

3. Run tests to ensure nothing is broken

4. Build for production when ready to deploy
