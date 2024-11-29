// Create account function
function createAccount(name, initialBalance) {
  // Check if account already exists
  if (accounts.hasOwnProperty(name)) {
    alert("Account with this name already exists!");
    return;
  }

  // Create new account object
  accounts[name] = {
    balance: initialBalance
  };

  // Update account list display
  updateAccountList();
}

// Deposit function
function deposit(name, amount) {
  // Check if account exists
  if (!accounts.hasOwnProperty(name)) {
    alert("Account does not exist!");
    return;
  }

  // Update account balance
  accounts[name].balance += amount;

  // Update account list display
  updateAccountList();
}

// Withdraw function
function withdraw(name, amount) {
  // Check if account exists
  if (!accounts.hasOwnProperty(name)) {
    alert("Account does not exist!");
    return;
  }

  // Check if sufficient balance
  if (accounts[name].balance < amount) {
    // Show error message
    alert("Insufficient balance!");
    return;
  }

  // Update account balance
  accounts[name].balance -= amount;

  // Update account list display
  updateAccountList();
}

// Update account list display function
function updateAccountList() {
  // Clear existing account list
  const accountList = document.getElementById("accountList");
  accountList.innerHTML = "";

  // Add each account to the list
  for (const name in accounts) {
    const accountItem = document.createElement("li");
    // Add event listener for deposit
    accountItem.addEventListener("click", () => {
      const amount = prompt("Enter deposit amount:");
      if (amount !== null && !isNaN(amount) && amount > 0) {
        deposit(name, parseFloat(amount));
      }
    });
    accountItem.textContent = `${name}: $${accounts[name].balance}`;
    accountList.appendChild(accountItem);
  }
}

// Initialize accounts object
const accounts = {};
// Transaction history object
const transactionHistory = {};

// Add transaction to history function
function addTransaction(name, amount, type) {
  if (!transactionHistory.hasOwnProperty(name)) {
    transactionHistory[name] = [];
  }
  transactionHistory[name].push({
    amount: amount,
    type: type,
    timestamp: new Date().toLocaleString()
  });
}

// Get transaction history for an account function
function getTransactionHistory(name) {
  if (transactionHistory.hasOwnProperty(name)) {
    return transactionHistory[name];
  }
  return [];
}

// Update transaction history display function
function updateTransactionHistory(name) {
  // Get transaction history for the account
  const history = getTransactionHistory(name);

  // Clear existing history display
  const historyList = document.getElementById("transactionHistory");
  historyList.innerHTML = "";

  // Add each transaction to the list
  history.forEach(transaction => {
    const historyItem = document.createElement("li");
    historyItem.textContent = `${transaction.timestamp}: $${transaction.amount} (${transaction.type})`;
    historyList.appendChild(historyItem);
  });
}

// Modify deposit and withdraw functions to add transactions to history
function deposit(name, amount) {
  // Check if account exists
  if (!accounts.hasOwnProperty(name)) {
    alert("Account does not exist!");
    return;
  }

  // Update account balance
  accounts[name].balance += amount;

  // Add deposit transaction to history
  addTransaction(name, amount, "Deposit");

  // Update account list display
  updateAccountList();

  // Update transaction history display
  updateTransactionHistory(name);
}

function withdraw(name, amount) {
  // Check if account exists
  if (!accounts.hasOwnProperty(name)) {
    alert("Account does not exist!");
    return;

  }

  // Check if sufficient balance
  if (accounts[name].balance < amount) {
    alert("Insufficient balance!");
    return;
  }

  // Update account balance
  accounts[name].balance -= amount;

  // Add withdraw transaction to history
  addTransaction(name, amount, "Withdraw");

  // Update account list display
  updateAccountList();

  // Update transaction history display
  updateTransactionHistory(name);
}