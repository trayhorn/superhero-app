import './App.css';
import type { superHero } from './types/types';
import HeroGallery from './components/HeroGallery/HeroGallery';
import Header from './components/Header/Header';
import AddHeroForm from './components/AddHeroForm/AddHeroForm';
import { getAllHerousRequest } from "./api";
import { useCallback, useEffect, useState } from 'react';
import Modal from "react-modal";

Modal.setAppElement("#root");

const modalStyles = {
  content: {
		top: "50%",
		left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "30px 20px",
    maxWidth: "300px",
    height: "fit-content",
	},
};

function App() {
  const [heroes, setHeroes] = useState<superHero[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleHeroAdd = useCallback((newHero: superHero) => {
		setHeroes((prev) => [...prev, newHero]);
  }, []);
  
  const handleHeroDelete = useCallback((id: string) => {
    setHeroes(prev => prev.filter(hero => hero._id !== id));
  }, [])

  useEffect(() => {
    const fetchAllHerous = async () => {
      const { data } = await getAllHerousRequest();
      setHeroes(data.superheroes);
    }

    fetchAllHerous();
  }, [])

  return (
		<>
			<Header openModal={() => setIsModalOpen(true)} />
			<HeroGallery heroes={heroes} onDelete={handleHeroDelete} />

			<Modal style={modalStyles} isOpen={isModalOpen}>
				<AddHeroForm handleHeroAdd={handleHeroAdd} />
				<button className="modalButton" onClick={() => setIsModalOpen(false)}>
					Close
				</button>
			</Modal>
		</>
	);
}

export default App;
