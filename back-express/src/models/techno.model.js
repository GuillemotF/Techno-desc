const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transform = techno => {
  const { _id, ...rest } = techno._doc;
  return { id: _id, ...rest };
};
const TechnoSchema = new Schema({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ["framework", "language", "test", "software"],
    required: true
  },
  tags: [{ type: String, required: true }],
  imgUrl: { type: String, required: true },
  desc: { type: String, required: true }
});

/**
 * Methods
 */

TechnoSchema.method({
  transform() {
    return transform(this);
  }
});

/**
 * Statics
 */

TechnoSchema.static({
  async findWithFilters(filters) {
    const technos = await this.find(filters);
    return technos.map(techno => transform(techno));
  },
  async updateById(id, techno) {
    const result = await this.findByIdAndUpdate(id, techno, {
      new: true,
      lean: true
    });
    return result;
  },
  checkDuplicateIdError(err) {
    if (err.code === 11000) {
      var error = new Error("ID already taken");
      error.errors = [
        {
          field: "id",
          location: "body",
          messages: ["Id already taken"]
        }
      ];
      error.status = 409;
      return error;
    }

    return err;
  }
});

/**
 * Register
 */
const TechnoModel = mongoose.model("Techno", TechnoSchema);
module.exports = TechnoModel;
