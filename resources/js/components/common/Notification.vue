<template>
    <div class="notification" style="height:49px">
        <transition name="notification-fade">
            <div class="alert" :class="notificationLevel" v-if="msg"  @click="hideNotification()">
                {{ msg }}
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'notification',
        computed: {
            ...mapState({
                level: state => state.Notification.level,
                msg: state => state.Notification.msg
            }),
            notificationLevel() {
                return 'alert-' + this.level;
            }
        },
        methods: {
            ...mapActions([
                'hideNotification'
            ])
        }
    }
</script>
