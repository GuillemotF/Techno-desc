const TagModel = require("../models/tag.model");

exports.find = async (req, res, next) => {
  try {
    const allTags = await TagModel.findAll();
    return res.json(allTags);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    await TagModel.create({
      _id: name,
      color
    });
    res.status(201).json({ success: true });
  } catch (error) {
    next(TagModel.checkDuplicateTagError(error));
  }
};
