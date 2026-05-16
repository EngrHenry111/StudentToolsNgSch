import { useEffect, useState } from "react";

import {
  getBilling,
  cancelSubscription,
  subscribe
} from "../apiQuiz/paymentApi";

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

  const handleSubscribe = async () => {

    const res = await subscribe(token);

    if (res.authorization_url) {
      window.location.href = res.authorization_url;
    }
  };

  const cancel = async () => {

    await cancelSubscription(token);

    alert("Subscription Cancelled");

    load();
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div>

      <h2>Billing Dashboard</h2>

      <p>Status: {data.status}</p>

      <p>Plan: {data.plan}</p>

      {
        data.status !== "active" ? (
          <button onClick={handleSubscribe}>
            Upgrade to PRO
          </button>
        ) : (
          <button onClick={cancel}>
            Cancel Subscription
          </button>
        )
      }

    </div>
  );
};

export default Billing;