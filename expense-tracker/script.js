const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

// let transactions =
//   localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];
// Function: Add transactions to DOM list
function addTransactionDOM(transaction) {
  // Add sign
  const sign = transaction.amount < 0 ? "-" : "+";

  // Create li
  const item = document.createElement("li");

  // Add class based on value to item
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  // Create transaction element
  item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
    `;

  // Append child
  list.appendChild(item);
}

// Function: removeTransaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Function: update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Function: add transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add a text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = "";
    amount.value = "";
  }
}

// Function: GenerateID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Update the balance, income and expense
function updateValues() {
  // get transactions amount
  const amounts = transactions.map((transaction) => transaction.amount);

  // calculate total with
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Function: Init app
function init() {
  list.innerHTML = "";

  // transactions.forEach(addTransactionDOM);

  updateValues();
}

init();

// event listener
form.addEventListener("submit", addTransaction);

// Original code

// // Add transaction
// function addTransaction(e) {
//   e.preventDefault();

//   if (text.value.trim() === '' || amount.value.trim() === '') {
//     alert('Please add a text and amount');
//   } else {
//     const transaction = {
//       id: generateID(),
//       text: text.value,
//       amount: +amount.value
//     };

//     transactions.push(transaction);

//     addTransactionDOM(transaction);

//     updateValues();

//     updateLocalStorage();

//     text.value = '';
//     amount.value = '';
//   }
// }

// // Generate random ID
// function generateID() {
//   return Math.floor(Math.random() * 100000000);
// }

// // Add transactions to DOM list
// function addTransactionDOM(transaction) {
//   // Get sign
//   const sign = transaction.amount < 0 ? '-' : '+';

//   const item = document.createElement('li');

//   // Add class based on value
//   item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

//   item.innerHTML = `
//     ${transaction.text} <span>${sign}${Math.abs(
//     transaction.amount
//   )}</span> <button class="delete-btn" onclick="removeTransaction(${
//     transaction.id
//   })">x</button>
//   `;

//   list.appendChild(item);
// }

// // Update the balance, income and expense
// function updateValues() {
//   const amounts = transactions.map(transaction => transaction.amount);

//   const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

//   const income = amounts
//     .filter(item => item > 0)
//     .reduce((acc, item) => (acc += item), 0)
//     .toFixed(2);

//   const expense = (
//     amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
//     -1
//   ).toFixed(2);

//   balance.innerText = `$${total}`;
//   money_plus.innerText = `$${income}`;
//   money_minus.innerText = `$${expense}`;
// }

// // Remove transaction by ID
// function removeTransaction(id) {
//   transactions = transactions.filter(transaction => transaction.id !== id);

//   updateLocalStorage();

//   init();
// }

// // Update local storage transactions
// function updateLocalStorage() {
//   localStorage.setItem('transactions', JSON.stringify(transactions));
// }

// // Init app
// function init() {
//   list.innerHTML = '';

//   transactions.forEach(addTransactionDOM);
//   updateValues();
// }

// init();

// form.addEventListener('submit', addTransaction);
