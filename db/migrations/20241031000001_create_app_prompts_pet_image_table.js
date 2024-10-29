/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("app_prompts_pet_image", (table) => {
        table.increments("id").primary();
        table
            .integer("pet_id")
            .notNullable()
            .references("id")
            .inTable("blizzard_pets");
        table
            .integer("art_style_id")
            .notNullable()
            .references("id")
            .inTable("prompts_art_styles");
        table.string("image_source_table").notNullable(); // e.g., 'warcraftpets_images'
        table.string("image_source_url").notNullable(); // URL from the source table
        table.text("generated_prompt").notNullable(); // The AI-generated prompt
        table.text("original_description").notNullable(); // The original pet description used
        table.boolean("is_favorite").defaultTo(false); // For potential future feature
        table.integer("generation_version").defaultTo(1); // Track different versions/attempts
        table.json("metadata").nullable(); // Store any additional data
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("app_prompts_pet_image");
};
