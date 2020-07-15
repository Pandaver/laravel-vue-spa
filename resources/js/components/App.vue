<template>
    <div>
        <top-menu></top-menu>
        <notification></notification>
        <br>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import TopMenu from "./common/TopMenu";
    import Notification from "./common/Notification";

    export default {
        components: {
            TopMenu,
            Notification
        }
    }
</script>
