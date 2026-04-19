export const formatNumber = (num) => {
  if (!num && num !== 0) return "";
  return Number(num).toLocaleString();
};

export const toLatexFraction = (fraction) => {
  if (!fraction.includes("/")) return fraction;

  const [num, den] = fraction.split("/");

  return `\\frac{${num}}{${den}}`;
};


export const toMixedFractionLatex = (fraction) => {
  if (!fraction.includes("/")) return fraction;

  let [num, den] = fraction.split("/").map(Number);

  if (num > den) {
    const whole = Math.floor(num / den);
    const remainder = num % den;

    return `${whole}\\frac{${remainder}}{${den}}`;
  }

  return `\\frac{${num}}{${den}}`;
};