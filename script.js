// Load CSV data and process tables
document.addEventListener('DOMContentLoaded', () => {
    fetch('Table_Input.csv')
        .then(response => response.text())
        .then(data => processCSV(data))
        .catch(error => console.error('Error loading CSV:', error));
});

function processCSV(data) {
    const rows = data.trim().split('\n');
    const table1 = document.getElementById('table1');

    // Populate Table 1
    rows.forEach((row, index) => {
        const cells = row.split(',');
        const tr = document.createElement('tr');
        cells.forEach(cell => {
            const td = document.createElement(index === 0 ? 'th' : 'td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        table1.appendChild(tr);
    });

    // Extract values from Table 1 for Table 2 calculations
    const values = rows.slice(1).map(row => row.split(',').map(Number));
    console.log('Extracted values:', values);

    
    if (values.length >= 20 && values[4].length > 0 && values[19].length > 0) {
        const alpha = values[4][1] + values[19][1];  // A5 + A20
        const beta = values[14][1] / values[6][1];   // A15 / A7
        const charlie = values[12][1] * values[11][1]; // A13 * A12

        // Populate Table 2
        document.getElementById('alpha').textContent = alpha;
        document.getElementById('beta').textContent = beta.toFixed(2); 
        document.getElementById('charlie').textContent = charlie;
    } else {
        console.error('Error in data extraction: insufficient data.');
    }
}
