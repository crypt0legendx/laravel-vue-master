<template>
  <form method="POST" :action="urlLogin">
    
    <input type="hidden" name="_token" :value="csrfInput">
    <div class="form-group row">
        <label for="email" class="col-md-3 col-form-label text-md-right">Email</label>

        <div class="col-md-8">
            <input id="email" type="email" class="form-control" name="email" :value="oldEmail" required autocomplete="email" autofocus>
        </div>
    </div>

    <div class="form-group row">
        <label for="password" class="col-md-3 col-form-label text-md-right">Contraseña</label>

        <div class="col-md-8">
            <input id="password" type="password" class="form-control" name="password" required autocomplete="current-password">
        </div>
    </div>

    <div class="form-group row">
        <div class="col-md-8 offset-md-3">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" >

                <label class="form-check-label" for="remember">
                    Mantener sesion iniciada
                </label>
            </div>
        </div>
    </div>

    <div class="form-group row mb-0 text-center">
        <div class="col-md-8 offset-md-3">
            <div>
                <button type="submit"  class="w-100 btn  btn-primary btn-outline ">
                    Inicia sesion
                </button>
            </div>
            <div>
                <a class="btn btn-link"  :href="urlPassForgot">
                    Olvidaste tu contraseña?
                </a>
            </div>                                    
            <div >
                <a :href="urlGoogle" class="w-100 btn  btn-google  btn-outline border border-danger align-middle rounded">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" fill="currentColor" viewBox="0 2 16 16" class="bi bi-google align-middle icon-google"><path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"></path></svg>
                    </span>
                    <span>Contin&uacute;a con Google</span>
                </a> 
            </div>                                    
        </div>
    </div>
</form>

</template>

<script>
    
    export default {
        props: ['urlLogin', 'oldEmail', 'urlPassForgot', 'urlGoogle', 'csrfInput'],
    }
    
</script>