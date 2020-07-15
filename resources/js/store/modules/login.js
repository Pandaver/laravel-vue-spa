/*
发送登陆请求
设置jwtToken
调用setAuthUser方法设置vuex用户信息
 */

import jwtToken from "../../helpers/jwt";

export default {
    actions: {
        loginRequest({dispatch}, formData) {
            return axios.post('/api/login',formData).then(response => {
                dispatch('loginSuccess', response.data);
                dispatch('hideNotification');
                return true;
            }).catch(error => {
                if (error.response.status === 401) {
                    dispatch('showNotification', {
                        level: 'danger',
                        msg: '密码有误！'
                    });
                } else if (error.response.status === 402) {
                    dispatch('showNotification', {
                        level: 'warning',
                        msg: '邮箱尚未激活，请检查您的邮件。'
                    });
                }
                return false;
            });
        },
        loginSuccess({dispatch}, tokenResponse) {
            jwtToken.setToken(tokenResponse.token);
            dispatch('setAuthUser');
        },
        logoutRequest({dispatch}) {
            return axios.delete('/api/logout').then(response => {
                jwtToken.cleaner();
                dispatch('unsetAuthUser');
            });
        }
    }
}
