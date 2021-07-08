import express from "express";
import mysqlConnection from "../utils/connection.js";
import { isAuth } from "../utils/middleware.js";
import { carValidation } from "../utils/validation.js";

const router = express.Router();

router.get("/:iduser", isAuth, (req, res) => {
  const iduser = req.params.iduser;
  /* Get a car */
  mysqlConnection.query(
    `SELECT * from car WHERE iduser="${iduser}"`,
    (err, result, fields) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(400).send({
          message: "Récupération des véhicules impossible. Veuillez réessayer.",
        });
      }
    }
  );
});

router.post("/:iduser", isAuth, (req, res) => {
  const { error } = carValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const iduser = req.params.iduser;
  const car = {
    brand: req.body.brand,
    horsePower: req.body.horsePower,
    serialNumber: req.body.serialNumber,
  };
  /* Add new car */
  mysqlConnection.query(
    `INSERT INTO car (brand, horsepower, serialnumber, iduser) VALUES ("${car.brand}", "${car.horsePower}", "${car.serialNumber}", "${iduser}")`,
    (err, result, fields) => {
      if (!err) {
        return res.status(200).send({
          message: "Véhicule ajouté !",
        });
      } else {
        console.log(err);
        return res.status(400).send({
          message: "Ajout du véhicule impossible. Veuillez réessayer.",
        });
      }
    }
  );
});

router.put("/:idcar", isAuth, (req, res) => {
  const { error } = carValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const idcar = req.params.idcar;
  const car = {
    brand: req.body.brand,
    horsePower: req.body.horsePower,
    serialNumber: req.body.serialNumber,
  };
  /* Update a car */
  mysqlConnection.query(
    `UPDATE car SET brand="${car.brand}", horsepower="${car.horsePower}", serialnumber="${car.serialNumber}" WHERE idcar="${idcar}"`,
    (err, result, fields) => {
      if (!err) {
        return res.status(200).send({
          message: "Véhicule mis à jour !",
        });
      } else {
        return res.status(400).send({
          message: "Mise à jour du véhicule impossible. Veuillez réessayer.",
        });
      }
    }
  );
});

router.delete("/:idcar", isAuth, (req, res) => {
  const idcar = req.params.idcar;
  /* Delete a car */
  mysqlConnection.query(
    `DELETE FROM car WHERE idcar="${idcar}"`,
    (err, result, fields) => {
      if (!err) {
        return res.status(200).send({
          message: "Véhicule supprimé !",
        });
      } else {
        return res.status(400).send({
          message: "Suppression du véhicule impossible. Veuillez réessayer.",
        });
      }
    }
  );
});

export default router;
