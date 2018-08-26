const teamModel = {
  QB: null,
  RB1: null,
  RB2: null,
  WR1: null,
  WR2: null,
  TE: null,
  FLEX: null,
  DST: null,
  K: null,
  BE1: null,
  BE2: null,
  BE3: null,
  BE4: null,
  BE5: null,
  BE6: null,
  BE7: null
}

const teamReducer = (state = teamModel, action) => {
  switch (action.type) {
    case 'ADD_PLAYER_TO_TEAM':
      const { player } = action;
      const benchArray = ['BE1', 'BE2', 'BE3', 'BE4', 'BE5', 'BE6', 'BE7'];
      const newState = {...state};
      switch (player.position) {
        case 'QB':
          if (!newState.QB) {
              newState.QB = player.name;
            } else {
              for (let i = 0; i < benchArray.length; i++) {
                if (!newState[benchArray[i]]) {
                  newState[benchArray[i]] = player.name;
                  i = benchArray.length;
                }
              }; 
            }
            break;
        case 'RB':
          if (!newState.RB1) {
              newState.RB1 = player.name;
            } else if (!newState.RB2) {
              newState.RB2 = player.name;
            } else if (!newState.FLEX) {
              newState.FLEX = player.name;
            } else {
              for (let i = 0; i < benchArray.length; i++) {
                if (!newState[benchArray[i]]) {
                  newState[benchArray[i]] = player.name;
                  i = benchArray.length;
                }
              }; 
            }
            break;
        case 'WR':
          if (!newState.WR1) {
              newState.WR1 = player.name;
            } else if (!newState.WR2) {
              newState.WR2 = player.name;
            } else if (!newState.FLEX) {
              newState.FLEX = player.name;
            } else {
              for (let i = 0; i < benchArray.length; i++) {
                if (!newState[benchArray[i]]) {
                  newState[benchArray[i]] = player.name;
                  i = benchArray.length;
                }
              }; 
            }
            break;
        case 'TE':
          if (!newState.TE) {
              newState.TE = player.name;
            } else if (!newState.FLEX) {
              newState.FLEX = player.name;
            } else {
              for (let i = 0; i < benchArray.length; i++) {
                if (!newState[benchArray[i]]) {
                  newState[benchArray[i]] = player.name;
                  i = benchArray.length;
                }
              }; 
            }
            break;
        case 'DST':
          if (!newState.DST) {
              newState.DST = player.name;
            } else {
              for (let i = 0; i < benchArray.length; i++) {
                if (!newState[benchArray[i]]) {
                  newState[benchArray[i]] = player.name;
                  i = benchArray.length;
                }
              }; 
            }
            break;
        case 'K':
          if (!newState.K) {
            newState.K = player.name;
          } else {
            for (let i = 0; i < benchArray.length; i++) {
              if (!newState[benchArray[i]]) {
                newState[benchArray[i]] = player.name;
                i = benchArray.length;
              }
            }; 
          }
          break;
        default:
          break;
      }
      return newState;
    default:
      return state;
  }
};

export default teamReducer;