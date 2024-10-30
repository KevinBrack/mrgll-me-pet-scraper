/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Delete only the specific pet images we're about to insert
  await knex('warcraftpets_images')
    .whereIn('pet_id', [39, 40, 41, 42, 43, 44, 45, 46, 47, 49])
    .del()
  
  // Initial set of pet images
  await knex('warcraftpets_images').insert([
    {
      pet_id: 39,
      pet_url: "https://www.warcraftpets.com/wow-pets/mechanical/mechanized-critters/mechanical-squirrel/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/mechanical-squirrel.v29bbe74e0862df25c47cb54f4d9331ae4a91e074.jpg"
    },
    {
      pet_id: 40,
      pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/bombay-cat/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/bombay.vf0ae19a8bc7769c8a77a2a6ebaa3a7f353f4ae73.jpg"
    },
    {
      pet_id: 41,
      pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/cornish-rex-cat/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/cornish_rex.vc5586253e8d481bc43f5d71f12952ee0df18ec77.jpg"
    },
    {
      pet_id: 42,
      pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/black-tabby-cat/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/black_tabby.v46b57257d7350d24dcb156f73f6efbe836b9c858.jpg"
    },
    {
      pet_id: 43,
      pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/orange-tabby-cat/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/orange_tabby.vab0517c34ada3921531a34c4929bd5a27d47d622.jpg"
    },
    {
      pet_id: 44,
      pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/siamese-cat/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/siamese.v199b5273602801c1a3008da0ff75b13dbaf7992c.jpg"
    },
    {
      pet_id: 45,
      pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/silver-tabby-cat/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/silver_tabby.vb3cb2553a3ba9939602d730eb4c2e46b383b6bb7.jpg"
    },
    {
      pet_id: 46,
      pet_url: "https://www.warcraftpets.com/wow-pets/beast/felines/white-kitten/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/white_kitten.vbf9b76defb51e718aaf587eaa7d1c04716eb99f6.jpg"
    },
    {
      pet_id: 47,
      pet_url: "https://www.warcraftpets.com/wow-pets/flying/parrots/cockatiel/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/cockatiel.vc25b8b4bd46b33932219df3594b1c7253e2e5907.jpg"
    },
    {
      pet_id: 49,
      pet_url: "https://www.warcraftpets.com/wow-pets/flying/parrots/hyacinth-macaw/",
      pet_image_url: "https://cdn2.warcraftpets.com/images/pets/big/hyacinth_macaw.v822e6411f7995f3057bc0d7c5a27c290174ab81f.jpg"
    }
  ]);
};
