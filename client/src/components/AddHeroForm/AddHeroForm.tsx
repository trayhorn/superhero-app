import type { superHero } from "../../types/types";
import styles from "./AddHeroForm.module.css";
import { Formik, Form, Field } from "formik";
import { addHeroRequest } from "../../api";

type Form = {
	handleHeroAdd: (newHero: superHero) => void;
	closeModal: () => void;
};

export default function AddHeroForm({ handleHeroAdd, closeModal }: Form) {
	return (
		<Formik
			initialValues={{
				nickname: "",
				real_name: "",
				origin_description: "",
				superpowers: "",
				catch_phrase: "",
				images: [],
			}}
			onSubmit={async (values, actions) => {
				const formData = new FormData();

				formData.append("nickname", values.nickname);
				formData.append("real_name", values.real_name);
				formData.append("origin_description", values.origin_description);
				formData.append("superpowers", values.superpowers);
				formData.append("catch_phrase", values.catch_phrase);

				if (values.images && values.images.length > 0) {
					for (let i = 0; i < values.images.length; i++) {
						formData.append("images", values.images[i]);
					}
				}

				const { data } = await addHeroRequest(formData);
				handleHeroAdd(data);

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
						multiple
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							if (e.currentTarget.files) {
								setFieldValue("images", e.currentTarget.files);
								// console.log(e.currentTarget.files);
							}
						}}
					/>

					<button type="submit">Submit</button>
				</Form>
			)}
		</Formik>
	);
}