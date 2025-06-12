
    // Função para o Exercício 1: MAIOR_MENOR
function MAIOR_MENOR(a, b, c, d, e) {
    // Uma forma simples é colocar todos os números em um array
    const numeros = [a, b, c, d, e];

    // Inicializar o maior e o menor com o primeiro número
    let maior = numeros[0];
    let menor = numeros[0];

    // Iterar sobre os números para encontrar o maior e o menor
    for (let i = 1; i < numeros.length; i++) {
        if (numeros[i] > maior) {
            maior = numeros[i];
        }
        if (numeros[i] < menor) {
            menor = numeros[i];
        }
    }

    // Retornar um objeto com ambos os valores
    return { maior: maior, menor: menor };
}

// Função para o Exercício 2: VOGAL
function VOGAL(c) {
    // Converte o caractere para minúsculo para facilitar a comparação,
    // assim 'A' e 'a' serão tratados como a mesma vogal.
    const charMinusculo = c.toLowerCase();

    // Verifica se o caractere é uma das vogais
    if (charMinusculo === 'a' ||
        charMinusculo === 'e' ||
        charMinusculo === 'i' ||
        charMinusculo === 'o' ||
        charMinusculo === 'u') {
        return 1; // É uma vogal
    } else {
        return 0; // Não é uma vogal
    }

    // Outra forma mais concisa de fazer (usando includes no array):
    // const vogais = ['a', 'e', 'i', 'o', 'u'];
    // return vogais.includes(charMinusculo) ? 1 : 0;
}

// Função para o Exercício 3: LIMITES
// Exibe os números inteiros no intervalo [li, ls] e calcula sua soma.
function LIMITES(li, ls) {
    if (li > ls) {
        return "Erro: Limite inferior não pode ser maior que o limite superior.";
    }

    let numerosNoIntervalo = [];
    let somatorio = 0;

    for (let i = li; i <= ls; i++) {
        numerosNoIntervalo.push(i); // Adiciona o número ao array
        somatorio += i; // Adiciona o número ao somatório
    }

    // Retorna um objeto com os números e o somatório
    return {
        numeros: numerosNoIntervalo,
        soma: somatorio
    };
}


// Função para o Exercício 4: ORDEM
// Recebe 3 valores e os retorna ordenados em ordem crescente.
function ORDEM(a, b, c) {
    // Coloca os números em um array
    const numeros = [a, b, c];

    // Usa o método sort() para ordenar o array
    // O método sort() por padrão ordena como strings,
    // então precisamos passar uma função de comparação para números.
    numeros.sort(function(x, y) {
        return x - y; // Para ordem crescente
    });

    // Retorna o array ordenado
    return numeros;
}

// Função para o Exercício 5: POSITIVO_NEGATIVO
// Recebe um valor inteiro e verifica se é positivo.
// Retorna true se for positivo, false se for negativo ou zero.
function POSITIVO_NEGATIVO(x) {
    // Um número é positivo se for maior que zero.
    // Se for zero ou menor que zero, é negativo ou nulo.
    return x > 0;
}

// Função para o Exercício 6: PAR_IMPAR
// Recebe um valor inteiro e verifica se é par.
// Retorna true se for par, false se for ímpar.
function PAR_IMPAR(x) {
    // O operador módulo (%) retorna o resto da divisão.
    // Se o resto da divisão por 2 for 0, o número é par.
    return x % 2 === 0;
}

// Funções para "conectar" o HTML com as funções JavaScript
function executarExercicio1() {
    const num1 = parseFloat(document.getElementById('num1_ex1').value);
    const num2 = parseFloat(document.getElementById('num2_ex1').value);
    const num3 = parseFloat(document.getElementById('num3_ex1').value);
    const num4 = parseFloat(document.getElementById('num4_ex1').value);
    const num5 = parseFloat(document.getElementById('num5_ex1').value);

    // Verifica se os inputs são números válidos
    if (isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4) || isNaN(num5)) {
        document.getElementById('resultado_ex1').innerText = "Por favor, insira 5 números válidos.";
        return;
    }

    const resultado = MAIOR_MENOR(num1, num2, num3, num4, num5);
    document.getElementById('resultado_ex1').innerText = `Maior: ${resultado.maior}, Menor: ${resultado.menor}`;
}

function executarExercicio2() {
    const char = document.getElementById('char_ex2').value;

    if (char.length !== 1) {
        document.getElementById('resultado_ex2').innerText = "Por favor, insira apenas um caractere.";
        return;
    }

    const resultado = VOGAL(char);
    if (resultado === 1) {
        document.getElementById('resultado_ex2').innerText = `"${char}" é uma vogal.`;
    } else {
        document.getElementById('resultado_ex2').innerText = `"${char}" não é uma vogal.`;
    }
}

function executarExercicio3() {
    const li = parseFloat(document.getElementById('limiteInf_ex3').value);
    const ls = parseFloat(document.getElementById('limiteSup_ex3').value);

    if (isNaN(li) || isNaN(ls)) {
        document.getElementById('resultado_ex3').innerText = "Por favor, insira ambos os limites numéricos.";
        return;
    }

    const resultado = LIMITES(li, ls);

    if (typeof resultado === 'string') { // Se a função retornou uma string, é um erro
        document.getElementById('resultado_ex3').innerText = resultado;
    } else {
        document.getElementById('resultado_ex3').innerText = `Números no Intervalo: [${resultado.numeros.join(', ')}]\nSomatório: ${resultado.soma}`;
    }
}

// Função para conectar o HTML com o Exercício 4

function executarExercicio4() {
    const num1 = parseFloat(document.getElementById('num1_ex4').value);
    const num2 = parseFloat(document.getElementById('num2_ex4').value);
    const num3 = parseFloat(document.getElementById('num3_ex4').value);

    // Validação básica para garantir que são números
    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        document.getElementById('resultado_ex4').innerText = "Por favor, insira 3 números válidos.";
        return;
    }

    const resultado = ORDEM(num1, num2, num3);

    document.getElementById('resultado_ex4').innerText = `Números Ordenados: [${resultado.join(', ')}]`;
}

// Função para conectar o HTML com o Exercício 5
function executarExercicio5() {
    const num = parseFloat(document.getElementById('num_ex5').value);

    if (isNaN(num)) {
        document.getElementById('resultado_ex5').innerText = "Por favor, insira um número válido.";
        return;
    }

    const resultado = POSITIVO_NEGATIVO(num);

    if (resultado) { // Se o resultado for true
        document.getElementById('resultado_ex5').innerText = `O número ${num} é POSITIVO.`;
    } else { // Se o resultado for false
        document.getElementById('resultado_ex5').innerText = `O número ${num} é NEGATIVO ou ZERO.`;
    }
}

// Função para conectar o HTML com o Exercício 6
function executarExercicio6() {
    // Usamos parseInt aqui porque par/ímpar geralmente se aplica a números inteiros
    const num = parseInt(document.getElementById('num_ex6').value);

    if (isNaN(num)) {
        document.getElementById('resultado_ex6').innerText = "Por favor, insira um número inteiro válido.";
        return;
    }

    const resultado = PAR_IMPAR(num);

    if (resultado) { // Se o resultado for true
        document.getElementById('resultado_ex6').innerText = `O número ${num} é PAR.`;
    } else { // Se o resultado for false
        document.getElementById('resultado_ex6').innerText = `O número ${num} é ÍMPAR.`;
    }
}
