var express = require("express");
var User = require("./models/user");
var router = express.Router();

router.post("/user", function(req, res, next) {
  //object destructuring assignment
  const { firstname, lastname, age } = req.body;
  const UserODM = new User({
    firstname: firstname,
    lastname: lastname,
    age: age
  });

  try {
    UserODM.save(function(err) {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      res.status(200).send(UserODM);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", function(req, res, next) {
  try {
    User.find(function(err, users) {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      res.status(200).send(users);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", function(req, res, next) {
  try {
    User.findById(req.params.id, function(err, user) {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      if (user) {
        user.remove();
        res.status(200).send("User Deleted successfully.");
        return;
      }
      res.status(404).send(`User not found with id . ${req.params.id}`);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/", function(req, res, next) {
  try {
    var query = { firstname: req.body.firstname };

    User.findByIdAndUpdate(req.body.id, req.body, function(err, user) {
      if (err) {
        res.status(400).send(err.message);
        return;
      }
      if (user) {
        res.status(200).send("User Updated successfully.");
        return;
      }
      res.status(404).send(`User not found with name . ${req.body.firstname}`);
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
