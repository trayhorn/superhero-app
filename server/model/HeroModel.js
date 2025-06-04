import { Schema, model } from "mongoose";
import Joi from "joi";

const heroSchema = new Schema({
	nickname: {
		type: String,
		required: true,
	},
	real_name: {
		type: String,
		required: true,
	},
	origin_description: {
		type: String,
		required: true,
	},
	superpowers: {
		type: String,
		required: true,
	},
	catch_phrase: {
		type: String,
		required: true,
	},
}, {versionKey: false, timestamps: true});

export const Superhero = model("superhero", heroSchema, "superheroes");