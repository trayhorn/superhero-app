import { Superhero } from "../model/HeroModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllHeroes = async (req, res) => {
  const superheroes = await Superhero.find({}, "-createdAt -updatedAt");

  res.status(200).json({
    message: "success",
    superheroes,
  })
}

const getHeroById = async (req, res) => {
  const { id } = req.params;
  const hero = await Superhero.findById(id);
  if (!hero) throw HttpError(400, "No such hero");
  res.status(200).json(hero);
}

const addHero = async (req, res) => {
  const newHero = await Superhero.create({ ...req.body });

  res.status(201).json({
		newHero,
	});
}

const deleteHero = async (req, res) => {
  const { id } = req.params;

  const result = await Superhero.findByIdAndDelete(id);

  if (!result) throw HttpError(400, "No such superhero");

  res.status(200).json({
    message: "success",
  });
}

const editHero = async (req, res) => {
  const { id } = req.params;
  const heroToEdit = await Superhero.findById(id);

  if (!heroToEdit) {
    throw HttpError(400, "No such superhero");
  }

  const updatedHero = await Superhero.findByIdAndUpdate(
    id,
    { ...req.body },
    { returnDocument: "after" }
  );

  res.status(200).json({
    message: "success",
    superhero: updatedHero,
  });
}

export const ctrl = {
  getAllHeroes: ctrlWrapper(getAllHeroes),
  getHeroById: ctrlWrapper(getHeroById),
	deleteHero: ctrlWrapper(deleteHero),
	addHero: ctrlWrapper(addHero),
	editHero: ctrlWrapper(editHero),
};