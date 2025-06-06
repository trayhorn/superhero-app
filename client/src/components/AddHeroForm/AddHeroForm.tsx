import type { superHero } from "../../types/types";
import styles from "./AddHeroForm.module.css";
import { Formik, Form, Field } from "formik";
// import { useEffect, useState } from "react";
import { addHeroRequest } from "../../api";

type Form = {
	handleHeroAdd: (newHero: superHero) => void;
	closeModal: () => void;
};

export default function AddHeroForm({ handleHeroAdd, closeModal }: Form) {
	// const [formData, setFormData] = useState<superHero | null>(null);

	// useEffect(() => {
	// 	const handleCreateHero = async () => {
	// 		if (formData) {
	// 			// const { data } = await addHeroRequest(formData);
	//       // handleHeroAdd(data.newHero);
	//       // setFormData(null);
	// 		}
	// 	};

	// 	handleCreateHero();
	// }, [formData, handleHeroAdd]);

	return (
		<Formik
			initialValues={{
				nickname: "",
				real_name: "",
				origin_description: "",
				superpowers: "",
				catch_phrase: "",
				avatar: null,
			}}
			onSubmit={async (values, actions) => {
				const formData = new FormData();

				Object.entries(values).forEach(([key, value]) => {
					if (key && value) formData.append(key, value);
				});

				const newHero = await addHeroRequest(formData);
				handleHeroAdd(newHero);

				closeModal();
				actions.resetForm();
			}}
		>
			{({ setFieldValue }) => (
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
					<Field
						as="textarea"
						type="text"
						name="superpowers"
						id="superpowers"
					/>

					<label htmlFor="catch_phrase">Catch phrase</label>
					<Field
						as="textarea"
						type="text"
						name="catch_phrase"
						id="catch_phrase"
					/>

					<label htmlFor="avatar">Avatar</label>
					<input
						type="file"
						name="avatar"
						id="avatar"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (e.currentTarget.files && e.currentTarget.files[0]) {
								setFieldValue("avatar", e.currentTarget.files[0]);
							}
						}}
					/>

					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	);
}