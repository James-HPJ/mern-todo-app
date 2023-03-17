import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/Layout";
import NotesLayout from "./components/Notes/NotesLayout";

function App() {
  return (
    <Layout>
      <NotesLayout />
    </Layout>
  );
}

export default App;
