/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("wowhead_pet_screenshots", (table) => {
        table.increments("id").primary();
        table
            .integer("pet_id")
            .notNullable()
            .references("id")
            .inTable("blizzard_pets");
        table.integer("creature_id").notNullable();
        table.string("pet_url").notNullable();
        table.string("screenshot_url");
        table.string("screenshot_file");
        table.timestamps(true, true);

        // Add indexes for performance
        table.index("pet_id");
        table.index("creature_id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("wowhead_pet_screenshots");
};
