
const bcrypt = require('bcryptjs')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('studentsUsers')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('studentsUsers').insert([
        {
          username: 'ant305',
          password: bcrypt.hashSync('1234', 10),
          fullName: 'Anthony Johnson',
          email: 'anthonyseptember_dev@icloud.com',
          studentImg:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        }
      ]);
    });
};

