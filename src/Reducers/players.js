const playerReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PLAYERS':
      return [...state, ...action.players];
    case 'DELETE_PLAYER':
      return state.filter(player => player.rank !== action.id);
    default:
      return state;
  }
};

export default playerReducer;