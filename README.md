# Jinlun Blog & Backend Services

This is my personal website and a hub for the backend services that power my applications.

## Tech Stack
- **Frontend**: Vue 3 + TypeScript + Vite (Deployed via GitHub Pages)
- **Backend (Serverless)**: 
    - **Data**: Static JSON files in `public/api/` (Served by GitHub Pages)
    - **Logic**: Go scripts executed via **GitHub Actions**
    - **Telemetry**: GitHub Issues API for data collection
- **Styling**: Vanilla CSS with a focus on rich aesthetics.

## Getting Started

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
go run main.go
```
