<template>
    <div class="hello">
        <h1>
            <span class="msg">{{ msg }}</span>
        </h1>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
    .msg {
        color: red;
    }
}
</style>
