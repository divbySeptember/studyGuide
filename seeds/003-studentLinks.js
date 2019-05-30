
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('studentLinks').del()
    .then(function () {
      // Inserts seed entries
      return knex('studentLinks').insert([
        {
          linkId: "1",
          url: "http://react.js",
          title: "React Js",
          description: " Learn React Js and how to manage state and pass props",
          notes: "new notes",
          categoryId: "1",
          categoryTitle: "Coding"
        },
        
      ]);
    });
};
