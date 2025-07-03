import React from 'react'
import { OrderForm } from 'vtex.order-manager'
//@ts-ignore
import styles from './FreeShipping.css'


type PropsFreeShipping = {
    titleFrete: string,
    valueFrete: string
}

function FreeShipping({ titleFrete, valueFrete }: PropsFreeShipping) {
    valueFrete = "15000"
    const { useOrderForm } = OrderForm
    const OrderFormContext = useOrderForm()
    console.log(OrderFormContext, "userordero")
    const totalValue = OrderFormContext.orderForm.value || ""
    console.log(totalValue, "totalvalue")
    const valorFrete = Number(valueFrete);
    const calculateBar = ((totalValue / valorFrete) * 100).toFixed(2);
    var dynamicWidth = '' + calculateBar + '%';
    console.log(totalValue)
    var realValor = ((valorFrete - totalValue) / 100).toFixed(2);
    console.log(valorFrete)
    var RealNovo = realValor.replace('.', ',');
console.log(RealNovo, "realnovo")
    if (totalValue < valorFrete) {

        var fretetexto = (
            <p>

                <strong> Quase lá!</strong> Faltam R$ {RealNovo} para o <strong>  FRETE GRÁTIS! </strong>
            </p>
        )
    } else {
        var fretetexto = (

            <p>

                <strong>  Parabéns!</strong> Você ganhou <strong>  FRETE GRÁTIS! </strong>
            </p>

        )
    }


    return (
        <div className={styles.freeShippingItem}>
            <div className={styles.title}>{titleFrete}</div>
            <div className={styles.freeShippingBar}>
                <div className={styles.freeShippingRange} style={{ width: dynamicWidth }}>
                <div className={styles.freeShippingRangeBefore} style={{ left: dynamicWidth }} ></div>
                </div>
            </div>


            <p className={styles.fretetexto} style={{ color: '#fff' }}> {fretetexto}   </p>

        </div>

    )

}

FreeShipping.schema = {
    title: 'Barra frete grátis',
    type: 'object',
    properties: {
        titleFrete: {
            title: 'Titulo',
            description: 'Titulo frete',
            type: 'string',
            default: null,
        },
        valueFrete: {
            title: 'Titulo',
            description: 'Valor do frete grátis',
            type: 'string',
            default: null,
        },
    },
}

export default FreeShipping;