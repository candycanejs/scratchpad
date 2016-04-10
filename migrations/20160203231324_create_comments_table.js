
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('comments', (table) => {
    table.increments();
    table.text('body');
    table.integer('post_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
