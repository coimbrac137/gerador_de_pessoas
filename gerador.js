const readline = require('readline');

// Listas de nomes brasileiros
const NOMES_MASCULINOS = [
    "João", "José", "Antônio", "Francisco", "Carlos", "Paulo", "Pedro", "Lucas", "Luiz", "Rafael",
    "Fernando", "Marcelo", "Ricardo", "Eduardo", "Alexandre", "Sérgio", "Rodrigo", "Fábio", "André",
    "Bruno", "Daniel", "Felipe", "Guilherme", "Heitor", "Igor", "Júlio", "Leandro", "Marcos", "Nicolas"
];

const NOMES_FEMININOS = [
    "Maria", "Ana", "Francisca", "Antônia", "Adriana", "Juliana", "Márcia", "Fernanda", "Patrícia",
    "Aline", "Camila", "Letícia", "Natália", "Vanessa", "Tatiane", "Luciana", "Renata", "Beatriz",
    "Gabriela", "Larissa", "Amanda", "Bruna", "Carla", "Daniela", "Elaine", "Flávia", "Gisele"
];

const NOMES = [
    "Ana", "Bruno", "Carla", "Daniel", "Eduarda", "Felipe", "Gabriela", "Henrique",
    "Isabela", "João", "Karina", "Lucas", "Mariana", "Nicolas", "Olivia", "Pedro",
    "Quintino", "Rafaela", "Sabrina", "Thiago", "Ursula", "Vinicius", "Wagner",
    "Xavier", "Yasmin", "Zeca", "Alice", "Bernardo", "Camila", "Diego", "Elisa"
];

const SOBRENOMES = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
    "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida",
    "Nunes", "Dias", "Barbosa", "Rocha", "Mendes", "Araújo", "Cardoso", "Correia"
];

const CIDADES = [
    "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador",
    "Fortaleza", "Curitiba", "Manaus", "Recife", "Porto Alegre", "Belém",
    "Goiânia", "Campinas", "São Luís", "Natal"
];

const ESTADOS = ["SP", "RJ", "MG", "DF", "BA", "CE", "PR", "AM", "PE", "RS", "PA", "GO", "SC", "MA", "RN"];

// Listas para endereço
const RUAS = [
    "Rua das Flores", "Avenida Paulista", "Rua Augusta", "Avenida Brasil", "Rua Oscar Freire",
    "Rua da Consolação", "Avenida Faria Lima", "Rua Haddock Lobo", "Avenida Atlântica",
    "Rua Visconde de Pirajá", "Rua das Acácias", "Rua dos Pinheiros", "Avenida Rio Branco",
    "Rua do Ouvidor", "Travessa da Banca", "Rua dos Girassóis", "Rua das Palmeiras"
];

const BAIRROS = [
    "Centro", "Jardins", "Copacabana", "Ipanema", "Leblon", "Barra da Tijuca",
    "Vila Mariana", "Pinheiros", "Moema", "Itaim Bibi", "Brooklin", "Savassi",
    "Lourdes", "Boa Viagem", "Batel", "Cidade Baixa"
];

// Interface para input do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Função para perguntar ao usuário
function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, resolve);
    });
}

// Função para gerar CPF válido
function gerarCPF() {
    // Gera os primeiros 9 dígitos
    let cpf = [];
    for (let i = 0; i < 9; i++) {
        cpf.push(Math.floor(Math.random() * 10));
    }
    
    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += cpf[i] * (10 - i);
    }
    let digito1 = 11 - (soma % 11);
    if (digito1 > 9) digito1 = 0;
    cpf.push(digito1);
    
    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += cpf[i] * (11 - i);
    }
    let digito2 = 11 - (soma % 11);
    if (digito2 > 9) digito2 = 0;
    cpf.push(digito2);
    
    // Formata o CPF
    const cpfStr = cpf.join('');
    return `${cpfStr.slice(0,3)}.${cpfStr.slice(3,6)}.${cpfStr.slice(6,9)}-${cpfStr.slice(9)}`;
}

// Função para gerar RG
function gerarRG() {
    const digitos = [];
    for (let i = 0; i < 8; i++) {
        digitos.push(Math.floor(Math.random() * 10));
    }
    const rgBase = digitos.join('');
    return `${rgBase.slice(0,2)}.${rgBase.slice(2,5)}.${rgBase.slice(5,7)}-${rgBase.slice(7)}`;
}

// Função para gerar CEP
function gerarCEP() {
    const cep = [];
    for (let i = 0; i < 8; i++) {
        cep.push(Math.floor(Math.random() * 10));
    }
    const cepStr = cep.join('');
    return `${cepStr.slice(0,5)}-${cepStr.slice(5)}`;
}

// Função para gerar número de endereço
function gerarNumero() {
    return Math.floor(Math.random() * 2000) + 1;
}

// Função para gerar complemento (opcional)
function gerarComplemento() {
    const complementos = ["Apto", "Sala", "Bloco", "Casa", "Fundos", "", "", ""];
    const tipo = complementos[Math.floor(Math.random() * complementos.length)];
    if (tipo === "") return "";
    const numero = Math.floor(Math.random() * 100) + 1;
    if (tipo === "Casa") return `${tipo} ${numero}`;
    return `${tipo} ${Math.floor(Math.random() * 100) + 1}`;
}

// Função para gerar endereço completo
function gerarEndereco() {
    const rua = RUAS[Math.floor(Math.random() * RUAS.length)];
    const numero = gerarNumero();
    const complemento = gerarComplemento();
    const bairro = BAIRROS[Math.floor(Math.random() * BAIRROS.length)];
    const cidade = CIDADES[Math.floor(Math.random() * CIDADES.length)];
    const estado = ESTADOS[Math.floor(Math.random() * ESTADOS.length)];
    const cep = gerarCEP();
    
    let endereco = `${rua}, ${numero}`;
    if (complemento) {
        endereco += ` - ${complemento}`;
    }
    endereco += `, ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`;
    
    return endereco;
}

// Função para gerar nome completo do pai
function gerarNomePai() {
    const nome = NOMES_MASCULINOS[Math.floor(Math.random() * NOMES_MASCULINOS.length)];
    const qtdSobrenomes = Math.floor(Math.random() * 2) + 1; // 1 ou 2 sobrenomes
    const sobrenomes = [];
    
    const sobrenomesCopy = [...SOBRENOMES];
    for (let i = 0; i < qtdSobrenomes; i++) {
        const index = Math.floor(Math.random() * sobrenomesCopy.length);
        sobrenomes.push(sobrenomesCopy[index]);
        sobrenomesCopy.splice(index, 1);
    }
    
    return `${nome} ${sobrenomes.join(' ')}`;
}

// Função para gerar nome completo da mãe
function gerarNomeMae() {
    const nome = NOMES_FEMININOS[Math.floor(Math.random() * NOMES_FEMININOS.length)];
    const qtdSobrenomes = Math.floor(Math.random() * 2) + 1; // 1 ou 2 sobrenomes
    const sobrenomes = [];
    
    const sobrenomesCopy = [...SOBRENOMES];
    for (let i = 0; i < qtdSobrenomes; i++) {
        const index = Math.floor(Math.random() * sobrenomesCopy.length);
        sobrenomes.push(sobrenomesCopy[index]);
        sobrenomesCopy.splice(index, 1);
    }
    
    return `${nome} ${sobrenomes.join(' ')}`;
}

// Função para gerar data de nascimento
function gerarDataNascimento() {
    const ano = Math.floor(Math.random() * (2010 - 1940 + 1)) + 1940;
    const mes = Math.floor(Math.random() * 12) + 1;
    
    let maxDia;
    if (mes === 2) {
        // Fevereiro - considera ano bissexto
        const isBissexto = (ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0);
        maxDia = isBissexto ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(mes)) {
        maxDia = 30;
    } else {
        maxDia = 31;
    }
    
    const dia = Math.floor(Math.random() * maxDia) + 1;
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
}

// Função para gerar nome completo
function gerarNome() {
    const nome = NOMES[Math.floor(Math.random() * NOMES.length)];
    const qtdSobrenomes = Math.floor(Math.random() * 3) + 1;
    const sobrenomes = [];
    
    // Embaralha os sobrenomes
    const sobrenomesCopy = [...SOBRENOMES];
    for (let i = 0; i < qtdSobrenomes; i++) {
        const index = Math.floor(Math.random() * sobrenomesCopy.length);
        sobrenomes.push(sobrenomesCopy[index]);
        sobrenomesCopy.splice(index, 1);
    }
    
    return `${nome} ${sobrenomes.join(' ')}`;
}

// Função para gerar local de nascimento
function gerarLocalNascimento() {
    const cidade = CIDADES[Math.floor(Math.random() * CIDADES.length)];
    const estado = ESTADOS[Math.floor(Math.random() * ESTADOS.length)];
    return `${cidade} - ${estado}`;
}

// Função para gerar uma pessoa
function gerarPessoa() {
    return {
        nome: gerarNome(),
        dataNascimento: gerarDataNascimento(),
        localNascimento: gerarLocalNascimento(),
        cpf: gerarCPF(),
        rg: gerarRG(),
        endereco: gerarEndereco(),
        nomePai: gerarNomePai(),
        nomeMae: gerarNomeMae()
    };
}

// Função para gerar lista de pessoas
function gerarListaPessoas(quantidade) {
    const pessoas = [];
    for (let i = 0; i < quantidade; i++) {
        pessoas.push(gerarPessoa());
    }
    return pessoas;
}

// Função para exibir uma pessoa
function exibirPessoa(pessoa, numero = null) {
    if (numero) {
        console.log(`\n${'='.repeat(70)}`);
        console.log(`PESSOA ${numero}`);
        console.log(`${'='.repeat(70)}`);
    }
    
    console.log(`Nome: ${pessoa.nome}`);
    console.log(`Pai: ${pessoa.nomePai}`);
    console.log(`Mae: ${pessoa.nomeMae}`);
    console.log(`Data de Nascimento: ${pessoa.dataNascimento}`);
    console.log(`Local de Nascimento: ${pessoa.localNascimento}`);
    console.log(`CPF: ${pessoa.cpf}`);
    console.log(`RG: ${pessoa.rg}`);
    console.log(`Endereco: ${pessoa.endereco}`);
}

// Função para salvar em arquivo
function salvarEmArquivo(pessoas, nomeArquivo = "pessoas_geradas.txt") {
    const fs = require('fs');
    let conteudo = '';
    
    for (let i = 0; i < pessoas.length; i++) {
        const pessoa = pessoas[i];
        conteudo += `${'='.repeat(70)}\n`;
        conteudo += `PESSOA ${i + 1}\n`;
        conteudo += `${'='.repeat(70)}\n`;
        conteudo += `Nome: ${pessoa.nome}\n`;
        conteudo += `Nome do Pai: ${pessoa.nomePai}\n`;
        conteudo += `Nome da Mae: ${pessoa.nomeMae}\n`;
        conteudo += `Data de Nascimento: ${pessoa.dataNascimento}\n`;
        conteudo += `Local de Nascimento: ${pessoa.localNascimento}\n`;
        conteudo += `CPF: ${pessoa.cpf}\n`;
        conteudo += `RG: ${pessoa.rg}\n`;
        conteudo += `Endereco: ${pessoa.endereco}\n\n`;
    }
    
    fs.writeFileSync(nomeArquivo, conteudo, 'utf8');
    console.log(`\nDados salvos no arquivo: ${nomeArquivo}`);
}

// Função para validar número
function validarNumero(input) {
    const num = parseInt(input);
    if (isNaN(num) || num <= 0) {
        return null;
    }
    return num;
}

// Função para exibir o figlet
function exibirFiglet() {
    console.log(`  ____  ____          __   ____                  _
 / ___|/ ___|   ___  / _| |  _ \\ ___  ___  _ __ | | ___
| |  _| |  _   / _ \\| |_  | |_) / _ \\/ _ \\| '_ \\| |/ _ \\
| |_| | |_| | | (_) |  _| |  __/  __/ (_) | |_) | |  __/
 \\____|\\____|  \\___/|_|   |_|   \\___|\\___/| .__/|_|\\___|
                                          |_|
`);
}


function exibirass(){
	console.log(`╭━┳━╭━╭━╮╮
┃┈┈┈┣▅╋▅┫┃
┃┈┃┈╰━╰━━━━━━╮
╰┳╯┈┈┈┈┈┈┈┈┈◢▉◣
╲┃┈┈┈┈┈┈┈┈┈┈▉▉▉
╲┃┈┈┈┈┈┈┈┈┈┈◥▉◤
╲┃┈┈┈┈╭━┳━━━━╯
╲┣━━━━━━┫
`);

}

// Menu principal
async function menuPrincipal() {
    while (true) {
        exibirFiglet();
	exibirass();
        console.log("=".repeat(70));
        console.log("     GERADOR DE PESSOAS FICTICIAS");
        console.log("=".repeat(70));
        console.log(" 1. Gerar 1 pessoa");
        console.log(" 2. Gerar N pessoas (exibir na tela)");
        console.log(" 3. Gerar e salvar em arquivo");
        console.log(" 4. Sair");
        console.log("=".repeat(70));
        
        const opcao = await perguntar("\nEscolha uma opcao (1-4): ");
        
        if (opcao === "1") {
            const pessoa = gerarPessoa();
            exibirPessoa(pessoa);
            console.log("\n" + "-".repeat(70));
            await perguntar("\nPressione Enter para continuar...");
        }
        else if (opcao === "2") {
            const quantidadeInput = await perguntar("Quantas pessoas deseja gerar? ");
            const quantidade = validarNumero(quantidadeInput);
            
            if (!quantidade) {
                console.log("Por favor, digite um numero valido.");
                await perguntar("\nPressione Enter para continuar...");
                continue;
            }
            
            if (quantidade > 100) {
                const confirmacao = await perguntar("Gerando muitas pessoas pode demorar. Continuar? (s/n): ");
                if (confirmacao.toLowerCase() !== 's') {
                    continue;
                }
            }
            
            console.log(`\nGerando ${quantidade} pessoas...\n`);
            const pessoas = gerarListaPessoas(quantidade);
            
            for (let i = 0; i < pessoas.length; i++) {
                exibirPessoa(pessoas[i], i + 1);
            }
            console.log(`\nTotal gerado: ${quantidade} pessoas`);
            await perguntar("\nPressione Enter para continuar...");
        }
        else if (opcao === "3") {
            const quantidadeInput = await perguntar("Quantas pessoas deseja gerar? ");
            const quantidade = validarNumero(quantidadeInput);
            
            if (!quantidade) {
                console.log("Por favor, digite um numero valido.");
                await perguntar("\nPressione Enter para continuar...");
                continue;
            }
            
            console.log(`\nGerando ${quantidade} pessoas...`);
            const pessoas = gerarListaPessoas(quantidade);
            
            // Exibe as primeiras 5 na tela (se for muitas)
            if (quantidade <= 10) {
                for (let i = 0; i < pessoas.length; i++) {
                    exibirPessoa(pessoas[i], i + 1);
                }
            } else {
                console.log(`\nExibindo as primeiras 5 de ${quantidade} pessoas:\n`);
                for (let i = 0; i < 5; i++) {
                    exibirPessoa(pessoas[i], i + 1);
                }
                console.log(`\n... e mais ${quantidade - 5} pessoas. Todas foram salvas no arquivo.`);
            }
            
            // Salva em arquivo
            salvarEmArquivo(pessoas);
            await perguntar("\nPressione Enter para continuar...");
        }
        else if (opcao === "4") {
            console.log("\nSaindo do programa. Ate mais!");
            rl.close();
            break;
        }
        else {
            console.log("Opcao invalida! Tente novamente.");
            await perguntar("\nPressione Enter para continuar...");
        }
    }
}

// Execução principal
menuPrincipal();
