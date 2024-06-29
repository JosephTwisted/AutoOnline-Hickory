const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.addOrder = functions.https.onCall(async () => {
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

exports.onOrderStatusChange = functions.firestore
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

      return admin.messaging().sendToTopic(`order_${after.orderNumber}`, payload);
    }

    return null;
  });
