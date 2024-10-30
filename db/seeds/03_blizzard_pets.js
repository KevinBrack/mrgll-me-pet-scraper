/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries for our subset of pets
  await knex('blizzard_pets').whereIn('id', [39, 40, 41, 42, 43, 44, 45, 46, 47, 49]).del()
  
  // Insert our initial set of pets
  await knex('blizzard_pets').insert([
    {
      id: 39,
      name: "Mechanical Squirrel",
      href: "https://us.api.blizzard.com/data/wow/pet/39?namespace=static-11.0.5_56865-us",
      battle_pet_type_id: 9,
      battle_pet_type: "MECHANICAL",
      battle_pet_type_name: "Mechanical",
      description: "A mechanical squirrel's logic center tells it to collect and store both nuts and bolts for the winter.",
      is_capturable: 0,
      is_tradable: 1,
      is_battlepet: 1,
      is_alliance_only: 0,
      is_horde_only: 0,
      source_type: "PROFESSION",
      source_name: "Profession",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_pet_mechanicalsquirrel.jpg",
      creature_id: 2671,
      creature_name: "Mechanical Squirrel",
      creature_href: "https://us.api.blizzard.com/data/wow/creature/2671?namespace=static-11.0.5_56865-us",
      is_random_creature_display: 0,
      media_id: 39,
      media_href: "https://us.api.blizzard.com/data/wow/media/pet/39?namespace=static-11.0.5_56865-us",
      should_exclude_if_uncollected: 0,
      abilities: JSON.stringify([{"ability":{"key":{"href":"https://us.api.blizzard.com/data/wow/pet-ability/384?namespace=static-11.0.5_56865-us"},"name":"Metal Fist","id":384},"slot":0,"required_level":1}]),
      media_assets: JSON.stringify([{"key":"icon","value":"https://render.worldofwarcraft.com/us/icons/56/inv_pet_mechanicalsquirrel.jpg","file_data_id":656559}])
    },
    {
      id: 40,
      name: "Bombay Cat",
      href: "https://us.api.blizzard.com/data/wow/pet/40?namespace=static-11.0.5_56865-us",
      battle_pet_type_id: 7,
      battle_pet_type: "BEAST",
      battle_pet_type_name: "Beast",
      description: "Donni Anthania plans to have a bombay buried with her when she dies. A wise adventurer can put its talents to much better use.",
      is_capturable: 0,
      is_tradable: 1,
      is_battlepet: 1,
      is_alliance_only: 0,
      is_horde_only: 0,
      source_type: "VENDOR",
      source_name: "Vendor",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_pet_cats_bombaycat.jpg",
      creature_id: 7385,
      creature_name: "Bombay Cat",
      creature_href: "https://us.api.blizzard.com/data/wow/creature/7385?namespace=static-11.0.5_56865-us",
      is_random_creature_display: 0,
      media_id: 40,
      media_href: "https://us.api.blizzard.com/data/wow/media/pet/40?namespace=static-11.0.5_56865-us",
      should_exclude_if_uncollected: 0,
      abilities: JSON.stringify([{"ability":{"key":{"href":"https://us.api.blizzard.com/data/wow/pet-ability/429?namespace=static-11.0.5_56865-us"},"name":"Claw","id":429},"slot":0,"required_level":1}]),
      media_assets: JSON.stringify([{"key":"icon","value":"https://render.worldofwarcraft.com/us/icons/56/inv_pet_cats_bombaycat.jpg","file_data_id":656575}])
    },
    {
      id: 41,
      name: "Cornish Rex Cat",
      href: "https://us.api.blizzard.com/data/wow/pet/41?namespace=static-11.0.5_56865-us",
      battle_pet_type_id: 7,
      battle_pet_type: "BEAST",
      battle_pet_type_name: "Beast",
      description: "Donni Anthania invites these cats to her tea parties. But she doesn't serve their favorite drink: the tears of their enemies.",
      is_capturable: 0,
      is_tradable: 1,
      is_battlepet: 1,
      is_alliance_only: 0,
      is_horde_only: 0,
      source_type: "VENDOR",
      source_name: "Vendor",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_pet_cats_cornishrexcat.jpg",
      creature_id: 7384,
      creature_name: "Cornish Rex Cat",
      creature_href: "https://us.api.blizzard.com/data/wow/creature/7384?namespace=static-11.0.5_56865-us",
      is_random_creature_display: 0,
      media_id: 41,
      media_href: "https://us.api.blizzard.com/data/wow/media/pet/41?namespace=static-11.0.5_56865-us",
      should_exclude_if_uncollected: 0,
      abilities: JSON.stringify([{"ability":{"key":{"href":"https://us.api.blizzard.com/data/wow/pet-ability/429?namespace=static-11.0.5_56865-us"},"name":"Claw","id":429},"slot":0,"required_level":1}]),
      media_assets: JSON.stringify([{"key":"icon","value":"https://render.worldofwarcraft.com/us/icons/56/inv_pet_cats_cornishrexcat.jpg","file_data_id":656577}])
    },
    {
      id: 42,
      name: "Black Tabby Cat",
      href: "https://us.api.blizzard.com/data/wow/pet/42?namespace=static-11.0.5_56865-us",
      battle_pet_type_id: 7,
      battle_pet_type: "BEAST",
      battle_pet_type_name: "Beast",
      description: "Old Alterac saying: 'A cat has nine lives but needs only one.'",
      is_capturable: 0,
      is_tradable: 1,
      is_battlepet: 1,
      is_alliance_only: 0,
      is_horde_only: 0,
      source_type: "DROP",
      source_name: "Drop",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_pet_cats_blacktabbycat.jpg",
      creature_id: 7383,
      creature_name: "Black Tabby Cat",
      creature_href: "https://us.api.blizzard.com/data/wow/creature/7383?namespace=static-11.0.5_56865-us",
      is_random_creature_display: 0,
      media_id: 42,
      media_href: "https://us.api.blizzard.com/data/wow/media/pet/42?namespace=static-11.0.5_56865-us",
      should_exclude_if_uncollected: 0,
      abilities: JSON.stringify([{"ability":{"key":{"href":"https://us.api.blizzard.com/data/wow/pet-ability/429?namespace=static-11.0.5_56865-us"},"name":"Claw","id":429},"slot":0,"required_level":1}]),
      media_assets: JSON.stringify([{"key":"icon","value":"https://render.worldofwarcraft.com/us/icons/56/inv_pet_cats_blacktabbycat.jpg","file_data_id":656574}])
    },
    {
      id: 43,
      name: "Orange Tabby Cat",
      href: "https://us.api.blizzard.com/data/wow/pet/43?namespace=static-11.0.5_56865-us",
      battle_pet_type_id: 7,
      battle_pet_type: "BEAST",
      battle_pet_type_name: "Beast",
      description: "The last person who tried to housebreak this cat quickly learned that a soiled rug is better than a shredded everything-else.",
      is_capturable: 0,
      is_tradable: 1,
      is_battlepet: 1,
      is_alliance_only: 0,
      is_horde_only: 0,
      source_type: "VENDOR",
      source_name: "Vendor",
      icon: "https://render.worldofwarcraft.com/us/icons/56/inv_pet_cats_orangetabbycat.jpg",
      creature_id: 7382,
      creature_name: "Orange Tabby Cat",
      creature_href: "https://us.api.blizzard.com/data/wow/creature/7382?namespace=static-11.0.5_56865-us",
      is_random_creature_display: 0,
      media_id: 43,
      media_href: "https://us.api.blizzard.com/data/wow/media/pet/43?namespace=static-11.0.5_56865-us",
      should_exclude_if_uncollected: 0,
      abilities: JSON.stringify([{"ability":{"key":{"href":"https://us.api.blizzard.com/data/wow/pet-ability/429?namespace=static-11.0.5_56865-us"},"name":"Claw","id":429},"slot":0,"required_level":1}]),
      media_assets: JSON.stringify([{"key":"icon","value":"https://render.worldofwarcraft.com/us/icons/56/inv_pet_cats_orangetabbycat.jpg","file_data_id":656578}])
    }
  ]);
};