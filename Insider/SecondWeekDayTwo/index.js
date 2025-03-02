document.addEventListener('DOMContentLoaded', function() {
    const inputElement = document.getElementById('input');
    const buttonElement = document.getElementById('button');
    const resultElement = document.getElementById('result');
    const findLongestButton = document.getElementById('findLongest');
    const longestResultElement = document.getElementById('longestResult');

    buttonElement.addEventListener('click', function() {
        const number = parseInt(inputElement.value);
        
        if (isNaN(number) || number <= 0) {
            resultElement.textContent = "Please enter a positive integer.";
            return;
        }

        const sequence = calculateCollatz(number);
        resultElement.innerHTML = `
            <strong>Collatz dizisi (${number}):</strong><br>
            ${sequence.join(' → ')}<br>
            <strong>Adım sayısı:</strong> ${sequence.length - 1}
        `;
    });

    findLongestButton.addEventListener('click', function() {
        longestResultElement.textContent = "Calculating... (This may take a while)";
        
        setTimeout(() => {
            const result = longestCollatz(1000000);
            longestResultElement.innerHTML = `
                <strong>Starting number of the longest chain:</strong> ${result.start}<br>
                <strong>Chain length:</strong> ${result.length}
            `;
        }, 10);
    });

    function calculateCollatz(n) {
        const sequence = [n];
        let current = n;

        while (current !== 1) {
            if (current % 2 === 0) {
                current = current / 2;
            } else {
                current = 3 * current + 1;
            }
            sequence.push(current);
        }

        return sequence;
    }

    function collatzLength(n, m) {
        if (n === 1) return 1;
        if (m.has(n)) return m.get(n);

        let next = n % 2 === 0 ? n / 2 : 3 * n + 1;
        let length = 1 + collatzLength(next, m);

        m.set(n, length);
        return length;
    }

    function longestCollatz(limit) {
        let longestStart = 1;
        let longestLength = 0;
        let m = new Map();

        for (let i = 1; i < limit; i++) {
            let length = collatzLength(i, m);
            if (length > longestLength) {
                longestLength = length;
                longestStart = i;
            }
        }

        return { start: longestStart, length: longestLength };
    }
});
