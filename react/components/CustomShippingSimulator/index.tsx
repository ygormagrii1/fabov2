//@ts-nocheck
import React, { useEffect, useState } from 'react'
import style from './style.css'
import InputMask from 'react-input-mask'
import { useProduct } from 'vtex.product-context'

const CustomShippingSimulator = () => {
  const product = useProduct()?.product
  const [error, setError] = useState(false)
  const [postalCode, setPostalCode] = useState<string>('') // Inicia como string vazia
  const [slas, setSlas] = useState()
  const [notFound, setNotFound] = useState(false)
  const [productId, setProductId] = useState(product?.items[0]?.itemId)
  const [quantity, setQuantity] = useState<number>(1)

  const isCepEligible = (cep: string): boolean => {
    if (!cep || cep.length !== 9) return false // Evita parse inválido
    const numericCep = parseInt(cep.replace('-', ''))

    const ranges = [
      [9900000, 9999999],
      [9300000, 9399999],
      [9000000, 9299999],
      [9600000, 9899999],
      [9500000, 9599999],
    ]

    return ranges.some(([start, end]) => numericCep >= start && numericCep <= end)
  }

  const productPrice = product?.items[0]?.sellers[0]?.commertialOffer?.Price ?? 0
  const total = productPrice * quantity
  const isFreeShipping = postalCode.length === 9 && total >= 149.9 && isCepEligible(postalCode)

  // Captura a quantidade da PDP observando o input da VTEX
  const updateQuantity = (input: HTMLInputElement) => {
    const value = parseInt(input.value)
    if (!isNaN(value)) {
      setQuantity(value)
      console.log('Quantidade atual:', value)
    }
  }

  useEffect(() => {
    const input = document.querySelector<HTMLInputElement>('input.vtex-numeric-stepper__input')

    if (!input) return

    const observer = new MutationObserver(() => {
      updateQuantity(input)
    })

    observer.observe(input, {
      attributes: true,
      attributeFilter: ['value'],
    })

    // Atualiza imediatamente ao montar
    updateQuantity(input)

    return () => {
      observer.disconnect()
    }
  }, [])

  const handlePostalCode = (input) => {
    const { value } = input.target
    setPostalCode(value)
  }

  const fetchShippingData = async () => {
    if (!postalCode || postalCode.length !== 9) {
      return setError(true)
    }

    const response = await fetch('/api/checkout/pub/orderForms/simulation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: productId,
            quantity: quantity,
            seller: '1',
          },
        ],
        country: 'BRA',
        postalCode: postalCode,
      }),
    })

    const json = await response.json()
    setError(false)

    setSlas(json.logisticsInfo[0]?.slas)
    setNotFound(false)

    if (!json.logisticsInfo[0]?.slas.length) {
      setNotFound(true)
    }
  }

  return (
    <>
      <div className={style.wrapper} style={{ position: 'relative' }}>
        <label htmlFor="cep" className={style.postalCodeLabel} style={{ position: 'absolute' }}>
          Simule frete ou retirada
        </label>

        <InputMask
          mask="99999-999"
          onChange={handlePostalCode}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              fetchShippingData()
            }
          }}
          className={style.input__text}
          name="cep"
          type="text"
          placeholder="Cep"
          value={postalCode}
        />

        <button
          className={style.btnCalc}
          type="button"
          onClick={fetchShippingData}
          disabled={postalCode.length !== 9}
        >
          Calcular
        </button>

        <br />
        <a
          className={style.consultPostalCode}
          href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
          target="_blank"
        >
          Não sei meu CEP
        </a>

        {error && <> Erro ao buscar opções de entrega </>}

        <ul className={style.listWrapper}>
          {slas && (
            <>
              {slas.map((item) => {
                const priceToShow = isFreeShipping ? 0 : item.price

                if (item.deliveryChannel === 'pickup-in-point') {
                  return (
                    <li key={item.id} className={style.shippingItem}>
                      <a>
                        {item.pickupStoreInfo.additionalInfo}{' '}
                        <span className={style.priceWrapper}>
                          {item.price === 0 ? 'Grátis' : (item.price / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </span>
                        <br /> Em até {item.shippingEstimate.replaceAll('bd', ' dias úteis')}
                        <br />
                        <span className={style.address}>
                          {item.pickupStoreInfo.address.street} {item.pickupStoreInfo.address.number},{' '}
                          {item.pickupStoreInfo.address.neighborhood}, {item.pickupStoreInfo.address.city} -{' '}
                          {item.pickupStoreInfo.address.state}
                        </span>
                      </a>
                    </li>
                  )
                }

                return (
                  <li key={item.id} className={style.shippingItem}>
                    <a>
                      {item.name}{' '}
                      <span className={style.priceWrapper}>
                        {priceToShow === 0
                          ? 'Grátis'
                          : (priceToShow / 100).toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                      </span>
                      <br /> Em até {item.shippingEstimate.replaceAll('bd', ' dias úteis')}
                    </a>
                  </li>
                )
              })}
            </>
          )}

          {notFound && !error && (
            <>Não foram encontradas opções de entrega ou retirada para seu CEP.</>
          )}
        </ul>
      </div>
    </>
  )
}

export default CustomShippingSimulator
