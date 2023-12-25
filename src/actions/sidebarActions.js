// actions/sidebarActions.js
export const setLearnProgress = (value) => {
    return {
        type: 'SET_LEARN_PROGRESS',
        payload: value,
    };
};

export const setScrapeProgress = (value) => {
    return {
        type: 'SET_SCRAPE_PROGRESS',
        payload: value,
    };
};
