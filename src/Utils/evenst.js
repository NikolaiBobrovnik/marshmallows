export function viewBanner (params) {
  window.dataLayer = window.dataLayer || []
  const { id, title, position } = params

  window.dataLayer.push({
    event: 'promoView',
    ecommerce: {
      promoView: {
        promotions: [
          {
            id: id,
            name: title,
            position: position
          }
        ]
      }
    }
  })
}

export function clickBanner (params) {
  window.dataLayer = window.dataLayer || []
  const { id, title, position = '' } = params

  window.dataLayer.push({
    event: 'promotionClick',
    ecommerce: {
      promoClick: {
        promotions: [
          {
            id: id,
            name: title,
            position: position
          }
        ]
      }
    }
  })
}
