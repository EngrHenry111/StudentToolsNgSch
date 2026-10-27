import { Link } from "react-router-dom";
import EngLayout from "./EngLayout";
import { ENG_TOOLS } from "./engTools";

const EngineeringTools = () => (
  <EngLayout
    path="/engineering-tools"
    title="Engineering Tools: Resistor, Capacitor & Circuit Calculators | StudentToolsNG"
    description="Free electronics calculators for engineering and physics students: resistor colour code, SMD resistor code, capacitor code, Ohm's law, series and parallel, voltage divider, LED resistor and 555 timer."
    keywords="engineering calculators, electronics calculators, resistor calculator, capacitor calculator, circuit calculator, electrical engineering tools"
  >
    <h1>Engineering Tools</h1>
    <p className="eng-intro">
      Free electronics calculators for engineering and physics students,
      hobbyists and technicians. Identify components and work out circuit
      values in seconds.
    </p>

    <div className="eng-cards">
      {ENG_TOOLS.map((t) => (
        <Link key={t.path} to={t.path} className="eng-card">
          <h2>{t.name}</h2>
          <p>{t.blurb}</p>
        </Link>
      ))}
    </div>

    <section className="eng-content">
      <h2>Identify electronic components</h2>
      <p>
        Most small components do not have their value printed in full. Through-hole
        resistors use coloured bands, surface-mount resistors use short number
        and letter codes, and ceramic capacitors use a three-digit code in
        picofarads. The <Link to="/engineering-tools/resistor-color-code">Resistor Colour Code Calculator</Link>,
        the <Link to="/engineering-tools/smd-resistor-code">SMD Resistor Code Calculator</Link> and
        the <Link to="/engineering-tools/capacitor-code">Capacitor Code Calculator</Link> turn
        these markings into values, and also work the other way round when you
        need to find a part.
      </p>

      <h2>Design and analyse circuits</h2>
      <p>
        Once you know your parts, the circuit calculators do the arithmetic.
        Use the <Link to="/engineering-tools/ohms-law-calculator">Ohm's Law Calculator</Link> for
        voltage, current, resistance and power, the{" "}
        <Link to="/engineering-tools/series-parallel-calculator">Series and Parallel Calculator</Link> to
        combine components, the{" "}
        <Link to="/engineering-tools/voltage-divider-calculator">Voltage Divider Calculator</Link> for
        reference voltages, the{" "}
        <Link to="/engineering-tools/led-resistor-calculator">LED Resistor Calculator</Link> to
        protect LEDs, and the{" "}
        <Link to="/engineering-tools/555-timer-calculator">555 Timer Calculator</Link> for
        oscillators and delays.
      </p>

      <h2>Built for students</h2>
      <p>
        Every tool explains the formula it uses and includes worked examples,
        so you can check your own working for practicals, assignments and
        exams in physics and electrical or electronic engineering. Values can
        be typed the way engineers write them, such as 4k7 for 4.7 kΩ, 100n for
        100 nF or 20mA for 0.02 A, and results use standard component values
        from the E12, E24 and E96 series where it matters.
      </p>
      <ul>
        <li>Colour codes follow IEC 60062 and preferred values follow IEC 60063.</li>
        <li>Everything runs in your browser, so the tools work even on a slow connection once the page has loaded.</li>
        <li>All tools are free, with no sign-up.</li>
      </ul>
    </section>
  </EngLayout>
);

export default EngineeringTools;
