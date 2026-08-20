# Recurra — component structure

```
src/
├── App.jsx                       # toggles between Landing and Dashboard (swap for React Router)
├── data/
│   └── mockData.js                # all mock data — replace with API calls later
├── components/
│   ├── shared/
│   │   ├── Stamp.jsx               # the exam-stamp signature element
│   │   ├── ConfidenceBar.jsx
│   │   └── Highlight.jsx
│   ├── landing/
│   │   ├── Nav.jsx                 # responsive, hamburger menu below md
│   │   ├── Hero.jsx
│   │   ├── StatBar.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── ProductPreview.jsx
│   │   ├── CTA.jsx
│   │   └── Footer.jsx
│   └── dashboard/
│       ├── Sidebar.jsx             # fixed on desktop (lg+), off-canvas drawer on mobile
│       ├── Topbar.jsx
│       ├── DashboardView.jsx
│       ├── ClustersView.jsx
│       ├── PredictionsView.jsx
│       └── UploadView.jsx
└── pages/
    ├── Landing.jsx                 # composes the landing/ components
    └── Dashboard.jsx               # composes the dashboard/ components, owns tab + sidebar state
```

## Setup

```bash
npm create vite@latest recurra -- --template react
cd recurra
npm install tailwindcss @tailwindcss/vite lucide-react recharts
```

Copy the `src/` folder in, wire up Tailwind per their Vite plugin docs, then render `<App />` in `main.jsx`.

## Responsive breakpoints used

Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px.

- **Landing nav** collapses to a hamburger + slide-down panel below `md`.
- **Dashboard sidebar** is fixed at `lg`+; below that it becomes an off-canvas drawer opened via the hamburger icon in the topbar.
- **Stat grids** go from 2 columns on mobile to 4 on `lg`+.
- **Cards** (clusters, predictions) stack their metadata below `sm` and go inline above it.
- Font sizes, padding, and the Stamp component itself scale down a notch on small screens.

## Navigation between Landing and Dashboard

`App.jsx` owns a simple `view` state and passes callbacks down instead of any DOM-sniffing:

- `Landing` receives `onGetStarted` and forwards it to `Nav`, `Hero`, and `CTA` — each "Get started" / "Upload your first paper" button calls it directly.
- `Dashboard` receives `onExit`, wired to the Recurra logo button in `Sidebar` so there's a way back to the marketing page.

## Next steps

- Swap `App.jsx`'s state toggle for React Router (`react-router-dom`) — the routes are already noted in a comment there; `onGetStarted`/`onExit` become `navigate("/app")` / `navigate("/")`.
- Replace `data/mockData.js` with real API calls (React Query or plain fetch) once the Node backend is ready.
