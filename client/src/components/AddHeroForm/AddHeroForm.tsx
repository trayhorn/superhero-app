import type { superHero } from "../../types/types";
import styles from "./AddHeroForm.module.css";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { addHeroRequest } from "../../api";

type Form = {
  handleHeroAdd: (newHero: superHero) => void;
};

export default function AddHeroForm({ handleHeroAdd }: Form) {
	const [formData, setFormData] = useState<superHero | null>(null);

	useEffect(() => {
		const handleCreateHero = async () => {
			if (formData) {
				const { data } = await addHeroRequest(formData);
        handleHeroAdd(data.newHero);
        setFormData(null);
			}
		};

		handleCreateHero();
	}, [formData, handleHeroAdd]);

	return (
		<Formik
			initialValues={{
				nickname: "",
				real_name: "",
				origin_description: "",
				superpowers: "",
				catch_phrase: "",
			}}
			onSubmit={(values, actions) => {
				setFormData(values);
				actions.resetForm();
			}}
		>
			<Form className={styles.addHeroForm}>
				<label htmlFor="nickname">Nickname</label>
				<Field type="text" name="nickname" id="nickname" />

				<label htmlFor="real_name">Real name</label>
				<Field type="text" name="real_name" id="real_name" />

				<label htmlFor="origin_description">Origin description</label>
				<Field
					as="textarea"
					type="text"
					name="origin_description"
					id="origin_description"
				/>

				<label htmlFor="superpowers">Superpowers</label>
				<Field as="textarea" type="text" name="superpowers" id="superpowers" />

				<label htmlFor="catch_phrase">Catch phrase</label>
				<Field
					as="textarea"
					type="text"
					name="catch_phrase"
					id="catch_phrase"
				/>

				<button type="submit">Submit</button>
			</Form>
		</Formik>
	);
}