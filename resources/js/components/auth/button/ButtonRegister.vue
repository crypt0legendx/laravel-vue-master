<template>
    <button 
        type="button" 
        v-bind:class="'btn ' + buttonType " 
        data-toggle="modal" 
        v-on:click="setBoolLoginFalse" 
        data-target="#modal-auth"
    >
        Registrarse
    </button>
</template>

<script>
    export default {
        props: ['buttonType'],
        methods: {
			setBoolLoginFalse: function(){
                this.$root.$refs.AuthComp.showRegister();
			}
        }
    }
    
</script>