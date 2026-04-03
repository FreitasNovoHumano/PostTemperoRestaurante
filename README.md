// ========================= README =========================
// Título: Jogo de Adivinhação 🎯
//
// 💡 Descrição
// Este projeto é um jogo simples de adivinhação de números desenvolvido inicialmente em JavaScript puro
// e posteriormente refatorado para React seguindo boas práticas de mercado.
//
// 🚀 Objetivo
// Demonstrar domínio de:
// - Lógica de programação
// - Manipulação de estado no React
// - Componentização
// - Código limpo e documentado
//
// 🧠 Como funciona
// O sistema gera um número aleatório dentro de um intervalo definido pelo usuário.
// O jogador tenta adivinhar o número e recebe dicas (maior ou menor).
//
// 🛠️ Tecnologias utilizadas
// - React
// - JavaScript (ES6+)
// - CSS
//
// 📦 Como rodar o projeto
// 1. Clone o repositório
// 2. Instale as dependências:
//    npm install
// 3. Rode o projeto:
//    npm start
//
// 🎯 Diferenciais
// - Código modularizado
// - Totalmente comentado
// - Estrutura profissional
//
// 📈 Possíveis melhorias
// - Persistência de ranking
// - Tema escuro
// - Níveis de dificuldade


// ========================= REACT APP =========================

import React, { useState } from "react"; // Importa React e hook de estado

// Componente principal do jogo
export default function App() {

  // Estado que guarda o número mínimo
  const [min, setMin] = useState(1);

  // Estado que guarda o número máximo
  const [max, setMax] = useState(100);

  // Estado que guarda o número secreto
  const [secretNumber, setSecretNumber] = useState(null);

  // Estado que guarda o palpite do usuário
  const [guess, setGuess] = useState("");

  // Estado que guarda a mensagem de feedback
  const [message, setMessage] = useState("Escolha o intervalo e comece!");

  // Estado que indica se o jogo começou
  const [gameStarted, setGameStarted] = useState(false);

  // Função para iniciar o jogo
  const startGame = () => {
    // Gera número aleatório dentro do intervalo
    const random = Math.floor(Math.random() * (max - min + 1)) + Number(min);

    // Atualiza o número secreto
    setSecretNumber(random);

    // Define que o jogo começou
    setGameStarted(true);

    // Atualiza mensagem
    setMessage("Jogo iniciado! Faça seu palpite.");
  };

  // Função que verifica o palpite
  const checkGuess = () => {
    const numericGuess = Number(guess); // Converte o palpite para número

    // Validação de entrada
    if (!numericGuess) {
      setMessage("Digite um número válido!");
      return;
    }

    // Se acertou
    if (numericGuess === secretNumber) {
      setMessage("🎉 Parabéns! Você acertou!");
    }
    // Se for menor
    else if (numericGuess < secretNumber) {
      setMessage("🔼 Tente um número maior!");
    }
    // Se for maior
    else {
      setMessage("🔽 Tente um número menor!");
    }

    // Limpa input
    setGuess("");
  };

  // Função para reiniciar o jogo
  const resetGame = () => {
    setGameStarted(false); // Para o jogo
    setSecretNumber(null); // Limpa número secreto
    setMessage("Jogo resetado! Escolha o intervalo."); // Atualiza mensagem
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>

      {/* Título do jogo */}
      <h1>Jogo de Adivinhação 🎯</h1>

      {/* Se o jogo ainda não começou */}
      {!gameStarted && (
        <div>
          {/* Input do valor mínimo */}
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            placeholder="Mínimo"
          />

          {/* Input do valor máximo */}
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            placeholder="Máximo"
          />

          {/* Botão para iniciar */}
          <button onClick={startGame}>Iniciar</button>
        </div>
      )}

      {/* Se o jogo começou */}
      {gameStarted && (
        <div>
          {/* Input do palpite */}
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Seu palpite"
          />

          {/* Botão de verificar */}
          <button onClick={checkGuess}>Verificar</button>

          {/* Botão de reset */}
          <button onClick={resetGame}>Resetar</button>
        </div>
      )}

      {/* Mensagem de feedback */}
      <p>{message}</p>
    </div>
  );
}
