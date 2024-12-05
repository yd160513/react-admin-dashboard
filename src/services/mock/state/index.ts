interface UserState {
  id: string;
  username: string;
  role: 'admin' | 'user';
  token: string;
  email?: string;
}

class MockStateManager {
  private static instance: MockStateManager;
  private userState: UserState | null = null;

  private constructor() {}

  static getInstance() {
    if (!MockStateManager.instance) {
      MockStateManager.instance = new MockStateManager();
    }
    return MockStateManager.instance;
  }

  setUserState(state: UserState) {
    console.log('state', state);
    this.userState = state;
  }

  getUserState() {
    return this.userState;
  }

  clearUserState() {
    this.userState = null;
  }
}

export const mockState = MockStateManager.getInstance(); 