import _ from 'lodash'
class AnalyticsTracker {
  fixGoogle (params) {
    console.log(
      'AnalyticsTracker Utils',
      'Попытка фиксировать в аналитику',
      params
    )
    if (_.isFunction(_.get(window, 'ga'))) {
      console.log('AnalyticsTracker Utils', 'window.ga существует', window.ga)
      return window.ga('send', params)
    }
  }

  fixYandex (name) {
    console.log('AnalyticsTracker Utils', 'Попытка фиксировать в метрику', name)
    if (_.isFunction(_.get(window, 'yaCounter45810345.reachGoal'))) {
      console.log(
        'AnalyticsTracker Utils',
        'window.yaCounter45810345.reachGoal существует функция такая',
        window.yaCounter45810345
      )
      return window.yaCounter45810345.reachGoal(name)
    }
  }
}
export default new AnalyticsTracker()
