/*
通过请求/api/user获取到的用户信息修改vuex中的用户信息
后台api认证方式：headers中的Authorization
 */

import * as types from '../mutation-type'

export default {
    state: {
        authenticated: false,
        name: null,
        email: null
    },
    /*
    通过请求/api/user获取用户信息
     */
    actions: {
        setAuthUser({commit, dispatch}) {
            return axios.get('/api/user').then(response => {
                commit({
                    type: types.SET_AUTH_USER,
                    user: response.data
                })
            }).catch(function(error){
                // Token过期，刷新Token
                if (error.response.status === 401) {
                    dispatch('refreshToken')
                }
            });
        },
        unsetAuthUser({commit}) {
            commit({
                type: types.UNSET_AUTH_USER,
            })
        },
        // 刷新Token
        refreshToken({commit, dispatch}) {
            // 通过cookie里的refreshToken获取新的Token
            // 获取成功则调用loginSuccess设置jwtToken和vuex
            // 获取失败则退出登陆
            return axios.post('/api/token/refresh').then(response => {
                dispatch('loginSuccess', response.data)
            }).catch(error => {
                dispatch('logoutRequest');
            });
        },
    },
    /*
    通过setAuthUser方法获取到的用户信息修改state中的变量值
     */
    mutations: {
        [types.SET_AUTH_USER](state, payload) {
            state.authenticated = true;
            state.name = payload.user.name;
            state.email = payload.user.email;
        },
        [types.UNSET_AUTH_USER](state) {
            state.authenticated = false;
            state.name = null;
            state.email = null;
        },
        [types.UPDATE_PROFILE_NAME](state, payload) {
            state.name = payload.value
        },
        [types.UPDATE_PROFILE_EMAIL](state, payload) {
            state.email = payload.value
        },
    }
}
