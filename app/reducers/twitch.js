import { SET_TWITCH }                  from '../actions/twitch';

export function twitch (state = {}, action) {
  switch (action.type) {
    case SET_TWITCH:
      return {
        ...state,
        ...action.twitch,
      };
    default:
      return state;
  }
}
