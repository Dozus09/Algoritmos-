document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('amortizationForm');
    const amountInput = document.getElementById('amount');
    const rateInput = document.getElementById('rate');
    const termInput = document.getElementById('term');
    const clearBtn = document.getElementById('clearBtn');
    const resultsSection = document.getElementById('resultsSection');
    const errorMessage = document.getElementById('errorMessage');
    const tableBody = document.querySelector('#amortizationTable tbody');
    
    // Display elements
    const monthlyPaymentDisplay = document.getElementById('monthlyPaymentDisplay');
    const totalInterestDisplay = document.getElementById('totalInterestDisplay');
    const totalPaidDisplay = document.getElementById('totalPaidDisplay');

    // Currency formatter
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateAmortization();
    });

    clearBtn.addEventListener('click', () => {
        form.reset();
        resultsSection.classList.add('hidden');
        errorMessage.classList.add('hidden');
    });

    function calculateAmortization() {
        // Reset state
        errorMessage.classList.add('hidden');
        
        // Get values
        const principal = parseFloat(amountInput.value);
        const annualRate = parseFloat(rateInput.value);
        const months = parseInt(termInput.value);

        // Validation
        if (!validateInputs(principal, annualRate, months)) {
            return;
        }

        // Calculation (French Method)
        // Formula: A = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
        
        const monthlyRate = annualRate / 100 / 12;
        let monthlyPayment = 0;

        if (annualRate === 0) {
            monthlyPayment = principal / months;
        } else {
            monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
        }

        // Generate Table Data
        let balance = principal;
        let totalInterest = 0;
        let tableHTML = '';

        for (let i = 1; i <= months; i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthlyPayment - interestPayment;
            
            // Handle last month precision issues
            let currentMonthlyPayment = monthlyPayment;
            if (i === months && Math.abs(balance - principalPayment) > 0.01) {
                // Adjust last payment to close balance exactly
                // In a perfect world we might adjust the last payment, 
                // but usually the balance should be close enough to 0. 
                // Let's settle the balance to 0 visually.
            }
            
            balance -= principalPayment;
            if (balance < 0) balance = 0;

            totalInterest += interestPayment;

            tableHTML += `
                <tr>
                    <td>${i}</td>
                    <td>${currencyFormatter.format(currentMonthlyPayment)}</td>
                    <td>${currencyFormatter.format(interestPayment)}</td>
                    <td>${currencyFormatter.format(principalPayment)}</td>
                    <td>${currencyFormatter.format(balance)}</td>
                </tr>
            `;
        }

        // Update Summary
        monthlyPaymentDisplay.textContent = currencyFormatter.format(monthlyPayment);
        totalInterestDisplay.textContent = currencyFormatter.format(totalInterest);
        totalPaidDisplay.textContent = currencyFormatter.format(principal + totalInterest);

        // Update Table
        tableBody.innerHTML = tableHTML;

        // Show Results
        resultsSection.classList.remove('hidden');
        
        // Scroll to results on mobile
        if(window.innerWidth < 768) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function validateInputs(amount, rate, term) {
        if (isNaN(amount) || amount <= 0) {
            showError('Por favor, ingresa un monto válido mayor a 0.');
            return false;
        }
        if (isNaN(rate) || rate < 0) {
            showError('Por favor, ingresa una tasa de interés válida (0 o mayor).');
            return false;
        }
        if (isNaN(term) || term <= 0 || !Number.isInteger(term)) {
            showError('Por favor, ingresa un plazo válido en meses (entero positivo).');
            return false;
        }
        return true;
    }

    function showError(msg) {
        errorMessage.textContent = msg;
        errorMessage.classList.remove('hidden');
    }
});
