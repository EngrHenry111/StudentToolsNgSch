import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { InverterTool } from "./SolarTools";

const PATH = "/engineering-tools/inverter-size-calculator";

const faq = [
  {
    q: "What size of inverter do I need?",
    a: "Add up the watts of everything that will run at the same time, divide by 0.8 to get VA and add about 25% headroom. Then check that the inverter can handle the starting surge of your biggest motor, such as a fridge or pump. For 609 W of lights, fans, TV and a fridge, that is about 952 VA, so a 1 kVA inverter."
  },
  {
    q: "What is the difference between kVA and kW?",
    a: "kVA is apparent power, kW is real power. For most inverters sold in Nigeria, the continuous power in watts is about 0.8 times the kVA rating, so a 1.5 kVA inverter gives about 1,200 W and a 5 kVA inverter about 4,000 W. Some newer inverters are rated at a power factor of 1, where kVA and kW are the same."
  },
  {
    q: "What can a 1.5 kVA inverter carry?",
    a: "About 1,200 W continuously, but it is best kept below about 80% of that. That covers lights, fans, a TV, a decoder, laptops, a router and a fridge. It can't run an air conditioner, a pumping machine or a pressing iron reliably."
  },
  {
    q: "What size of inverter can carry a 1.5 HP air conditioner?",
    a: "A 1.5 HP AC uses about 1,300 W while running and can draw about three times that for a moment when it starts. Together with a few lights and fans, that needs at least a 3 kVA inverter, and 3.5 kVA gives more room. An inverter-type AC starts gently and can run on a smaller system."
  }
];

const InverterCalculator = () => (
  <EngLayout
    path={PATH}
    title="Inverter Size Calculator (kVA): What Size Inverter Do I Need? | StudentToolsNG"
    description="Free inverter size calculator: list your appliances to get the right inverter in kVA, checked against the starting surge of fridges, ACs and pumps, plus the battery voltage, battery current, fuse and cable size."
    keywords="inverter size calculator, what size inverter do I need, inverter load calculator, kVA calculator Nigeria, inverter capacity calculator, how to calculate inverter size"
    faq={faq}
  >
    <h1>Inverter Size Calculator</h1>
    <p className="eng-intro">
      Find the inverter size in kVA for your appliances, checked against the
      starting surge of motors, with the battery voltage, fuse and cable size.
    </p>

    <InverterTool />

    <section className="eng-content">
      <h2>How to calculate inverter size</h2>
      <ul>
        <li>Add the running watts of every appliance that can be on at the same time.</li>
        <li>Divide by the power factor, usually 0.8, to get volt-amperes (VA).</li>
        <li>Add 20 to 30% headroom so the inverter isn't working at its limit.</li>
        <li>Check the starting surge. Fridges, freezers, ACs and pumps draw two to three times their running power for a moment when the motor starts, and most inverters can only give about twice their rating for a few seconds.</li>
        <li>Round up to the next standard size: 1, 1.5, 2.5, 3.5, 5, 7.5 or 10 kVA.</li>
      </ul>

      <h2>Worked example</h2>
      <p>
        Eight LED bulbs, three fans, a 43 inch TV, a decoder, a fridge, a
        laptop, a router and three phone chargers draw 609 W together.
      </p>
      <ul>
        <li>609 W ÷ 0.8 = 761 VA</li>
        <li>761 VA × 1.25 headroom = 952 VA</li>
        <li>When the fridge starts the load jumps to about 909 W for a moment, well within what a 1 kVA inverter can surge to</li>
        <li>Result: a 1 kVA pure sine wave inverter, loaded to 76% of its 800 W rating</li>
      </ul>

      <h2>Battery voltage, fuse and cable</h2>
      <p>
        The inverter draws its power from the battery bank as direct current.
        At full output the battery current is the inverter's watts divided by
        the battery voltage and the inverter efficiency, so an 800 W inverter
        on 24 V draws about 37 A. The fuse or DC breaker should be about 25%
        above this, and the cable thick enough for the fuse rating. Higher
        battery voltages mean lower currents, which is why inverters of 5 kVA
        and above normally run on 48 V.
      </p>

      <h2>Pure sine wave or modified sine wave?</h2>
      <p>
        A pure sine wave inverter produces power like the grid and is safe for
        every appliance. Modified sine wave inverters are cheaper but make
        motors, fridges, fans and some chargers run hot and noisy. If you have
        any motor load, choose pure sine wave.
      </p>

      <h2>Frequently Asked Questions</h2>
      <FaqList faq={faq} />

      <p>
        Next, find out how many batteries you need with the{" "}
        <Link to="/engineering-tools/battery-backup-calculator">Battery Backup Calculator</Link>, or
        size the whole system, including solar panels, with the{" "}
        <Link to="/engineering-tools/solar-system-calculator">Solar System Calculator</Link>.
      </p>
    </section>
  </EngLayout>
);

export default InverterCalculator;
