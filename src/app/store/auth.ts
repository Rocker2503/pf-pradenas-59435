import { ActionReducerMap } from "@ngrx/store";
import { authFeatureName, AuthReducer, AuthState } from './auth.reducer';

interface RootState{
    [authFeatureName]: AuthState;
}

const RootReducer: ActionReducerMap<RootState> = {
    [authFeatureName]: AuthReducer,
};

export { RootReducer };
