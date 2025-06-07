import { Superhero } from "../model/HeroModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import path from "path";
import fs from "fs/promises";

const dirname = import.meta.dirname;

const getAllHeroes = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
	const skip = (page - 1) * limit;

  const superheroes = await Superhero.find({}, "_id nickname images", {
    skip,
    limit
  });

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
  const { nickname } = req.body;
  const files = req.files;
  const imagesArray = [];

  await Promise.all(
    files.map(async (file) => {
      const { originalname, path: oldPath } = file;

      const heroDirName = nickname.toLowerCase().trim().replace(/\s+/g, "-");
      const imagesSaveDir = path.join(
				dirname,
				"../",
				"public",
				"images",
				heroDirName
			);

      await fs.mkdir(imagesSaveDir, { recursive: true });

      const imageUrl = path.join("images", heroDirName , originalname);
      imagesArray.push(imageUrl);

      await fs.rename(oldPath, path.join(imagesSaveDir, originalname));
    })
  )

  const newHero = await Superhero.create({ ...req.body, images: imagesArray });
  res.status(201).json(newHero);
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