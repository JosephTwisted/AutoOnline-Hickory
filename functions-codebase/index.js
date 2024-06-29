import { https, firestore } from "firebase-functions";
import { initializeApp, firestore as _firestore, messaging } from "firebase-admin";
initializeApp();

const db = _firestore();

export const addOrder = https.onCall(async () => {
  const ordersRef = db.collection("orders");
  const snapshot = await ordersRef.orderBy("orderNumber", "desc").limit(1).get();

  let newOrderNumber = 1;
  let newEta = 5;

  if (!snapshot.empty) {
    const lastOrder = snapshot.docs[0];
    newOrderNumber = lastOrder.data().orderNumber + 1;
    newEta = lastOrder.data().eta + 2;
  }

  const newOrder = {
    orderNumber: newOrderNumber,
    status: "Pending",
    eta: newEta,
  };

  await ordersRef.add(newOrder);

  return { success: true, order: newOrder };
});

export const onOrderStatusChange = firestore
  .document("orders/{orderId}")
  .onUpdate((change) => {
    const before = change.before.data();
    const after = change.after.data();

    if (before.status !== after.status) {
      const payload = {
        notification: {
          title: `Order ${after.orderNumber} Status Update`,
          body: `Your order is now ${after.status}. ETA: ${after.eta} minutes.`,
        },
      };

      return messaging().sendToTopic(`order_${after.orderNumber}`, payload);
    }

    return null;
  });
