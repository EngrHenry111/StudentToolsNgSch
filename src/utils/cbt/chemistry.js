// Original JAMB-style Chemistry questions written by StudentToolsNG to the
// UTME syllabus (not copied from past papers). Same shape as mathematics.js.
// Relative atomic masses: H = 1, C = 12, O = 16, Ca = 40, Cu = 64.
export const CHEMISTRY = [
  {
    id: "c01", t: "Separation techniques",
    q: "Which method is best for separating a mixture of ethanol and water?",
    o: ["Filtration", "Fractional distillation", "Evaporation", "Decantation"], a: 1,
    x: "Ethanol and water mix completely but boil at different temperatures (about 78 °C and 100 °C), so fractional distillation separates them."
  },
  {
    id: "c02", t: "Separation techniques",
    q: "A mixture of ammonium chloride and sodium chloride is best separated by",
    o: ["sublimation", "filtration", "crystallisation", "chromatography"], a: 0,
    x: "On heating, ammonium chloride sublimes (turns straight to vapour) and re-forms on a cool surface, while sodium chloride stays behind."
  },
  {
    id: "c03", t: "The mole concept",
    q: "How many moles are there in 4.4 g of carbon(IV) oxide, CO₂?",
    o: ["1.0", "0.44", "0.1", "10"], a: 2,
    x: "Molar mass of CO₂ = 12 + 2 × 16 = 44 g/mol. Moles = 4.4 ÷ 44 = 0.1 mol."
  },
  {
    id: "c04", t: "The mole concept",
    q: "What volume does 0.5 mol of a gas occupy at s.t.p.?",
    o: ["22.4 dm³", "11.2 dm³", "44.8 dm³", "5.6 dm³"], a: 1,
    x: "One mole of any gas occupies 22.4 dm³ at s.t.p., so 0.5 mol occupies 0.5 × 22.4 = 11.2 dm³."
  },
  {
    id: "c05", t: "The mole concept",
    q: "How many molecules are there in 2 moles of water? (Avogadro's number = 6.02 × 10²³.)",
    o: ["6.02 × 10²³", "3.01 × 10²³", "1.204 × 10²³", "1.204 × 10²⁴"], a: 3,
    x: "Number of molecules = moles × Avogadro's number = 2 × 6.02 × 10²³ = 12.04 × 10²³ = 1.204 × 10²⁴."
  },
  {
    id: "c06", t: "Chemical formulae and equations",
    q: "A compound contains 40% carbon, 6.7% hydrogen and 53.3% oxygen by mass. What is its empirical formula?",
    o: ["CH₂O", "CHO", "C₂H₄O", "CH₃O"], a: 0,
    x: "Divide by atomic masses: C 40/12 = 3.33, H 6.7/1 = 6.7, O 53.3/16 = 3.33. Dividing by the smallest gives C : H : O = 1 : 2 : 1, so CH₂O."
  },
  {
    id: "c07", t: "Chemical formulae and equations",
    q: "What mass of calcium oxide is obtained by heating 50 g of calcium trioxocarbonate(IV)? CaCO₃ → CaO + CO₂",
    o: ["56 g", "22 g", "28 g", "50 g"], a: 2,
    x: "CaCO₃ = 40 + 12 + 48 = 100 g/mol, so 50 g is 0.5 mol. One mole of CaCO₃ gives one mole of CaO (56 g/mol): 0.5 × 56 = 28 g."
  },
  {
    id: "c08", t: "Atomic structure",
    q: "An atom has mass number 23 and atomic number 11. How many neutrons does it have?",
    o: ["11", "12", "23", "34"], a: 1,
    x: "Neutrons = mass number − atomic number = 23 − 11 = 12. (This is sodium.)"
  },
  {
    id: "c09", t: "Atomic structure",
    q: "What is the electronic configuration of an element of atomic number 17?",
    o: ["2, 8, 8", "2, 7, 8", "2, 8, 7", "2, 8, 6, 1"], a: 2,
    x: "Fill the shells in order, 2 then 8: 17 = 2 + 8 + 7. With 7 outer electrons it is in group 7 (chlorine)."
  },
  {
    id: "c10", t: "Atomic structure",
    q: "Isotopes of an element have the same number of",
    o: ["neutrons but different numbers of protons", "nucleons", "protons but different numbers of neutrons", "neutrons and protons"], a: 2,
    x: "Isotopes, such as chlorine-35 and chlorine-37, have the same atomic number (protons) but different mass numbers because their neutron numbers differ."
  },
  {
    id: "c11", t: "Periodic table",
    q: "Moving from left to right across a period, the atomic radius generally",
    o: ["increases", "decreases", "stays the same", "increases, then decreases"], a: 1,
    x: "Across a period the nuclear charge rises while electrons go into the same shell, so the outer electrons are pulled in more strongly and the atoms get smaller."
  },
  {
    id: "c12", t: "Periodic table",
    q: "Elements in group 1 of the periodic table are known as the",
    o: ["halogens", "noble gases", "alkaline earth metals", "alkali metals"], a: 3,
    x: "Group 1 (lithium, sodium, potassium…) are the alkali metals. Group 2 are the alkaline earth metals, group 7 the halogens and group 0 the noble gases."
  },
  {
    id: "c13", t: "Chemical bonding",
    q: "The bond in sodium chloride is",
    o: ["covalent", "ionic", "metallic", "dative"], a: 1,
    x: "Sodium gives its outer electron to chlorine, forming Na⁺ and Cl⁻ ions held together by electrostatic attraction: an ionic (electrovalent) bond."
  },
  {
    id: "c14", t: "Chemical bonding",
    q: "Which of these contains a dative (coordinate) covalent bond?",
    o: ["CH₄", "NaCl", "NH₄⁺", "H₂"], a: 2,
    x: "In NH₄⁺ the lone pair on nitrogen in NH₃ is donated to an H⁺ ion, so both electrons of that bond come from one atom: a dative bond."
  },
  {
    id: "c15", t: "Chemical bonding",
    q: "What is the shape of a methane (CH₄) molecule?",
    o: ["Linear", "Trigonal planar", "Tetrahedral", "Octahedral"], a: 2,
    x: "Carbon has four bond pairs and no lone pairs. They repel equally and point to the corners of a tetrahedron, with bond angles of 109.5°."
  },
  {
    id: "c16", t: "Gas laws and kinetic theory",
    q: "Under the same conditions, how many times faster than oxygen does hydrogen diffuse? (H₂ = 2, O₂ = 32)",
    o: ["16", "2", "4", "8"], a: 2,
    x: "Graham's law: rate ∝ 1/√M. Rate(H₂) ÷ rate(O₂) = √(32/2) = √16 = 4."
  },
  {
    id: "c17", t: "Gas laws and kinetic theory",
    q: "According to the kinetic theory, the pressure of a gas is caused by",
    o: ["collisions of the gas molecules with the walls of the container", "attraction between the gas molecules", "the weight of the gas", "vibration of the container walls"], a: 0,
    x: "Gas molecules move randomly and keep hitting the walls. Each collision exerts a small force, and the total force per unit area is the pressure."
  },
  {
    id: "c18", t: "Air and water",
    q: "About what percentage of air by volume is nitrogen?",
    o: ["21%", "78%", "0.03%", "1%"], a: 1,
    x: "Dry air is about 78% nitrogen, 21% oxygen, about 1% noble gases (mainly argon) and about 0.04% carbon(IV) oxide."
  },
  {
    id: "c19", t: "Air and water",
    q: "Temporary hardness of water is caused by dissolved",
    o: ["calcium tetraoxosulfate(VI)", "sodium chloride", "calcium hydrogentrioxocarbonate(IV)", "magnesium tetraoxosulfate(VI)"], a: 2,
    x: "Calcium hydrogencarbonate, Ca(HCO₃)₂, breaks down on boiling to insoluble CaCO₃, so the hardness can be removed by boiling. Sulfates cause permanent hardness."
  },
  {
    id: "c20", t: "Solubility",
    q: "The solubility of a salt is 40 g per 100 g of water at 30 °C. What mass of the salt dissolves in 250 g of water at that temperature?",
    o: ["40 g", "160 g", "100 g", "62.5 g"], a: 2,
    x: "40 g per 100 g of water is 0.4 g per gram, so 250 × 0.4 = 100 g."
  },
  {
    id: "c21", t: "Environmental pollution",
    q: "Which gas is the main cause of acid rain?",
    o: ["Carbon(II) oxide", "Sulfur(IV) oxide", "Methane", "Nitrogen"], a: 1,
    x: "Sulfur(IV) oxide (SO₂) from burning fuels dissolves in rainwater and is oxidised to sulfuric acid. Carbon(II) oxide is poisonous but does not form acid rain."
  },
  {
    id: "c22", t: "Acids, bases and salts",
    q: "A solution with a pH of 2 is",
    o: ["neutral", "weakly acidic", "alkaline", "strongly acidic"], a: 3,
    x: "pH below 7 is acidic, and the lower the pH the stronger the acid. pH 2 is strongly acidic; pH 7 is neutral and above 7 is alkaline."
  },
  {
    id: "c23", t: "Acids, bases and salts",
    q: "What volume of 0.1 mol/dm³ H₂SO₄ neutralises 25 cm³ of 0.1 mol/dm³ NaOH? H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O",
    o: ["25 cm³", "12.5 cm³", "50 cm³", "6.25 cm³"], a: 1,
    x: "Moles of NaOH = 0.1 × 25/1,000 = 0.0025. The equation needs half as much acid: 0.00125 mol. Volume = 0.00125 ÷ 0.1 = 0.0125 dm³ = 12.5 cm³."
  },
  {
    id: "c24", t: "Acids, bases and salts",
    q: "An aqueous solution of ammonium chloride, a salt of a strong acid and a weak base, is",
    o: ["alkaline", "neutral", "acidic", "amphoteric"], a: 2,
    x: "The NH₄⁺ ion reacts with water (hydrolysis) to release H⁺ ions, so the solution is slightly acidic."
  },
  {
    id: "c25", t: "Oxidation and reduction",
    q: "What is the oxidation number of manganese in KMnO₄?",
    o: ["+6", "+7", "+5", "−1"], a: 1,
    x: "K = +1 and each O = −2. +1 + Mn + 4(−2) = 0, so Mn = +7."
  },
  {
    id: "c26", t: "Oxidation and reduction",
    q: "In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, the reducing agent is",
    o: ["Zn", "Cu²⁺", "Zn²⁺", "Cu"], a: 0,
    x: "Zinc loses electrons (it is oxidised to Zn²⁺), giving them to Cu²⁺. The substance that gives electrons away is the reducing agent."
  },
  {
    id: "c27", t: "Electrolysis",
    q: "What mass of copper is deposited when 19,300 C of charge passes through copper(II) tetraoxosulfate(VI) solution? (Cu = 64, F = 96,500 C/mol)",
    o: ["12.8 g", "3.2 g", "64 g", "6.4 g"], a: 3,
    x: "Moles of electrons = 19,300 ÷ 96,500 = 0.2. Cu²⁺ + 2e⁻ → Cu, so 0.2 mol of electrons deposits 0.1 mol of copper = 0.1 × 64 = 6.4 g."
  },
  {
    id: "c28", t: "Electrolysis",
    q: "During the electrolysis of dilute sulfuric acid with inert electrodes, the gas given off at the anode is",
    o: ["hydrogen", "oxygen", "sulfur(IV) oxide", "chlorine"], a: 1,
    x: "Hydroxide ions are discharged at the anode: 4OH⁻ → 2H₂O + O₂ + 4e⁻. Hydrogen is given off at the cathode."
  },
  {
    id: "c29", t: "Energy changes",
    q: "For an exothermic reaction, the enthalpy change ΔH is",
    o: ["positive", "zero", "negative", "equal to the activation energy"], a: 2,
    x: "An exothermic reaction gives out heat, so the products have less energy than the reactants and ΔH is negative."
  },
  {
    id: "c30", t: "Rates of reaction",
    q: "A catalyst speeds up a reaction by",
    o: ["providing a route with a lower activation energy", "increasing the energy of the products", "shifting the position of equilibrium", "increasing the concentration of the reactants"], a: 0,
    x: "A catalyst offers an alternative pathway with lower activation energy, so more collisions succeed. It is not used up and does not change the equilibrium position."
  },
  {
    id: "c31", t: "Chemical equilibrium",
    q: "For N₂(g) + 3H₂(g) ⇌ 2NH₃(g), ΔH negative, what is the effect of increasing the pressure?",
    o: ["The equilibrium shifts to the left", "There is no effect", "The equilibrium shifts to the right", "Only the rate of the backward reaction rises"], a: 2,
    x: "There are 4 moles of gas on the left and 2 on the right. By Le Chatelier's principle, higher pressure favours the side with fewer gas moles, so more ammonia forms."
  },
  {
    id: "c32", t: "Chemical equilibrium",
    q: "For the same reaction, N₂ + 3H₂ ⇌ 2NH₃ (ΔH negative), raising the temperature",
    o: ["increases the yield of ammonia", "decreases the yield of ammonia", "has no effect on the yield", "stops the reaction"], a: 1,
    x: "The forward reaction is exothermic. Raising the temperature favours the endothermic (backward) reaction, so the yield of ammonia falls, although equilibrium is reached faster."
  },
  {
    id: "c33", t: "Non-metals and their compounds",
    q: "Which gas turns lime water milky?",
    o: ["Oxygen", "Hydrogen", "Ammonia", "Carbon(IV) oxide"], a: 3,
    x: "CO₂ reacts with lime water, Ca(OH)₂, to form insoluble calcium carbonate, which makes the solution milky."
  },
  {
    id: "c34", t: "Non-metals and their compounds",
    q: "Which gas turns damp red litmus paper blue?",
    o: ["Chlorine", "Ammonia", "Hydrogen chloride", "Sulfur(IV) oxide"], a: 1,
    x: "Ammonia is the common alkaline gas. Chlorine bleaches litmus, while hydrogen chloride and sulfur(IV) oxide are acidic and turn blue litmus red."
  },
  {
    id: "c35", t: "Non-metals and their compounds",
    q: "Which halogen is the most reactive?",
    o: ["Chlorine", "Bromine", "Iodine", "Fluorine"], a: 3,
    x: "Reactivity falls down group 7. Fluorine has the smallest atoms, so it attracts an extra electron most strongly."
  },
  {
    id: "c36", t: "Metals and their compounds",
    q: "Aluminium is extracted from its ore by",
    o: ["reduction with carbon in a blast furnace", "electrolysis of molten alumina dissolved in cryolite", "heating the ore in air", "displacement with copper"], a: 1,
    x: "Aluminium is too reactive to be reduced by carbon, so purified bauxite (alumina, Al₂O₃) is electrolysed. Cryolite lowers its melting point and saves energy."
  },
  {
    id: "c37", t: "Metals and their compounds",
    q: "Iron rusts when it is exposed to",
    o: ["oxygen only", "water only", "both water and oxygen", "carbon(IV) oxide and nitrogen"], a: 2,
    x: "Rusting needs both water and oxygen. Iron kept in dry air, or in boiled water with no dissolved air, does not rust."
  },
  {
    id: "c38", t: "Organic chemistry",
    q: "What is the general formula of the alkanes?",
    o: ["CₙH₂ₙ", "CₙH₂ₙ₊₂", "CₙH₂ₙ₋₂", "CₙH₂ₙ₊₁OH"], a: 1,
    x: "Alkanes are saturated hydrocarbons, CₙH₂ₙ₊₂ (methane CH₄, ethane C₂H₆). CₙH₂ₙ is the alkenes, CₙH₂ₙ₋₂ the alkynes and CₙH₂ₙ₊₁OH the alkanols."
  },
  {
    id: "c39", t: "Organic chemistry",
    q: "What is the IUPAC name of CH₃CH₂CH₂OH?",
    o: ["Propanal", "Propan-2-ol", "Propan-1-ol", "Propanoic acid"], a: 2,
    x: "It has three carbons (prop-) with the –OH group on the end carbon (carbon 1), so it is propan-1-ol."
  },
  {
    id: "c40", t: "Organic chemistry",
    q: "Which of these compounds decolourises bromine water?",
    o: ["Ethene", "Ethane", "Methane", "Propane"], a: 0,
    x: "Ethene has a C=C double bond, so bromine adds across it (an addition reaction) and the orange colour disappears. Alkanes are saturated and don't react this way."
  },
  {
    id: "c41", t: "Organic chemistry",
    q: "Ethanoic acid reacts with ethanol, in the presence of concentrated sulfuric acid, to form",
    o: ["methyl ethanoate", "ethyl ethanoate", "ethyl methanoate", "ethanal"], a: 1,
    x: "An acid and an alkanol form an ester and water (esterification). The ester is named alkyl from the alcohol plus -oate from the acid: ethyl ethanoate."
  },
  {
    id: "c42", t: "Organic chemistry",
    q: "How many structural isomers does butane, C₄H₁₀, have?",
    o: ["1", "3", "2", "4"], a: 2,
    x: "Two: the straight chain (butane) and the branched chain (2-methylpropane)."
  },
  {
    id: "c43", t: "Chemistry and industry",
    q: "Polythene is made by",
    o: ["condensation polymerisation of glucose", "addition polymerisation of ethene", "fermentation of starch", "cracking of methane"], a: 1,
    x: "Many ethene molecules join through their double bonds, with no by-product, to form the long chain (–CH₂–CH₂–)ₙ: addition polymerisation."
  },
  {
    id: "c44", t: "Chemistry and industry",
    q: "Which catalyst is used in the Haber process for making ammonia?",
    o: ["Vanadium(V) oxide", "Nickel", "Iron", "Platinum"], a: 2,
    x: "The Haber process uses finely divided iron. Vanadium(V) oxide is the catalyst in the Contact process, and nickel is used to harden oils."
  },
  {
    id: "c45", t: "Chemistry and industry",
    q: "Soap is made by boiling fats or oils with",
    o: ["sodium hydroxide", "sulfuric acid", "sodium chloride", "calcium carbonate"], a: 0,
    x: "Saponification: fats react with sodium (or potassium) hydroxide to give soap (the salt of a fatty acid) and glycerol. Common salt is then added to separate the soap."
  }
];
