# Smart Job Tracker

Simple React + Redux app to search remote jobs, save jobs, and manage applications.

## What this project does

- Search remote jobs from the Remotive API.
- Debounced search (waits before calling API while typing).
- Save jobs for later.
- Open job application links directly.
- Hide/show saved jobs section.
- Basic query caching (same search does not refetch).
- Glassmorphism UI with cards, hover effects, header, and footer.

## Tech stack

- React 19
- Redux Toolkit
- React Redux
- Axios
- Vite
- CSS

## Project structure

- `src/main.jsx`
- App entry point.
- Wraps app with Redux `Provider`.

- `src/App.jsx`
- Main layout.
- Header + Search + Saved Jobs + Job List + Footer.

- `src/components/SearchBar.jsx`
- Controlled input for search text.
- Dispatches async fetch with debounce.

- `src/components/JobList.jsx`
- Reads `jobs`, `status`, and `error` from Redux.
- Renders loading, error, or job cards.

- `src/components/JobCard.jsx`
- Shows job details.
- Save button and apply link.

- `src/components/SavedJobs.jsx`
- Shows saved jobs from Redux.
- Remove button and apply link.
- Collapsible (hide/show) section.

- `src/redux/store.js`
- Configures Redux store.

- `src/redux/jobsSlice.js`
- Main state logic.
- Sync reducers + async thunk + cache logic.

## Architecture (simple)

- UI components dispatch actions.
- Redux slice handles all job state logic.
- Async API fetch runs through `createAsyncThunk`.
- Components read data from store with `useSelector`.
- This keeps UI and business logic separated.

## React concepts used

- Functional components.
- Props (example: `JobCard` receives a `job`).
- Local state with `useState` (saved jobs hide/show toggle).
- Side effects with `useEffect` (debounced search).
- Controlled input (search field value from Redux state).
- Conditional rendering (loading/error/empty states).
- List rendering with `map`.

## Redux async lifecycle used

This project uses `createAsyncThunk(fetchJobs)` with 3 lifecycle stages:

- `pending`
- Starts when request begins.
- Sets `status = "loading"` and clears old errors.
- If query exists in cache, it immediately uses cached data and skips loading flicker.

- `fulfilled`
- Runs when request succeeds.
- Sets `status = "succeeded"`.
- Stores jobs in `state.jobs`.
- Saves response in `cacheByQuery[query]`.

- `rejected`
- Runs when request fails.
- Sets `status = "failed"`.
- Stores error message in `state.error`.

## Caching basics in this project

- Query is normalized (`trim + lowercase`) to create a stable cache key.
- Cache is stored in Redux state as `cacheByQuery`.
- If user searches same query again, thunk returns cached jobs.
- API call is skipped for cached query.

## How to run

- Install dependencies:
- `npm install`

- Start dev server:
- `npm run dev`

## Notes

- API used: `https://remotive.com/api/remote-jobs`
- Default search is `react` when input is empty.
