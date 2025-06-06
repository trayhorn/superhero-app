import type { superHero } from "../../types/types";
import { Link } from "react-router-dom";
import styles from './SuperheroDetails.module.css';

type SuperheroDetails = {
	heroDetails: superHero | null;
};

export default function SuperheroDetails({ heroDetails }: SuperheroDetails) {
  if (!heroDetails) return;

  const {nickname, real_name, origin_description, superpowers, catch_phrase} = heroDetails;

	return (
    <div className={styles.detailsContainer}>
      <Link to="/superheroes">Back</Link>
			<h3>{nickname}</h3>
			<h4>{real_name}</h4>
			<p>{origin_description}</p>
			<p>{superpowers}</p>
			<p>{catch_phrase}</p>
		</div>
	);
}