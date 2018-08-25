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
    default:
      return state;
  }
};

export default teamReducer;