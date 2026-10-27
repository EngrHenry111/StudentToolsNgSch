import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { SolarSystemTool } from "./SolarTools";

const PATH = "/engineering-tools/solar-system-calculator";

const faq = [
  {
    q: "How many solar panels do I need for my house in Nigeria?",
    a: "Divide the energy you use per day by the peak sun hours where you live and by about 0.75 for losses, then by the panel size. A home using 4.6 kWh a day in Lagos needs about 2,050 W of panels for the rainy season, which is five 450 W panels."
  },
  {
    q: "Can a 1.5 kVA inverter carry a fridge?",
    a: "Usually yes, if the fridge is the only motor starting and the rest of the load is small. A fridge needs about three times its running power for a moment when the compressor starts. A pure sine wave inverter is needed for fridges and freezers."
  },
  {
    q: "Can solar power an air conditioner?",
    a: "Yes, but it needs a large system. A 1 HP air conditioner uses about 900 W while running and much more when it starts, so with a few lights and fans it needs at least a 2 kVA inverter (2.5 kVA is more comfortable), a large battery bank and many panels. An inverter AC uses less and starts gently, which makes it much cheaper to run on solar."
  },
  {
    q: "Tubular or lithium batteries?",
    a: "Tubular batteries cost less to buy, but you can only use about half their capacity without shortening their life, and they last about 4 to 6 years. Lithium (LiFePO4) batteries cost more but give about 80% usable capacity, charge faster, need no water and last about 8 to 12 years, so they often cost less over the life of the system."
  },
  {
    q: "Which way should solar panels face in Nigeria?",
    a: "Nigeria is north of the equator, so panels should face south with a tilt of about 10 to 15 degrees. The small tilt matches the latitude and lets rain wash off dust. Avoid shade from trees, tanks and buildings, and wipe the panels during the harmattan."
  }
];

const SolarCalculator = () => (
  <EngLayout
    path={PATH}
    title="Solar System Calculator Nigeria: Panels, Inverter & Batteries | StudentToolsNG"
    description="Free solar system calculator for Nigerian homes and offices: list your appliances to get the inverter size, number of batteries, number of solar panels, charge controller, cable and fuse sizes, with full working."
    keywords="solar calculator Nigeria, how many solar panels do I need, solar panel calculator, solar system sizing, inverter and battery calculator Nigeria, solar installation calculator, peak sun hours Nigeria"
    faq={faq}
  >
    <h1>Solar System Calculator</h1>
    <p className="eng-intro">
      List the appliances you want to power and get the inverter, batteries,
      solar panels and charge controller you need, sized for your city's
      sunshine and shown with the full working.
    </p>

    <SolarSystemTool />

    <section className="eng-content">
      <h2>How to size a solar system</h2>
      <p>
        A solar power system has four main parts. The inverter turns battery
        power into 230 V mains for your appliances, the batteries store energy
        for the night and for cloudy days, the solar panels recharge the
        batteries and power the house in the day, and the charge controller
        manages the charging. Each is sized from a different number: the
        inverter from the power of everything that runs at the same time, the
        batteries from the energy used during backup, and the panels from the
        energy used per day.
      </p>

      <h2>Worked example: a family flat in Lagos</h2>
      <p>
        Eight LED bulbs, three standing fans, a 43 inch TV with a decoder, a
        medium fridge, a laptop, a Wi-Fi router and three phones, with 10 hours
        of battery backup at night.
      </p>
      <ul>
        <li>Running load: 609 W, or 909 W for a moment when the fridge compressor starts</li>
        <li>Energy per day: 4,580 Wh (4.58 kWh); the fridge is counted at 40% of the day because its compressor cycles</li>
        <li>Inverter: 609 W ÷ 0.8 power factor = 761 VA, plus 25% headroom = 952 VA, so a 1 kVA pure sine wave inverter</li>
        <li>Backup energy for 10 hours: 3,572 Wh</li>
        <li>Tubular batteries: 3,572 Wh ÷ (50% usable × 90% inverter efficiency) = 7,938 Wh, which is 331 Ah at 24 V, so four 12 V 220 Ah batteries (two in series, two strings)</li>
        <li>Lithium instead: 3,572 Wh ÷ (80% × 90%) = 4,961 Wh, which is 207 Ah at 24 V, so three 25.6 V 100 Ah batteries</li>
        <li>Solar panels for the rainy season in Lagos (3.5 sun hours): 4,580 Wh ÷ (3.5 × 0.75 × 0.85) = 2,053 W, so five 450 W panels (2,250 W)</li>
        <li>Charge controller: 2,250 W ÷ 24 V × 1.25 = 117 A, so a 120 A MPPT controller, or a hybrid inverter with built-in MPPT</li>
      </ul>
      <p>
        Sized on the yearly average of 4.6 sun hours instead, the same home
        would need four panels, but it would run short on cloudy days in June
        to September.
      </p>

      <h2>Peak sun hours in Nigeria</h2>
      <p>
        Peak sun hours are the number of hours of full-strength sunshine a
        panel receives in a day. The north gets the most, about 5.5 to 6 hours
        a day in Kano, Sokoto and Maiduguri. The south gets less, about 4.2 to
        4.9 hours in Lagos, Port Harcourt, Ibadan and Enugu, falling to about
        3.2 to 3.9 hours in the rainy season. The calculator uses rounded
        figures from satellite averages for 25 cities.
      </p>

      <h2>Why the system voltage matters</h2>
      <p>
        Small systems run on 12 V, medium ones on 24 V and large ones on 48 V.
        Doubling the voltage halves the current, so cables can be thinner,
        charge controllers smaller and less energy is lost as heat. The
        calculator picks the voltage from both the inverter size and the size
        of the solar array, and you can change it.
      </p>

      <h2>Tips for a reliable system</h2>
      <ul>
        <li>Use a pure sine wave inverter if you run a fridge, freezer, fan or any motor.</li>
        <li>Keep heavy short loads such as pressing irons, kettles, microwaves and pumping machines off small inverters, or run them only in the afternoon sun.</li>
        <li>Replace old bulbs with LED and choose inverter fridges and inverter ACs; saving energy is cheaper than adding panels.</li>
        <li>Fit a fuse or DC breaker close to the battery and keep battery cables short.</li>
        <li>Clean the panels every few weeks during the harmattan, when dust can cut output noticeably.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <FaqList faq={faq} />

      <p>
        Only need part of the system? Use the <Link to="/engineering-tools/inverter-size-calculator">Inverter Size Calculator</Link> or
        the <Link to="/engineering-tools/battery-backup-calculator">Battery Backup Calculator</Link>.
        Your appliance list is shared between all three.
      </p>
    </section>
  </EngLayout>
);

export default SolarCalculator;
