const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

router.post("/verify", async (req, res) => {
  const { token } = req.body;

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    );

    if (response.data.success) {
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

let port = 3000;
app.listen(port, () => {
  console.log(`QuickCaptcha server is running on port: ${port}`);
});
