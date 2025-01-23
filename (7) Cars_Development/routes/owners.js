var express = require('express');
var router = express.Router();
const { Owner, validateCreateOwner, validateUpdateOwner } = require("../model/Owner");

/* GET All Owners */
router.get('/', async function (req, res, next) {
  try {
    const owners = await Owner.find().populate("cars");
    res.status(200).json({
      message: "Owners fetched successfully",
      data: owners,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/* Get Owner By ID */
router.get('/:id', async function (req, res, next) {
  try {
    const owner = await Owner.findById(req.params.id).populate("cars");
    if (owner) {
      res.status(200).json({
        message: "Owner fetched successfully",
        data: owner,
      });
    } else {
      res.status(404).json({
        message: "Owner not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/* Create New Owner */
router.post('/', async function (req, res, next) {
  try {
    const { error } = validateCreateOwner(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const owner = new Owner({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      cars: req.body.cars,
    });

    const result = await owner.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/* Update Owner By ID */
router.put("/:id", async function (req, res, next) {
  try {
    const { error } = validateUpdateOwner(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const owner = await Owner.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          cars: req.body.cars,
        },
      },
      { new: true }
    );

    if (!owner) {
      return res.status(404).json({
        message: "Owner not found",
      });
    }

    res.status(200).json({
      message: "Owner updated successfully",
      data: owner,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

/* Delete Owner */
router.delete("/:id", async function (req, res) {
  try {
    const owner = await Owner.findById(req.params.id);
    if (owner) {
      await Owner.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Owner has been deleted" });
    } else {
      res.status(404).json({ message: "Owner not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
});

module.exports = router;