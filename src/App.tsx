import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HalideLanding from './components/ui/demo';
import ProjectsPage from './components/ui/projects-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HalideLanding />} />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
