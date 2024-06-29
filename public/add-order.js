document.getElementById('add-order-btn').addEventListener('click', function () {
    const addOrderFunction = firebase.functions().httpsCallable('addOrder');

    addOrderFunction().then((result) => {
        if (result.data.success) {
            alert(`Order added successfully: Order Number ${result.data.order.orderNumber}, ETA ${result.data.order.eta} minutes`);
        } else {
            alert('Failed to add order');
        }
    }).catch((error) => {
        console.error('Error adding order:', error);
    });
});<script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js"></script><script src="https://www.gstatic.com/firebasejs/8.6.8/firebase-firestore.js"></script><script src="firebase-config.js"></script></></>

