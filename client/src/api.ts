import axios from "axios";
import type { superHero } from "./types/types";

axios.defaults.baseURL = "http://localhost:3000";

export const getAllHerousRequest = () => {
  return axios.get("/superhero");
}

export const getHeroByIdRequest = (id: string) => {
  return axios.get(`/superhero/${id}`);
}

export const addHeroRequest = (body: superHero) => {
	return axios.post("/superhero/create", body);
};

export const deleteHeroRequest = (id: string) => {
  return axios.delete(`/superhero/${id}`);
}