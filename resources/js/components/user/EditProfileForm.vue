<template>
    <ValidationObserver ref="form">
        <form @submit.prevent="onSubmit">
            <div class="form-group row">
                <label for="name" class="col-md-2 offset-md-2 col-form-label">姓名</label>
                <div class="col-md-6">
                    <validation-provider mode="lazy" rules="required" v-slot="{ errors }">
                        <input v-model="name" type="text" class="form-control" id="name" name="name" placeholder="请输入姓名">
                        <span class="text-danger font-weight-bold">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
            </div>
            <div class="form-group row">
                <label for="email" class="col-md-2 offset-md-2 col-form-label">邮箱</label>
                <div class="col-md-6">
                    <validation-provider mode="lazy" rules="required|email" v-slot="{ errors }">
                        <input v-model="email" type="text" class="form-control" id="email" name="email" placeholder="请输入邮箱">
                        <span class="text-danger font-weight-bold">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-md-6 offset-4">
                    <button type="submit" class="btn btn-primary col-4 col-lg-3 col-xl-2">
                        修改
                    </button>
                </div>
            </div>
        </form>
    </ValidationObserver>
</template>

<script>
    import { ValidationProvider,ValidationObserver,extend } from 'vee-validate'
    import * as rules from 'vee-validate/dist/rules'
    import * as types from '../../store/mutation-type'

    extend('email', {
        ...rules['email'],
        message: '· 邮箱格式错误'
    });
    extend('required', {
        ...rules['required'],
        message: '· 此为必填项'
    });

    export default {
        components: {
            ValidationProvider,
            ValidationObserver
        },
        created () {
            this.$store.dispatch('setAuthUser');
        },
        computed: {
            name: {
                get() {
                    return this.$store.state.AuthUser.name;
                },
                set(value) {
                    this.$store.commit({
                        type: types.UPDATE_PROFILE_NAME,
                        value: value
                    })
                }
            },
            email: {
                get() {
                    return this.$store.state.AuthUser.email;
                },
                set(value) {
                    this.$store.commit({
                        type: types.UPDATE_PROFILE_EMAIL,
                        value: value
                    })
                }
            }
        },
        methods: {
            async onSubmit () {
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    const formData = {
                        name: this.name,
                        email: this.email
                    };
                    this.$store.dispatch('updateProfileRequest', formData).then(response => {
                        this.$router.push({ name: 'profile' })
                    }).catch(error => {

                    })
                });
            }
        }
    }
</script>
