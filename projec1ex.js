    // <!-- JAVASCRIPT LOGIC - The brain  is right here -->
    
        // --- 1. GETTING OUR HTML ELEMENTS ---
        // 
        const balanceEl = document.getElementById('balance');
        const incomeEl = document.getElementById('money-plus');
        const expenseEl = document.getElementById('money-minus');
        const listEl = document.getElementById('transaction-list');
        const form = document.getElementById('form');
        const descriptionInput = document.getElementById('description');
        const amountInput = document.getElementById('amount');

      
        // This is where we will store all our transactions. It's just an array of objects.
        let transactions = [];

        // -ADD A NEW TRANSACTION ---
 
        function addTransaction(event) {
            // This stops the page from reloading when you submit the form.
            event.preventDefault(); 
            
            // Check if the inputs are empty.
            if (descriptionInput.value.trim() === '' || amountInput.value.trim() === '') {
                alert('Please enter a description and amount.');
            } else {
                // Create a new transaction object with the form values.
                const transaction = {
                    id: Date.now(), // A unique ID based on the current time.
                    text: descriptionInput.value,
                    amount: Number(amountInput.value) // Convert the amount from text to a number.
                };

                // Add the new transaction to our data array.
                transactions.push(transaction);

                // Update everything on the screen.
                updateUI();

                // Clear the form inputs for the next entry.
                descriptionInput.value = '';
                amountInput.value = '';
            }
        }

        // --- 4. DELETE A TRANSACTION ---
        function deleteTransaction(id) {
            // We find the transaction we want to delete and remove it from our array.
            transactions = transactions.filter(transaction => transaction.id !== id);
            
            // Update the screen after deleting.
            updateUI();
        }

        // and redraws the entire page based on it.
        function updateUI() {
            // First, clear out the old list of transactions.
            listEl.innerHTML = '';
            
            // Reset our totals.
            let totalBalance = 0;
            let totalIncome = 0;
            let totalExpense = 0;

            // Loop through every transaction in our data array.
            for (let i = 0; i < transactions.length; i++) {
                const transaction = transactions[i];

                // Add the transaction amount to the total balance.
                totalBalance = totalBalance + transaction.amount;

                // Create a new list item for this transaction.
                const item = document.createElement('li');
                
                // Check if it's income or expense to add the correct color.
                const type = transaction.amount > 0 ? 'plus' : 'minus';
                item.classList.add(type);

                // Add the content to the list item.
                item.innerHTML = `
                    ${transaction.text} <span>$${Math.abs(transaction.amount)}</span>
                    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
                `;
                
                // Add the new item to the list on the page.
                listEl.appendChild(item);
                
                // Add to income or expense totals.
                if (transaction.amount > 0) {
                    totalIncome += transaction.amount;
                } else {
                    totalExpense += transaction.amount;
                }
            }

            // After the loop, update the summary text on the page.
            balanceEl.innerText = `$${totalBalance.toFixed(2)}`;
            incomeEl.innerText = `+$${totalIncome.toFixed(2)}`;
            expenseEl.innerText = `-$${Math.abs(totalExpense).toFixed(2)}`;
        }
        
        // This tells the form to run our `addTransaction` function when it's submitted.
        form.addEventListener('submit', addTransaction);

        // --- 7. INITIAL START ---
        updateUI();

    
