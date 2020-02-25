const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transform = tag => {
  const { _id, ...rest } = tag._doc;
  return { name: _id, ...rest };
};
const TagSchema = new Schema({
  _id: { type: String, required: true },
  color: {
    type: String,
    required: true
  }
});

/**
 * Methods
 */

TagSchema.method({
  transform() {
    const { _id, ...rest } = this;
    return { name: _id, ...rest };
  }
});

/**
 * Statics
 */

TagSchema.static({
  async findAll() {
    const tags = await this.find({});
    return tags.map(tag => transform(tag));
  },
  async checkIfTagsExist(tagNames) {
    const tags = await this.find({ _id: { $in: tagNames } });
    if (tags.length !== tagNames.length) {
      const dbTagNames = tags.map(tag => tag._id);
      let missingTags = [];
      tagNames.forEach(tagName => {
        if (!dbTagNames.includes(tagName)) {
          missingTags.push(tagName);
        }
      });
      throw new Error("Missing tags in db : " + missingTags.join(","));
    }
  },
  checkDuplicateTagError(err) {
    if (err.code === 11000) {
      var error = new Error("Tag name already taken");
      error.errors = [
        {
          field: "name",
          location: "body",
          messages: ["Name already taken"]
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

module.exports = mongoose.model("Tag", TagSchema);
