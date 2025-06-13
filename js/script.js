// Espera o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Exercício 1: Maior/Menor ---
    document.getElementById('btn1').addEventListener('click', () => {
        const inputs = [
            document.getElementById('n1-1').value,
            document.getElementById('n1-2').value,
            document.getElementById('n1-3').value,
            document.getElementById('n1-4').value,
            document.getElementById('n1-5').value
        ];
        const numbers = inputs.map(Number).filter(n => !isNaN(n));
        
        if (numbers.length !== 5) {
            document.getElementById('result1').innerText = "Por favor, preencha todos os cinco campos com números válidos.";
            return;
        }

        const max = Math.max(...numbers);
        const min = Math.min(...numbers);
        document.getElementById('result1').innerText = `Maior: ${max} | Menor: ${min}`;
    });

    // --- Exercício 2: Vogal ---
    document.getElementById('btn2').addEventListener('click', () => {
        const char = document.getElementById('char2').value.toLowerCase();
        const resultDiv = document.getElementById('result2');
        if (char.length !== 1) {
            resultDiv.innerText = "Por favor, insira um único caractere.";
            return;
        }
        const vogais = ['a', 'e', 'i', 'o', 'u'];
        if (vogais.includes(char)) {
            resultDiv.innerText = `O caractere "${char}" é uma vogal.`;
        } else {
            resultDiv.innerText = `O caractere "${char}" é uma consoante.`;
        }
    });

    // --- Exercício 3: Limites ---
    document.getElementById('btn3').addEventListener('click', () => {
        const inferior = parseInt(document.getElementById('limit3-1').value);
        const superior = parseInt(document.getElementById('limit3-2').value);
        const resultDiv = document.getElementById('result3');

        if (isNaN(inferior) || isNaN(superior)) {
            resultDiv.innerText = "Por favor, insira limites válidos.";
            return;
        }
        if (inferior >= superior) {
            resultDiv.innerText = "O limite inferior deve ser menor que o superior.";
            return;
        }

        let soma = 0;
        let sequencia = [];
        for (let i = inferior; i <= superior; i++) {
            soma += i;
            sequencia.push(i);
        }
        resultDiv.innerText = `Sequência: ${sequencia.join(', ')}. Somatório: ${soma}`;
    });

    // --- Exercício 4: Ordem ---
    document.getElementById('btn4').addEventListener('click', () => {
        const inputs = [
            document.getElementById('n4-1').value,
            document.getElementById('n4-2').value,
            document.getElementById('n4-3').value
        ];
        const numbers = inputs.map(Number).filter(n => !isNaN(n));
        
        if (numbers.length !== 3) {
            document.getElementById('result4').innerText = "Por favor, preencha todos os três campos com números válidos.";
            return;
        }

        numbers.sort((a, b) => a - b);
        document.getElementById('result4').innerText = `Números em ordem crescente: ${numbers.join(', ')}`;
    });

    // --- Exercício 5: Positivo/Negativo ---
    document.getElementById('btn5').addEventListener('click', () => {
        const num = parseFloat(document.getElementById('n5').value);
        const resultDiv = document.getElementById('result5');
        if (isNaN(num)) {
            resultDiv.innerText = "Por favor, insira um número válido.";
            return;
        }
        if (num > 0) {
            resultDiv.innerText = "O número é positivo.";
        } else if (num < 0) {
            resultDiv.innerText = "O número é negativo.";
        } else {
            resultDiv.innerText = "O número é zero (neutro).";
        }
    });

    // --- Exercício 6: Par/Ímpar ---
    document.getElementById('btn6').addEventListener('click', () => {
        const num = parseInt(document.getElementById('n6').value);
        const resultDiv = document.getElementById('result6');
         if (isNaN(num)) {
            resultDiv.innerText = "Por favor, insira um número válido.";
            return;
        }
        if (num % 2 === 0) {
            resultDiv.innerText = "O número é par.";
        } else {
            resultDiv.innerText = "O número é ímpar.";
        }
    });

});