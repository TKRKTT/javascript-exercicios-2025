// Espera o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Função auxiliar para mostrar/limpar mensagens de erro e bordas
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

    // NOVA FUNÇÃO: Limpa os inputs, mensagens de erro e resultado de uma seção
    function clearSection(inputElements, errorMessageElements, resultDiv) {
        inputElements.forEach(input => {
            input.value = ''; // Limpa o valor do input (corrigido: .value)
            input.classList.remove('input-error'); // Remove a borda de erro (corrigido: input-error)
        });
        errorMessageElements.forEach(errorDiv => { // Corrigido: .forEach
            errorDiv.innerText = ''; // Limpa a mensagem de erro
            errorDiv.style.display = 'none'; // Esconde o div da mensagem de erro (corrigido: 'none')
        });
        resultDiv.innerText = ''; // Limpa o resultado
    }


    // --- Exercício 1: Maior/Menor ---
    // Obter referências aos elementos (corrigido: pegar o elemento, não o .value)
    const inputs1 = [
        document.getElementById('n1-1'),
        document.getElementById('n1-2'),
        document.getElementById('n1-3'),
        document.getElementById('n1-4'),
        document.getElementById('n1-5')
    ];
    const errorMessages1 = [
        document.getElementById('error-n1-1'),
        document.getElementById('error-n1-2'),
        document.getElementById('error-n1-3'),
        document.getElementById('error-n1-4'),
        document.getElementById('error-n1-5')
    ];
    const resultDiv1 = document.getElementById('result1');
    const btn1 = document.getElementById('btn1');
    const btnClear1 = document.getElementById('btnClear1'); // Novo: Botão Limpar

    btn1.addEventListener('click', () => {
        let allInputsValid = true; 
        const numbers = [];

        // Limpa todas as mensagens de erro e bordas de erro anteriores antes de revalidar
        errorMessages1.forEach(errorDiv => displayError(document.createElement('input'), errorDiv, '')); // Usar displayError para limpar
        inputs1.forEach(input => input.classList.remove('input-error')); 
        resultDiv1.innerText = ''; 

        // Itera sobre cada input para validar
        inputs1.forEach((input, index) => {
            const numValue = parseFloat(input.value);
            const errorMessageDiv = errorMessages1[index];

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

        if (numbers.length !== 5) {
            resultDiv1.innerText = "Erro: Nem todos os cinco campos foram preenchidos corretamente.";
            return;
        }

        const max = Math.max(...numbers);
        const min = Math.min(...numbers);
        resultDiv1.innerText = `Maior: ${max} | Menor: ${min}`;
    });

    // Novo: Listener para o botão Limpar do Exercício 1
    btnClear1.addEventListener('click', () => {
        clearSection(inputs1, errorMessages1, resultDiv1);
    });


    // --- Exercício 2: Vogal ---
    const charInput2 = document.getElementById('char2');
    const resultDiv2 = document.getElementById('result2');
    const errorMessageDiv2 = document.getElementById('error-char2');
    const btn2 = document.getElementById('btn2');
    const btnClear2 = document.getElementById('btnClear2'); // Novo: Botão Limpar

    btn2.addEventListener('click', () => {
        const char = charInput2.value.toLowerCase();

        displayError(charInput2, errorMessageDiv2, '');
        resultDiv2.innerText = ''; 

        if (char.length !== 1 || !/[a-z]/.test(char)) {
            displayError(charInput2, errorMessageDiv2, "Por favor, insira um único caractere alfabético.");
            return;
        }
        
        const vogais = ['a', 'e', 'i', 'o', 'u'];
        if (vogais.includes(char)) {
            resultDiv2.innerText = `O caractere "${char}" é uma vogal.`;
        } else {
            resultDiv2.innerText = `O caractere "${char}" é uma consoante.`;
        }
    });

    // Novo: Listener para o botão Limpar do Exercício 2
    btnClear2.addEventListener('click', () => {
        clearSection([charInput2], [errorMessageDiv2], resultDiv2);
    });


    // --- Exercício 3: Limites ---
    const inferiorInput3 = document.getElementById('limit3-1');
    const superiorInput3 = document.getElementById('limit3-2');
    const resultDiv3 = document.getElementById('result3');
    const errorInferiorDiv3 = document.getElementById('error-limit3-1');
    const errorSuperiorDiv3 = document.getElementById('error-limit3-2');
    const btn3 = document.getElementById('btn3');
    const btnClear3 = document.getElementById('btnClear3'); // Novo: Botão Limpar

    btn3.addEventListener('click', () => {
        displayError(inferiorInput3, errorInferiorDiv3, '');
        displayError(superiorInput3, errorSuperiorDiv3, '');
        resultDiv3.innerText = ''; 

        const inferior = parseInt(inferiorInput3.value);
        const superior = parseInt(superiorInput3.value);

        let isValid = true;

        if (isNaN(inferior) || inferiorInput3.value.trim() === '') {
            displayError(inferiorInput3, errorInferiorDiv3, "Insira um limite inferior válido.");
            isValid = false;
        }
        if (isNaN(superior) || superiorInput3.value.trim() === '') {
            displayError(superiorInput3, errorSuperiorDiv3, "Insira um limite superior válido.");
            isValid = false;
        }

        if (!isValid) return; 

        if (inferior >= superior) {
            displayError(inferiorInput3, errorInferiorDiv3, "O limite inferior deve ser menor que o superior.");
            displayError(superiorInput3, errorSuperiorDiv3, "O limite superior deve ser maior que o inferior.");
            return;
        }

        let soma = 0;
        let sequencia = [];
        for (let i = inferior; i <= superior; i++) {
            soma += i;
            sequencia.push(i);
        }
        resultDiv3.innerText = `Sequência: ${sequencia.join(', ')}. Somatório: ${soma}`;
    });

    // Novo: Listener para o botão Limpar do Exercício 3
    btnClear3.addEventListener('click', () => {
        clearSection([inferiorInput3, superiorInput3], [errorInferiorDiv3, errorSuperiorDiv3], resultDiv3);
    });


    // --- Exercício 4: Ordem ---
    const inputs4 = [
        document.getElementById('n4-1'),
        document.getElementById('n4-2'),
        document.getElementById('n4-3')
    ];
    const resultDiv4 = document.getElementById('result4');
    const errorMessages4 = [
        document.getElementById('error-n4-1'),
        document.getElementById('error-n4-2'),
        document.getElementById('error-n4-3')
    ];
    const btn4 = document.getElementById('btn4');
    const btnClear4 = document.getElementById('btnClear4'); // Novo: Botão Limpar

    btn4.addEventListener('click', () => {
        let allInputsValid = true;
        const numbers = [];

        errorMessages4.forEach(errorDiv => displayError(document.createElement('input'), errorDiv, ''));
        inputs4.forEach(input => input.classList.remove('input-error'));
        resultDiv4.innerText = ''; 

        inputs4.forEach((input, index) => {
            const numValue = parseFloat(input.value);
            const errorMessageDiv = errorMessages4[index];

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

        if (numbers.length !== 3) {
            resultDiv4.innerText = "Erro: Nem todos os três campos foram preenchidos corretamente.";
            return;
        }

        numbers.sort((a, b) => a - b);
        resultDiv4.innerText = `Números em ordem crescente: ${numbers.join(', ')}`;
    });

    // Novo: Listener para o botão Limpar do Exercício 4
    btnClear4.addEventListener('click', () => {
        clearSection(inputs4, errorMessages4, resultDiv4);
    });


    // --- Exercício 5: Positivo/Negativo ---
    const numInput5 = document.getElementById('n5');
    const resultDiv5 = document.getElementById('result5');
    const errorMessageDiv5 = document.getElementById('error-n5');
    const btn5 = document.getElementById('btn5');
    const btnClear5 = document.getElementById('btnClear5'); // Novo: Botão Limpar

    btn5.addEventListener('click', () => {
        const num = parseFloat(numInput5.value);

        displayError(numInput5, errorMessageDiv5, '');
        resultDiv5.innerText = ''; 

        if (isNaN(num) || numInput5.value.trim() === '') {
            displayError(numInput5, errorMessageDiv5, "Por favor, insira um número válido.");
            return;
        }
        
        if (num > 0) {
            resultDiv5.innerText = "O número é positivo.";
        } else if (num < 0) {
            resultDiv5.innerText = "O número é negativo.";
        } else {
            resultDiv5.innerText = "O número é zero (neutro).";
        }
    });

    // Novo: Listener para o botão Limpar do Exercício 5
    btnClear5.addEventListener('click', () => {
        clearSection([numInput5], [errorMessageDiv5], resultDiv5);
    });


    // --- Exercício 6: Par/Ímpar ---
    const numInput6 = document.getElementById('n6');
    const resultDiv6 = document.getElementById('result6');
    const errorMessageDiv6 = document.getElementById('error-n6');
    const btn6 = document.getElementById('btn6');
    const btnClear6 = document.getElementById('btnClear6'); // Novo: Botão Limpar

    btn6.addEventListener('click', () => {
        const num = parseInt(numInput6.value);

        displayError(numInput6, errorMessageDiv6, '');
        resultDiv6.innerText = ''; 

        if (isNaN(num) || numInput6.value.trim() === '') {
            displayError(numInput6, errorMessageDiv6, "Por favor, insira um número válido.");
            return;
        }
        
        if (num % 2 === 0) {
            resultDiv6.innerText = "O número é par.";
        } else {
            resultDiv6.innerText = "O número é ímpar.";
        }
    });

    // Novo: Listener para o botão Limpar do Exercício 6
    btnClear6.addEventListener('click', () => {
        clearSection([numInput6], [errorMessageDiv6], resultDiv6);
    });
});
// Fim do script
