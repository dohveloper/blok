import { Schema } from "mongoose";

const SiteSchema = new Schema({
  siteName: {
    type: String,
    required: true,
  },
  domain: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
  siteTemplete: {
    type: String,
    required: false,
  },
  siteFont: {
    type: String,
    required: false,
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
});

export { SiteSchema };
