// Original JAMB-style Physics questions written by StudentToolsNG to the
// UTME syllabus (not copied from past papers). Same shape as mathematics.js.
// g = 10 m/s² throughout, as in the UTME.
export const PHYSICS = [
  {
    id: "p01", t: "Measurement and units",
    q: "What is the SI unit of power?",
    o: ["Joule", "Watt", "Newton", "Pascal"], a: 1,
    x: "Power is the rate of doing work, measured in joules per second, which is the watt (W). The joule is the unit of energy, the newton of force and the pascal of pressure."
  },
  {
    id: "p02", t: "Measurement and units",
    q: "What are the dimensions of force?",
    o: ["ML²T⁻²", "MLT⁻¹", "MLT⁻²", "ML⁻¹T⁻²"], a: 2,
    x: "Force = mass × acceleration = M × LT⁻² = MLT⁻². ML²T⁻² is energy, MLT⁻¹ is momentum and ML⁻¹T⁻² is pressure."
  },
  {
    id: "p03", t: "Scalars and vectors",
    q: "Which of these quantities is a vector?",
    o: ["Speed", "Mass", "Energy", "Acceleration"], a: 3,
    x: "A vector has both size and direction. Acceleration has a direction; speed, mass and energy have size only, so they are scalars."
  },
  {
    id: "p04", t: "Scalars and vectors",
    q: "Two forces of 3 N and 4 N act on a body at right angles to each other. What is the size of their resultant?",
    o: ["7 N", "5 N", "1 N", "12 N"], a: 1,
    x: "At right angles, use Pythagoras: R = √(3² + 4²) = √25 = 5 N. 7 N would be the resultant only if they acted in the same direction."
  },
  {
    id: "p05", t: "Motion",
    q: "A car starts from rest and accelerates uniformly to 20 m/s in 5 s. How far does it travel in this time?",
    o: ["100 m", "4 m", "50 m", "25 m"], a: 2,
    x: "Distance = average velocity × time = (0 + 20)/2 × 5 = 50 m. (The acceleration is 4 m/s², and s = ½at² = ½ × 4 × 25 = 50 m too.)"
  },
  {
    id: "p06", t: "Motion",
    q: "A stone is dropped from rest and falls freely for 3 s. How far does it fall?",
    o: ["45 m", "90 m", "30 m", "15 m"], a: 0,
    x: "s = ut + ½gt² = 0 + ½ × 10 × 3² = 45 m."
  },
  {
    id: "p07", t: "Motion",
    q: "A ball is thrown vertically upwards at 20 m/s. What maximum height does it reach?",
    o: ["40 m", "200 m", "10 m", "20 m"], a: 3,
    x: "At the top v = 0. v² = u² − 2gh gives h = u² ÷ 2g = 400 ÷ 20 = 20 m."
  },
  {
    id: "p08", t: "Motion",
    q: "A projectile is fired at 20 m/s at 45° to the horizontal. What is its horizontal range on level ground?",
    o: ["20 m", "40 m", "80 m", "28.3 m"], a: 1,
    x: "R = u² sin 2θ ÷ g = 400 × sin 90° ÷ 10 = 40 m."
  },
  {
    id: "p09", t: "Newton's laws and momentum",
    q: "What force gives a 5 kg mass an acceleration of 4 m/s²?",
    o: ["1.25 N", "9 N", "20 N", "0.8 N"], a: 2,
    x: "Newton's second law: F = ma = 5 × 4 = 20 N. Dividing (1.25 N or 0.8 N) or adding (9 N) the numbers are the usual slips."
  },
  {
    id: "p10", t: "Newton's laws and momentum",
    q: "A 2 kg trolley moving at 6 m/s hits a stationary 1 kg trolley and they move off together. What is their common velocity?",
    o: ["6 m/s", "4 m/s", "3 m/s", "2 m/s"], a: 1,
    x: "Momentum is conserved: 2 × 6 + 1 × 0 = (2 + 1)v, so 12 = 3v and v = 4 m/s."
  },
  {
    id: "p11", t: "Newton's laws and momentum",
    q: "A force of 50 N acts on a ball for 0.2 s. What impulse does it give the ball?",
    o: ["250 N s", "10 N s", "0.004 N s", "50.2 N s"], a: 1,
    x: "Impulse = force × time = 50 × 0.2 = 10 N s, which equals the change in the ball's momentum."
  },
  {
    id: "p12", t: "Circular motion",
    q: "A 0.5 kg stone tied to a string moves in a circle of radius 2 m at 4 m/s. What is the tension providing the centripetal force?",
    o: ["8 N", "1 N", "16 N", "4 N"], a: 3,
    x: "F = mv² ÷ r = 0.5 × 16 ÷ 2 = 4 N."
  },
  {
    id: "p13", t: "Gravitational field",
    q: "If the distance between two masses is doubled, the gravitational force between them becomes",
    o: ["half as large", "one quarter as large", "twice as large", "four times as large"], a: 1,
    x: "Newton's law of gravitation is an inverse-square law, F ∝ 1/r². Doubling r divides F by 2² = 4."
  },
  {
    id: "p14", t: "Equilibrium of forces",
    q: "A uniform metre rule balances at its 50 cm mark. A 30 g mass hangs at the 20 cm mark. Where must a 20 g mass hang to balance the rule again?",
    o: ["80 cm mark", "95 cm mark", "70 cm mark", "5 cm mark"], a: 1,
    x: "Take moments about the pivot. Anticlockwise: 30 × (50 − 20) = 900. Clockwise: 20 × d = 900, so d = 45 cm from the pivot, which is the 95 cm mark."
  },
  {
    id: "p15", t: "Work, energy and power",
    q: "A 60 kg student climbs a staircase 5 m high in 10 s. What is the student's average power?",
    o: ["3,000 W", "300 W", "30 W", "120 W"], a: 1,
    x: "Work done = mgh = 60 × 10 × 5 = 3,000 J. Power = work ÷ time = 3,000 ÷ 10 = 300 W."
  },
  {
    id: "p16", t: "Work, energy and power",
    q: "What is the kinetic energy of a 2 kg body moving at 10 m/s?",
    o: ["200 J", "20 J", "100 J", "50 J"], a: 2,
    x: "KE = ½mv² = ½ × 2 × 100 = 100 J."
  },
  {
    id: "p17", t: "Simple machines",
    q: "A machine has a mechanical advantage of 4 and a velocity ratio of 5. What is its efficiency?",
    o: ["80%", "125%", "20%", "90%"], a: 0,
    x: "Efficiency = MA ÷ VR × 100% = 4/5 × 100% = 80%. Efficiency can never be over 100%."
  },
  {
    id: "p18", t: "Friction",
    q: "A 10 kg block rests on a horizontal floor. The coefficient of static friction is 0.3. What is the limiting frictional force?",
    o: ["3 N", "300 N", "33 N", "30 N"], a: 3,
    x: "Normal reaction R = mg = 10 × 10 = 100 N. Limiting friction F = μR = 0.3 × 100 = 30 N."
  },
  {
    id: "p19", t: "Elasticity",
    q: "A spring stretches 2 cm under a load of 4 N. Within its elastic limit, how far does it stretch under 10 N?",
    o: ["8 cm", "5 cm", "20 cm", "2.5 cm"], a: 1,
    x: "Hooke's law: extension ∝ load. The spring constant is 4 N ÷ 2 cm = 2 N/cm, so 10 N gives 10 ÷ 2 = 5 cm."
  },
  {
    id: "p20", t: "Pressure",
    q: "What is the pressure due to the water alone at a depth of 5 m? (Density of water = 1,000 kg/m³.)",
    o: ["5.0 × 10³ Pa", "5.0 × 10⁵ Pa", "5.0 × 10⁴ Pa", "2.0 × 10³ Pa"], a: 2,
    x: "P = hρg = 5 × 1,000 × 10 = 50,000 Pa = 5.0 × 10⁴ Pa."
  },
  {
    id: "p21", t: "Liquids at rest",
    q: "A solid weighs 10 N in air and 6 N when fully immersed in water. What is its relative density?",
    o: ["1.67", "0.4", "2.5", "4"], a: 2,
    x: "Upthrust = 10 − 6 = 4 N, the weight of water displaced. Relative density = weight in air ÷ upthrust = 10 ÷ 4 = 2.5."
  },
  {
    id: "p22", t: "Temperature",
    q: "Express 300 K on the Celsius scale.",
    o: ["573 °C", "27 °C", "−27 °C", "30 °C"], a: 1,
    x: "θ = T − 273 = 300 − 273 = 27 °C."
  },
  {
    id: "p23", t: "Heat energy",
    q: "How much heat is needed to raise the temperature of 2 kg of water by 10 K? (Specific heat capacity of water = 4,200 J/kg K.)",
    o: ["8,400 J", "42,000 J", "84,000 J", "840,000 J"], a: 2,
    x: "Q = mcΔθ = 2 × 4,200 × 10 = 84,000 J."
  },
  {
    id: "p24", t: "Heat energy",
    q: "How much heat is needed to melt 0.5 kg of ice at 0 °C? (Specific latent heat of fusion of ice = 3.36 × 10⁵ J/kg.)",
    o: ["1.68 × 10⁵ J", "3.36 × 10⁵ J", "6.72 × 10⁵ J", "1.68 × 10⁴ J"], a: 0,
    x: "Q = mL = 0.5 × 3.36 × 10⁵ = 1.68 × 10⁵ J. The temperature stays at 0 °C while the ice melts."
  },
  {
    id: "p25", t: "Gas laws",
    q: "A gas occupies 300 cm³ at 27 °C. It is heated at constant pressure to 127 °C. What is its new volume?",
    o: ["1,411 cm³", "225 cm³", "300 cm³", "400 cm³"], a: 3,
    x: "Charles's law uses kelvin: V₂ = V₁ × T₂/T₁ = 300 × 400/300 = 400 cm³. Using °C (300 × 127/27) gives the wrong answer 1,411 cm³."
  },
  {
    id: "p26", t: "Gas laws",
    q: "A gas of volume 4 litres at 100 kPa is compressed to 1 litre at constant temperature. What is its new pressure?",
    o: ["25 kPa", "400 kPa", "100 kPa", "200 kPa"], a: 1,
    x: "Boyle's law: P₁V₁ = P₂V₂. 100 × 4 = P₂ × 1, so P₂ = 400 kPa."
  },
  {
    id: "p27", t: "Thermal expansion",
    q: "A 2 m steel rod is heated through 50 K. Its linear expansivity is 1.2 × 10⁻⁵ K⁻¹. By how much does it expand?",
    o: ["0.6 mm", "1.2 mm", "12 mm", "2.4 mm"], a: 1,
    x: "Δl = αlΔθ = 1.2 × 10⁻⁵ × 2 × 50 = 1.2 × 10⁻³ m = 1.2 mm."
  },
  {
    id: "p28", t: "Heat transfer",
    q: "Heat from the Sun reaches the Earth mainly by",
    o: ["conduction", "convection", "radiation", "evaporation"], a: 2,
    x: "Space between the Sun and the Earth is almost a vacuum. Conduction and convection need a material medium; radiation (electromagnetic waves) does not."
  },
  {
    id: "p29", t: "Waves",
    q: "A wave has a frequency of 50 Hz and a wavelength of 4 m. What is its speed?",
    o: ["12.5 m/s", "200 m/s", "0.08 m/s", "54 m/s"], a: 1,
    x: "The wave equation: v = fλ = 50 × 4 = 200 m/s. Every wave, sound or light, obeys v = fλ."
  },
  {
    id: "p30", t: "Sound",
    q: "A student standing 170 m from a cliff claps and hears the echo 1 s later. What is the speed of sound?",
    o: ["170 m/s", "85 m/s", "680 m/s", "340 m/s"], a: 3,
    x: "The sound travels to the cliff and back: 2 × 170 = 340 m in 1 s, so v = 340 m/s."
  },
  {
    id: "p31", t: "Sound",
    q: "The pitch of a musical note depends on its",
    o: ["frequency", "amplitude", "number of overtones", "speed in air"], a: 0,
    x: "Pitch depends on frequency. Loudness depends on amplitude, and quality (timbre) depends on the overtones present."
  },
  {
    id: "p32", t: "Reflection of light",
    q: "How many images of an object are formed by two plane mirrors inclined at 60° to each other?",
    o: ["6", "5", "3", "7"], a: 1,
    x: "n = 360/θ − 1 = 360/60 − 1 = 5."
  },
  {
    id: "p33", t: "Refraction of light",
    q: "A ray of light passes from air into glass. The angle of incidence is 60° and the angle of refraction is 30°. What is the refractive index of the glass?",
    o: ["2.00", "0.58", "1.73", "1.50"], a: 2,
    x: "Snell's law: n = sin i ÷ sin r = sin 60° ÷ sin 30° = 0.866 ÷ 0.5 = 1.73 (that is √3)."
  },
  {
    id: "p34", t: "Refraction of light",
    q: "What is the critical angle for glass of refractive index 1.5?",
    o: ["48.2°", "33.7°", "56.3°", "41.8°"], a: 3,
    x: "sin c = 1/n = 1/1.5 = 0.667, so c = sin⁻¹ 0.667 ≈ 41.8°."
  },
  {
    id: "p35", t: "Lenses",
    q: "An object is placed 30 cm from a converging lens of focal length 10 cm. How far from the lens is the image?",
    o: ["7.5 cm", "15 cm", "20 cm", "30 cm"], a: 1,
    x: "1/f = 1/u + 1/v (real is positive). 1/v = 1/10 − 1/30 = 2/30, so v = 15 cm. The image is real, inverted and half the size of the object."
  },
  {
    id: "p36", t: "Lenses",
    q: "What is the power of a converging lens of focal length 25 cm?",
    o: ["+0.04 D", "+4 D", "+25 D", "−4 D"], a: 1,
    x: "Power = 1/f with f in metres: 1 ÷ 0.25 = +4 dioptres. Converging lenses have positive power."
  },
  {
    id: "p37", t: "Electrostatics",
    q: "Two point charges repel each other with a force F. If the distance between them is halved, the force becomes",
    o: ["2F", "F/2", "4F", "F/4"], a: 2,
    x: "Coulomb's law: F ∝ 1/r². Halving r multiplies the force by 2² = 4."
  },
  {
    id: "p38", t: "Capacitors",
    q: "A 2 μF capacitor is charged to 50 V. What charge does it store?",
    o: ["2.5 × 10⁻³ C", "1.0 × 10⁻⁴ C", "4.0 × 10⁻⁸ C", "25 C"], a: 1,
    x: "Q = CV = 2 × 10⁻⁶ × 50 = 1.0 × 10⁻⁴ C. (2.5 × 10⁻³ J is the energy stored, ½CV².)"
  },
  {
    id: "p39", t: "Capacitors",
    q: "Capacitors of 2 μF and 3 μF are connected in series. What is the combined capacitance?",
    o: ["5 μF", "1.2 μF", "6 μF", "0.83 μF"], a: 1,
    x: "In series: 1/C = 1/2 + 1/3 = 5/6, so C = 6/5 = 1.2 μF. Capacitors in series combine like resistors in parallel."
  },
  {
    id: "p40", t: "Current electricity",
    q: "Resistors of 4 Ω and 12 Ω are connected in parallel across a 12 V battery of negligible internal resistance. What current does the battery supply?",
    o: ["0.75 A", "4 A", "1 A", "3 A"], a: 1,
    x: "Parallel resistance = (4 × 12) ÷ (4 + 12) = 48/16 = 3 Ω. I = V/R = 12/3 = 4 A."
  },
  {
    id: "p41", t: "Current electricity",
    q: "A cell of e.m.f. 3 V and internal resistance 1 Ω is connected to a 5 Ω resistor. What is the terminal potential difference?",
    o: ["3.0 V", "0.5 V", "2.5 V", "0.6 V"], a: 2,
    x: "I = E ÷ (R + r) = 3 ÷ 6 = 0.5 A. Terminal p.d. V = IR = 0.5 × 5 = 2.5 V; the other 0.5 V is lost inside the cell."
  },
  {
    id: "p42", t: "Current electricity",
    q: "A 2 kW heater is used for 3 hours. Electricity costs ₦100 per kWh. What does it cost to run?",
    o: ["₦6,000", "₦200", "₦600", "₦150"], a: 2,
    x: "Energy = power × time = 2 kW × 3 h = 6 kWh. Cost = 6 × ₦100 = ₦600."
  },
  {
    id: "p43", t: "Magnetism",
    q: "A wire 0.1 m long carries a current of 2 A at right angles to a magnetic field of 0.5 T. What force acts on it?",
    o: ["0.1 N", "1.0 N", "10 N", "0.4 N"], a: 0,
    x: "F = BIL = 0.5 × 2 × 0.1 = 0.1 N."
  },
  {
    id: "p44", t: "Electromagnetic induction",
    q: "An ideal transformer has 200 turns on the primary and 1,000 turns on the secondary. If the input is 240 V a.c., what is the output voltage?",
    o: ["48 V", "240 V", "1,200 V", "600 V"], a: 2,
    x: "Vs/Vp = Ns/Np, so Vs = 240 × 1,000/200 = 1,200 V. It is a step-up transformer."
  },
  {
    id: "p45", t: "Simple a.c. circuits",
    q: "An alternating voltage has a peak value of 100 V. What is its r.m.s. value?",
    o: ["141.4 V", "70.7 V", "50 V", "100 V"], a: 1,
    x: "Vrms = Vpeak ÷ √2 = 100 ÷ 1.414 = 70.7 V."
  },
  {
    id: "p46", t: "Radioactivity",
    q: "A radioactive sample has a half-life of 2 days. If 64 g is present now, how much remains after 8 days?",
    o: ["8 g", "16 g", "4 g", "2 g"], a: 2,
    x: "8 days = 4 half-lives. 64 → 32 → 16 → 8 → 4 g."
  },
  {
    id: "p47", t: "Radioactivity",
    q: "An alpha particle is",
    o: ["a fast-moving electron", "a helium nucleus", "an electromagnetic wave", "a neutron"], a: 1,
    x: "An alpha particle is two protons and two neutrons, a helium nucleus. A beta particle is a fast electron and gamma rays are electromagnetic waves."
  },
  {
    id: "p48", t: "Modern physics",
    q: "In the photoelectric effect, the maximum kinetic energy of the emitted electrons depends on",
    o: ["the intensity of the light", "the area of the metal surface", "the frequency of the light", "how long the light shines"], a: 2,
    x: "Einstein's equation: KEmax = hf − W. Brighter light releases more electrons but not faster ones; only a higher frequency raises their maximum energy."
  },
  {
    id: "p49", t: "Electronics",
    q: "Which device allows current to flow in one direction only and is used for rectification?",
    o: ["Resistor", "Capacitor", "Transformer", "Diode"], a: 3,
    x: "A p-n junction diode conducts when forward biased and blocks current when reverse biased, so it turns a.c. into one-way (d.c.) current."
  }
];
