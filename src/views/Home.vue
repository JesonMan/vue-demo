<template>
  	<div class="home">
  		<img alt="Vue logo" src="@/static/images/logo.png">
    	<HelloWorld msg="Welcome to Home"/>
  	</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  	name: 'home',
  	components: {
    	HelloWorld,
  	},
};
</script>
