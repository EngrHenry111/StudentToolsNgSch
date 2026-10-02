// Shared by the tutorial create & edit screens so both handle the server's
// 409 duplicate response the same way.

// Sends the request; on a soft duplicate (409, not blocked) asks the admin
// to confirm and retries with confirmSimilar. Returns true when saved.
const submitWithDuplicateGate = async (send, payload) => {
 try {
  await send(payload);
  return true;
 } catch (err) {
  const data = err?.response?.data;

  if (err?.response?.status === 409 && data?.duplicate) {
   if (data.blocked) {
    alert(`Not saved — duplicate content.\n\n${data.message}`);
    return false;
   }

   const ok = window.confirm(
    `Possible duplicate:\n\n${data.message}\n\nSave anyway?`
   );
   if (!ok) return false;

   await send({ ...payload, confirmSimilar: true });
   return true;
  }

  throw err;
 }
};

export default submitWithDuplicateGate;
