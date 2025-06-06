import type { superHero } from "../../types/types";
import styles from "./HeroCard.module.css";
import { MdDelete } from "react-icons/md";
import { deleteHeroRequest } from "../../api";
import { Link } from "react-router-dom";

type HeroCard = {
	heroData: superHero;
	onDelete: (id: string) => void;
};

export default function HeroCard({ heroData, onDelete }: HeroCard) {

	const handleDeleteHero = async (e: React.MouseEvent, id: string | undefined) => {
		e.preventDefault();
		e.stopPropagation();

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
			<Link className={styles.link} to={`${_id}`}>
				<h3 className={styles.nickname}>{nickname}</h3>
				<h4>{real_name}</h4>
				<p>{origin_description}</p>
				<p>{superpowers}</p>
				<p>{catch_phrase}</p>

				<MdDelete
					className={styles.deleteIcon}
					onClick={(e) => handleDeleteHero(e, _id)}
				/>
			</Link>
		</li>
	);
}