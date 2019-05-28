let options = {
    optionCount: 0,
    optionList: []
}

const goalOptionReducer = (state = options, action) => {
    switch (action.type) {
        case 'SET_GOAL_OPTIONS':
            options.optionList = action.payload;
            if(options.optionCount === 0){
                options.optionCount = options.optionList.length;
            }
            return options;
    
        case 'ADD_OPTION':
            options.optionCount += 1;
            options.optionList = [...options.optionList, {
                id: action.payload.option_id || options.optionCount,
                goal_id: action.payload.goal_id,
                option_name: '',
                option_points: '',
            }];
            return state = options;

        case 'ADD_STARTER_OPTIONS':
            options.optionCount += 2;
            options.optionList.push(
                {
                    id: options.optionCount -1,
                    goal_id: action.payload,
                    option_name: '',
                    option_points: '',
                },
                {
                    id: options.optionCount,
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