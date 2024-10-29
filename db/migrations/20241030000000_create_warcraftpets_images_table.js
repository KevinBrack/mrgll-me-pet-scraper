/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("warcraftpets_images", (table) => {
        table.increments("id").primary();
        table.integer("pet_id").unsigned().notNullable();
        table.string("pet_url");
        table.string("pet_image_url");
        table.timestamps(true, true);

        // Foreign key constraint
        table.foreign("pet_id").references("id").inTable("blizzard_pets");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("warcraftpets_images");
};
