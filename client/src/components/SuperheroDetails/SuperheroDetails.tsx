import type { superHero } from "../../types/types";
import { Link } from "react-router-dom";
import styles from './SuperheroDetails.module.css';
import { BASE_URL } from "../../api";
import { nanoid } from "nanoid";

type SuperheroDetails = {
	heroDetails: superHero | null;
};

export default function SuperheroDetails({ heroDetails }: SuperheroDetails) {
  if (!heroDetails) return;

  const {nickname, real_name, origin_description, superpowers, catch_phrase, images} = heroDetails;

	return (
		<div className={styles.detailsContainer}>
			<div className={styles.buttonsContainer}>
				<Link className={styles.detailsContainerBtn} to="/superheroes">
					Back
				</Link>
				<button className={styles.detailsContainerBtn}>Edit</button>
			</div>
			<div className={styles.wrapper}>
				<div className={styles.avatarWrapper}>
					<img
						className={styles.avatar}
						src={`${BASE_URL}/${images[0]}`}
						alt="Superhero avatar"
					/>
				</div>
				<div>
					<h3>{nickname}</h3>
					<h4>{real_name}</h4>
					<p>{origin_description}</p>
					<p>{superpowers}</p>
					<p>{catch_phrase}</p>
				</div>
			</div>
			<ul className={styles.imagesList}>
				{images.map((image) => (
					<li>
						<img
							key={nanoid()}
							className={styles.image}
							src={`${BASE_URL}/${image}`}
							alt="Superhero"
						/>
					</li>
				))}
			</ul>
		</div>
	);
}