import "./App.css";
import SearchBar from "./components/SearchBar";
import JobList from "./components/JobList";
import SavedJobs from "./components/SavedJobs";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header glass-panel">
        <div>
          <p className="app-eyebrow">Smart Job Tracker</p>
          <h1>Find, Save, and Track Remote Opportunities</h1>
        </div>
      </header>

      <main className="app-main">
        <SearchBar />
        <SavedJobs />
        <JobList />
      </main>

      <footer className="app-footer glass-panel">
        <p>Built for focused job applications and faster follow-ups.</p>
      </footer>
    </div>
  );
}

export default App;
