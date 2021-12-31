<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
    */


    public function payOrderbyNum($orderNum, Request $request)
    {
        //get order fields 
        //if payment is denegate or not realize. warning if payment is in process
        
        $order  =  [
                    
                    'shop'  => [
                                'id'        => 1,
                                'name'      => 'Calzados',
                                'email'     => 'calzados@gmail.com',
                                // 'account'   => '0xC2662B6fD17a4d30DD6B14176D40C75119d5A7fa', //account 1 metamask
                                'callback'  => 'localhost...',
                                ],
                    
                    'order' => [
                                'orderNum'      => '12',                          
                                'value'         => '2',
                                'currency'      => 'USDT',
                                ],

                    ];


        return view('payment.payOrder', compact('order'));
    }

}
