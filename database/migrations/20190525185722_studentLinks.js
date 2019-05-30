
exports.up = function(knex, Promise) {

    return knex.schema.createTable('studentsLinks', (tbl) => {

        tbl.increments();
    
        tbl
          .string('url', 255)
          .notNullable()
          .unique();
        tbl.string('title', 255).notNullable();
        tbl.string('description', 300).notNullable();
        tbl.string('notes', 255).notNullable();
        tbl.increments() 
        tbl.string('categoryTile', 255);
      });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('studentLinks');
  
};
