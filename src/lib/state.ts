// State machine for view switching
// States: terminal | about | projects | system_design | skills | assistant | profile

export type ViewState =
  | 'terminal'
  | 'about'
  | 'projects'
  | 'system_design'
  | 'skills'
  | 'assistant'
  | 'profile';

export type TransitionAction =
  | { type: 'NAVIGATE'; to: ViewState }
  | { type: 'BACK' }
  | { type: 'RESET' };

export interface AppState {
  currentView: ViewState;
  previousView: ViewState | null;
  history: ViewState[];
}

export const initialState: AppState = {
  currentView: 'terminal',
  previousView: null,
  history: ['terminal'],
};

export function stateReducer(state: AppState, action: TransitionAction): AppState {
  switch (action.type) {
    case 'NAVIGATE': {
      if (action.to === state.currentView) return state;
      return {
        currentView: action.to,
        previousView: state.currentView,
        history: [...state.history, action.to],
      };
    }
    case 'BACK': {
      const prev = state.previousView ?? 'terminal';
      return {
        currentView: prev,
        previousView: state.history.length > 2
          ? state.history[state.history.length - 3] ?? null
          : null,
        history: [...state.history, prev],
      };
    }
    case 'RESET': {
      return initialState;
    }
    default:
      return state;
  }
}

// Map commands to view states
export const commandToView: Record<string, ViewState> = {
  'whoami': 'profile',
  'about': 'about',
  'cd projects': 'projects',
  'projects': 'projects',
  'open system-design': 'system_design',
  'system-design': 'system_design',
  'skills': 'skills',
  'assistant': 'assistant',
  'chat': 'assistant',
  'view --profile': 'profile',
  'home': 'terminal',
};
