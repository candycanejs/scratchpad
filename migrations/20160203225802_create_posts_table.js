
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('posts', (table) => {
    table.increments();
    table.string('title');
    table.text('body');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('posts');
};
