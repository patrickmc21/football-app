const picked = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PICK':
    console.log(action.player)
      return [...state, action.player];
    default:
      return state;
  }
}

export default picked;