type StateType = {
  tags: string[]
}

export const state = () => ({
  tags: []
});

export const getters = {
  getTags: (state: StateType) => {
    return [
      { id: 0, title: '首页' },
      ...state.tags
    ];
  }
};

export const mutations = {
  saveTags(state: StateType, tags: string[]) {
    state.tags = tags;
  }
};