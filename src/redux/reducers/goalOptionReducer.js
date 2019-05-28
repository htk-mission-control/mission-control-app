let options = {
    optionCount: 0,
    optionList: []
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
                goal_id: action.payload,
                option_name: '',
                option_points: '',
            }];
            return state = options;

        case 'ADD_STARTER_OPTIONS':
            options.optionCount += 2;
            options.optionList.push(
                {
                    optionNum: options.optionCount -1,
                    goal_id: action.payload,
                    option_name: '',
                    option_points: '',
                },
                {
                    optionNum: options.optionCount,
                    goal_id: action.payload,
                    option_name: '',
                    option_points: '',
                }
            );
            return state = options;

        case 'REMOVE_OPTION':
            options.optionList = action.payload;
            return options;

        case 'REFRESH_OPTIONS':
            return options = {
                optionCount: 0,
                optionList: []
            };

        default:
            return state;
    }
}

export default goalOptionReducer;