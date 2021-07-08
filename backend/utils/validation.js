import Joi from "@hapi/joi";

const registerValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().min(6).required().messages({
      "string.base": `Merci de saisir une adresse email valide.`,
      "string.email": `Merci de saisir une adresse email valide.`,
      "string.empty": `Merci de saisir votre email.`,
      "string.min": `Votre email doit contenir au moins 6 caractères.`,
      "any.required": `Merci de saisir email.`,
    }),
    password: Joi.string().min(6).required().messages({
      "string.empty": `Merci de saisir un mot de passe.`,
      "string.min": `Votre mot de passe doit contenir au moins 6 caractères.`,
      "any.required": `Merci de saisir un mot de passe.`,
    }),
    confirmation: Joi.string().required().messages({
      "string.empty": `Merci de confirmer votre mot de passe.`,
      "any.required": `Merci de confirmer votre mot de passe.`,
    }),
  });
  return schema.validate(data);
};

const userUpdateValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().min(6).required().messages({
      "string.base": `Merci de saisir une adresse email valide.`,
      "string.email": `Merci de saisir une adresse email valide.`,
      "string.empty": `Merci de saisir votre adresse email.`,
      "any.required": `Merci de saisir votre adresse email.`,
    }),
    actualPassword: Joi.string().required().messages({
      "string.empty": `Merci de saisir votre mot de passe.`,
      "any.required": `Merci de saisir votre mot de passe.`,
    }),
    newPassword: Joi.string().min(6).allow("").messages({
      "string.min": `Votre nouveau mot de passe doit contenir au moins 6 caractères.`,
    }),
  });
  return schema.validate(data);
};

const carValidation = (data) => {
  const schema = Joi.object({
    idcar: Joi.any(),
    brand: Joi.string().required().messages({
      "string.empty": `Merci de saisir la marque du véhicule.`,
      "any.required": `Merci de saisir la marque du véhicule.`,
    }),
    serialNumber: Joi.string().required().messages({
      "string.empty": `Merci de saisir un n° de série.`,
      "any.required": `Merci de saisir un n° de série.`,
    }),
    horsePower: Joi.number().required().messages({
      "number.base": `Merci de saisir la puissance du véhicule en chevaux.`,
      "number.empty": `Merci de saisir la puissance du véhicule en chevaux.`,
      "any.required": `Merci de saisir la puissance du véhicule en chevaux.`,
    }),
  });
  return schema.validate(data);
};

export { registerValidation, carValidation, userUpdateValidation };
