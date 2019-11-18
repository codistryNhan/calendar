const express = require('express');
const router = express.Router();
const moment = require('moment');

const DataStore = require('../../data-store');
const db = new DataStore();

/* Get All Doctors */
router.get('/doctors', function(req, res, next) {
  res.json(db.getAllDoctor());
});

/* Get Appointments by Doctor and Date */
router.get('/appt/:doctor_name/:date', function(req, res, next) {
  console.log(req.params.doctor_name, req.params.date);
  const obj = {
    doctor_name: req.params.doctor_name,
    date: req.params.date
  }

  res.json(db.getAllAppt(obj));
});

/* Delete Appointments by ID */
router.delete('/appt/:id', function(req, res, next) {
  const id = parseInt(req.params.id);
  res.json(db.deleteAppt({id}));
});

/* Add a new appointment */
router.post('/appt', function(req, res, next) {
  const doctor_name = req.body.doctor_name;
  const patient_first_name = req.body.patient.first_name;
  const patient_last_name = req.body.patient.last_name;
  const date = req.body.date;
  const time = req.body.time;
  const kind = req.body.kind;

  const obj = {
    doctor_name,
    patient: {
      first_name: patient_first_name,
      last_name: patient_last_name
    },
    date,
    time,
    kind
  };

  if(checkInterval(time, 15)) {
    res.json(db.addAppt(obj));
  } else {
    res.send("Error: Time can only be in 15 minute intervals");
  }
});

function checkInterval(time, minuteInterval) {
  time = parseInt(time.slice(2));
  return time % minuteInterval === 0;
}
module.exports = router;
