<template>
	
	<button 
        type="button" 
        v-bind:class="'btn ' + buttonType " 
        data-toggle="modal" 
        v-on:click="setBoolLoginTrue" 
        data-target="#modal-auth"
    >
        Login
    </button>
</template>

<script>
    export default {
        props: ['buttonType'],
        methods: {
			setBoolLoginTrue: function(){
                this.$root.$refs.AuthComp.showLogin();
			}
        }
    }
    
</script>