const options = {
    optionCount: 2,
    optionList: [
        {
            optionNum: 1,
            name: '',
            points: '',
        },
        {
            optionNum: 2,
            name: '',
            points: '',
        }
    ]
}

const goalOptionReducer = (state = options, action) => {
    switch (action.type) {
        case 'SET_GOAL_OPTIONS':
            options.optionList = action.payload;
            return options;
    
        case 'ADD_OPTION':
            options.optionCount += 1;
            options.optionList = [...options.optionList, {
                optionNum: options.optionCount,
                name: '',
                points: '',
            }]
            return options;

        case 'REMOVE_OPTION':
            options.optionList = action.payload;
            return options;

        default:
            return state;
    }
}

export default goalOptionReducer;