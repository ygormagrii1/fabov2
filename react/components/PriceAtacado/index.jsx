import React, { useState } from 'react';
import { useProduct } from "vtex.product-context";
import { useOrderForm } from 'vtex.order-manager/OrderForm'

const PriceAtacado = () => {
    const { orderForm } = useOrderForm()
    console.log('Order: ' , orderForm);
    console.log('Use Product: ' , useProduct()?.product);
    return <h1>Testando</h1>
}

export default PriceAtacado