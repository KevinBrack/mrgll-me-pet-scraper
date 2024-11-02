/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Common beast abilities for cats
  const abilities = [
    { id: 110, name: "Bite" },
    { id: 111, name: "Punch" },
    { id: 112, name: "Peck" },
    { id: 113, name: "Burn" },
    { id: 114, name: "Breath" },
    { id: 115, name: "Zap" },
    { id: 116, name: "Infected Claw" },
    { id: 117, name: "Water Jet" },
    { id: 118, name: "Scratch" },
    { id: 119, name: "Howling Blast" },
    { id: 120, name: "Death Coil" },
    { id: 121, name: "Tail Sweep" },
    { id: 122, name: "Healing Wave" },
    { id: 123, name: "Rampage" },
    { id: 124, name: "Poison Fang" },
    { id: 125, name: "Miss" },
    { id: 126, name: "Vicious Fang" },
    { id: 127, name: "Counterstrike" },
    { id: 128, name: "Burrow" },
    { id: 129, name: "Consume" },
    { id: 130, name: "Adrenaline Rush" },
    { id: 360, name: "Mechanical Bite" },
    { id: 361, name: "Wind-Up" },
    { id: 362, name: "Supercharge" },
    { id: 363, name: "Deconstruct" },
    { id: 364, name: "Build Turret" },
    { id: 365, name: "Repair" },
    { id: 366, name: "Short Circuit" },
    { id: 367, name: "Power Surge" },
    { id: 368, name: "Shutdown" },
    { id: 369, name: "Overheat" },
    { id: 370, name: "Emergency Repair" },
    { id: 371, name: "Explosive" },
    { id: 372, name: "Metal Storm" },
    { id: 373, name: "Launch Rocket" },
    { id: 374, name: "Minefield" },
    { id: 375, name: "Self Destruct" },
    { id: 376, name: "Reconstruction" },
    { id: 377, name: "Overclock" },
    { id: 378, name: "System Failure" },
    { id: 379, name: "Targeting System" },
    { id: 380, name: "Energy Shield" },
    { id: 384, name: "Metal Fist" },
    { id: 429, name: "Claw" }
  ];
  
  // Deletes ALL existing entries for our subset of abilities
  await knex('blizzard_pet_abilities').whereIn('id', abilities.map(a => a.id)).del();
  
  // Insert abilities with empty details
  const abilityRecords = abilities.map(ability => ({
    id: ability.id,
    name: ability.name,
    icon: `https://render.worldofwarcraft.com/icons/56/ability_${ability.id}.jpg`,  // Placeholder icon URL
    details: JSON.stringify({})
  }));

  // Insert our initial set of abilities
  await knex('blizzard_pet_abilities').insert(abilityRecords);
};
