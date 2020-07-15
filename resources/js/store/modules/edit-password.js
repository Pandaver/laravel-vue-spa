export default {
    actions: {
        updatePasswordRequest({dispatch}, formData) {
            return axios.post('/api/user/password/update', formData).then(response => {
                dispatch('showNotification', {
                    level: 'success',
                    msg: '更新密码成功！'
                });
            }).catch(error => {
                if (error.response.status === 402) {
                    dispatch('showNotification', {
                        level: 'danger',
                        msg: '原密码有误！'
                    });
                }
            });
        }
    }
}
