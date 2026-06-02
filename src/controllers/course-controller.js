import Course from "../models/course.js";

// Crear un nuevo curso

export const createCourse = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      nivel,
      duracion,
      precio,
      categoria,
      imagenPortada,
      contenido,
      instructor,
    } = req.body;

    if (!titulo || !descripcion || !nivel || !duracion || !precio) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be completed",
      });
    }

    const newCourse = new Course({
      titulo,
      descripcion,
      nivel,
      duracion,
      precio,
      categoria,
      imagenPortada,
      contenido,
      instructor: instructor || req.usuario?.id,
    });

    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error("Create course error:", error.message);

    res.status(500).json({
      success: false,
      message: "Error creating course",
      error: error.message,
    });
  }
};


// obtener todos los cursos

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate(
      "instructor",
      "nombre email"
    );

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: error.message,
    });
  }
};


// obtener un curso por ID

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      "instructor",
      "nombre email"
    );

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching course",
      error: error.message,
    });
  }
};


// Actualizar un curso

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating course",
      error: error.message,
    });
  }
};


// Eliminar un curso

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message,
    });
  }
};


// Obtener el contenido de un curso

export const getCourseContent = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        titulo: course.titulo,
        contenido: course.contenido,
      },
    });
  } catch (error) {
    console.error("Get content error:", error.message);

    res.status(500).json({
      success: false,
      message: "Error fetching course content",
      error: error.message,
    });
  }
};