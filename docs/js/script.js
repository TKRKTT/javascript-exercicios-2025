// Espera o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Função auxiliar para mostrar/limpar mensagens de erro e bordas
    function displayError(inputElement, errorMessageElement, message) {
        if (message) {
            inputElement.classList.add('input-error');
            errorMessageElement.innerText = message;
            errorMessageElement.style.display = 'block';
        } else {
            inputElement.classList.remove('input-error');
            errorMessageElement.innerText = '';
            errorMessageElement.style.display = 'none';
        }
    }

    // Função auxiliar para limpar os inputs, mensagens de erro e resultado de uma seção
    function clearSection(inputElements, errorMessageElements, resultDiv) {
        inputElements.forEach(input => {
            input.value = '';
            input.classList.remove('input-error');
        });
        errorMessageElements.forEach(errorDiv => {
            errorDiv.innerText = '';
            errorDiv.style.display = 'none';
        });
        resultDiv.innerText = '';
    }

    // NOVA FUNÇÃO: Inicializa um exercício com sua lógica de validação e botões
    // Esta função torna o código mais reutilizável e limpo.
    function setupExercise(config) {
        const {
            inputs,              // Array de elementos input
            errorMessages,       // Array de elementos div de erro correspondentes
            resultDiv,           // Elemento div onde o resultado será exibido
            executeButton,       // Elemento do botão 'Executar'
            clearButton,         // Elemento do botão 'Limpar'
            validationLogic,     // Função que contém a lógica de validação específica do exercício
            calculationLogic     // Função que contém a lógica de cálculo do exercício
        } = config;

        // Adiciona o listener para o botão 'Executar'
        executeButton.addEventListener('click', () => {
            // Limpa mensagens de erro e bordas antes de cada nova execução
            inputs.forEach((input, idx) => displayError(input, errorMessages[idx], ''));
            resultDiv.innerText = '';

            // Executa a lógica de validação específica do exercício
            const validatedData = validationLogic(inputs, errorMessages, displayError);
            if (validatedData.isValid) {
                // Se a validação passou, executa a lógica de cálculo
                calculationLogic(validatedData.values, resultDiv);
            }
        });

        // Adiciona o listener para o botão 'Limpar'
        clearButton.addEventListener('click', () => {
            clearSection(inputs, errorMessages, resultDiv);
        });
    }


    // --- Configuração e Inicialização de Cada Exercício ---

    // Exercício 1: MAIOR_MENOR
    setupExercise({
        inputs: [
            document.getElementById('n1-1'), document.getElementById('n1-2'),
            document.getElementById('n1-3'), document.getElementById('n1-4'),
            document.getElementById('n1-5')
        ],
        errorMessages: [
            document.getElementById('error-n1-1'), document.getElementById('error-n1-2'),
            document.getElementById('error-n1-3'), document.getElementById('error-n1-4'),
            document.getElementById('error-n1-5')
        ],
        resultDiv: document.getElementById('result1'),
        executeButton: document.getElementById('btn1'),
        clearButton: document.getElementById('btnClear1'),
        validationLogic: (inputs, errorMessages, displayError) => {
            let isValid = true;
            const numbers = [];
            inputs.forEach((input, index) => {
                const numValue = parseFloat(input.value);
                const errorMessageDiv = errorMessages[index];
                if (isNaN(numValue) || input.value.trim() === '') {
                    displayError(input, errorMessageDiv, "Insira um número válido.");
                    isValid = false;
                } else {
                    numbers.push(numValue);
                }
            });
            // Fallback: caso a validação individual passe mas a contagem falhe
                        if (isValid && numbers.length !== 5) {
                            isValid = false;
                            // Poderíamos adicionar uma mensagem de erro geral aqui se quisesse, mas a validação individual já cobre bem
                        }
            return { isValid, values: numbers };
        },
        calculationLogic: (numbers, resultDiv) => {
            const max = Math.max(...numbers);
            const min = Math.min(...numbers);
            resultDiv.innerText = `Maior: ${max} | Menor: ${min}`;
        }
    });

    // Exercício 2: VOGAL
    setupExercise({
        inputs: [document.getElementById('char2')],
        errorMessages: [document.getElementById('error-char2')],
        resultDiv: document.getElementById('result2'),
        executeButton: document.getElementById('btn2'),
        clearButton: document.getElementById('btnClear2'),
        validationLogic: (inputs, errorMessages, displayError) => {
            const charInput = inputs[0];
            const char = charInput.value.toLowerCase();
            const errorMessageDiv = errorMessages[0];
            let isValid = true;

            if (char.length !== 1 || !/[a-z]/.test(char)) {
                displayError(charInput, errorMessageDiv, "Insira um único caractere alfabético.");
                isValid = false;
            }
            return { isValid, values: char };
        },
        calculationLogic: (char, resultDiv) => {
            const vogais = ['a', 'e', 'i', 'o', 'u'];
            if (vogais.includes(char)) {
                resultDiv.innerText = `O caractere "${char}" é uma vogal.`;
            } else {
                resultDiv.innerText = `O caractere "${char}" é uma consoante.`;
            }
        }
    });
    // Exercício 3: LIMITES
    setupExercise({
        inputs: [document.getElementById('limit3-1'), document.getElementById('limit3-2')],
        errorMessages: [document.getElementById('error-limit3-1'), document.getElementById('error-limit3-2')],
        resultDiv: document.getElementById('result3'),
        executeButton: document.getElementById('btn3'),
        clearButton: document.getElementById('btnClear3'),
        validationLogic: (inputs, errorMessages, displayError) => {
            const inferiorInput = inputs[0];
            const superiorInput = inputs[1];
            const errorInferiorDiv = errorMessages[0];
            const errorSuperiorDiv = errorMessages[1];
            
            const inferior = parseInt(inferiorInput.value);
            const superior = parseInt(superiorInput.value);
            let isValid = true;

            if (isNaN(inferior) || inferiorInput.value.trim() === '') {
                displayError(inferiorInput, errorInferiorDiv, "Insira um limite inferior válido.");
                isValid = false;
            }
            if (isNaN(superior) || superiorInput.value.trim() === '') {
                displayError(superiorInput, errorSuperiorDiv, "Insira um limite superior válido.");
                isValid = false;
            }

            if (!isValid) return { isValid: false }; // Se houver erros de formato, para aqui

            if (inferior >= superior) {
                displayError(inferiorInput, errorInferiorDiv, "O limite inferior deve ser menor que o superior.");
                displayError(superiorInput, errorSuperiorDiv, "O limite superior deve ser maior que o inferior.");
                isValid = false;
            }
            return { isValid, values: { inferior, superior } };
        },
        calculationLogic: (data, resultDiv) => {
            const { inferior, superior } = data;
            let soma = 0;
            let sequencia = [];
            for (let i = inferior; i <= superior; i++) {
                soma += i;
                sequencia.push(i);
            }
            resultDiv.innerText = `Sequência: ${sequencia.join(', ')}. Somatório: ${soma}`;
        }
    });

    // Exercício 4: ORDEM
    setupExercise({
        inputs: [
            document.getElementById('n4-1'), document.getElementById('n4-2'),
            document.getElementById('n4-3')
        ],
        errorMessages: [
            document.getElementById('error-n4-1'), document.getElementById('error-n4-2'),
            document.getElementById('error-n4-3')
        ],
        resultDiv: document.getElementById('result4'),
        executeButton: document.getElementById('btn4'),
        clearButton: document.getElementById('btnClear4'),
        validationLogic: (inputs, errorMessages, displayError) => {
            let isValid = true;
            const numbers = [];
            inputs.forEach((input, index) => {
                const numValue = parseFloat(input.value);
                const errorMessageDiv = errorMessages[index];
                if (isNaN(numValue) || input.value.trim() === '') {
                    displayError(input, errorMessageDiv, "Insira um número válido.");
                    isValid = false;
                } else {
                    numbers.push(numValue);
                }
            });
            if (isValid && numbers.length !== 3) {
                isValid = false;
            }
            return { isValid, values: numbers };
        },
        calculationLogic: (numbers, resultDiv) => {
            numbers.sort((a, b) => a - b);
            resultDiv.innerText = `Números em ordem crescente: ${numbers.join(', ')}`;
        }
    });

    // Exercício 5: POSITIVO_NEGATIVO
    setupExercise({
        inputs: [document.getElementById('n5')],
        errorMessages: [document.getElementById('error-n5')],
        resultDiv: document.getElementById('result5'),
        executeButton: document.getElementById('btn5'),
        clearButton: document.getElementById('btnClear5'),
        validationLogic: (inputs, errorMessages, displayError) => {
            const numInput = inputs[0];
            const numValue = parseFloat(numInput.value);
            const errorMessageDiv = errorMessages[0];
            let isValid = true;

            if (isNaN(numValue) || numInput.value.trim() === '') {
                displayError(numInput, errorMessageDiv, "Por favor, insira um número válido.");
                isValid = false;
            }
            return { isValid, values: numValue };
        },
        calculationLogic: (num, resultDiv) => {
            if (num > 0) {
                resultDiv.innerText = "O número é positivo.";
            } else if (num < 0) {
                resultDiv.innerText = "O número é negativo.";
            } else {
                resultDiv.innerText = "O número é zero (neutro).";
            }
        }
    });

    // Exercício 6: PAR_IMPAR
    setupExercise({
        inputs: [document.getElementById('n6')],
        errorMessages: [document.getElementById('error-n6')],
        resultDiv: document.getElementById('result6'),
        executeButton: document.getElementById('btn6'),
        clearButton: document.getElementById('btnClear6'),
        validationLogic: (inputs, errorMessages, displayError) => {
            const numInput = inputs[0];
            const numValue = parseInt(numInput.value);
            const errorMessageDiv = errorMessages[0];
            let isValid = true;

            if (isNaN(numValue) || numInput.value.trim() === '') {
                displayError(numInput, errorMessageDiv, "Por favor, insira um número válido.");
                isValid = false;
            }
            return { isValid, values: numValue };
        },
                calculationLogic: (num, resultDiv) => {
                    if (num % 2 === 0) {
                        resultDiv.innerText = "O número é par.";
                    } else {
                        resultDiv.innerText = "O número é ímpar.";
                    }
                }
            });
        });