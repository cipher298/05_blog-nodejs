const Course = require('../models/Courses');
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([
      Course.find({}).sortable(req),
      Course.countDocumentsWithDeleted({ deleted: true }),
    ])
      .then(([courses, deletedCount]) => {
        res.render('me/stored-courses', {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findWithDeleted({ deleted: true })
      .then((courses) =>
        res.render('me/trash-courses', {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  // [POST] /me/handle-form-actions
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case 'restore':
        Course.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;

      case 'force-delete':
        Course.deleteMany({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect('back'))
          .catch(next);
        break;

      default:
        res.json({ message: 'Invalid action' });
    }
  }
}

module.exports = new MeController();
