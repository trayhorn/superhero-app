import { useParams } from "react-router-dom";
import { getHeroByIdRequest } from "../../api";
import { useEffect, useState } from "react";
import type { superHero } from "../../types/types";
import SuperheroDetails from "../../components/SuperheroDetails/SuperheroDetails";

export default function SuperheroDetailsPage() {
	const { id } = useParams();

	const [heroDetails, setHeroDetails] = useState<superHero | null>(null);

	useEffect(() => {
		const handleGetHeroById = async (id: string) => {
			try {
				const { data } = await getHeroByIdRequest(id);
				setHeroDetails(data);
			} catch (error) {
				console.log(error);
			}
		};

		if (id) handleGetHeroById(id);
  }, [id]);

	return (
		<SuperheroDetails heroDetails={heroDetails} />
	);
}