import type { superHero } from "../../types/types";
import styles from "./HeroCard.module.css";

type HeroCard = {
	heroData: superHero;
};

export default function HeroCard({ heroData }: HeroCard) {

	const {nickname, real_name, origin_description, superpowers, catch_phrase} = heroData;

  return (
		<li className={styles.heroCard}>
			<h3 className={styles.nickname}>{nickname}</h3>
			<h4>{real_name}</h4>
			<p>{origin_description}</p>
			<p>{superpowers}</p>
			<p>{catch_phrase}</p>
		</li>
	);
}