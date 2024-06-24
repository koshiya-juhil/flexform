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
    paymentDetails: {
      required: { type: Boolean, default: false },
      title: { type: String },
      stripe_publishable_key: { type: String },
      stripe_secret_key: { type: String },
      payment_mode: { type: String },
      interval: { type: String },
      interval_count: { type: Number },
      price: { type: Number },
      currency: { type: String }
    },
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