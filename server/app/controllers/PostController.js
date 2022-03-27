import db from "../../database/init";
import logger from "../../utils/logger";
import upload from "../../config/multer";

class Post {
  async create(req, res) {
    upload.single("image")(req, res, async (fileError) => {
      try {
        // Error occured
        if (fileError !== undefined) {
          if (fileError.code == "LIMIT_FILE_SIZE")
            return res.status(400).json("Image is too big");
          else return res.status(400).json(fileError);
        }

        const { long, lat } = req.body;
        if (req.file) {
          // If the image is not the default, delete it from the folder
          await db.query(
            "INSERT INTO posts(lat, long, image) VALUES ($1,$2,$3)",
            [lat, long, `${req.file.filename}`]
          );
        }

        return res.status(200).json("Success");
      } catch (err) {
        logger.error(err);
        return res.status(500).json("Something went wrong");
      }
    }); // end of upload function
  }

  async get(req, res) {
    try {
      const data = await db.query("SELECT * FROM posts");

      return res.status(200).json(data.rows);
    } catch (err) {
      logger.error(err);
      return res.status(500).json("Oops");
    }
  }

  async clean(req, res) {
    try {
      const { id } = req.body;
      const userId = req.session.userid;
      console.log(userId)
      await db.query("UPDATE users SET points = points + 1 WHERE id = $1", [
        userId,
      ]);
      await db.query("DELETE FROM posts WHERE id = $1", [id]);

      return res.status(200).json("Good");
    } catch (err) {
      logger.error(err);
      return res.status(500).json("Oops");
    }
  }
}

export default new Post();
