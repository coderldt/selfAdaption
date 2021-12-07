// const httpPrefix = '/api/dataService'
const httpPrefix = 'http://localhost:3000/dataService'
// 三十天内到期
function getMonDueBizAmt() {
  return ajax.post({ url: httpPrefix + '/cockpit/getMonDueBizAmt' })
}

// 地图
function getAssetDstr() {
  return ajax.post({ url: httpPrefix + '/cockpit/getAssetDstr' })
}

// 资产数据统计
function getAssetTot() {
  return ajax.post({ url: httpPrefix + '/cockpit/getAssetTot' })
}

// 业务发放金额趋势
function getBizAmt(params) {
  return ajax.post({ url: httpPrefix + '/cockpit/getBizAmt', data: params })
}

// 业务发放笔数趋势
function getBizCnt(params) {
  return ajax.post({ url: httpPrefix + '/cockpit/getBizCnt', data: params })
}

// 不良率预警
function getBadRto(params) {
  return ajax.post({ url: httpPrefix + '/cockpit/getBadRto', data: params })
}






