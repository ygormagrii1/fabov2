//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { useProduct } from 'vtex.product-context'
import responsePlaceholder from './helpers/responsePlaceholder.json'
import styles from './style.css'

const promotionId = "e9f499ef-5ca9-41ba-b4e6-c8e4b173701c"
const product = useProduct()?.product
const WholesalePrice = () => {

    return <>
        { /*<div className={styles.wrapperPrice}>
            <div className={styles.wrapp_price__middle}>
                <span className={styles.listPrice}>De R$ {product?.priceRange.sellingPrice.highPrice}  </span>
                <span className={styles.bestPrice}>Por {product?.priceRange.sellingPrice.lowPrice} <span className={styles.unityIndicator}>un.</span>  </span>
            </div>
                <span className={styles.spotPricePixContainer}> ou {product?.priceRange.sellingPrice.lowPrice} no <span style={{color: "#FF6344", fontWeight: "bold"}}> PIX </span></span>
                <span className={styles.spotPricePixContainer}> ou em até {product?.priceRange.sellingPrice.lowPrice}x de {lowerInstallment?.Value}</span>
        </div> */ }

    </>
}

export default WholesalePrice
