/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Delete only the prompts for our specific pets and art style
  await knex('app_prompts_pet_image')
    .whereIn('pet_id', [39, 40, 41, 42, 43])
    .andWhere('art_style_id', 1)
    .del()
  
  // Insert prompts for our initial set of pets
  await knex('app_prompts_pet_image').insert([
    {
      pet_id: 39,
      art_style_id: 1,
      image_source_table: 'warcraftpets_images',
      image_source_url: "https://cdn2.warcraftpets.com/images/pets/big/mechanical-squirrel.v29bbe74e0862df25c47cb54f4d9331ae4a91e074.jpg",
      generated_prompt: "A whimsical mechanical creature with the form of a small squirrel featuring a polished metallic body composed of intricately fitted brass and copper segments. Its oversized luminous purple crystal eyes sparkle with playful intelligence while its fluffy tail is crafted from delicate copper wire filaments that catch and reflect light. Golden gears and decorative clockwork elements accent its joints and chest spinning gently with each movement. The creature's chubby cheeks are designed with expandable compartments trimmed in gleaming gold while its tiny paws clutch both natural acorns and small mechanical trinkets. Its expression is eager and focused with an endearing tilt to its head that suggests curiosity. Soft purple energy pulses from between its mechanical segments creating a warm internal glow that highlights its glossy metallic surfaces. The character is rendered in a cute chibi-style with exaggerated proportions particularly its oversized head and plump body giving it a toy-like charm while maintaining intricate technical details.",
      original_description: "A mechanical squirrel's logic center tells it to collect and store both nuts and bolts for the winter.",
      metadata: JSON.stringify({
        pet_name: "Mechanical Squirrel",
        art_style_name: "chibi",
        source_pet_url: "https://www.warcraftpets.com/wow-pets/mechanical/mechanized-critters/mechanical-squirrel/"
      })
    },
    {
      pet_id: 40,
      art_style_id: 1,
      image_source_table: 'warcraftpets_images',
      image_source_url: "https://cdn2.warcraftpets.com/images/pets/big/bombay.vf0ae19a8bc7769c8a77a2a6ebaa3a7f353f4ae73.jpg",
      generated_prompt: "A sleek mystical feline with glossy obsidian fur rendered in a chibi style featuring exaggerated golden eyes that sparkle with otherworldly intelligence. Its compact rounded form has an elegant yet playful proportion with oversized paws and a gracefully curved tail. The cat's fur has a luxurious polished sheen that catches light like liquid shadow creating subtle purple highlights along its silhouette. A delicate golden amulet adorns its neck featuring tiny glowing amethyst gems that pulse with magical energy. The creature's expression combines regal dignity with a hint of mysterious wisdom its head tilted slightly in an knowing pose. The overall rendering emphasizes smooth pristine surfaces and soft dimensional lighting that creates a toy-like quality while maintaining the cat's mystical essence. Subtle magical particles drift around its form creating a gentle purple luminescence that enhances its supernatural appearance.",
      original_description: "Donni Anthania plans to have a bombay buried with her when she dies. A wise adventurer can put its talents to much better use.",
      metadata: JSON.stringify({
        pet_name: "Bombay Cat",
        art_style_name: "chibi",
        source_pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/bombay-cat/"
      })
    },
    {
      pet_id: 41,
      art_style_id: 1,
      image_source_table: 'warcraftpets_images',
      image_source_url: "https://cdn2.warcraftpets.com/images/pets/big/cornish_rex.vc5586253e8d481bc43f5d71f12952ee0df18ec77.jpg",
      generated_prompt: "A regal fantasy feline with sleek glossy fur rendered in rich jewel tones styled in an adorable chibi proportion with an oversized head and dainty body. Its expressive eyes gleam with cunning intelligence and barely contained mischief enhanced by a smug knowing smile. The cat wears miniature noble attire including a tiny ornate crown and decorative collar adorned with gleaming golden filigree and purple gemstones. Its fur features a polished almost metallic sheen that catches the light dramatically. A subtle ethereal aura surrounds the creature suggesting magical significance. The character is posed in a proud aristocratic stance with its head held high and tail curved elegantly exuding an air of refined superiority despite its cute appearance. The rendering emphasizes smooth rounded forms and high-gloss surfaces that give it a premium collectible figurine quality.",
      original_description: "Donni Anthania invites these cats to her tea parties. But she doesn't serve their favorite drink: the tears of their enemies.",
      metadata: JSON.stringify({
        pet_name: "Cornish Rex Cat",
        art_style_name: "chibi",
        source_pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/cornish-rex-cat/"
      })
    },
    {
      pet_id: 42,
      art_style_id: 1,
      image_source_table: 'warcraftpets_images',
      image_source_url: "https://cdn2.warcraftpets.com/images/pets/big/black_tabby.v46b57257d7350d24dcb156f73f6efbe836b9c858.jpg",
      generated_prompt: "A regal feline warrior rendered in chibi proportions with sleek glossy fur and exaggerated alert eyes. Its compact muscular form is adorned with miniaturized ornate battle armor featuring metallic gold trim and purple crystal accents. The creature's confident pose and determined expression suggest both nobility and tenacity. Its fur has a luxurious sheen that catches the light while subtle magical sparkles dance around its form. The character features oversized paws and an elegantly curved tail both detailed with fine texturing. A soft ethereal glow emanates from its crystalline armor accessories creating highlights across its polished surfaces. The warrior cat's expression combines playful charm with battle-hardened wisdom emphasized by enlarged gleaming eyes and small defined facial features. The overall rendering maintains a toy-like quality while showcasing intricate detail work and dimensional lighting effects.",
      original_description: "Old Alterac saying: 'A cat has nine lives but needs only one.'",
      metadata: JSON.stringify({
        pet_name: "Black Tabby Cat",
        art_style_name: "chibi",
        source_pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/black-tabby-cat/"
      })
    },
    {
      pet_id: 43,
      art_style_id: 1,
      image_source_table: 'warcraftpets_images',
      image_source_url: "https://cdn2.warcraftpets.com/images/pets/big/orange_tabby.vab0517c34ada3921531a34c4929bd5a27d47d622.jpg",
      generated_prompt: "A chibi-styled magical feline with luxuriously fluffy fur rendered in rich glossy textures. Its exaggerated proportions feature oversized paws and an extra-puffy tail held high with confidence. The creature's face combines an innocent wide-eyed expression with a distinctly devious smirk suggesting playful chaos. Its fur transitions from deep jewel tones to metallic highlights with subtle purple sparkles dancing through its coat when it moves. Sharp pristine claws peek out from its oversized paws glinting with a metallic sheen. The character's pose captures it mid-mischief with an arched back and tail curved in a question mark shape. Soft dynamic lighting emphasizes its glossy fur texture and creates catchlights in its large expressive eyes. Despite its cute appearance there's an unmistakable aura of gleeful destruction in its demeanor enhanced by tiny purple magical sparks that occasionally flicker around its whiskers.",
      original_description: "The last person who tried to housebreak this cat quickly learned that a soiled rug is better than a shredded everything-else.",
      metadata: JSON.stringify({
        pet_name: "Orange Tabby Cat",
        art_style_name: "chibi",
        source_pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/orange-tabby-cat/"
      })
    }
  ]);
};
