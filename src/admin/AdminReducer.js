import UserReducer from './user/UserReducer';

export default function admin(state = {}, action) {
  return {
    user: UserReducer.user(state.user, action),
  };
}
