var express = require('express');
var router = express.Router();
const { Car, validateCreateCar, validateUpdateCar} = require("../model/Car");

/* GET All Cars */
router.get('/', async function(req, res, next) {
  try {
    const cars = await Car.find();
    res.status(200).json({
    message: "Cars Featched Successfully",
    data: cars
    })
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong"
    })
  }
})



/* Get Car By ID */
router.get('/:id', async function(req, res, next) {
  try {
    const car = await Car.findById(req.params.id);
    if (car) {
      res.status(200).json({
        message: "Car Featched Successfully",
        data: car
      })
    } else {
      res.status(404).json({
        message: "Car Not Found",
      })
    }
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong"
    })
  }
})


/* Create New Car */
router.post('/', async function(req, res, next) {
  try {
    const { error } = validateCreateCar(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    })
  }

  const car = new Car({
    modelName: req.body.modelName,
    releaseYear: req.body.releaseYear,
    nationality: req.body.nationality,
    color: req.body.color
  })

  const result = await car.save();
  res.status(201).json(result);

  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong"
    })
  }
})



/* Update Car By ID */
router.put("/:id", async function(req, res, next) {
  try {
    const {error} = validateUpdateCar(req.body);

  if (error) {
    res.status(400).json({
      message: error.details[0].message
    })
  }

  const car = await Car.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        modelName: req.body.modelName,
        releaseYear: req.body.releaseYear,
        nationality: req.body.nationality,
        color: req.body.color,
      },
    },
    { new: true }
  )

  res.status(200).json({
    message: "Car Updated Successfully",
    data: car
  })

  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong"
    })
  }
})


// Delete Car
router.delete("/:id", async function (req, res) {
  const car = await Car.findById(req.params.id);
  if (car) {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car has been deleted" });
  } else {
    res.status(404).json({ message: "Car not found" });
  }
});


module.exports = router;