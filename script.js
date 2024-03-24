let transactions = [];
let totalIncome = 0;
let totalExpense = 0;
let netBalance = 0; // Initialize netBalance to 0

const transactionForm = document.getElementById('transaction-form');
const transactionsList = document.getElementById('transactions-list');
const totalIncomeElement = document.getElementById('total-income');
const totalExpenseElement = document.getElementById('total-expense');
const netBalanceElement = document.createElement('p'); // Create new element for net balance

transactionForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const type = document.getElementById('type').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;

  // Create a transaction object
  const transaction = {
    type,
    amount,
    category,
    description,
  };

  // Update totals based on transaction type
  if (type === 'income') {
    totalIncome += amount;
  } else {
    totalExpense += amount;
  }

  // Add the transaction to the transactions array
  transactions.push(transaction);

  // Update the UI with the new transaction list and totals
  displayTransactions(transactions);
  updateTotals();

  // Clear the form
  transactionForm.reset();
});

// Function to display transactions by category
function displayTransactions(transactions) {
  transactionsList.innerHTML = ''; // Clear existing list

  // Group transactions by category
  const transactionsByCategory = transactions.reduce((acc, transaction) => {
    acc[transaction.category] = acc[transaction.category] || [];
    acc[transaction.category].push(transaction);
    return acc;
  }, {});

  // Loop through categories and display transactions
  for (const category in transactionsByCategory) {
    const categoryHeading = document.createElement('h3');
    categoryHeading.textContent = category;
    transactionsList.appendChild(categoryHeading);

    const categoryList = document.createElement('ul');
    transactionsByCategory[category].forEach((transaction) => {
      const listItem = document.createElement('li');
      const icon = transaction.type === 'income' ? '<i class="fas fa-arrow-down" style="color: green;"></i>' : '<i class="fas fa-arrow-up" style="color: red;"></i>';
      listItem.innerHTML = `${'&#10022;'} ${icon} ${transaction.type}: ${transaction.amount} Da - ${transaction.description}`;
      categoryList.appendChild(listItem);
    });
    categoryList.style.textAlign = 'center'; // Center the list items
    transactionsList.appendChild(categoryList);
  }
}

// Function to update total income and expense elements and calculate net balance
function updateTotals() {
  totalIncomeElement.textContent = `Total Income: ${totalIncome.toFixed(2)} Da`;
  totalExpenseElement.textContent = `Total Expense: ${totalExpense.toFixed(2)} Da`;

  // Calculate net balance
  netBalance = totalIncome - totalExpense;

  // Create net balance message (optional, if not already created)
  let netBalanceMessage;
  if (netBalance > 0) {
    netBalanceMessage = `Congratulations! You're in the green this month. Your net balance is ${netBalance.toFixed(2)} Da.`;
  } else if (netBalance === 0) {
    netBalanceMessage = `You're breaking even this month. Your net balance is ${netBalance.toFixed(2)} Da.` ;
  } else {
    netBalanceMessage = `Uh oh! You're in debt this month. Your net balance is ${netBalance.toFixed(2)} Da. Consider reviewing your expenses.`;
  }

  // Update net balance element content (if element exists)
  const existingNetBalanceElement = document.getElementById('net-balance');
  if (existingNetBalanceElement) {
    existingNetBalanceElement.textContent = netBalanceMessage;
  } else {
    // Create and insert element only once (optional)
    netBalanceElement.id = 'net-balance';
    netBalanceElement.textContent = netBalanceMessage;
    transactionsList.after(netBalanceElement); // Insert after transactions list
  }
  // Helper function to determine color based on net balance
  function getColorForNetBalance(netBalanceMessage) {
   if (netBalance > 0) {
     return 'green'; // Positive balance: green
   } else if (netBalance === 0) {
      return 'black'; // Breaking even: black
   } else {
     return 'red'; // Negative balance: red
   }
  }
  // Get the color for net balance
  const color = getColorForNetBalance(netBalance);

  // Update net balance message and color
  existingNetBalanceElement.textContent = netBalanceMessage;
  existingNetBalanceElement.style.color = color; // Apply the color based on net balance
}

