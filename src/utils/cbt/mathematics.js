// Original JAMB-style Mathematics questions written by StudentToolsNG to the
// UTME syllabus (not copied from past papers). Each question:
//   id, t (topic), q (question), o (four options), a (index of the answer in o),
//   x (explanation / working).
// Numeric answers are checked by the unit tests in the scratchpad (cbt tests).
export const MATHEMATICS = [
  {
    id: "m01", t: "Number bases",
    q: "Convert 1011₂ to base ten.",
    o: ["11", "13", "9", "22"], a: 0,
    x: "1011₂ = 1×2³ + 0×2² + 1×2 + 1 = 8 + 0 + 2 + 1 = 11."
  },
  {
    id: "m02", t: "Number bases",
    q: "Express 245₈ in base ten.",
    o: ["157", "165", "175", "145"], a: 1,
    x: "245₈ = 2×8² + 4×8 + 5 = 128 + 32 + 5 = 165."
  },
  {
    id: "m03", t: "Fractions and percentages",
    q: "Simplify (2/3 + 1/4) ÷ 11/6.",
    o: ["2/3", "11/72", "1/2", "3/4"], a: 2,
    x: "2/3 + 1/4 = 8/12 + 3/12 = 11/12. Then 11/12 ÷ 11/6 = 11/12 × 6/11 = 6/12 = 1/2."
  },
  {
    id: "m04", t: "Fractions and percentages",
    q: "A trader buys a bag for ₦4,000 and sells it for ₦5,000. What is the percentage profit?",
    o: ["20%", "25%", "10%", "30%"], a: 1,
    x: "Profit = ₦5,000 − ₦4,000 = ₦1,000. Percentage profit is worked on the cost price: 1,000 ÷ 4,000 × 100 = 25%. (20% is the profit as a share of the selling price, a common mistake.)"
  },
  {
    id: "m05", t: "Fractions and percentages",
    q: "Find the simple interest on ₦5,000 at 6% per annum for 3 years.",
    o: ["₦300", "₦955.08", "₦1,800", "₦900"], a: 3,
    x: "Simple interest = PRT ÷ 100 = 5,000 × 6 × 3 ÷ 100 = ₦900. ₦955.08 would be the compound interest."
  },
  {
    id: "m06", t: "Indices",
    q: "Evaluate 27^(2/3) × 16^(−1/4).",
    o: ["9/2", "6", "18", "3/2"], a: 0,
    x: "27^(2/3) = (∛27)² = 3² = 9. 16^(−1/4) = 1 ÷ 16^(1/4) = 1/2. So 9 × 1/2 = 9/2."
  },
  {
    id: "m07", t: "Indices",
    q: "Solve for x: 2^(x + 1) = 32.",
    o: ["5", "3", "4", "16"], a: 2,
    x: "32 = 2⁵, so x + 1 = 5 and x = 4."
  },
  {
    id: "m08", t: "Logarithms",
    q: "Evaluate log₂8 + log₃9 − log₅1.",
    o: ["6", "5", "4", "1"], a: 1,
    x: "log₂8 = 3 (2³ = 8), log₃9 = 2 (3² = 9) and log₅1 = 0 (any base to power 0 is 1). 3 + 2 − 0 = 5."
  },
  {
    id: "m09", t: "Logarithms",
    q: "If log 2 = 0.3010 and log 3 = 0.4771, find log 12.",
    o: ["0.7781", "1.2552", "1.0791", "0.9542"], a: 2,
    x: "12 = 2² × 3, so log 12 = 2 log 2 + log 3 = 0.6020 + 0.4771 = 1.0791."
  },
  {
    id: "m10", t: "Surds",
    q: "Simplify √50 − √18.",
    o: ["2√2", "4√2", "√2", "8"], a: 0,
    x: "√50 = √(25 × 2) = 5√2 and √18 = √(9 × 2) = 3√2. 5√2 − 3√2 = 2√2."
  },
  {
    id: "m11", t: "Surds",
    q: "Rationalise 1 ÷ (√3 − 1).",
    o: ["(√3 − 1)/2", "√3 + 1", "(√3 + 1)/2", "(√3 + 1)/4"], a: 2,
    x: "Multiply top and bottom by the conjugate √3 + 1: (√3 + 1) ÷ ((√3)² − 1²) = (√3 + 1) ÷ (3 − 1) = (√3 + 1)/2."
  },
  {
    id: "m12", t: "Sets",
    q: "In a class of 40 students, 25 offer Physics, 20 offer Chemistry and 8 offer both. How many offer neither subject?",
    o: ["3", "5", "13", "8"], a: 0,
    x: "n(P ∪ C) = n(P) + n(C) − n(P ∩ C) = 25 + 20 − 8 = 37. Neither = 40 − 37 = 3."
  },
  {
    id: "m13", t: "Polynomials",
    q: "Find the remainder when x³ − 2x² + 3x − 4 is divided by x − 2.",
    o: ["−2", "2", "6", "10"], a: 1,
    x: "By the remainder theorem, substitute x = 2: 8 − 8 + 6 − 4 = 2."
  },
  {
    id: "m14", t: "Polynomials",
    q: "Factorise 6x² − x − 2.",
    o: ["(2x − 1)(3x + 2)", "(6x + 1)(x − 2)", "(2x + 1)(3x − 2)", "(3x + 1)(2x − 2)"], a: 2,
    x: "Find two numbers that multiply to 6 × (−2) = −12 and add to −1: −4 and 3. 6x² − 4x + 3x − 2 = 2x(3x − 2) + 1(3x − 2) = (2x + 1)(3x − 2)."
  },
  {
    id: "m15", t: "Quadratic equations",
    q: "If α and β are the roots of 2x² − 5x + 3 = 0, find α² + β².",
    o: ["25/4", "13/4", "19/4", "7/4"], a: 1,
    x: "α + β = 5/2 and αβ = 3/2. α² + β² = (α + β)² − 2αβ = 25/4 − 3 = 13/4. (Check: the roots are 1 and 3/2, and 1 + 9/4 = 13/4.)"
  },
  {
    id: "m16", t: "Linear equations",
    q: "Solve the simultaneous equations 2x + y = 7 and x − y = 2.",
    o: ["x = 2, y = 3", "x = 3, y = 1", "x = 1, y = 5", "x = 4, y = −1"], a: 1,
    x: "Add the equations: 3x = 9, so x = 3. Then 3 − y = 2 gives y = 1. (x = 4, y = −1 fits the first equation only.)"
  },
  {
    id: "m17", t: "Variation",
    q: "y varies inversely as the square of x, and y = 8 when x = 2. Find y when x = 4.",
    o: ["4", "16", "2", "1"], a: 2,
    x: "y = k/x². 8 = k/4, so k = 32. When x = 4, y = 32/16 = 2."
  },
  {
    id: "m18", t: "Inequalities",
    q: "Solve 3 − 2x < 7.",
    o: ["x < −2", "x > −2", "x > 2", "x < 2"], a: 1,
    x: "−2x < 4. Dividing by −2 reverses the inequality sign: x > −2."
  },
  {
    id: "m19", t: "Sequences and series",
    q: "Find the 10th term of the arithmetic progression 3, 7, 11, …",
    o: ["43", "40", "39", "35"], a: 2,
    x: "a = 3, d = 4. Tₙ = a + (n − 1)d = 3 + 9 × 4 = 39."
  },
  {
    id: "m20", t: "Sequences and series",
    q: "Find the sum of the first 20 terms of an arithmetic progression whose first term is 2 and common difference is 3.",
    o: ["610", "580", "640", "305"], a: 0,
    x: "Sₙ = n/2 [2a + (n − 1)d] = 20/2 × [4 + 19 × 3] = 10 × 61 = 610."
  },
  {
    id: "m21", t: "Sequences and series",
    q: "Find the sum to infinity of the geometric series 12 + 6 + 3 + …",
    o: ["21", "18", "36", "24"], a: 3,
    x: "a = 12 and r = 6/12 = 1/2. S∞ = a ÷ (1 − r) = 12 ÷ 1/2 = 24."
  },
  {
    id: "m22", t: "Binary operations",
    q: "A binary operation * is defined on real numbers by a * b = a + b − ab. Find 2 * 3.",
    o: ["1", "−1", "11", "6"], a: 1,
    x: "2 * 3 = 2 + 3 − (2 × 3) = 5 − 6 = −1."
  },
  {
    id: "m23", t: "Matrices and determinants",
    q: "Find the determinant of the matrix with rows (3, 2) and (1, 4).",
    o: ["14", "10", "−10", "11"], a: 1,
    x: "For rows (a, b) and (c, d) the determinant is ad − bc = 3 × 4 − 2 × 1 = 12 − 2 = 10."
  },
  {
    id: "m24", t: "Matrices and determinants",
    q: "If A is the matrix with rows (2, 1) and (0, 3), find A².",
    o: ["rows (4, 1) and (0, 9)", "rows (4, 2) and (0, 6)", "rows (4, 5) and (0, 9)", "rows (4, 5) and (0, 6)"], a: 2,
    x: "A² = A × A. Row 1: (2×2 + 1×0, 2×1 + 1×3) = (4, 5). Row 2: (0×2 + 3×0, 0×1 + 3×3) = (0, 9). Squaring each entry, which gives (4, 1) and (0, 9), is the common mistake."
  },
  {
    id: "m25", t: "Geometry",
    q: "Each interior angle of a regular polygon is 150°. How many sides does it have?",
    o: ["10", "15", "8", "12"], a: 3,
    x: "Each exterior angle = 180° − 150° = 30°. The exterior angles add up to 360°, so the number of sides is 360 ÷ 30 = 12."
  },
  {
    id: "m26", t: "Geometry",
    q: "A chord subtends an angle of 35° at a point on the circumference of a circle. What angle does it subtend at the centre?",
    o: ["70°", "35°", "145°", "110°"], a: 0,
    x: "The angle at the centre is twice the angle at the circumference standing on the same arc: 2 × 35° = 70°."
  },
  {
    id: "m27", t: "Mensuration",
    q: "Find the area of a sector of a circle of radius 7 cm whose angle is 90°. (Take π = 22/7.)",
    o: ["154 cm²", "77 cm²", "38.5 cm²", "11 cm²"], a: 2,
    x: "Area = θ/360 × πr² = 90/360 × 22/7 × 49 = 1/4 × 154 = 38.5 cm²."
  },
  {
    id: "m28", t: "Mensuration",
    q: "Find the volume of a cylinder of radius 3 cm and height 7 cm. (Take π = 22/7.)",
    o: ["66 cm³", "198 cm³", "132 cm³", "396 cm³"], a: 1,
    x: "V = πr²h = 22/7 × 9 × 7 = 22 × 9 = 198 cm³."
  },
  {
    id: "m29", t: "Trigonometry",
    q: "If sin θ = 3/5 and θ is acute, find tan θ.",
    o: ["4/3", "3/4", "4/5", "5/3"], a: 1,
    x: "Opposite = 3 and hypotenuse = 5, so adjacent = √(25 − 9) = 4 (a 3-4-5 triangle). tan θ = opposite/adjacent = 3/4."
  },
  {
    id: "m30", t: "Trigonometry",
    q: "Evaluate sin 30° + cos 60°.",
    o: ["1/2", "√3", "1", "√3/2"], a: 2,
    x: "sin 30° = 1/2 and cos 60° = 1/2, so the sum is 1."
  },
  {
    id: "m31", t: "Trigonometry",
    q: "From a point on level ground 20 m from the foot of a tower, the angle of elevation of the top is 45°. How tall is the tower?",
    o: ["10 m", "20√2 m", "40 m", "20 m"], a: 3,
    x: "tan 45° = height ÷ 20. tan 45° = 1, so the height is 20 m."
  },
  {
    id: "m32", t: "Coordinate geometry",
    q: "Find the gradient of the line joining (1, 2) and (3, 8).",
    o: ["3", "1/3", "2", "5"], a: 0,
    x: "Gradient = (y₂ − y₁) ÷ (x₂ − x₁) = (8 − 2) ÷ (3 − 1) = 6/2 = 3."
  },
  {
    id: "m33", t: "Coordinate geometry",
    q: "Find the distance between the points (−1, 2) and (2, 6).",
    o: ["7", "5", "√7", "25"], a: 1,
    x: "d = √[(2 − (−1))² + (6 − 2)²] = √(9 + 16) = √25 = 5."
  },
  {
    id: "m34", t: "Coordinate geometry",
    q: "Find the equation of the line with gradient 2 that passes through (1, 3).",
    o: ["y = 2x + 3", "y = 2x − 1", "y = x + 2", "y = 2x + 1"], a: 3,
    x: "y − 3 = 2(x − 1), so y = 2x − 2 + 3 = 2x + 1."
  },
  {
    id: "m35", t: "Differentiation",
    q: "Differentiate 3x² − 4x + 5 with respect to x.",
    o: ["6x − 4", "3x − 4", "6x + 5", "6x² − 4"], a: 0,
    x: "d/dx(3x²) = 6x, d/dx(−4x) = −4 and the derivative of a constant is 0. Answer: 6x − 4."
  },
  {
    id: "m36", t: "Differentiation",
    q: "Find the gradient of the curve y = x³ − 2x at the point where x = 2.",
    o: ["4", "10", "12", "8"], a: 1,
    x: "dy/dx = 3x² − 2. At x = 2: 3 × 4 − 2 = 10."
  },
  {
    id: "m37", t: "Differentiation",
    q: "Find the minimum value of y = x² − 6x + 10.",
    o: ["3", "10", "1", "−1"], a: 2,
    x: "dy/dx = 2x − 6 = 0 gives x = 3. y = 9 − 18 + 10 = 1. (d²y/dx² = 2 > 0, so it is a minimum.)"
  },
  {
    id: "m38", t: "Integration",
    q: "Find ∫(4x³ + 2x) dx.",
    o: ["12x² + 2 + c", "x⁴ + x² + c", "4x⁴ + 2x² + c", "x⁴ + 2x² + c"], a: 1,
    x: "Raise each power by one and divide by the new power: 4x⁴/4 + 2x²/2 + c = x⁴ + x² + c. 12x² + 2 is the derivative, not the integral."
  },
  {
    id: "m39", t: "Integration",
    q: "Evaluate the integral of 3x² from x = 0 to x = 2.",
    o: ["12", "6", "8", "4"], a: 2,
    x: "∫3x² dx = x³. [x³] from 0 to 2 = 8 − 0 = 8."
  },
  {
    id: "m40", t: "Statistics",
    q: "The mean of 2, 4, 6, 8 and x is 6. Find x.",
    o: ["6", "10", "8", "12"], a: 1,
    x: "Total = 5 × 6 = 30. 2 + 4 + 6 + 8 = 20, so x = 30 − 20 = 10."
  },
  {
    id: "m41", t: "Statistics",
    q: "Find the median of 3, 7, 2, 9, 5, 8.",
    o: ["5", "7", "6", "5.5"], a: 2,
    x: "Arrange in order: 2, 3, 5, 7, 8, 9. With six numbers the median is the mean of the 3rd and 4th: (5 + 7) ÷ 2 = 6."
  },
  {
    id: "m42", t: "Statistics",
    q: "Taking 1, 2, 3, 4, 5 as the whole population, find the variance.",
    o: ["2.5", "2", "√2", "3"], a: 1,
    x: "Mean = 3. Squared deviations: 4, 1, 0, 1, 4, total 10. Population variance = 10 ÷ 5 = 2. (Dividing by n − 1 = 4 gives the sample variance 2.5.)"
  },
  {
    id: "m43", t: "Permutations and combinations",
    q: "In how many ways can a committee of 3 be chosen from 7 people?",
    o: ["210", "35", "21", "42"], a: 1,
    x: "Order does not matter, so use combinations: ⁷C₃ = 7! ÷ (3! × 4!) = (7 × 6 × 5) ÷ 6 = 35. 210 is ⁷P₃, which counts orders."
  },
  {
    id: "m44", t: "Probability",
    q: "Two fair dice are thrown. What is the probability that the sum of the scores is 7?",
    o: ["7/36", "1/6", "1/12", "5/36"], a: 1,
    x: "There are 36 equally likely outcomes. A sum of 7 comes from (1,6), (2,5), (3,4), (4,3), (5,2), (6,1): 6 outcomes. 6/36 = 1/6."
  },
  {
    id: "m45", t: "Probability",
    q: "A bag holds 4 red and 6 blue balls. Two balls are picked one after the other without replacement. What is the probability that both are red?",
    o: ["4/25", "1/5", "2/15", "6/25"], a: 2,
    x: "P(first red) = 4/10. One red is gone, so P(second red) = 3/9. 4/10 × 3/9 = 12/90 = 2/15. (4/25 would be the answer with replacement.)"
  }
];
