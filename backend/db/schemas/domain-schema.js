import { Schema } from "mongoose";

const DomainSchema = new Schema({
  domain: {
    type: String,
    required: true,
  },
  domainOwner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export { DomainSchema };
