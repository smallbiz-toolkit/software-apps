const ctx = document.getElementById('myChart').getContext('2d');
let myChart;

let chartData = {
    labels: [],
    data: [],
};

function updateChart() {
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: [{
                label: 'Daily Expense Monitoring',
                data: chartData.data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function addExpense() {
    const totalAmount = parseFloat(document.getElementById('totalAmount').value);
    const expenseDate = document.getElementById('expenseDate').value;

    const storedData = JSON.parse(localStorage.getItem('expenseData')) || [];

    const newData = {
        date: expenseDate,
        totalAmount: totalAmount
    };

    storedData.push(newData);
    localStorage.setItem('expenseData', JSON.stringify(storedData));

    chartData.labels.push(expenseDate);
    chartData.data.push(totalAmount);

    updateChart();

    const table = document.getElementById('billTableBody');
    const newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${expenseDate}</td>
        <td>${totalAmount}</td>
        <td><button class="btn btn-danger" onclick="removeRow(this)">x</button></td>
    `;

    document.getElementById('totalAmount').value = '';
    document.getElementById('expenseDate').value = '';
}

function removeRow(button) {
    const row = button.closest('tr');
    const index = row.rowIndex;
    row.remove();

    chartData.labels.splice(index - 1, 1);
    chartData.data.splice(index - 1, 1);
    updateChart();

    const storedData = JSON.parse(localStorage.getItem('expenseData'));
    storedData.splice(index - 1, 1);
    localStorage.setItem('expenseData', JSON.stringify(storedData));
}

document.addEventListener('DOMContentLoaded', function() {
    const storedData = JSON.parse(localStorage.getItem('expenseData')) || [];
    chartData.labels = storedData.map(item => item.date);
    chartData.data = storedData.map(item => item.totalAmount);
    updateChart();

    const table = document.getElementById('billTableBody');
    storedData.forEach(item => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td>${item.date}</td>
            <td>${item.totalAmount}</td>
            <td><button class="btn btn-danger" onclick="removeRow(this)">x</button></td>
        `;
    });
});