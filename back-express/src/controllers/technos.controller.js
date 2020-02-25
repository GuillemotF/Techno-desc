const TechnoModel = require("../models/techno.model");
const TagModel = require("../models/tag.model");
const uploadImg = require("../services/imgBB");
const APIError = require("../utils/errors");

exports.find = async (req, res, next) => {
  try {
    const { type, tags } = req.query;
    const filters = {};
    if (tags && JSON.parse(tags).length > 0) {
      filters.tags = { $in: JSON.parse(tags) };
    }
    if (type) {
      filters.type = type;
    }
    const technos = await TechnoModel.findWithFilters(filters);
    return res.json(technos);
  } catch (error) {
    return next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { type, title, id, desc, tags } = req.body;
    const imgUrl = await uploadImg(req.file);
    if (!imgUrl) {
      throw new APIError("img upload failed", 500);
    }
    if (tags && tags.length > 0) {
      await TagModel.checkIfTagsExist(tags);
    }
    await TechnoModel.create({
      _id: id,
      type,
      title,
      desc,
      imgUrl,
      tags
    });
    res.status(201).json({ success: true });
  } catch (error) {
    next(TechnoModel.checkDuplicateIdError(error));
  }
};

exports.update = async (req, res, next) => {
  try {
    const { type, title, id, desc } = req.body;
    let { tags } = req.body;
    const prevTechno = await TechnoModel.findById(id);
    if (!prevTechno) {
      throw new APIError("Techno not found", 404);
    }
    let imgUrl = prevTechno.imgUrl;
    if (req.file) {
      imgUrl = await uploadImg(req.file);
      if (!imgUrl) {
        throw new APIError("img upload failed", 500);
      }
    }
    if (tags && tags.length > 0) {
      await TagModel.checkIfTagsExist(tags);
    } else {
      tags = [];
    }
    const updatedTechno = await TechnoModel.updateById(id, {
      type,
      title,
      desc,
      imgUrl,
      tags
    });
    res.status(200).json(updatedTechno);
  } catch (error) {
    next(error);
  }
};
