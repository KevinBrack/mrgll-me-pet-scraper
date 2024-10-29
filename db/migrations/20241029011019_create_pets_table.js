/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("blizzard_pets", (table) => {
        table.integer("id").primary();
        table.string("name").notNullable();
        table.string("href").notNullable();
        table.integer("battle_pet_type_id");
        table.string("battle_pet_type");
        table.string("battle_pet_type_name");
        table.text("description");
        table.boolean("is_capturable");
        table.boolean("is_tradable");
        table.boolean("is_battlepet");
        table.boolean("is_alliance_only");
        table.boolean("is_horde_only");
        table.string("source_type");
        table.string("source_name");
        table.string("icon");
        table.integer("creature_id");
        table.string("creature_name");
        table.string("creature_href");
        table.boolean("is_random_creature_display");
        table.integer("media_id");
        table.string("media_href");
        table.boolean("should_exclude_if_uncollected");
        table.jsonb("abilities");
        table.jsonb("media_assets");
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("blizzard_pets");
};
