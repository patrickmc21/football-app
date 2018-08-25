export const addPlayers = (players) => ({
  type: 'ADD_PLAYERS',
  players
});

export const deletePlayer = (id) => ({
  type: 'DELETE_PLAYER',
  id
});