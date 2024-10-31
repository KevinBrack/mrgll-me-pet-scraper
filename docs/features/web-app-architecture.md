# Web Application Architecture

## Core Concept

The application serves as a modern, performance-focused platform for World of Warcraft pet enthusiasts, providing AI-generated fan fiction about their favorite collectible companions. 

### Key Principles

1. **Focus on Storytelling**
   - AI-generated narratives about pet battles and interactions
   - Creative and engaging fan fiction content
   - Personalized stories featuring user-selected pets

2. **Minimalist Pet Reference**
   - Clean, streamlined pet information display
   - Essential details only - no bloat
   - Direct links to Wowhead for exhaustive information
   - Strategic offloading of complex data (acquisition methods, maps, etc.)

3. **Performance First**
   - Lightning-fast page loads
   - Snappy user interactions
   - Optimized asset delivery
   - Minimal dependencies

4. **User Experience**
   - Clean, modern interface
   - Intuitive navigation
   - Quick access to core features
   - Seamless Wowhead integration for detailed research

## Feature Set

### Landing Page
1. **Random Battle Showcase**
   - Randomly selected pre-generated battle on load
   - Display components:
     - Battle image
     - Title
     - Battle story
   - Instant refresh via logo click
   - Additional "Load Another" button

### Battle Generator Page
1. **Generation Interface (Proof of Concept)**
   - Single-click battle generation
   - Engaging loading animation
   - Stylized "thinking" logs during generation
   - *(Future: Pet selection interface)*

2. **Battle Display**
   - Generated image
   - Battle narrative
   - Participating pets with Wowhead links

3. **Share & Export Options**
   - Shareable battle URL
   - Download options:
     - Markdown format
     - PDF export
   - Social sharing integration

## Technical Stack

### Core Framework
- **Next.js (App Router)**
  - Server-side rendering
  - API routes
  - Optimized image handling
  - Vercel deployment integration

### UI Framework & Styling
- **Material-UI (MUI)**
  - Comprehensive component library
  - Theme customization
  - Responsive design system
  - Accessibility support
- **SCSS Modules**
  - Clean, maintainable styling
  - Custom grid system
  - Theme variables
  - Responsive mixins

### Animation & Interaction
- **Framer Motion**
  - Smooth page transitions
  - Loading state animations
  - SVG morphing
  - Gesture handling

### State Management & Data Fetching
- **Tanstack Query**
  - Server state management
  - Caching layer
  - Optimistic updates
  - Background refetching

### Internationalization
- **next-i18next**
  - Multi-language support (English/Spanish initially)
  - Namespace organization
  - Dynamic language switching
  - SEO optimization

### Technical Requirements

1. **Pre-generated Content Management**
   - Database of generated battles
   - Random selection algorithm
   - Efficient content loading

2. **Generation System**
   - AI integration
   - Image generation pipeline
   - Story generation service
   - Progress tracking

3. **Export System**
   - Markdown templating
   - PDF generation service
   - URL shortening/sharing service

### Theme System
1. **MUI Theme Configuration**
   - Three distinct themes:
     - **Bite Me** (Default)
       - Dracula-inspired dark theme
       - Deep purples and neon accents
       - Ignores system preferences like a boss
       - Vampire-friendly contrast ratios
     
     - **Blind Me**
       - Eye-searing light theme
       - For users who laugh in the face of retinal health
       - High contrast everything
       - "I love fluorescent office lighting" edition
     
     - **Mrgll Me**
       - The crown jewel of themes
       - Playful color palette
       - Animated SVG murloc background patterns
       - Murloc gurgle sound effects on theme switch
       - Complete UI translation to Nerglish
       - Easter eggs in hover states
       - Mrglglgl everything

2. **SCSS Architecture**
   - Global variables
   - Component-specific modules
   - Utility classes
   - Responsive breakpoints
   - Theme-specific mixins
   - SVG pattern management
   - Sound effect triggers

3. **Animation Patterns**
   - Page transitions
   - Loading states
   - Hover effects
   - Micro-interactions
   - Murloc animations
   - Theme switch transitions

4. **Internationalization Extensions**
   - Standard language support (en/es)
   - Special Nerglish translation layer
   - Dynamic theme-based language switching
   - Mrgl-friendly typography
   - Sound effect localization

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── [locale]/            # Locale-specific routes
│   │   ├── page.tsx         # Landing page
│   │   ├── generate/        # Battle generator
│   │   └── battle/[id]/     # Individual battle view
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
│
├── components/              # Shared components
│   ├── battle/             # Battle-related components
│   │   ├── BattleCard/
│   │   ├── GenerationProgress/
│   │   └── PetProfile/
│   ├── layout/             # Layout components
│   │   ├── Header/
│   │   ├── Footer/
│   │   └── Navigation/
│   └── shared/             # Common UI components
│       ├── Button/
│       ├── Card/
│       └── Loading/
│
├── styles/                 # Global styles and themes
│   ├── themes/             # MUI theme configurations
│   │   ├── bite-me.ts      # Dracula-inspired dark theme
│   │   ├── blind-me.ts     # Light theme
│   │   └── mrgll-me.ts     # Murloc paradise theme
│   ├── scss/              # SCSS files
│   │   ├── variables/
│   │   ├── mixins/
│   │   └── global/
│   ├── animations/        # Framer Motion animations
│   └── sounds/           # Theme-specific sound effects
│
├── lib/                    # Utility functions and configs
│   ├── api/               # API utilities
│   ├── hooks/             # Custom hooks
│   └── utils/             # Helper functions
│
├── locales/               # i18n translations
│   ├── en/               # English translations
│   ├── es/               # Spanish translations
│   └── mrgl/             # Nerglish translations
│
└── types/                 # TypeScript type definitions
    ├── battle.ts
    ├── pet.ts
    └── api.ts
```

### Key Organizational Principles

1. **Locale-First Routing**
   - All pages under [locale] directory
   - Automatic language detection
   - SEO-friendly URLs (e.g., /es/generate)

2. **Component Organization**
   - Feature-based grouping
   - Shared components for reusability
   - Each component folder contains:
     ```
     ComponentName/
     ├── index.tsx
     ├── ComponentName.tsx
     ├── ComponentName.module.scss
     └── ComponentName.test.tsx
     ```

3. **Style Management**
   - Global SCSS variables and mixins
   - Component-specific modules
   - MUI theme customization
   - Animation presets

4. **Type Safety**
   - Shared type definitions
   - API response types
   - Component prop types
   - Strict TypeScript configuration
