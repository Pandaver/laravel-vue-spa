<template>
    <ValidationObserver ref="form">
        <form @submit.prevent="onSubmit">
            <div class="form-group row">
                <label for="email" class="col-md-2 offset-md-2 col-form-label">邮箱</label>
                <div class="col-md-6">
                    <validation-provider mode="passive" rules="required|email" v-slot="{ errors }">
                        <input v-model="email" type="text" class="form-control" id="email" name="email" placeholder="请输入邮箱">
                        <span class="text-danger font-weight-bold">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-md-2 offset-md-2 col-form-label">密码</label>
                <div class="col-md-6">
                    <validation-provider mode="passive" rules="length:6,18|required" v-slot="{ errors }" vid="password">
                        <input v-model="password" type="password" class="form-control" id="password" name="password" placeholder="请输入密码">
                        <span class="text-danger font-weight-bold">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-md-6 offset-4">
                    <button type="submit" class="btn btn-primary col-4 col-lg-3 col-xl-2 btn-login">
                        登陆
                    </button>
                </div>
            </div>
        </form>
    </ValidationObserver>
</template>

<script>
    import { ValidationProvider,ValidationObserver,extend } from 'vee-validate'
    import * as rules from 'vee-validate/dist/rules'

    extend('email', {
        ...rules['email'],
        message: '· 邮箱格式错误'
    });
    extend('required', {
        ...rules['required'],
        message: '· 不能为空'
    });
    extend('length', {
        validate(value, args) {
            const length = value.length;
            return length >= args.min && length <= args.max;
        },
        params: ['min', 'max'],
        message:'· 长度应在{min}-{max}位之间'
    });

    export default {
        components: {
            ValidationProvider,
            ValidationObserver
        },
        data() {
            return {
                email: '',
                password: '',
            }
        },
        methods: {
            async onSubmit () {
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    this.login();
                });
            },
            login() {
                this.$loading.show();
                let formData = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch('loginRequest',formData).then(response => {
                    this.$loading.hide();
                    if (response) {
                        this.$router.push({name: 'profile'});
                    }
                    $('.btn-login').attr('disabled',false);
                }).catch(error => {
                    //
                    this.$loading.hide()
                });
            }
        }
    }
</script>
