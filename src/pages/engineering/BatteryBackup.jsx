import { Link } from "react-router-dom";
import EngLayout, { FaqList } from "./EngLayout";
import { BatteryTool } from "./SolarTools";

const PATH = "/engineering-tools/battery-backup-calculator";

const faq = [
  {
    q: "How long will a 200 Ah battery last?",
    a: "A 12 V 200 Ah battery stores 2,400 Wh. A lead-acid battery should only be used to about 50%, and the inverter loses about 10%, so it gives about 1,080 Wh. At 300 W that is about 3.6 hours, and at 100 W about 10.8 hours. A lithium battery of the same size gives about 60% more."
  },
  {
    q: "How many batteries do I need for a 1.5 kVA inverter?",
    a: "It depends on your load and how many hours of backup you want, not on the inverter size alone. Most 1.5 kVA inverters run on 12 V or 24 V. For about 3,500 Wh of night use, a 24 V system needs four 12 V 220 Ah tubular batteries, or three 25.6 V 100 Ah lithium batteries."
  },
  {
    q: "What is depth of discharge?",
    a: "Depth of discharge is how much of a battery's capacity you use before recharging. Lead-acid batteries last much longer if you use only about half. Lithium (LiFePO4) batteries can use about 80 to 90% every day and still last for thousands of cycles."
  },
  {
    q: "Can I mix old and new batteries?",
    a: "Avoid it. In a series or parallel bank, the weakest battery limits the whole bank and the new battery wears out early. Replace all the batteries in a bank together, and use the same type, size and age."
  }
];

const BatteryBackup = () => (
  <EngLayout
    path={PATH}
    title="Battery Backup Calculator: How Long Will My Battery Last? | StudentToolsNG"
    description="Free battery backup calculator for inverters: find how many hours your batteries will last at your load, or how many tubular, AGM or lithium batteries you need for the backup you want, with series and parallel wiring."
    keywords="battery backup calculator, how long will my battery last, inverter battery calculator, how many batteries do I need, battery backup time calculator, 200Ah battery backup time"
    faq={faq}
  >
    <h1>Battery Backup Calculator</h1>
    <p className="eng-intro">
      Find how long your inverter batteries will last, or how many batteries
      you need for the hours of backup you want.
    </p>

    <BatteryTool />

    <section className="eng-content">
      <h2>How to calculate battery backup time</h2>
      <ul>
        <li>Battery energy in watt-hours = volts × amp-hours × number of batteries.</li>
        <li>Usable energy = battery energy × depth of discharge × inverter efficiency (about 90%).</li>
        <li>Backup time in hours = usable energy ÷ load in watts.</li>
      </ul>
      <p>
        Two 12 V 200 Ah tubular batteries store 2 × 12 × 200 = 4,800 Wh. Used to
        50% through a 90% efficient inverter, that is 2,160 Wh, so a 300 W load
        runs for about 7.2 hours. The same capacity in lithium, used to 80%,
        gives about 11.5 hours.
      </p>

      <h2>How to calculate the number of batteries</h2>
      <ul>
        <li>Work out the energy your appliances use during the backup hours.</li>
        <li>Divide by the depth of discharge and the inverter efficiency to get the energy the bank must store.</li>
        <li>Divide by the system voltage to get the amp-hours needed.</li>
        <li>Put enough batteries in series to reach the system voltage (two 12 V batteries for 24 V, four for 48 V), then add parallel strings until you have enough amp-hours.</li>
      </ul>

      <h2>Battery types</h2>
      <p>
        Tubular flooded batteries are the most common in Nigeria. They are
        robust and cheaper, but need distilled water topping and should only
        be discharged to about 50%. AGM and gel batteries are sealed and need
        no maintenance but have a shorter life in hot rooms. Lithium iron
        phosphate (LiFePO4) batteries cost more but give much more usable
        energy, recharge faster on solar and last two to three times as long.
      </p>

      <h2>Make your batteries last longer</h2>
      <ul>
        <li>Recharge fully as soon as possible after a long outage; lead-acid batteries left half empty lose capacity.</li>
        <li>Keep the batteries in a cool, ventilated place, away from direct sun.</li>
        <li>Check the water level of tubular batteries every month and top up with distilled water only.</li>
        <li>Set the inverter's charging current and low-voltage cut-off to suit the battery type.</li>
      </ul>

      <h2>Frequently Asked Questions</h2>
      <FaqList faq={faq} />

      <p>
        Need the inverter too? Use the <Link to="/engineering-tools/inverter-size-calculator">Inverter Size Calculator</Link>,
        or size panels, batteries and inverter together with the{" "}
        <Link to="/engineering-tools/solar-system-calculator">Solar System Calculator</Link>.
      </p>
    </section>
  </EngLayout>
);

export default BatteryBackup;
