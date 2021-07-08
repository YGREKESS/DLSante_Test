import express from "express";
import mysqlConnection from "../utils/connection.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { isAuth } from "../utils/middleware.js";
import {
  registerValidation,
  userUpdateValidation,
} from "../utils/validation.js";

const router = express.Router();

dotenv.config();

router.get("/:iduser", isAuth, (req, res) => {
  const iduser = req.params.iduser;
  mysqlConnection.query(
    `SELECT * from user WHERE iduser="${iduser}"`,
    (err, rows, fields) => {
      if (!err) {
        res.status(200).send(rows[0]);
      } else {
        res.status(400).send({
          message: "impossible de récupérer l'utilisateur.",
        });
      }
    }
  );
});

router.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  /* Check if email exist */
  mysqlConnection.query(
    `SELECT * from user WHERE email="${email}"`,
    (err, result, fields) => {
      if (err) {
        return res.status(400).send({
          message: "Impossible de procéder à l'authentification.",
        });
      }
      if (!result.length) {
        return res.status(400).send({
          message: "Nom d'utilisateur ou mot de passe incorrect.",
        });
      } else {
        /* Check the password */
        const validPassword = bcrypt.compareSync(password, result[0].password);
        if (!validPassword) {
          return res
            .status(400)
            .send({ message: "Nom d'utilisateur ou mot de passe incorrect." });
        }
        /* Set token */
        const token = jwt.sign(
          {
            _id: result[0].iduser,
            email: email,
          },
          process.env.TOKEN_SECRET
        );
        res.status(200).send({
          message: "Authentification réussie !",
          user: { _id: result[0].iduser, email: email, token: token },
        });
      }
    }
  );
});

router.post("/register", (req, res) => {
  /* Validate req.body */
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }
  const email = req.body.email;
  const password = req.body.password;
  const confirmation = req.body.confirmation;
  /* Check if password and confirmation are similare */
  if (password === confirmation) {
    /* Check if email exist */
    mysqlConnection.query(
      `SELECT * from user WHERE email="${email}"`,
      (err, result, fields) => {
        if (err) {
          return res.status(400).send({
            message: "Impossible de récupérer la liste des utilisateurs.",
          });
        }
        if (result.length) {
          return res.status(400).send({
            message: "Ce nom d'utilisateur est déjà enregistré.",
          });
        } else {
          /* Hash the password */
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);

          /* Post the new user */
          mysqlConnection.query(
            `INSERT INTO user (email, password) VALUES ("${email}", "${hashedPassword}")`,
            (err, rows, fields) => {
              if (!err) {
                return res.status(200).send({
                  message: "Inscription réussie !",
                });
              } else {
                return res.status(400).send({
                  message: "Impossible d'ajouter l'utilisateur.",
                });
              }
            }
          );
        }
      }
    );
  } else {
    return res.status(400).send({
      message: "Merci de saisir deux mots de passe identiques.",
    });
  }
});

router.put("/:iduser", isAuth, (req, res) => {
  console.log(req.body);
  const iduser = req.params.iduser;
  const email = req.body.email;
  const actualPassword = req.body.actualPassword;
  const newPassword = req.body.newPassword;

  /* Validate req.body */
  const { error } = userUpdateValidation(req.body);
  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  /* Check the password */
  mysqlConnection.query(
    `SELECT * from user WHERE iduser="${iduser}"`,
    (err, result, fields) => {
      if (err) {
        return res.status(400).send({
          message: "Utilisateur introuvable.",
        });
      } else {
        const validPassword = bcrypt.compareSync(
          actualPassword,
          result[0].password
        );
        if (!validPassword) {
          return res.status(400).send({ message: "Mot de passe invalide." });
        }
        /* Check if email already taken */
        mysqlConnection.query(
          `SELECT * from user WHERE iduser<>"${iduser}" AND email="${email}"`,
          (err, result, fields) => {
            if (err) {
              return res.status(400).send({
                message: "Utilisateur introuvable.",
              });
            }
            if (result.length) {
              return res.status(400).send({
                message: "Ce nom d'utilisateur est déjà enregistré.",
              });
            } else {
              /* Set the query */
              let query = `UPDATE user SET email="${email}"`;
              if (newPassword) {
                /* Hash the password */
                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(newPassword, salt);
                query = query + `, password="${hashedPassword}"`;
              }
              query = query + ` WHERE iduser="${iduser}"`;

              /* Update the user */
              mysqlConnection.query(query, (err, result, fields) => {
                if (!err) {
                  /* Set token */
                  const token = jwt.sign(
                    {
                      _id: iduser,
                      email: email,
                    },
                    process.env.TOKEN_SECRET
                  );
                  return res.header("auth-token", token).status(200).send({
                    message: "Modifications enregistrées !",
                    token: token,
                  });
                } else {
                  return res.status(400).send({
                    message: "Impossible de mettre à jour l'utilisateur.",
                  });
                }
              });
            }
          }
        );
      }
    }
  );
});

export default router;
