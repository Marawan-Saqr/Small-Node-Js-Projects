var express = require("express");
var router = express.Router();
const {
  Student,
  validateCreateStudent,
  validateUpdateStudent,
} = require("../models/student");

/* Check Server Is Work */
router.get("/", function (req, res, next) {
  try {
    res.status(200).json({ message: "Workded" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

/* Get All Students */
router.get("/allStudents", async function (req, res, next) {
  try {
    const studentList = await Student.find();
    res.status(200).json({
      message: "All Students Fetched Successfully",
      statusCode: 200,
      data: studentList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

/* Get Student By Id */
router.get("/:id", async function (req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      res.status(200).json({
        message: "Student Fetched Successfully",
        statusCode: 200,
        data: student,
      });
    } else {
      res.status(404).json({
        message: "Student Not Found",
        statusCode: 404,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});

/* Create Student */
router.post("/createStudent", async function (req, res, next) {
  const { error } = validateCreateStudent(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      grade: req.body.grade,
    });

    const result = await student.save();

    res.status(201).json({
      message: "Student Created Successfully",
      status: 201,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
});


/* Update Student */
router.put("/updateStudent/:id", async function(req, res, next) {

  const { error } = validateUpdateStudent(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }

  try {
    const book = await Student.findByIdAndUpdate(req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          grade: req.body.grade,
        },
      },
      { new: true }
    );
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: "Something Went Wrong",
    })
  }
})




router.delete("/deleteStudent/:id", async function(req, res, next) {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      await Student.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "student has been deleted" });
    } else {
      res.status(404).json({ message: "student not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something Error"
    })
  }
})


module.exports = router;