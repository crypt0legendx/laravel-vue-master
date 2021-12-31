<template>
    <div>
        <button 
            type="button" 
            v-bind:class="'btn ' + buttonType " 
            data-toggle="modal" 
            v-on:click="showPrices" 
        >
            <span id="weth-dai-swap-text">Show price WETH/DAI</span>

            <span id="weth-dai-swap-spinner" class="spinner-border text-light d-none" role="status">
            </span>

            <span id="weth-dai-swap-text-update" class="d-none">Update price WETH/DAI</span>
             
        </button>

        <div>
            <span id="price-weth-dai">
                
            </span>
        </div>
    </div>
</template>

<script>
    import UniSwap from '../../uniswap.js'
    export default {
        props: ['buttonType'],
        methods: {
			showPrices: async function(){

                if(!$('#weth-dai-swap-text').hasClass('d-none')){
                    $('#weth-dai-swap-text').addClass('d-none')
                }

                if(!$('#weth-dai-swap-text-update').hasClass('d-none')){
                    $('#weth-dai-swap-text-update').addClass('d-none')
                }

                if($('#weth-dai-swap-spinner').hasClass('d-none')){
                    $('#weth-dai-swap-spinner').removeClass('d-none')
                }

                var swapReturn;
                var uniSwap = new UniSwap
                var priceText = await UniSwap.prices()
                $('#price-weth-dai').text(priceText)

                if(!$('#weth-dai-swap-spinner').hasClass('d-none')){
                    $('#weth-dai-swap-spinner').addClass('d-none')
                }

                if($('#weth-dai-swap-text-update').hasClass('d-none')){
                    $('#weth-dai-swap-text-update').removeClass('d-none')
                }
			}
        }
    }
    
</script>