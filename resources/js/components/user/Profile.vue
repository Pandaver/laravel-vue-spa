<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'profile'
    }
</script>
