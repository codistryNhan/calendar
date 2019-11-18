let initialData = [
  {
    "id": 101,
    "patient": {"first_name": "Sterling", "last_name": "Archer"},
    "doctor_name": "Krieger Algemop",
    "time": "8:00",
    "kind": "New Patient",
    "date": "05-09-2016"
  },
  {
    "id": 102,
    "patient": {"first_name": "Cyril", "last_name": "Figis"},
    "doctor_name": "Krieger Algemop",
    "time": "8:30",
    "kind": "Follow-Up",
    "date": "05-09-2016"
  },
  {
    "id": 103,
    "patient": {"first_name": "Ray", "last_name": "Gilette"},
    "doctor_name": "Krieger Algemop",
    "time": "9:00",
    "kind": "Follow-Up",
    "date": "05-09-2016"
  }
];

class DataStore {
  constructor() {
    this.doctors = [
      {'id': 1, 'first_name':'Julius', 'last_name':'Hibbery'},
      {'id': 2, 'first_name':'Algemop', 'last_name':'Krieger'},
      {'id': 3, 'first_name':'Nick', 'last_name':'Riviera'},
    ];

    this.appts = initialData;
  };

  getAllDoctor() {
    return this.doctors;
  };

  getAllAppt({doctor_name, date}) {
    return this.appts.filter( each => {
      return (
        each.doctor_name === doctor_name && each.date === date
      );
    });
  };

  deleteAppt({id}) {
    let appts = this.appts;
    this.appts = appts.filter( appt => appt.id !== id);

    return (appts.length > this.appts.length) ? true : false;
  };

  addAppt(obj) {
    let filtered = this.appts.filter( appt => {
      appt.doctor_name === obj.doctor_name &&
      appt.date === obj.date &&
      appt.time === obj.time
    });

    if(filtered.length < 3) {
      obj.id = this.appts[this.appts.length - 1].id + 1;
      this.appts.push(obj);
      return true;
    }

    return false;
  };
}

module.exports = DataStore;
