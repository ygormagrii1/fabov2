//@ts-nocheck
import React, { useEffect, useState } from 'react';
import style from './style.css'
import InputMask from 'react-input-mask';
import { useProduct } from 'vtex.product-context';

const CustomShippingSimulator = () => {
    const product = useProduct()?.product
    const [error, setError] = useState()
    const [postalCode, setPostalCode] = useState()
    const [slas, setSlas] = useState()
    const [notFound, setNotFound] = useState(false)
    const [productId, setProductId] = useState(product.items[0].itemId)
    // useEffect(() => {


    // })


    const handlePostalCode = (input) => {
        const { value } = input.target
        setPostalCode(value)
    }


    const fetchShippingData = async () => {
        // if (!cep || !id) setError(true)

        if (!postalCode) return setError(true)

        const response = await fetch('/api/checkout/pub/orderForms/simulation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "items": [{
                    "id": productId,
                    "quantity": 1,
                    "seller":"1"
                }],
                "country":"BRA",
                "postalCode": postalCode
            })
        })

        const json = await response.json()
        setError(false)
        
        setSlas(json.logisticsInfo[0]?.slas)
        setNotFound(false)

    
        if (!json.logisticsInfo[0]?.slas.length) {
            setNotFound(true)
        } 
    }

    return <>
        <div className={style.wrapper} style={{ "position": "relative" }}>
            <label htmlFor="cep" className={style.postalCodeLabel} style={{ "position": "absolute" }}> Simule frete ou retirada </label>
            {/* <input className={style.input__text } name="cep" type="text" placeholder='Cep' onChange={handlePostalCode} /> */}
            <InputMask mask="99999-999" onChange={handlePostalCode} className={style.input__text} name="cep" type="text" placeholder='Cep' ></InputMask>
            <button className={style.btnCalc} type="button" onClick={fetchShippingData}> Calcular </button>
            <br/><a className={style.consultPostalCode} href='https://buscacepinter.correios.com.br/app/endereco/index.php?t' target='_blank'> Não sei meu CEP</a>
            {error && (<> Erro</>)}

            <ul className={style.listWrapper}>
                {slas && <>
                    {slas.map(item => {
                        if (item.deliveryChannel === "pickup-in-point") {
                            return <li className={style.shippingItem}>
                                <a> {item.pickupStoreInfo.additionalInfo}  <span className={style.priceWrapper}>{item.price === 0 ? "Grátis" : item.price}</span>
                                    <br/> Em até {item.shippingEstimate.replaceAll("bd", " dias úteis")}    
                                    <br/> <span className={style.address}>{item.pickupStoreInfo.address.street} {item.pickupStoreInfo.address.number}, {item.pickupStoreInfo.address.neighborhood}, {item.pickupStoreInfo.address.city} - {item.pickupStoreInfo.address.state}</span>
                                </a>
                            </li>
                        }

                        return <li className={style.shippingItem}>
                                <a> {item.name} <span className={style.priceWrapper}>{item.price === 0 ? "Grátis" : (item.price / 100).toLocaleString("pt-br", {"style" : "currency", "currency" : "BRL"})}</span>
                                <br/> Em até {item.shippingEstimate.replaceAll("bd"," dia úteis")}  </a> 
                        </li>
                    })}
                </>}

                {
                    (notFound && !error) && <>
                        Não foram encontradas opções de entrega ou retirada para seu cep.
                    </>

                }
            </ul>

        </div>

    </>
}


export default CustomShippingSimulator