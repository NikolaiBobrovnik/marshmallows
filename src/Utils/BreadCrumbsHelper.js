import _ from 'lodash/core'

export default class BreadCrumbsHelper {
  limitDepthLevel = 5
  curItem = {}
  parentItem = {}
  tabs = []
  title = ''
  banner = ''
  amount = ''
  breadcrumbs = []

  constructor (breadcrumbsList, routesCode, limitDepthLevel = 5) {
    this.breadcrumbsList = breadcrumbsList
    this.routesCode = routesCode
    this.limitDepthLevel = limitDepthLevel
    this.curItem = this.getCurrentItemByCode(this.routesCode)
    this.parentItem = this.getCurrentItemByID(this.curItem.parentId)
    this.curItem.hasChildren =
      _.find(
        this.breadcrumbsList,
        item => this.curItem.id === item.parentId
      ) !== undefined
    if (+this.curItem.depth === this.limitDepthLevel - 1) {
      this.getTabs()
    } else if (
      +this.curItem.depth === this.limitDepthLevel - 2 &&
      this.curItem.hasChildren
    ) {
      this.getTabs(this.curItem.id)
    }
    if (+this.curItem.depth !== this.limitDepthLevel - 1) {
      this.getHeroData()
    } else {
      this.getHeroData(this.parentItem)
    }
    this.getBreadCrumbs(this.curItem)
  }

  getCurrentItemByCode (code) {
    return _.find(this.breadcrumbsList, item => item.code === code)
  }

  getCurrentItemByID (id) {
    return _.find(this.breadcrumbsList, item => item.id === id && item.parentId)
  }

  getTabs (parentId = this.parentItem.id) {
    let tabs = _.filter(
      this.breadcrumbsList,
      item => item.parentId === parentId && item.type === 'filter'
    )
    tabs = _.sortBy(tabs, item => item.id)
    let link, code
    if (+this.curItem.depth === this.limitDepthLevel - 1) {
      link = this.parentItem.link
      code = this.parentItem.code
    } else {
      link = this.curItem.link
      code = this.curItem.code
    }
    if (tabs.length !== 0) {
      tabs.unshift({
        id: '0',
        title: 'Показать все',
        link,
        code
      })
    }
    this.tabs = tabs
  }

  getHeroData (item = this.curItem) {
    this.title = item.title
    this.banner = item.banner
  }

  getBreadCrumbs (item = {}) {
    if (
      _.size(item) &&
      +item.depth <= this.limitDepthLevel &&
      item.type !== 'filter'
    ) {
      this.breadcrumbs.unshift(item)
    }
    if (item.parentId) {
      this.getBreadCrumbs(this.getCurrentItemByID(item.parentId))
    } else {
      this.breadcrumbs.unshift({
        title: 'Главная',
        link: '/'
      })
    }
  }

  getData () {
    return {
      breadcrumbs: this.breadcrumbs,
      title: this.title,
      tabs: this.tabs,
      banner: this.banner,
      curItem: this.curItem,
      amount: this.amount
    }
  }
}
