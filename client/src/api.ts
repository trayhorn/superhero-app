import axios from "axios";

export const BASE_URL = "http://localhost:3000";

axios.defaults.baseURL = BASE_URL;

export const getAllHerousRequest = () => {
  return axios.get("/superhero");
}

export const getHeroByIdRequest = (id: string) => {
  return axios.get(`/superhero/${id}`);
}

export const addHeroRequest = (body: FormData) => {
	return axios.post("/superhero/create", body);
};

export const deleteHeroRequest = (id: string) => {
  return axios.delete(`/superhero/${id}`);
}