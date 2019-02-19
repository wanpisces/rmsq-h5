<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
            <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
        </router-view>

    </div>

</template>
<script>
export default {};
</script>
<style scoped></style>