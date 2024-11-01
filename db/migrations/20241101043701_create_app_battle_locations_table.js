/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('app_battle_locations', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('lore').notNullable();
    table.text('image_prompt').notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('app_battle_locations');
};
