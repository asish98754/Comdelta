# Comdelta (React Native Expo App)

This project is an Expo-based React Native application with GitHub Actions CI/CD.

## Prerequisites

- Node.js 18+
- npm
- Expo CLI (optional, commands also run with `npx`)

## Run Locally

```bash
npm install
npm run start
```

Other scripts:

- `npm run android`
- `npm run ios`
- `npm run web`

## Git Setup

Initialize and connect your remote (if needed):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Daily Git Workflow

Create a branch:

```bash
git checkout -b feature/your-feature-name
```

Commit your changes:

```bash
git add .
git commit -m "Describe your change"
git push -u origin feature/your-feature-name
```

Open a Pull Request on GitHub to merge into `main`.

## CI/CD Pipeline

This repository includes two GitHub Actions workflows:

- `/.github/workflows/ci.yml`
  - Trigger: push to `main`/`master`, and pull requests
  - Runs: `npm ci`, `npx expo doctor`, `npx expo export --platform web`

- `/.github/workflows/cd.yml`
  - Trigger: push to `main`/`master` and manual dispatch
  - Builds Expo web export and deploys to GitHub Pages

### Enable Deployment

In your GitHub repository:

1. Go to **Settings > Pages**
2. Set **Source** to **GitHub Actions**

After that, every push to `main` (or `master`) will trigger automatic deployment.

## Useful Commands

```bash
git status
git pull
git log --oneline --graph --decorate
```
