# Web Application Technology Stack

## Core Framework
- [Next.js](https://nextjs.org/docs) - React framework with App Router
  - Version: 14.x
  - Features used:
    - [App Router](https://nextjs.org/docs/app)
    - [Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components)
    - [API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
    - [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

## UI & Styling
- [Material-UI (MUI)](https://mui.com/material-ui/getting-started/) - Component library
  - Version: 5.x
  - Key components:
    - [Grid](https://mui.com/material-ui/react-grid/)
    - [Theme](https://mui.com/material-ui/customization/theming/)
    - [Transitions](https://mui.com/material-ui/transitions/)

- [SCSS Modules](https://github.com/css-modules/css-modules)
  - Features:
    - Local scope
    - Composition
    - Custom grid system
  - Integration: [Next.js SCSS Support](https://nextjs.org/docs/app/building-your-application/styling/sass)

## Animation
- [Framer Motion](https://www.framer.com/motion/) - Animation library
  - Version: 10.x
  - Features used:
    - [Animations](https://www.framer.com/motion/animation/)
    - [Gestures](https://www.framer.com/motion/gestures/)
    - [SVG Animations](https://www.framer.com/motion/svg/)
    - [Layout Animations](https://www.framer.com/motion/layout-animations/)

## State Management & Data Fetching
- [TanStack Query](https://tanstack.com/query/latest) - (Formerly React Query)
  - Version: 5.x
  - Features used:
    - [Queries](https://tanstack.com/query/latest/docs/framework/react/guides/queries)
    - [Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)
    - [Suspense](https://tanstack.com/query/latest/docs/framework/react/guides/suspense)
    - [SSR](https://tanstack.com/query/latest/docs/framework/react/guides/ssr)

## Internationalization
- [next-i18next](https://github.com/i18next/next-i18next)
  - Features:
    - Server-side rendering
    - Namespace support
    - Language detection
  - Integration guides:
    - [Basic setup](https://github.com/i18next/next-i18next#basic-setup)
    - [App Router config](https://github.com/i18next/next-i18next#app-directory)

## Development Tools

### TypeScript
- [TypeScript](https://www.typescriptlang.org/docs/)
  - Version: 5.x
  - Configuration: [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
  - Next.js integration: [Next.js TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

### Code Quality
- [ESLint](https://eslint.org/docs/latest/)
  - Plugins:
    - [@typescript-eslint](https://typescript-eslint.io/)
    - [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
    - [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)

- [Prettier](https://prettier.io/docs/en/)
  - Configuration: [Options](https://prettier.io/docs/en/options.html)
  - Integration: [ESLint config](https://github.com/prettier/eslint-config-prettier)

### Testing
- [Jest](https://jestjs.io/docs/getting-started)
  - Next.js integration: [Next.js Testing](https://nextjs.org/docs/app/building-your-application/testing/jest)

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - Integration: [Next.js example](https://github.com/vercel/next.js/tree/canary/examples/with-jest)

## Deployment & Hosting
- [Vercel](https://vercel.com/docs)
  - Features:
    - [Edge Functions](https://vercel.com/docs/functions/edge-functions)
    - [Analytics](https://vercel.com/docs/analytics)
    - [Image Optimization](https://vercel.com/docs/image-optimization)
    - [Web Analytics](https://vercel.com/docs/analytics)

## Asset Management
- [Sharp](https://sharp.pixelplumbing.com/) - Image processing
  - Next.js integration: Built-in with next/image

- Web Audio API
  - [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
  - Used for theme sound effects

## Version Control
- [Git](https://git-scm.com/doc)
- [GitHub](https://docs.github.com/en)
  - Features:
    - Actions for CI/CD
    - Package registry
    - Project management

## Package Management
- [npm](https://docs.npmjs.com/) / [yarn](https://yarnpkg.com/getting-started) (TBD)
  - Dependency management
  - Script running
  - Package publishing
