import express from "express";
import "dotenv/config";
import cors from 'cors';
import morgan from 'morgan';
import { ctrl } from "./controllers/controllers.js";
import { superHeroSchema } from "./model/HeroModel.js";
import validateBody from "./helpers/validateSchema.js";

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.get("/superhero", ctrl.getAllHeroes);

app.get("/superhero/:id", ctrl.getHeroById);

app.post("/superhero/create", validateBody(superHeroSchema), ctrl.addHero);

app.delete("/superhero/:id", ctrl.deleteHero);

app.put("/superhero/:id", validateBody(superHeroSchema), ctrl.editHero);

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
	res.status(status).json({ message });
});

export { app };