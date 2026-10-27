// Original JAMB-style Biology questions written by StudentToolsNG to the
// UTME syllabus (not copied from past papers). Same shape as mathematics.js.
export const BIOLOGY = [
  {
    id: "b01", t: "The cell",
    q: "Which organelle is the main site of aerobic respiration?",
    o: ["Ribosome", "Mitochondrion", "Nucleus", "Golgi apparatus"], a: 1,
    x: "Aerobic respiration releases energy (as ATP) in the mitochondria. Ribosomes make proteins, and the nucleus holds the genetic material."
  },
  {
    id: "b02", t: "The cell",
    q: "Which structure is found in plant cells but not in animal cells?",
    o: ["Cell membrane", "Cytoplasm", "Cellulose cell wall", "Ribosome"], a: 2,
    x: "Plant cells have a cellulose cell wall (and chloroplasts and a large permanent vacuole). Both plant and animal cells have a membrane, cytoplasm and ribosomes."
  },
  {
    id: "b03", t: "The cell",
    q: "Which organelle contains chlorophyll?",
    o: ["Vacuole", "Mitochondrion", "Lysosome", "Chloroplast"], a: 3,
    x: "Chloroplasts hold the green pigment chlorophyll, which traps light energy for photosynthesis."
  },
  {
    id: "b04", t: "Cell and its environment",
    q: "Osmosis is the movement of",
    o: ["water molecules from a dilute to a more concentrated solution through a selectively permeable membrane", "solute molecules from a concentrated to a dilute solution", "water against a concentration gradient, using energy", "any molecule from high to low concentration without a membrane"], a: 0,
    x: "Osmosis is a special case of diffusion: water moves across a selectively permeable membrane from a region of high water concentration (dilute) to low (concentrated)."
  },
  {
    id: "b05", t: "Cell and its environment",
    q: "A plant cell placed in a concentrated salt solution will become",
    o: ["turgid", "plasmolysed", "burst", "unchanged"], a: 1,
    x: "Water leaves the cell by osmosis, the vacuole shrinks and the cytoplasm pulls away from the cell wall: the cell is plasmolysed. The wall stops plant cells from bursting in water."
  },
  {
    id: "b06", t: "Classification",
    q: "Which is the correct order of classification groups, from the largest to the smallest?",
    o: ["Kingdom, Class, Phylum, Order, Family, Genus, Species", "Kingdom, Phylum, Class, Order, Family, Genus, Species", "Kingdom, Phylum, Order, Class, Genus, Family, Species", "Phylum, Kingdom, Class, Order, Family, Species, Genus"], a: 1,
    x: "Kingdom → Phylum → Class → Order → Family → Genus → Species. A common memory aid is \"King Philip Came Over For Good Soup\"."
  },
  {
    id: "b07", t: "Classification",
    q: "Mushrooms belong to the kingdom",
    o: ["Plantae", "Fungi", "Protoctista", "Monera"], a: 1,
    x: "Mushrooms have no chlorophyll, have cell walls of chitin and feed by absorbing food from dead matter, so they are fungi, not plants."
  },
  {
    id: "b08", t: "Classification",
    q: "In the scientific name Homo sapiens, the word Homo is the",
    o: ["species", "family", "genus", "order"], a: 2,
    x: "Binomial nomenclature gives the genus first (with a capital letter) and the species second."
  },
  {
    id: "b09", t: "Variety of organisms",
    q: "A feature of viruses is that they",
    o: ["have cell walls made of chitin", "make their own food", "divide by binary fission outside a host", "reproduce only inside living host cells"], a: 3,
    x: "Viruses have no cell structure of their own. They can only multiply by taking over the machinery of a living host cell."
  },
  {
    id: "b10", t: "Variety of organisms",
    q: "A spider is not classified as an insect because it has",
    o: ["eight legs and two body parts", "six legs and three body parts", "wings", "an exoskeleton"], a: 0,
    x: "Insects have three body parts (head, thorax, abdomen) and six legs. Spiders are arachnids, with two body parts and eight legs. Both have exoskeletons."
  },
  {
    id: "b11", t: "Nutrition",
    q: "The products of photosynthesis are",
    o: ["carbon(IV) oxide and water", "glucose and oxygen", "starch and carbon(IV) oxide", "oxygen and water only"], a: 1,
    x: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂, using light energy absorbed by chlorophyll. Carbon(IV) oxide and water are the raw materials."
  },
  {
    id: "b12", t: "Nutrition",
    q: "A food sample turns blue-black when iodine solution is added. The food contains",
    o: ["protein", "starch", "reducing sugar", "fat"], a: 1,
    x: "Iodine turns blue-black with starch. Protein gives purple with Biuret reagent, reducing sugar gives brick-red with Benedict's solution and fat leaves a translucent spot on paper."
  },
  {
    id: "b13", t: "Nutrition",
    q: "Salivary amylase digests",
    o: ["proteins to amino acids", "fats to fatty acids and glycerol", "starch to maltose", "maltose to glucose"], a: 2,
    x: "Amylase in saliva starts the digestion of starch into maltose in the mouth. Proteases digest proteins, lipases digest fats and maltase digests maltose."
  },
  {
    id: "b14", t: "Nutrition",
    q: "Bile helps digestion by",
    o: ["digesting proteins", "emulsifying fats", "absorbing water", "digesting starch"], a: 1,
    x: "Bile, made in the liver and stored in the gall bladder, has no enzymes. It breaks fat into small droplets (emulsification), giving lipase a larger surface to work on."
  },
  {
    id: "b15", t: "Nutrition",
    q: "A lack of vitamin C in the diet causes",
    o: ["rickets", "beriberi", "night blindness", "scurvy"], a: 3,
    x: "Vitamin C deficiency causes scurvy (bleeding gums). Rickets comes from a lack of vitamin D, beriberi from vitamin B₁ and night blindness from vitamin A."
  },
  {
    id: "b16", t: "Transport",
    q: "Which blood vessel carries oxygenated blood from the lungs to the heart?",
    o: ["Pulmonary artery", "Vena cava", "Pulmonary vein", "Aorta"], a: 2,
    x: "The pulmonary vein is the only vein that carries oxygenated blood. The pulmonary artery is the only artery that carries deoxygenated blood (from the heart to the lungs)."
  },
  {
    id: "b17", t: "Transport",
    q: "A person with which blood group is known as the universal donor?",
    o: ["AB", "O", "A", "B"], a: 1,
    x: "Group O red cells carry neither A nor B antigens, so they are not attacked by the recipient's antibodies. Group AB is the universal recipient."
  },
  {
    id: "b18", t: "Transport",
    q: "The xylem of a flowering plant transports",
    o: ["water and mineral salts from the roots upwards", "manufactured food from the leaves", "gases to the leaves", "hormones only"], a: 0,
    x: "Xylem carries water and dissolved minerals up from the roots. Phloem carries manufactured food (sugars) from the leaves to other parts (translocation)."
  },
  {
    id: "b19", t: "Transport",
    q: "Which conditions increase the rate of transpiration?",
    o: ["High humidity and still air", "Darkness", "Cold, still air", "Warm, dry and windy air"], a: 3,
    x: "Warmth speeds evaporation, dry air keeps the water-vapour gradient steep and wind removes moist air from the leaf surface. In darkness most stomata close."
  },
  {
    id: "b20", t: "Respiration",
    q: "Anaerobic respiration in yeast produces",
    o: ["lactic acid only", "ethanol and carbon(IV) oxide", "oxygen and water", "glucose and oxygen"], a: 1,
    x: "Yeast ferments glucose to ethanol and CO₂, which is used in brewing and baking. Muscles respiring anaerobically produce lactic acid instead."
  },
  {
    id: "b21", t: "Respiration",
    q: "In mammals, gaseous exchange takes place in the",
    o: ["trachea", "bronchi", "alveoli", "larynx"], a: 2,
    x: "The alveoli are thin-walled, moist, have a large surface area and a rich blood supply, so oxygen and CO₂ diffuse quickly. The trachea and bronchi only carry air."
  },
  {
    id: "b22", t: "Excretion",
    q: "What is the functional unit of the kidney?",
    o: ["Neurone", "Nephron", "Alveolus", "Villus"], a: 1,
    x: "Each kidney has about a million nephrons, which filter the blood and form urine."
  },
  {
    id: "b23", t: "Excretion",
    q: "In mammals, urea is made in the",
    o: ["kidney", "bladder", "liver", "pancreas"], a: 2,
    x: "The liver breaks down excess amino acids (deamination) and turns the ammonia into urea. The kidneys only remove urea from the blood."
  },
  {
    id: "b24", t: "Support and movement",
    q: "Tendons join",
    o: ["bone to bone", "muscle to bone", "muscle to muscle", "cartilage to bone"], a: 1,
    x: "Tendons are tough, inelastic and attach muscle to bone. Ligaments join bone to bone at joints."
  },
  {
    id: "b25", t: "Support and movement",
    q: "The shoulder joint is an example of a",
    o: ["hinge joint", "pivot joint", "ball-and-socket joint", "gliding joint"], a: 2,
    x: "The rounded head of the humerus fits into a socket, allowing movement in all directions. The elbow and knee are hinge joints."
  },
  {
    id: "b26", t: "Reproduction",
    q: "Pollination is the transfer of pollen grains from the",
    o: ["stigma to the ovary", "anther to the stigma", "ovule to the ovary", "anther to the filament"], a: 1,
    x: "Pollination moves pollen from an anther to a stigma, of the same flower (self-pollination) or another flower (cross-pollination). Fertilisation happens later in the ovule."
  },
  {
    id: "b27", t: "Reproduction",
    q: "In humans, fertilisation normally takes place in the",
    o: ["uterus", "ovary", "vagina", "oviduct"], a: 3,
    x: "The sperm meets the egg in the oviduct (fallopian tube). The fertilised egg then moves to the uterus, where it implants."
  },
  {
    id: "b28", t: "Reproduction",
    q: "Which of the following is NOT needed for the germination of most seeds?",
    o: ["Water", "Oxygen", "A suitable temperature", "Light"], a: 3,
    x: "Seeds need water, oxygen (for respiration) and warmth to germinate. Most germinate in the dark, using food stored in the seed until the leaves can photosynthesise."
  },
  {
    id: "b29", t: "Co-ordination",
    q: "Which hormone lowers the level of glucose in the blood?",
    o: ["Glucagon", "Adrenaline", "Insulin", "Thyroxine"], a: 2,
    x: "Insulin from the pancreas makes the liver and muscles take up glucose and store it as glycogen. Glucagon and adrenaline raise blood glucose."
  },
  {
    id: "b30", t: "Co-ordination",
    q: "Which part of the brain controls balance and the coordination of movement?",
    o: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Hypothalamus"], a: 1,
    x: "The cerebellum coordinates muscles and balance. The cerebrum handles thinking and voluntary actions, and the medulla controls breathing and heartbeat."
  },
  {
    id: "b31", t: "Co-ordination",
    q: "In a reflex arc, which is the correct order?",
    o: ["Receptor → sensory neurone → relay neurone → motor neurone → effector", "Receptor → motor neurone → relay neurone → sensory neurone → effector", "Effector → sensory neurone → relay neurone → motor neurone → receptor", "Receptor → relay neurone → sensory neurone → motor neurone → effector"], a: 0,
    x: "The receptor detects the stimulus, the sensory neurone carries the impulse to the spinal cord, the relay neurone passes it on, and the motor neurone carries it to the effector (a muscle or gland)."
  },
  {
    id: "b32", t: "Co-ordination",
    q: "Which cells in the retina are responsible for colour vision?",
    o: ["Rods", "Cones", "Cells of the cornea", "Cells of the iris"], a: 1,
    x: "Cones work in bright light and detect colour. Rods work in dim light and see only in shades of grey."
  },
  {
    id: "b33", t: "Co-ordination",
    q: "The growth of a plant shoot towards light is called",
    o: ["negative geotropism", "hydrotropism", "positive phototropism", "thigmotropism"], a: 2,
    x: "Auxin collects on the shaded side of the shoot, which grows faster and bends the shoot towards the light: positive phototropism."
  },
  {
    id: "b34", t: "Ecology",
    q: "In the food chain grass → grasshopper → frog → snake, the frog is a",
    o: ["producer", "primary consumer", "secondary consumer", "tertiary consumer"], a: 2,
    x: "Grass is the producer, the grasshopper (eats grass) is the primary consumer, the frog (eats the grasshopper) is the secondary consumer and the snake is the tertiary consumer."
  },
  {
    id: "b35", t: "Ecology",
    q: "About what fraction of the energy at one trophic level is passed on to the next?",
    o: ["About 10%", "About 50%", "About 90%", "All of it"], a: 0,
    x: "Most of the energy is lost as heat from respiration, in movement and in undigested waste, so only about 10% is passed on. That is why food chains are short."
  },
  {
    id: "b36", t: "Ecology",
    q: "The relationship between a tapeworm and a human is",
    o: ["mutualism", "commensalism", "parasitism", "saprophytism"], a: 2,
    x: "The tapeworm benefits by feeding on the host's digested food and the human is harmed, so this is parasitism. In mutualism both partners benefit."
  },
  {
    id: "b37", t: "Ecology",
    q: "Which bacteria in the root nodules of leguminous plants fix atmospheric nitrogen?",
    o: ["Nitrosomonas", "Nitrobacter", "Rhizobium", "Denitrifying bacteria"], a: 2,
    x: "Rhizobium turns nitrogen gas into nitrogen compounds the plant can use. Nitrosomonas and Nitrobacter carry out nitrification in the soil; denitrifying bacteria return nitrogen to the air."
  },
  {
    id: "b38", t: "Ecology",
    q: "Which instrument is used to estimate the population of plants in an area?",
    o: ["Pooter", "Sweep net", "Quadrat", "Tullgren funnel"], a: 2,
    x: "A quadrat (usually a 1 m square frame) is placed at random and the plants inside are counted. A pooter collects small insects and a Tullgren funnel extracts soil organisms."
  },
  {
    id: "b39", t: "Ecology",
    q: "The vegetation zone of northern Nigeria with tall grasses and scattered trees is the",
    o: ["rain forest", "mangrove swamp", "montane forest", "savanna"], a: 3,
    x: "Savanna (Guinea, Sudan and Sahel savanna from south to north) has grasses with scattered, often fire-resistant trees, suited to a long dry season."
  },
  {
    id: "b40", t: "Heredity and variation",
    q: "Two heterozygous tall plants (Tt × Tt) are crossed. Tall (T) is dominant. What fraction of the offspring is expected to be tall?",
    o: ["1/4", "1/2", "3/4", "All of them"], a: 2,
    x: "The cross gives TT, Tt, Tt and tt. Three of the four carry at least one T, so 3/4 are tall and 1/4 are short (a 3 : 1 ratio)."
  },
  {
    id: "b41", t: "Heredity and variation",
    q: "Two parents both have the genotype AS. What is the chance that a child of theirs has the genotype SS?",
    o: ["50%", "75%", "0%", "25%"], a: 3,
    x: "AS × AS gives AA, AS, AS and SS, each equally likely. The chance of SS (sickle cell anaemia) is 1 in 4, or 25%, for every pregnancy."
  },
  {
    id: "b42", t: "Heredity and variation",
    q: "In humans, the sex of a child is determined by",
    o: ["the mother's egg", "the father's sperm", "both parents equally", "the environment"], a: 1,
    x: "Every egg carries an X chromosome. A sperm carries either X (giving a girl, XX) or Y (giving a boy, XY), so the father's sperm decides."
  },
  {
    id: "b43", t: "Heredity and variation",
    q: "Which of these is an example of continuous variation?",
    o: ["ABO blood group", "Height", "Ability to roll the tongue", "Sex"], a: 1,
    x: "Height varies gradually over a range, with many values in between. Blood group, tongue rolling and sex fall into distinct groups (discontinuous variation)."
  },
  {
    id: "b44", t: "Evolution",
    q: "Who proposed the theory of evolution by natural selection?",
    o: ["Jean-Baptiste Lamarck", "Gregor Mendel", "Charles Darwin", "Robert Hooke"], a: 2,
    x: "Charles Darwin (with Alfred Russel Wallace) proposed natural selection. Lamarck proposed the inheritance of acquired characteristics, Mendel worked out the laws of heredity and Hooke named the cell."
  },
  {
    id: "b45", t: "Evolution",
    q: "Many desert plants have leaves reduced to spines mainly to",
    o: ["attract pollinators", "increase photosynthesis", "reduce water loss", "store starch"], a: 2,
    x: "Spines have a tiny surface area, so far less water is lost by transpiration. They also protect the plant from grazing animals."
  }
];
