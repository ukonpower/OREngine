# OREngine Architecture

## Overview

OREngine is a WebGL/3D engine project that provides a component-based architecture for building 3D applications and games in the web browser.

## Core Packages

### glpower

Base WebGL utilities and core rendering functionality.

### maxpower

Higher-level components and systems built on top of glpower:

- Component system
- Entity management
- Geometry primitives
- Materials and shaders
- Post-processing
- Loaders (GLTF, etc.)

### orengine

Main engine package that ties everything together:

- Editor implementation
- Engine core
- React-based UI components

## Project Structure

```
OREngine/
├── packages/
│   ├── glpower/      # Core WebGL utilities
│   ├── maxpower/     # Component system & high-level features
│   └── orengine/     # Main engine & editor
├── plugins/          # Engine plugins
├── src/             # Demo implementation
└── tests/           # Test suites
```

## Key Components

1. **Renderer System**

   - Deferred rendering
   - Post-processing pipeline
   - PBR materials
   - Shadow mapping

2. **Component System**

   - Entity-Component architecture
   - Built-in components (Camera, Light, Mesh, etc.)
   - Custom component support

3. **Resource Management**

   - Asset loading & caching
   - Shader management
   - Texture handling

4. **Tools & Utilities**
   - Blender integration (BLidge)
   - GPU Compute capabilities
   - Geometry primitives
