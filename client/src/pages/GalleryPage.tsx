import { useCallback, useEffect, useState } from "react";
import HeroGallery from "../components/HeroGallery/HeroGallery";
import AddHeroForm from "../components/AddHeroForm/AddHeroForm";
import type { superHero } from "../types/types";
import { getAllHerousRequest } from "../api";
import Modal from "react-modal";
import CreateHeroBtn from "../components/CreateHeroBtn/CreateHeroBtn";

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

export default function GalleryPage() {
  const [heroes, setHeroes] = useState<superHero[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);

	const handleHeroAdd = useCallback((newHero: superHero) => {
		setHeroes((prev) => [...prev, newHero]);
	}, []);

	const handleHeroDelete = useCallback((id: string) => {
		setHeroes((prev) => prev.filter((hero) => hero._id !== id));
	}, []);

	const openModal = () => {
		setIsModalOpen(true);
	}

	const closeModal = () => {
		setIsModalOpen(false);
	};

	useEffect(() => {
		const fetchAllHerous = async () => {
			const { data } = await getAllHerousRequest(page);
			setHeroes(data.superheroes);
		};

		fetchAllHerous();
	}, [page]);

  return (
		<>
			<CreateHeroBtn openModal={openModal} />
			<HeroGallery heroes={heroes} onDelete={handleHeroDelete} />
			<button onClick={() => setPage(prev => prev++)}>Load more</button>

			<Modal style={modalStyles} isOpen={isModalOpen}>
				<AddHeroForm handleHeroAdd={handleHeroAdd} closeModal={closeModal} />
				<button className="modalButton" onClick={closeModal}>
					Close
				</button>
			</Modal>
		</>
	);
}