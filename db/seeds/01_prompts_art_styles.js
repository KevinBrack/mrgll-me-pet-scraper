/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Delete only the specific art style we're about to insert
  await knex('prompts_art_styles').where('id', 1).del()
  
  // Insert our initial art style
  await knex('prompts_art_styles').insert([
    {
      id: 1,
      name: "chibi",
      description: "A cute and super-deformed art style with exaggerated features, large heads, and small bodies. Perfect for adorable battle pet renditions.",
      base_prompt: "Create a cute chibi-style character with exaggerated features, large expressive eyes, and a small body. The art style should be kawaii and adorable, with soft colors and rounded shapes."
    }
  ]);
};
