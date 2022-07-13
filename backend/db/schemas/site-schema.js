import { Schema } from "mongoose";
import { shortId } from "./types/short-id";

const SiteSchema = new Schema({
    siteId: shortId,

    siteName: {
        type: String,
        required: false,
    },
    domain: [
        {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: false,
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
