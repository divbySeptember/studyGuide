const bcrypt = require('bcryptjs')


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('teacherUsers')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('teacherUsers').insert([
        {
          username: 'lizdoyle1121',
          password: bcrypt.hashSync('1234', 10),
          fullName: 'Elizabeth Johnson',
          email: 'lizdoyle1121@gmail.com',
          teacherImg:
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
        }
      ]);
    });
};
