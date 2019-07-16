
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohort',(c)=>{
      c.increments('id').primary();
      c.string('logo_url');
      c.string('name');
      c.text('members');
      c.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('cohort');
};
