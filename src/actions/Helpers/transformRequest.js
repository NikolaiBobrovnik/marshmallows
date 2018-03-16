import qs from 'qs'

export function transformData (params) {
  const parsed = qs.parse(location.search.substr(1))
  if (parsed._clear_cache === 'yes') {
    params._clear_cache = 'yes'
  }
  return params
}
