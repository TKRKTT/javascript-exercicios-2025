// Espera o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Função auxiliar para mostrar/limpar mensagens de erro e bordas
    // Esta função recebe o elemento input, o div onde a mensagem de erro será exibida, e a mensagem em si.
    function displayError(inputElement, errorMessageElement, message) {
        if (message) {
            inputElement.classList.add('input-error'); // Adiciona a classe 'input-error' para a borda vermelha
            errorMessageElement.innerText = message; // Exibe a mensagem de erro
            errorMessageElement.style.display = 'block'; // Garante que o div da mensagem de erro seja visível
        } else {
            inputElement.classList.remove('input-error'); // Remove a classe 'input-error'
            errorMessageElement.innerText = ''; // Limpa a mensagem de erro
            errorMessageElement.style.display = 'none'; // Esconde o div da mensagem de erro
        }
    }

    // --- Exercício 1: Maior/Menor ---
    document.getElementById('btn1').addEventListener('click', () => {
        const inputs = [
            document.getElementById('n1-1'),
            document.getElementById('n1-2'),
            document.getElementById('n1-3'),
            document.getElementById('n1-4'),
            document.getElementById('n1-5')
        ];
        const resultDiv = document.getElementById('result1'); // Corrigido: deve ser o elemento div de resultado
        let allInputsValid = true; 
        const numbers = [];

        // Limpa todas as mensagens de erro e bordas de erro anteriores antes de revalidar
        inputs.forEach((input, index) => {
            const errorMessageDiv = document.getElementById(`error-n1-${index + 1}`);
            displayError(input, errorMessageDiv, ''); 
        });
        resultDiv.innerText = ''; // Limpa o resultado anterior

        // Itera sobre cada input para validar
        inputs.forEach((input, index) => {
            const numValue = parseFloat(input.value);
            const errorMessageDiv = document.getElementById(`error-n1-${index + 1}`);

            // Verifica se o valor é um número válido e se o campo não está vazio
            if (isNaN(numValue) || input.value.trim() === '') {
                displayError(input, errorMessageDiv, "Por favor, preencha este campo com um número válido.");
                allInputsValid = false; 
            } else {
                numbers.push(numValue); 
            }
        });

        // Se a validação falhou para qualquer input, para a execução
        if (!allInputsValid) {
            return; 
        }

        // Verifica se realmente todos os 5 campos foram preenchidos (após a validação individual)
        if (numbers.length !== 5) {
            // Este caso deve ser raro se a validação acima estiver funcionando bem, mas é um bom fallback
            resultDiv.innerText = "Erro: Nem todos os cinco campos foram preenchidos corretamente.";
            return;
        }

        // Se todos os inputs forem válidos e corretos, calcula e exibe o resultado
        const max = Math.max(...numbers);
        const min = Math.min(...numbers);
        resultDiv.innerText = `Maior: ${max} | Menor: ${min}`;
    });

    // --- Exercício 2: Vogal ---
    document.getElementById('btn2').addEventListener('click', () => {
        const charInput = document.getElementById('char2');
        const char = charInput.value.toLowerCase();
        const resultDiv = document.getElementById('result2');
        const errorMessageDiv = document.getElementById('error-char2');

        // Limpa mensagens e bordas de erro anteriores
        displayError(charInput, errorMessageDiv, '');
        resultDiv.innerText = ''; 

        // Verifica se o input tem exatamente um caractere e se é uma letra
        if (char.length !== 1 || !/[a-z]/.test(char)) {
            displayError(charInput, errorMessageDiv, "Por favor, insira um único caractere alfabético.");
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
        const inferiorInput = document.getElementById('limit3-1');
        const superiorInput = document.getElementById('limit3-2');
        const resultDiv = document.getElementById('result3');
        const errorInferiorDiv = document.getElementById('error-limit3-1');
        const errorSuperiorDiv = document.getElementById('error-limit3-2');

        // Limpa mensagens e bordas de erro anteriores
        displayError(inferiorInput, errorInferiorDiv, '');
        displayError(superiorInput, errorSuperiorDiv, '');
        resultDiv.innerText = ''; 

        const inferior = parseInt(inferiorInput.value);
        const superior = parseInt(superiorInput.value);

        let isValid = true;

        // Validação do limite inferior
        if (isNaN(inferior) || inferiorInput.value.trim() === '') {
            displayError(inferiorInput, errorInferiorDiv, "Insira um limite inferior válido.");
            isValid = false;
        }
        // Validação do limite superior
        if (isNaN(superior) || superiorInput.value.trim() === '') {
            displayError(superiorInput, errorSuperiorDiv, "Insira um limite superior válido.");
            isValid = false;
        }

        if (!isValid) return; // Se houver erros de formato, para a execução

        // Validação da lógica dos limites (inferior deve ser menor que superior)
        if (inferior >= superior) {
            displayError(inferiorInput, errorInferiorDiv, "O limite inferior deve ser menor que o superior.");
            displayError(superiorInput, errorSuperiorDiv, "O limite superior deve ser maior que o inferior.");
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
            document.getElementById('n4-1'),
            document.getElementById('n4-2'),
            document.getElementById('n4-3')
        ];
        const resultDiv = document.getElementById('result4');
        let allInputsValid = true;
        const numbers = [];

        // Limpa mensagens e bordas de erro anteriores
        inputs.forEach((input, index) => {
            const errorMessageDiv = document.getElementById(`error-n4-${index + 1}`);
            displayError(input, errorMessageDiv, '');
        });
        resultDiv.innerText = ''; 

        inputs.forEach((input, index) => {
            const numValue = parseFloat(input.value);
            const errorMessageDiv = document.getElementById(`error-n4-${index + 1}`);

            if (isNaN(numValue) || input.value.trim() === '') {
                displayError(input, errorMessageDiv, "Por favor, preencha este campo com um número válido.");
                allInputsValid = false;
            } else {
                numbers.push(numValue);
            }
        });

        if (!allInputsValid) {
            return;
        }

        // Verifica se todos os 3 campos foram preenchidos (após a validação individual)
        if (numbers.length !== 3) {
            resultDiv.innerText = "Erro: Nem todos os três campos foram preenchidos corretamente.";
            return;
        }

        numbers.sort((a, b) => a - b);
        document.getElementById('result4').innerText = `Números em ordem crescente: ${numbers.join(', ')}`;
    });

    // --- Exercício 5: Positivo/Negativo ---
    document.getElementById('btn5').addEventListener('click', () => {
        const numInput = document.getElementById('n5');
        const num = parseFloat(numInput.value);
        const resultDiv = document.getElementById('result5');
        const errorMessageDiv = document.getElementById('error-n5');

        // Limpa mensagens e bordas de erro anteriores
        displayError(numInput, errorMessageDiv, '');
        resultDiv.innerText = ''; 

        if (isNaN(num) || numInput.value.trim() === '') {
            displayError(numInput, errorMessageDiv, "Por favor, insira um número válido.");
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
        const numInput = document.getElementById('n6');
        const num = parseInt(numInput.value);
        const resultDiv = document.getElementById('result6');
        const errorMessageDiv = document.getElementById('error-n6');

        // Limpa mensagens e bordas de erro anteriores
        displayError(numInput, errorMessageDiv, '');
        resultDiv.innerText = ''; 

        if (isNaN(num) || numInput.value.trim() === '') {
            displayError(numInput, errorMessageDiv, "Por favor, insira um número válido.");
            return;
        }
        
        if (num % 2 === 0) {
            resultDiv.innerText = "O número é par.";
        } else {
            resultDiv.innerText = "O número é ímpar.";
        }
    });
});

// Fim do script
