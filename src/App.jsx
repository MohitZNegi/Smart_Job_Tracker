import "./App.css";
import SearchBar from "./components/SearchBar";
import JobList from "./components/JobList";
import SavedJobs from "./components/SavedJobs";

function App() {
  return (
    <>
      <SearchBar />
      <SavedJobs />
      <JobList />
    </>
  );
}

export default App;
