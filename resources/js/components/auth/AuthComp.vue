<template>    
    <div class="card">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    
                    <a 
                        style="cursor: pointer;" 
                        :class="boolLogin == 'true' ? 'nav-item nav-link active' :'nav-item nav-link'" 
                        id="nav-profile-tab" 
                        data-toggle="tab" 
                        v-on:click="showLogin">
                            Iniciar Sesion
                    </a>

                    <a 
                        style="cursor: pointer;" 
                        :class="boolLogin == 'false' ? 'nav-item nav-link active' :'nav-item nav-link'" 
                        id="nav-profile-tab" 
                        data-toggle="tab" 
                        v-on:click="showRegister">
                            Registrarse
                    </a>

                    <button 
                        v-if="boolModal != undefined && boolModal == 'true'"    
                        style="position: absolute;right: 0px; margin-right: 2px" 
                        type="button" 
                        class="close" 
                        data-dismiss="modal" 
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                        </svg>
                    </button>
                </div>
            </nav>

            <div class="card-body">
                <login-component
                    v-if                       = "boolLogin == 'true'"
                    v-bind:url-login           = "urlLogin"
                    v-bind:url-google          = "urlGoogle"
                    v-bind:url-pass-forgot     = "urlPassForgot"
                    v-bind:old-email           = "oldEmail"
                    v-bind:csrf-input          = "csrfInput"                 

                ></login-component>

                <register-component
                    v-if                       = "boolLogin == 'false'"
                    v-bind:url-register        = "urlRegister"
                    v-bind:url-pass-forgot     = "urlPassForgot"
                    v-bind:old-email           = "oldEmail"
                    v-bind:old-name            = "oldName"
                    v-bind:csrf-input          = "csrfInput"                 
                    
                ></register-component>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ['urlLogin', 'urlRegister', 'urlGoogle', 'urlPassForgot', 'oldEmail', 'oldName', 'csrfInput','boolLogin', 'boolModal'],
        //crea la referencia para despues acceder al showLogin o register asi se pueden separar los botones y que funcionen ok 
        created(){
            this.$root.$refs.AuthComp = this;
        },
        
        methods: {
          showLogin: function(){
                this.boolLogin = 'true'
          },
          showRegister: function(){
                this.boolLogin = 'false'
          }
        }
    }
    
</script>