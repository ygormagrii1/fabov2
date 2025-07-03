
export const getParams = () => {
  const slug = window.location.pathname.substring(1);

  return { slug };
}

export const getPrice = async (slug: string)=> {
  const graphql = JSON.stringify({
    query: "query getPriceProduct($slug:String) {\r\n  product(\r\n    slug:$slug,\r\n )@context(provider: \"vtex.search-graphql\"){\r\n   productName\r\n    priceRange{\r\n      sellingPrice{\r\n        highPrice\r\n        lowPrice\r\n      }\r\n    }\r\n  }\r\n  }",
    variables: {"slug":slug}
})
const requestOptions = {
method: "POST",
body: graphql,
};

  try {
      const response = await fetch("/_v/public/graphql/v1", requestOptions)
      const json = await response.json()
      return json.data.product
  } catch (error) {
      console.error(error)
  }

}

const updateSchema = (structuredData: any,sellingPrice: number, pixPrice: number) => {
  structuredData.offers = structuredData.offers || {};
        structuredData.offers.lowPrice = pixPrice;
        structuredData.offers.sellingPrice = sellingPrice;

        if (Array.isArray(structuredData.offers.offers)) {
          structuredData.offers.offers.forEach((offer: any) => {
            offer.price = pixPrice;
          });
        }

        structuredData.price = pixPrice;

       return JSON.stringify(structuredData);
}


export function updateProductSchema(sellingPrice: number) {
  const scriptElements = document.querySelectorAll('script[type="application/ld+json"]');
  const pixDiscountPercentage = 3
  const pixPrice = sellingPrice && parseFloat((sellingPrice * (1 - pixDiscountPercentage / 100)).toFixed(2));

  scriptElements.forEach((scriptElement) => {
    try {
      const structuredData = JSON.parse(scriptElement.textContent ?? '');

      if (structuredData["@type"] === "Product") {
        const updatedSchema = updateSchema(structuredData,sellingPrice, pixPrice);

        const newScriptElement = document.createElement('script');
        newScriptElement.type = 'application/ld+json';
        newScriptElement.textContent = updatedSchema;

        scriptElement.parentNode?.removeChild(scriptElement);
        document.head.appendChild(newScriptElement);


      }
    } catch (error) {
      console.error('Error updating structured data', error);
    }
  });
}
