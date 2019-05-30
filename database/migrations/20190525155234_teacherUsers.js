
exports.up = function(knex, Promise) {
    return knex.schema.createTable('teacherUsers', (tbl) => {
  
      tbl.increments();
  
      tbl
        .string('username', 255)
        .notNullable()
        .unique();
      tbl.string('password', 255).notNullable();
      tbl.string('fullName', 255).notNullable();
      tbl.string('email');
      tbl.string('teacherImg');
    });
  };
  
  exports.down = function(knex, Promise) {
      return knex.schema.dropTableIfExists('teacherUsers');
  };
