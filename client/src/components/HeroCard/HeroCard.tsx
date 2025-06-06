import type { superHero } from "../../types/types";
import styles from "./HeroCard.module.css";
import { MdDelete } from "react-icons/md";
import { deleteHeroRequest } from "../../api";

type HeroCard = {
	heroData: superHero;
	onDelete: (id: string) => void;
};

export default function HeroCard({ heroData, onDelete }: HeroCard) {
	const handleDeleteHero = async (id: string | undefined) => {
		if (id) {
			await deleteHeroRequest(id);
			onDelete(id);
		}
	};

	const {
		_id,
		nickname,
		real_name,
		origin_description,
		superpowers,
		catch_phrase,
	} = heroData;

	return (
		<li className={styles.heroCard}>
			<h3 className={styles.nickname}>{nickname}</h3>
			<h4>{real_name}</h4>
			<p>{origin_description}</p>
			<p>{superpowers}</p>
			<p>{catch_phrase}</p>

			<MdDelete className={styles.deleteIcon} onClick={() => handleDeleteHero(_id)} />
		</li>
	);
}