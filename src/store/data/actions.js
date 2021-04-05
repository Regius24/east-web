const SET_ALLOW = ({ commit }, PAYLOAD) => commit('SET_ALLOW', PAYLOAD)
const SET_USER = ({ commit }, PAYLOAD) => commit('SET_USER', PAYLOAD)
const SET_USERPROFILE = ({ commit }, PAYLOAD) => commit('SET_USERPROFILE', PAYLOAD)
const SET_OPENDRAWER = ({ commit }, PAYLOAD) => commit('SET_OPENDRAWER', PAYLOAD)
const SET_MINIDRAWER = ({ commit }, PAYLOAD) => commit('SET_MINIDRAWER', PAYLOAD)

export {
  SET_ALLOW,
  SET_USER,
  SET_USERPROFILE,
  SET_OPENDRAWER,
  SET_MINIDRAWER
}
