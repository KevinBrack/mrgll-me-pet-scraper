/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('app_battle_locations').del();
  
  await knex('app_battle_locations').insert([
    {
      name: 'Nagrand',
      lore: "Nagrand stands as one of Draenor's most pristine territories a vast expanse of rolling emerald plains and floating islands suspended by ancient shamanistic magic. The land pulses with primal energy from its towering crystalline spires to the sacred ancestral grounds where the elements themselves whisper ancient secrets. The majestic Throne of Elements serves as a testament to the powerful connection between the Orcish clans and the spiritual forces that shaped their culture.    Along its southern shores where the waves of the South Sea lap against pristine beaches sacred grounds hold powerful magic that transcends both space and time. Here ancient stone rings and mystical formations dot the landscape while floating islands drift lazily overhead their massive forms casting ever-shifting shadows on the verdant plains below. The very air thrums with elemental power a reminder of Draenor's raw untamed essence.",
      image_prompt: "A sweeping vista of endless emerald grasslands stretches to the horizon punctuated by impossible floating islands suspended in the azure sky. Massive stone rings and crystalline formations emerge from the rolling hills while waterfalls cascade from the floating landmasses above. Golden afternoon light bathes the landscape creating a dramatic interplay of light and shadow across the windswept plains. Ancient stone circles stand sentinel on hilltops their weather-worn surfaces covered in phosphorescent moss while in the distance towering cliffs rise from a pristine coastline where turquoise waters meet white sand beaches."
    },
    {
      name: 'Zerith Mortis',
      lore: "Hidden between the very fabric of reality lies Zerith Mortis the sacred workshop of the First Ones where the fundamental forces of existence were forged. This realm transcends mortal understanding where cosmic energies flow like rivers through impossible geometries and the very laws of creation bend to the will of these ancient architects. The Automa eternal servants of order maintain these pristine grounds where the blueprints of reality itself were first drawn.    Within this forbidden sanctuary the boundaries between order and chaos blur as floating islands of verdant life hover above endless seas of golden sand. The Enlightened descendants of the First Ones' chosen people safeguard ancient secrets within crystalline structures that defy conventional physics while eternal mechanisms continue their work of maintaining the delicate balance of all existence.",
      image_prompt: "A surreal landscape where floating islands covered in ethereal blue-green grass drift above golden desert dunes defying gravity. Crystalline spires and geometric monuments of impossible architecture pierce the sky their surfaces reflecting an otherworldly light that seems to emanate from everywhere and nowhere. Suspended walkways of translucent material connect floating platforms while in the distance massive rings of ancient metal slowly rotate around a central point of brilliant energy. The horizon blends reality and dreams where auroral ribbons of light dance across a sky that transitions from deep azure to golden bronze."
    }
  ]);
};
