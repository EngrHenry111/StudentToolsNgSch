import { useEffect, useState } from "react";
import { getBilling, cancelSubscription } from "../apiQuiz/paymentApi";

const Billing = () => {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getBilling(token);
    setData(res);
  };

  const cancel = async () => {
    await cancelSubscription(token);
    alert("Cancelled");
    load();
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>Billing</h2>

      <p>Status: {data.status}</p>

      <button onClick={cancel}>Cancel Subscription</button>
    </div>
  );
};

export default Billing;