# Product Catalog (Backend)

Welcome to the Apple Catalog Store Backend API documentation. This API serves as the backend for an online store that allows users to browse and purchase Apple products. This README provides an overview of the available endpoints and their functionalities.

## Base URL

The base URL for accessing the API is https://apple-catalog-api.onrender.com/. All endpoints should be appended to this base URL.

## Project Scripts

This project includes several helpful scripts that facilitate development, code formatting, linting, building, and running the application. These scripts are defined in the `package.json` file under the "scripts" section. They can be executed using the npm package manager.

### start

The `start` script is designed to run the application in a production environment. It first executes the `build` script to transpile the TypeScript code into JavaScript, and then it sets the `NODE_ENV` environment variable to "production" using `cross-env`. Finally, it runs the application by executing the `dist/index.js` file, which contains the entry point for the application.

Usage:

```bash
npm run start
```

### build

The `build` script is used to compile the TypeScript source code into JavaScript using the SWC compiler. It takes the files from the `src` directory and outputs the transpiled JavaScript files into the `dist` directory. This script is essential for preparing the project for production deployment.

Usage:

```bash
npm run build
```

### build-dev

The `build-dev` script is intended for development purposes. It sets the `NODE_ENV` environment variable to "development" using the `cross-env` package to indicate that the application is being built for a development environment. The script then runs the `build` script to transpile the TypeScript files into JavaScript, and it enables the Node.js inspector with the `--inspect` flag, allowing debugging with the Chrome DevTools. The built application is launched by running the `dist/index.js` file.

Usage:

```bash
npm run build-dev
```

### dev

The `dev` script is used for development with auto-reloading capabilities. It utilizes `nodemon`, a tool that monitors changes in the project's TypeScript files and automatically restarts the application whenever a change is detected. The `--ext ts` flag specifies that nodemon should watch for changes in TypeScript files, and `--exec` is used to specify the command to run when a change occurs. In this case, it runs the `build-dev` script, which transpiles the code and starts the application with debugging enabled.

Usage:

```bash
npm run dev
```

### format

The `format` script is used to automatically format the project's source code using Prettier. Prettier is a code formatter that enforces consistent code styles across the project. This script runs the Prettier command with the `--write` flag, which modifies the source files in place, applying the formatting rules defined in the project configuration. Additionally, it uses the `--ignore-path .gitignore` flag to exclude any files and directories specified in the `.gitignore` file from being formatted.

Usage:

```bash
npm run format
```

### lint

The `lint` script is responsible for running ESLint, a static code analysis tool, to check the TypeScript source code for potential errors and enforce code style rules. This script targets files with the `.ts` extension and applies ESLint rules to ensure code quality and consistency. Similar to the `format` script, it also uses the `--ignore-path .gitignore` flag to exclude files and directories listed in `.gitignore` from being linted.

Usage:

```bash
npm run lint
```

### fix

The `fix` script is a combination of the `format` and `lint` scripts. When executed, it first runs the `format` script to automatically format the code, and then it runs the `lint` script to identify and fix any linting issues in the project's TypeScript files.

Usage:

```bash
npm run fix
```

### prepare

The `prepare` script is executed automatically by npm during the installation of the project's dependencies. It is used to set up Husky, a tool that enables Git hooks in the project. In this case, it installs Husky, allowing you to define pre-commit and pre-push hooks for code quality checks and other tasks.

No need to execute this script manually. It runs automatically during `npm install`.
