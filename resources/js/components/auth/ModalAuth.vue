<template>
	<div class="modal fade" 
		id="modal-auth"
		tabindex="-1" 
		role="dialog" 
		aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      
	       <auth-component
                    :url-login           = "urlLogin"
                    :url-register        = "urlRegister"
                    :url-google          = "urlGoogle"
                    :url-pass-forgot     = "urlPassForgot"
                    :old-email           = "oldEmail"
                    :old-name            = "oldName"
                    :csrf-input          = "csrfInput"
                    :bool-modal          = "'true'"
            >
            </auth-component>
	    </div>
	  </div>
	</div>

</template>

<script>

    export default {
        props: ['urlLogin', 'urlRegister', 'urlGoogle', 'urlPassForgot', 'oldEmail', 'oldName', 'csrfInput'],
        mounted(){
        	console.log('modal auth')
        }
    }
    
</script>