const players = [
  "Alexis Mac Allister",
  "Angel Correa",
  "Emiliano Martinez",
  "Nicolas Tagliafico",
  "Gonzalo Montiel",
  "Lionel Messi",
  "Paulo Dybala",
  "Angel Di Maria",
  "Cristian Romero",
  "Franco Armani"
];

const scores = [9, 8, 7, 6, 9, 10, 8, 7, 8, 9];

// Filtro los puntajes sobresalientes (mayores a 7) del array de puntajes
function filterOutstandingScores(scores) {
  const outstandingScores = scores.filter(score => score > 7);
  return outstandingScores;
}

// Obtiene los jugadores correspondientes a los puntajes sobresalientes
function getOutstandingPlayers(players, scores) {
  const outstandingPlayers = [];

  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];

    if (score > 7) {
      outstandingPlayers.push(players[i]);
    }
  }
  return outstandingPlayers;
}

// Obtiene los jugadores correspondientes a los puntajes regulares (igual o menor a 7)
function getRegularPlayers(players, scores) {
  const regularPlayers = [];

  for (let i = 0; i < scores.length; i++) {
    const score = scores[i];

    if (score <= 7) {
      regularPlayers.push(players[i]);
    }
  }

  return regularPlayers;
}

// Evalúa el rendimiento de los jugadores y muestra los resultados
function evalPerformance(scores, players) {
  const outstandingScores = filterOutstandingScores(scores); // Obtiene los puntajes sobresalientes
  const outstandingPlayers = getOutstandingPlayers(players, scores); // Obtiene los jugadores sobresalientes
  const regularPlayers = getRegularPlayers(players, scores); // Obtiene los jugadores regulares

  // Crea un nuevo array con los jugadores sobresalientes y sus puntajes
  const greatPlayers = outstandingPlayers.map((player, index) => ({
    name: player,
    score: outstandingScores[index]
  }));

  // Crea un nuevo array con los jugadores regulares y sus puntajes
  const goodPlayers = regularPlayers.map((player, index) => ({
    name: player,
    score: scores[players.indexOf(player)]
  }));

  console.log("Puntuaciones mayores a 7:", outstandingScores);
  console.log("Jugadores con puntaje mayor a 7:", outstandingPlayers);
  console.log("Jugadores con puntaje igual o menor a 7:", regularPlayers);
  console.log("Jugadores sobresalientes y su puntuación:", greatPlayers);
  console.log("Jugadores regulares y su puntuación:", goodPlayers);
}

evalPerformance(scores, players);