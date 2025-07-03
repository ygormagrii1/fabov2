import React from 'react'
import { useProduct } from 'vtex.product-context';
import { formatPriceToBRL } from '../../utils';
import styles from './styles.css';

const PixPrice = () => {
  const product = useProduct()?.product
  const sellingPrice = product?.priceRange?.sellingPrice?.highPrice
  const pixDiscountPercentage = 3
  const pixPrices  =  sellingPrice && sellingPrice * (1 - pixDiscountPercentage / 100)

  if(!pixPrices) return null

  return (
    <div className={styles.containerPixPrice}>
      <strong>{formatPriceToBRL(sellingPrice as number)} </strong>
    </div>
  )
}

export default PixPrice
