<template>
    <ValidationObserver ref="form">
        <form @submit.prevent="onSubmit">
            <div class="form-group row">
                <label for="oldPassword" class="col-md-2 offset-md-2 col-form-label">原密码</label>
                <div class="col-md-6">
                    <validation-provider mode="lazy" rules="length:6,18|required" v-slot="{ errors }" vid="oldPassword">
                        <input v-model="oldPassword" type="password" class="form-control" id="oldPassword" name="oldPassword" placeholder="请输入密码">
                        <span class="text-danger font-weight-bold">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
            </div>
            <div class="form-group row">
                <label for="newPassword" class="col-md-2 offset-md-2 col-form-label">新密码</label>
                <div class="col-md-6">
                    <validation-provider mode="lazy" rules="length:6,18|required" v-slot="{ errors }" vid="newPassword">
                        <input v-model="newPassword" type="password" class="form-control" id="newPassword" name="newPassword" placeholder="请输入密码">
                        <span class="text-danger font-weight-bold">{{ errors[0] }}</span>
                    </validation-provider>
                </div>
            </div>
            <div class="form-group row">
                <label for="password-confirm" class="col-md-2 offset-md-2 col-form-label text-nowrap">确认密码</label>
                <div class="col-md-6">
                    <validation-provider mode="lazy" rules="confirmed:newPassword" v-slot="{ errors }">
                        <input v-model="passwordConfirm" type="password" class="form-control" id="password-confirm" name="password-confirm" placeholder="请再次输入密码">
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

    extend('required', {
        ...rules['required'],
        message: '· 此为必填项'
    });
    extend('length', {
        validate(value, args) {
            const length = value.length;
            return length >= args.min && length <= args.max;
        },
        params: ['min', 'max'],
        message:'· 长度必须在{min}-{max}位之间'
    });
    extend('confirmed', {
        ...rules['confirmed'],
        message: '· 两次输入不一致'
    });

    export default {
        components: {
            ValidationProvider,
            ValidationObserver
        },
        data() {
            return {
                oldPassword: '',
                newPassword: '',
                passwordConfirm: ''
            }
        },
        methods: {
            async onSubmit () {
                this.$refs.form.validate().then(success => {
                    if (!success) {
                        return;
                    }
                    this.editPassword();
                });
            },
            editPassword() {
                let formData = {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                };
                this.$store.dispatch('updatePasswordRequest', formData).then(response => {
                    //
                }).catch(error => {
                    //
                })
            }
        }
    }
</script>
