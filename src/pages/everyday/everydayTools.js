// The everyday calculators section: hub link and the tool switcher shown on
// each page (see EngLayout's section/tools props).
export const EVERYDAY_SECTION = { name: "Calculators", path: "/calculators" };

export const EVERYDAY_TOOLS = [
  { path: "/calculators", name: "All Calculators", short: "All" },
  { path: "/percentage-calculator", name: "Percentage Calculator", short: "Percentage" },
  { path: "/bmi-calculator", name: "BMI Calculator", short: "BMI" },
  { path: "/ovulation-calculator", name: "Ovulation and Period Calculator", short: "Ovulation & period" },
  { path: "/pregnancy-due-date-calculator", name: "Pregnancy Due Date Calculator", short: "Pregnancy due date" }
];

// Every calculator on the site, for the /calculators hub. Plain data so
// scripts/buildSeoStatic.mjs can give crawlers the same links.
export const CALCULATOR_GROUPS = [
  {
    name: "School and exam calculators",
    links: [
      ["/cgpa-calculator", "CGPA Calculator", "Work out your university CGPA from your grades and credit units."],
      ["/gpa-class-calculator", "GPA Class of Degree Calculator", "See whether your CGPA is First Class, Second Class Upper or Lower."],
      ["/cgpa-converter", "CGPA Converter", "Convert a 5.0 CGPA to the 4.0 scale and to a percentage."],
      ["/jamb-score-calculator", "JAMB Score Calculator", "Add up your four UTME subject scores out of 400."],
      ["/aggregate-score-calculator", "Post-UTME Aggregate Calculator", "Combine UTME, post-UTME and O'level grades for your university."],
      ["/waec-grade-calculator", "WAEC Grade Calculator", "Turn WAEC scores into A1 to F9 grades and count your credits."]
    ]
  },
  {
    name: "Everyday calculators",
    links: [
      ["/percentage-calculator", "Percentage Calculator", "Percentages of numbers and money, increases, VAT and discounts."],
      ["/bmi-calculator", "BMI Calculator", "Body mass index and healthy weight range in kg, cm or feet."],
      ["/ovulation-calculator", "Ovulation and Period Calculator", "Ovulation day, fertile window and next period dates."],
      ["/pregnancy-due-date-calculator", "Pregnancy Due Date Calculator", "Due date, weeks pregnant and trimester."],
      ["/age-calculator", "Age Calculator", "Exact age in years, months and days, and age on any date."]
    ]
  },
  {
    name: "Engineering and solar calculators",
    links: [
      ["/engineering-tools/ohms-law-calculator", "Ohm's Law Calculator", "Voltage, current, resistance and power from any two values."],
      ["/engineering-tools/resistor-color-code", "Resistor Colour Code", "Read 4, 5 and 6-band resistor colours."],
      ["/engineering-tools/solar-system-calculator", "Solar System Calculator", "Size panels, inverter and batteries for your load."]
    ]
  }
];
