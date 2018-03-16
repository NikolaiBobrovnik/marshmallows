import $ from 'jquery'
import { BASE_SIZE_RESIZE } from 'constants/HEADER'

/**
 * направление скролла window
 */
export function getDirection () {
  window.direction = 1
  let lastScrollTop = 0
  $(window).scroll(function () {
    let scroll = $(window).scrollTop()

    if (lastScrollTop <= scroll) {
      window.direction = 1
    } else {
      window.direction = -1
    }
    lastScrollTop = scroll
  })
}

export function elasticDesktop (store) {
  let baseSize = 10
  let $html = $('html')
  let baseWidth = 1440
  _helper()
  $(window).on('resize', _helper)

  function _helper () {
    let currentSize = Math.min($(window).width(), 1440) / baseWidth * baseSize
    $html.css({
      'font-size': currentSize + 'px'
    })
    store.dispatch({ type: BASE_SIZE_RESIZE, payload: currentSize })
  }
}

export function elasticMobile () {
  let baseSize = 10
  let $html = $('html')
  let baseWidth = 375

  _helper()
  $(window).on('resize', _helper)

  function _helper () {
    $html.css({ 'font-size': $(window).width() / baseWidth * baseSize + 'px' })
  }
}

export function getLocale () {
  if (isBrowser) {
    return (navigator.language ||
      navigator.systemLanguage ||
      navigator.userLanguage)
      .substr(0, 2)
      .toLowerCase()
  } else {
    return 'ru'
  }
}

/**
 * получаем ширину системного скролла
 * @return {number} Ширина скролла.
 */
export function scrollWidth () {
  // создадим элемент с прокруткой
  var div = document.createElement('div')

  div.style.overflowY = 'scroll'
  div.style.width = '50px'
  div.style.height = '50px'

  // при display:none размеры нельзя узнать
  // нужно, чтобы элемент был видим,
  // visibility:hidden - можно, т.к. сохраняет геометрию
  div.style.visibility = 'hidden'

  document.body.appendChild(div)
  var scrollWidth = div.offsetWidth - div.clientWidth
  document.body.removeChild(div)
  return scrollWidth
}

export function goTop () {
  window.scrollTo(0, 0)
}

export let isBrowser = typeof window !== 'undefined'

export function shaderColor (color, percent, transparent = 1) {
  // функция для осветления или затемнения цвета
  let num = parseInt(color.slice(1), 16)
  let amt = Math.round(2.55 * percent)
  let R = (num >> 16) + amt
  let G = (num >> 8 & 0x00FF) + amt
  let B = (num & 0x0000FF) + amt
  num = 'rgba(' + R + ', ' + G + ', ' + B + ', ' + transparent + ')'
  return num
}
