const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");


// Gets all tags with associated data via Product model
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets specific tag by ID
router.get("/:id", async (req, res) => {

  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(400).json({ message: "No category found with this ID! 🚫" });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new tag given the tag_name in the request body
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Updates the tag name by ID
router.put("/:id", async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Deletes tag by the request parameter ID
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(400).json({ message: "No Tag found with this ID! 🚫" });
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;