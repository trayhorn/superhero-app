import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import SuperheroDetailsPage from "./pages/SuperheroDetails/SuperheroDetailsPage";

function App() {
  return (
		<Routes>
			<Route path="/" element={<Navigate to="/superheroes" replace />} />
			<Route path="/superheroes" element={<GalleryPage />} />
			<Route path="/superheroes/:id" element={<SuperheroDetailsPage />} />
		</Routes>
	);
}

export default App;
