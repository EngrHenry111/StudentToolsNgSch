const StepsList = ({ steps }) => {
  return (
    <div className="steps-container">
      <h3>Step-by-Step Solution</h3>

      {steps.map((step, index) => (
        <div key={index} className="step">
          <span>Step {index + 1}:</span> {step}
        </div>
      ))}
    </div>
  );
};

export default StepsList;