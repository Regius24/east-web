const SET_ALLOW = (state, payload) => (state.allow = payload)
const SET_USER = (state, payload) => (state.user = payload)
const SET_USERPROFILE = (state, payload) => (state.userProfile = payload)
const SET_OPENDRAWER = (state, payload) => (state.openDrawer = payload)

export {
  SET_ALLOW,
  SET_USER,
  SET_USERPROFILE,
  SET_OPENDRAWER
}
