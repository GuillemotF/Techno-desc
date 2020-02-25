const axios = require("axios");
const FormData = require("form-data");
const config = require("../config");

module.exports = async img => {
  const form = new FormData();
  form.append("image", img.buffer, { filename: img.originalname });
  const res = await axios
    .post("https://api.imgbb.com/1/upload?key=" + config.imgBBKey, form, {
      headers: form.getHeaders()
    })
    .catch(err => {
      console.error(err);
      return null;
    });
  if (res && res.data && res.data.data) {
    return res.data.data.url;
  }
  return null;
};
