import { motion } from "framer-motion";

const StepsList = ({ steps }) => {
  return (
    <div className="steps-container">
      <h3>Step-by-Step Solution</h3>

      {steps.map((step, index) => (
        <motion.div
          key={index}
          className="step"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          Step {index + 1}: {step}
        </motion.div>
      ))}
    </div>
  );
};

export default StepsList;

// const StepsList = ({ steps }) => {
//   return (
//     <div className="steps-container">
//       <h3>Step-by-Step Solution</h3>

//       {steps.map((step, index) => (
//         <div key={index} className="step">
//           <span>Step {index + 1}:</span> {step}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StepsList;