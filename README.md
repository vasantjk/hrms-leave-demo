# HRMS Leave Demo

A modern HRMS leave management UI demo built with React and Vite. It includes a leave request flow, approvals, and a team status dashboard with a light/dark theme toggle and responsive layout.

## Features

- Leave request form with validation-ready inputs
- Manager approvals workflow
- Team status dashboard
- Dark/light theme toggle
- Responsive desktop + mobile navigation

## Tech Stack

- React 19 + Vite
- Redux Toolkit + React Redux
- Tailwind CSS (via `@tailwindcss/vite`)
- PrimeReact + PrimeIcons
- Lucide icons

## Getting Started

1. `npm install`
2. `npm run dev`

The app runs on `http://localhost:3000` by default.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build
- `npm run lint` — TypeScript type-check
- `npm run lint:eslint` — run ESLint
- `npm run lint:fix` — auto-fix ESLint issues

## Project Structure

- `src/App.tsx` — main layout and view switching
- `src/components/` — UI components
- `src/context/ThemeContext.tsx` — theme state + toggle hook
- `src/store.ts` — Redux store
- `src/index.css` — global styles and PrimeReact overrides

## Deployment (Vercel CLI)

1. `npx vercel`
2. Build command: `npm run build`
3. Output directory: `dist`
4. `npx vercel deploy --prod`
