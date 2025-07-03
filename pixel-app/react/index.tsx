import { canUseDOM } from 'vtex.render-runtime'

import type { PixelMessage } from './typings/events'
import { getParams, getPrice, updateProductSchema } from './utils'

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:pageView': {
      break
    }

    case 'vtex:productView': {
      async function updateStructuredData() {

        try{

        const slug = getParams()?.slug

        if(!slug) return

        const {priceRange} = await getPrice(slug)

        if(!priceRange) return

        updateProductSchema(priceRange?.sellingPrice?.highPrice)

        }catch(error){
          console.warn('Error updating structure data:', error);
        }

      }

      updateStructuredData()

      break
    }

    default: {
      break
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
