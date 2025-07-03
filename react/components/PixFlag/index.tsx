import React from 'react'
import { useProduct } from 'vtex.product-context';
import PixIcon from './components/pixIcon';
import styles from './styles.css';

const PixFlag = () => {
  const product = useProduct()?.product
  const sellingPrice = product?.priceRange?.sellingPrice?.highPrice
  const pixDiscountPercentage = 3
  const pixPrice  =  sellingPrice && sellingPrice * (1 - pixDiscountPercentage / 100)

  if(!pixPrice) return null

  return (

    <div className={styles.containerPixFlag}>
      <PixIcon />
      <div className={styles.containerPricePixFlag}>
      <span>+3% de desconto no pix</span>
      
      </div>

    </div>
  )
}

export default PixFlag
