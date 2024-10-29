/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("prompts_art_styles").del();

    // Inserts seed entry
    await knex("prompts_art_styles").insert([
        {
            name: "chibi",
            description:
                "The art style features cute, chibi-like 3D characters with highly polished, glossy surfaces and exaggerated proportions. It employs vibrant, saturated colors with an emphasis on metallic gold accents and glowing purple gemstones. The rendering is extremely detailed with a semi-realistic lighting that creates a rich, dimensional appearance while maintaining a playful, toy-like quality. The overall aesthetic combines kawaii character design with high-end CGI rendering techniques.",
        },
    ]);
};
