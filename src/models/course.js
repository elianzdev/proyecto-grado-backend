import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    pregunta: {
      type: String,
      required: true,
    },

    opciones: {
      type: [String],
      required: true,
    },

    respuestaCorrecta: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const lessonSchema = new mongoose.Schema(
  {
    tituloLeccion: {
      type: String,
      required: true,
    },

    descripcionLeccion: {
      type: String,
    },

    tipo: {
      type: String,
      enum: ["video", "documento", "quiz", "texto", "imagen"],
      default: "video",
    },

    videoUrl: String,

    archivoUrl: String,

    imagenUrl: String,

    contenidoTexto: String,

    preguntas: [questionSchema],
  },
  {
    _id: false,
  }
);

const moduleSchema = new mongoose.Schema(
  {
    modulo: {
      type: String,
      required: true,
    },

    lecciones: [lessonSchema],
  },
  {
    _id: false,
  }
);

const courseSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },

    descripcion: {
      type: String,
      required: true,
      trim: true,
    },

    nivel: {
      type: String,
      required: true,
      enum: ["Principiante", "Intermedio", "Avanzado"],
    },

    duracion: {
      type: String,
      required: true,
    },

    categoria: {
      type: String,
      default: "General",
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
    },

    imagenPortada: {
      type: String,
      default:
        "https://via.placeholder.com/600x400?text=Curso",
    },

    contenido: [moduleSchema],

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;