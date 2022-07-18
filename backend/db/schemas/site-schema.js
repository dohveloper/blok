import mongoose, { Schema } from "mongoose";
const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(mongoose);

const SiteSchema = new Schema(
  {
    no: Number,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: "Standard",
    },
    font: {
      type: String,
      default: "Roboto",
    },
    colorSet: {
      type: new Schema({
        primary: {
          type: String,
          default: "#482924",
        },
        secondary: {
          type: String,
          default: "#123456",
        },
        background: {
          type: String,
          default: "#123456",
        },
        surface: {
          type: String,
          default: "#123456",
        },
      }),
    },
    blocks: {
      type: Object,
      required: false,
    },
  },
  {
    collection: "sites",
    timestamps: true,
  }
);

SiteSchema.plugin(autoIncrement.plugin, {
  model: "sites",
  field: "no",
  startAt: 1,
  incrementBy: 1,
});

export { SiteSchema };
