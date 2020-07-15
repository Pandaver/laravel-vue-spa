import VueRouter from 'vue-router'
import store from './store/index'
import jwtToken from './helpers/jwt'

let routes = [
    {
        path: '/',
        name: 'index',
        component: require('./components/pages/Home').default,
        meta: {}
    },
    {
        path: '/about',
        component: require('./components/pages/About').default,
        meta: {}
    },
    {
        path: '/register',
        name: 'register',
        component: require('./components/register/Register').default,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/confirm',
        name: 'confirm',
        component: require('./components/confirm/Email').default,
        meta: {}
    },
    {
        path: '/login',
        name: 'login',
        component: require('./components/login/Login').default,
        meta: {
            requiresGuest: true
        }
    },
    {
        path: '/profile',
        component: require('./components/user/Profile').default,
        children: [
            {
                path: '',
                name: 'profile',
                component: require('./components/user/ProfileInfo').default,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/edit-profile',
                name: 'profile.editProfile',
                component: require('./components/user/EditProfile').default,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/edit-password',
                name: 'profile.editPassword',
                component: require('./components/password/EditPassword').default,
                meta: {
                    requiresAuth: true
                }
            }
        ],
        meta: {
            requiresAuth: true
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to,from,next) => {
    if (to.meta.requiresAuth) {
        if (store.state.AuthUser.authenticated || jwtToken.getToken()) {
            return next();
        } else {
            return next({'name': 'login'})
        }
    }
    if (to.meta.requiresGuest) {
        if (store.state.AuthUser.authenticated || jwtToken.getToken()) {
            return next({'name': 'index'});
        } else {
            return next();
        }
    }
    return next();
});

export default router
