<template>
	
    <form method="POST" :action="urlRegister"> 
    	<!-- {{ route('register') }} -->
        <!-- @csrf -->
        <input type="hidden" name="_token" :value="csrfInput">

        <div class="form-group row">
            <label for="name" class="col-md-3 col-form-label text-md-right">Nombre</label>

            <div class="col-md-8">
            	<!-- {{ old('name') }} -->
                <input id="name" type="text" class="form-control " name="name" :value="oldName" required autocomplete="name" autofocus>

            </div>
        </div>

        <div class="form-group row">
            <label for="email" class="col-md-3 col-form-label text-md-right">Email</label>

            <div class="col-md-8">
            	<!-- {{ old('email') }} -->
                <input id="email" type="email" class="form-control " name="email" :value="oldEmail" required autocomplete="email">

            </div>
        </div>

        <div class="form-group row">
            <label for="password" class="col-md-3 col-form-label text-md-right">Contraseña</label>

            <div class="col-md-8">
                <input id="password" type="password" class="form-control " name="password" required autocomplete="new-password">

            </div>
        </div>

        <div class="form-group row">
            <label for="password-confirm" class="col-md-3 col-form-label text-md-right">Confirma tu contraseña</label>

            <div class="col-md-8">
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-8 offset-md-3">
                <button type="submit" class="btn btn-primary w-100">
                	Registrate
                </button>
            </div>
        </div>
    </form>

</template>

<script>
    
    export default {
        props: ['urlRegister', 'oldEmail', 'oldName', 'csrfInput'],
    }
    
</script>