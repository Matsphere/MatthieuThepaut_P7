const dotenv = require("dotenv");
dotenv.config();
const Publication = require("../models/publication");

exports.getAllPublications = async (req, res, next) => {
  try {
    Publication.getAllPublications((err, data) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json(data);
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.createPublication = async (req, res, next) => {
  try {
    const publication = new Publication({
      author_id: req.body.author_id,
      title: req.body.title,
      text: req.body.text,
    });

    console.log(publication);

    Publication.createPublication(publication, (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(data);
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.modifyPublication = async (req, res, next) => {
  try {
    const publication = new Publication({
      text: req.body.text,
      id_publication: req.params.id,
    });
    Publication.modifyPublication(publication, (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({ message: "Publication modifiée" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.deletePublication = async (req, res, next) => {
  try {
    Publication.deletePublication(req.params.id, (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json({ message: "Publication supprimée" });
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

exports.feedback = async (req, res, next) => {
  try {
    const data = {
      id_user: req.body.id_user,
      vote: req.body.vote,
      id_publication: req.params.id,
      users_liked: req.body.users_liked,
      users_disliked: req.body.users_disliked,
    };

    Publication.feedback(data, (err, response) => {
      if (err) {
        return res.status(500).json(err);
      }

      return res.status(200).json(response);
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};
