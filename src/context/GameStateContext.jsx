import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  day: 1,
  time: 540, // 9:00 AM (minutes since midnight)
  funds: 100000,
  stress: 20, // 0 to 100
  reputation: 80, // 0 to 100
  tasksCompleted: 0,
  currentTasks: [],
  deviceLayout: null, // 'PC' or 'Phone'
};

const GameStateContext = createContext();

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_LAYOUT':
      return { ...state, deviceLayout: action.payload };
    case 'ADVANCE_TIME':
      return { ...state, time: state.time + action.payload };
    case 'UPDATE_FUNDS':
      return { ...state, funds: state.funds + action.payload };
    case 'UPDATE_STRESS':
      return { ...state, stress: Math.max(0, Math.min(100, state.stress + action.payload)) };
    case 'UPDATE_REPUTATION':
      return { ...state, reputation: Math.max(0, Math.min(100, state.reputation + action.payload)) };
    case 'COMPLETE_TASK':
      return { ...state, tasksCompleted: state.tasksCompleted + 1 };
    case 'ADD_TASK':
      return { ...state, currentTasks: [...state.currentTasks, action.payload] };
    case 'REMOVE_TASK':
      return { ...state, currentTasks: state.currentTasks.filter(t => t.id !== action.payload) };
    case 'NEXT_DAY':
      return { ...state, day: state.day + 1, time: 540, currentTasks: [] };
    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
