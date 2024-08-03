const express = require("express");
const Post = require("../Modals/Post");

const cloudinary = require("cloudinary").v2;

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/post", async (req, res) => {
  const imageUrls = req.body.image_urls;

  const cloudinaryImageUrl = [];

  try {
    // Upload each image to Cloudinary
    for (const imageUrl of imageUrls) {
      const cloudinaryRes = await cloudinary.uploader.upload(imageUrl, {
        folder: "/e-com",
        format: "png",
      });

      //pushing the cloudinary url to array
      cloudinaryImageUrl.push({
        url: cloudinaryRes.secure_url,
      });
    }

    console.log(cloudinaryImageUrl);
    console.log("Images uploaded to cloudinary");

    //saving the post data into database
    const post = new Post({
      adTitle: req.body.adTitle,
      description: req.body.description,
      condition: req.body.condition,
      brand: req.body.brand,
      model: req.body.model,
      operatingSystem: req.body.operatingSystem,
      price: req.body.price,
      photos: cloudinaryImageUrl.map((image) => image.url),
      region: req.body.region,
      city: req.body.city,
      showPhoneNumber: req.body.showPhoneNumber,
      wantsInspection: req.body.wantsInspection,
      user: req.body.user,
    });

    post
      .save()
      .then(() => {
        console.log("Post saved");
        return res.status(200).json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ success: false });
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
