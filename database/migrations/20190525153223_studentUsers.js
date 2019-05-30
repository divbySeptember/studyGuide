
exports.up = function(knex, Promise) {
  return knex.schema.createTable('studentsUsers', (tbl) => {

    tbl.increments();

    tbl
      .string('username', 255)
      .notNullable()
      .unique();
    tbl.string('password', 255).notNullable();
    tbl.string('fullName', 255).notNullable();
    tbl.string('email');
    tbl.string('studentImg');
  });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('studentsUsers');
};
