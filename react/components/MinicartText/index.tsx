//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context'
import { OrderFormProvider, useOrderForm } from 'vtex.order-manager/OrderForm'

const MinicartText = () => {
    const { product } = useProduct()
    const clusters = product?.productClusters
    const hasWholePrice  = clusters.filter(i => {return i.id === "305"})
    if (!hasWholePrice) return <></>

    const quantityToActiveDiscount = 2
    const discountPercentageValue = 10
    
    const { orderForm } = useOrderForm()
    const calculatedPriceForEach = orderForm.items[0].priceDefinition.calculatedSellingPrice
    console.log(orderForm, calculatedPriceForEach,"orderform")

    const discount = product.items[0].sellers[0].commertialOffer.Price
    console.log(product, hasWholePrice, "Aqui mincart")
    const toRealConversion = (calculatedPriceForEach / 100).toLocaleString("pt-br", {
        "style" : "currency", "currency" : "BRL"
    })
    return <>
        <p style={{
                height: "1px",
                fontSize: "12px",
                fontWeight: "400",
                letterSpacing: "0px",
                color: "#000000",
                textAlign: "left"
        }}>{toRealConversion} por un</p>
    </>


}

export default MinicartText