const Course = require("../models/Courses");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
  // [GET] /home
  index(req, res, next) {
    Course.find()
      .then((courses) => {
        res.render("pages/home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  //   [GET] /search
  search(req, res) {
    res.render("pages/search");
  }
}

module.exports = new SiteController();
