// reducers/sidebarReducer.js
const initialState = {
    counter: 0,
    learnProgress: -1,
};

const sidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT_COUNTER':
            return {
                ...state,
                counter: state.counter + 1,
            };
        case 'SET_LEARN_PROGRESS':
            return {
                ...state,
                learnProgress: action.payload,
            };
        default:
            return state;
    }
};

export default sidebarReducer;
