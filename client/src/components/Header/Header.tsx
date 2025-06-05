import styles from './Header.module.css';

type Header = {
  openModal: () => void;
}

export default function Header({openModal}: Header) {
	return (
		<header className={styles.header}>
			<h1 className={styles.header_title}>Superheroes</h1>
			<button className={styles.header_button} onClick={openModal}>
				Add
			</button>
		</header>
	);
}