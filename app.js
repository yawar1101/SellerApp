const apiUrl = 'https://crudcrud.com/api/ce60c593db01422e8cd6c963e3eb4817';
window.onload = function () {
    loadOrdersFromApi();
};

function addToBill() {
    const productSelect = document.getElementById('productInput');
    const priceInput = document.getElementById('priceInput');
    const tableSelect = document.getElementById('tableSelect');

    const product = productSelect.value;
    const price = priceInput.value;
    const table = tableSelect.value;

    if (product && price && table) {
        const order = `${product} - Rs. ${price} | ${table}`;
        updateCrudCrud(product, price, table);
    } else {
        alert('Please fill out all fields.');
    }
}

function updateCrudCrud(product, price, table) {
    axios
        .post(`${apiUrl}/orders`, {
            category: table,
            description: product,
            expenseAmount: price,
        })
        .then((res) => {
            console.log('Orders added to CRUD CRUD: ', res.data);
            myFun(res.data, table);
        })
        .catch((err) => {
            console.error('Error adding order to CRUD CRUD: ', err);
        });
}

function myFun(order, table) {
    console.log(order)
    const listItem = document.createElement('li');
    listItem.textContent = `${order.description} - Rs. ${order.expenseAmount}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        deleteOrder(order._id, listItem);
    });

    listItem.appendChild(deleteButton);

    console.log('Table: ', table);

    const listId = `${table.replace(/\s+/g, '')}Id`;
    console.log('listId:', listId);
    const ordersList = document.getElementById(listId);
    ordersList.appendChild(listItem);
}

function deleteOrder(orderId, listItem) {
    axios
        .delete(`${apiUrl}/orders/${orderId}`)
        .then((res) => {
            console.log('Order deleted from CRUD CRUD:', res.data);
            listItem.remove(); 
        })
        .catch((err) => {
            console.error('Error deleting order from CRUD CRUD:', err);
        });
}

function loadOrdersFromApi() {
    axios
        .get(`${apiUrl}/orders`)
        .then((response) => {
            const orders = response.data;
            console.log('Orders loaded from CRUD CRUD:', orders);
            orders.forEach((order) => {
                // const orderText = `${order.description} - Rs. ${order.expenseAmount} | ${order.category}`;
                // console.log('OrderText: ', orderText);
                myFun(order, order.category);
            });
        })
        .catch((error) => {
            console.error('Error loading orders from CRUD CRUD:', error);
        });
}

function clearInputs() {
    document.getElementById('productInput').value = '';
    document.getElementById('priceInput').value = '';
    document.getElementById('tableSelect').value = '';
}

