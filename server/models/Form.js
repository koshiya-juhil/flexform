const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
    },
    formfields: [
      {
        text: { type: String, required: true },
        description: { type: String },
        type: { type: String, required: true },
        // disabled: { type: Boolean, default: false },
        // defaultvisibility: { type: Boolean, default: true },
        required: { type: Boolean, default: false },
        options: [
          {
            label: { type: String, required: true },
          },
        ],
      },
    ],
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "Users",
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
},{ timestamps: true });

const Form = mongoose.model('Forms', formSchema);
module.exports = Form;