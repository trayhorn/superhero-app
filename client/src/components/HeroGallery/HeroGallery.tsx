import HeroCard from "../HeroCard/HeroCard";
import type { superHero } from "../../types/types";
import styles from "./HeroGallery.module.css";

type HeroGallery = {
  heroes: superHero[];
};

export default function HeroGallery({ heroes }: HeroGallery) {
	return (
		<ul className={styles.heroGallery}>
			{heroes.map((hero) => (
				<HeroCard key={hero._id} heroData={hero} />
			))}
		</ul>
	);
}