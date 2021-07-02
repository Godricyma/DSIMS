<template>
    <div class="ma-left-menu">
        <div class="ma-logol">
            <router-link to="/home">DSIMS</router-link>
        </div>
        <div class="ma-first-menu">
            <router-link to="/home">首页</router-link>
            <router-link to="/patchimport">PatchImport</router-link>
            <router-link to="/signapk">SignAPK</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'leftmenu'
    }
</script>

<style>
.ma-left-menu {
    background-color: rgb(40, 44, 52);
    width: 100%;
    height: 100%;
}

.ma-left-menu a {
    display: block;
    text-decoration: none;
    height: 55px;
    line-height: 55px;
    color: rgb(255, 255, 255);
    padding-left: 30px;
}

.ma-left-menu a:hover {
    color: rgb(255, 255, 255);
}

.ma-logol {
    /* background-color: rgb(40, 44, 52); */
    width: 250px;
    height: 55px;
}

.ma-first-menu a:hover {
    background-color: rgb(24, 144, 255);
}
</style>