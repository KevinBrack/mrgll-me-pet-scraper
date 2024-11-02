/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("blizzard_pet_abilities", (table) => {
        table.integer("id").primary();
        table.string("name").notNullable();
        table.string("icon");
        table.json("details");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("blizzard_pet_abilities");
};
