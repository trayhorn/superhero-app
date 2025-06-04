import { Superhero } from "../model/HeroModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";

const getAllHeroes = async (req, res, next) => {
  const superheroes = await Superhero.find({});
  res.status(200).json({
    message: "success",
    superheroes,
  })
}

const addHero = async (req, res, next) => {
  const newHero = await Superhero.create({ ...req.body });

  res.status(201).json({
    message: "success",
		newHero,
	});
}

const deleteHero = async (req, res, next) => {
  const { id } = req.params;

  const result = await Superhero.findByIdAndDelete(id);

  res.status(200).json({
    message: "success",
  });
}

const editHero = async (req, res, next) => {
  try {
    console.log("we are in try");
    const { id } = req.params;
    console.log(id);
    const heroToEdit = await Superhero.findById(id);
    console.log(heroToEdit);

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
  } catch (error) {
    next(error);
  }
}

export const ctrl = {
	getAllHeroes: ctrlWrapper(getAllHeroes),
	deleteHero: ctrlWrapper(deleteHero),
	addHero: ctrlWrapper(addHero),
	editHero: ctrlWrapper(editHero),
};