export const getLoggedUser = state => state.userState.loggedIn
export const getIsAdmin = state => state.userState.loggedIn && state.userState.loggedIn.isAdmin
export const getLastSavedUserName = state => state.userState.lastUserSaved