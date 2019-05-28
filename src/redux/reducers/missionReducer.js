
const mission = {
    name: '',
    description: '',
    goals: []
}


const missionDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_MISSION_DETAILS':
            mission.name = action.payload[0].name;
            mission.description = action.payload[0].description;
            mission.goals = action.payload;
            mission.goalCount = mission.goals.length;

            return state = mission;

        case 'UPDATE_GOALS':
            mission.goals = action.payload;
            return state = mission;

        case 'ADD_GOAL':
            mission.goalCount += 1;
            mission.goals.push({
                    goal_id: mission.goalCount,
                    type: '',
                }
            );
            return mission;
    
        default:
            return state;
    }
}

export default missionDetails;