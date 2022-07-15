import { Schema } from "mongoose";

const SiteSchema = new Schema(
  {
    siteName: {
      type: String,
      required: true,
    },
    siteDomain: {
      type: Schema.Types.ObjectId,
      ref: "domain",
      required: true,
    },
    siteOwner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    siteURL: {
      type: String,
      required: true,
    },
    siteTheme: {
      type: String,
      required: true,
    },
    siteFont: {
      type: String,
      required: true,
    },
    siteColor: {
      type: new Schema({
        primaryColor: String,
        secondaryColor: String,
        backgroundColor: String,
        surfaceColor: String,
      }),
    },
    siteData: {
      type: Object,
      required: false,
    },
  },
  {
    collection: "sites",
    timestamps: true,
  }
);

export { SiteSchema };
