<template>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
        <router-link tag="a" to="/" class="navbar-brand">Laravel Vue SPA</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link tag="a" to="/about" class="nav-link">关于</router-link>
                </li>
            </ul>
            <ul v-if="!user.authenticated" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link tag="a" to="/login" class="nav-link">登陆</router-link>
                </li>
                <li class="nav-item">
                    <router-link tag="a" to="/register" class="nav-link">注册</router-link>
                </li>
            </ul>
            <ul v-if="user.authenticated" class="navbar-nav">
                <li class="nav-item dropdown">
                    <a @click.prevent class="nav-link dropdown-toggle" data-toggle="dropdown">个人中心</a>
                    <div class="dropdown-menu">
                        <router-link tag="a" :to="{name: 'profile'}" class="dropdown-item" active-class="active" exact>个人信息</router-link>
                        <router-link tag="a" :to="{name: 'profile.editProfile'}" class="dropdown-item" active-class="active" exact>修改资料</router-link>
                        <router-link tag="a" :to="{name: 'profile.editPassword'}" class="dropdown-item" active-class="active" exact>修改密码</router-link>
                    </div>
                </li>
            </ul>
            <ul v-if="user.authenticated" class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a @click.prevent="logout" href="#" class="nav-link">退出</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        mounted(){
            $('.nav-link:not(.dropdown-toggle), .dropdown-item').click(function(){
                $('.navbar-toggler').click();
            });
            $('.navbar-brand').click(function () {
                if ($('#collapsibleNavbar').is('.show')) {
                    $('.navbar-toggler').click();
                }
            });
        },
        computed: {
            ...mapState({
                user: state => state.AuthUser
            })
        },
        methods: {
            logout() {
                this.$store.dispatch('logoutRequest').then(response => {
                    this.$router.push({name: 'index'});
                });
            }
        }
    }
</script>
