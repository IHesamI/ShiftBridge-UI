# React + TypeScript + Vite

A modern React application built with **TypeScript** and **Vite**, featuring hot module replacement (HMR) and ESLint for code quality.

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18.0.0 or higher recommended) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **pnpm** / **yarn** if you prefer

To verify your installation:

```bash
node -v
npm -v
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-name>
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Or with pnpm / yarn:

```bash
pnpm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
```

This will start the Vite dev server (usually at `http://localhost:5173`). The page will automatically reload when you make changes thanks to HMR.

---

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server with HMR |
| `npm run build` | Type-checks and builds the app for production into the `dist/` folder |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs ESLint to check for code issues |

---

## Project Structure

```
.
├── public/               # Static assets
├── src/                  # Application source code
│   ├── assets/           # Images, fonts, etc.
│   ├── App.tsx           # Root component
│   ├── main.tsx          # App entry point
│   └── vite-env.d.ts     # Vite type declarations
├── index.html            # HTML entry point
├── eslint.config.js      # ESLint configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Project metadata and scripts
```

---

## Production Build

To create an optimized production build:

```bash
npm run build
```

The output will be generated in the `dist/` directory. To preview it locally:

```bash
npm run preview
```

---

## Vite Plugins

Two official React plugins are available for Fast Refresh:

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)** — Uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs/) with [rolldown-vite](https://vite.dev/guide/rolldown))
- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)** — Uses [SWC](https://swc.rs/) for faster refresh

The default template uses `@vitejs/plugin-react`. You can swap to the SWC variant for faster builds if needed.

> ⚠️ **Note:** The React Compiler is currently **not compatible** with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for progress.

---

## ESLint Configuration

The template comes with a basic ESLint setup. For production applications, we recommend enabling **type-aware lint rules** for stricter type safety:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Replace tseslint.configs.recommended with:
      tseslint.configs.recommendedTypeChecked,
      // Or for stricter rules:
      // tseslint.configs.strictTypeChecked,
      // Optionally, add stylistic rules:
      // tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### React-specific lint rules

For React-specific linting, install the plugins:

```bash
npm install -D eslint-plugin-react-x eslint-plugin-react-dom
```

Then update `eslint.config.js`:

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

---

## Tech Stack

- **React** — UI library
- **TypeScript** — Type-safe JavaScript
- **Vite** — Fast build tool and dev server
- **ESLint** — Linting and code quality

---

## Troubleshooting

- **Port already in use?** Vite will automatically try the next available port, or you can specify one with `npm run dev -- --port 3000`.
- **Dependencies acting up?** Delete `node_modules` and `package-lock.json`, then reinstall with `npm install`.
- **Type errors during build?** Run `npm run build` to trigger type-checking, or check `tsconfig.json` for correct paths.

---

## License

This project is open source and available under the [MIT License](LICENSE).