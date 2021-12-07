const httpPrefix = 'http://localhost:3000/dataService'
// let httpPrefix = '/api/dataService'

// 项目风险事件次数
function getProjRiskEventCnt(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getProjRiskEventCnt', data })
}

// 风险大屏-数据统计
function getRiskLgScrnParm() {
  return ajax.post({ url: httpPrefix + '/monitor/getRiskLgScrnParm' })
}

// 风险预警信号分布
function getRiskWarnSignalDstr(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getRiskWarnSignalDstr', data })
}

// 企业准入数量统计
function getEntPass(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getEntPass', data })
}

// 已过安检门数量
function getScrtGate(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getScrtGate', data })
}

// 企业尽调数量接口
function getEntDueDili(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getEntDueDili', data })
}

// 风险集中度-债权人接口
function getRiskCreditorConc(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getRiskCreditorConc', data })
}

// 主体评级分布接
function getMainGradeDstr(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getMainGradeDstr', data })
}

// 反欺诈模型命中规则分布
function getModelRuleDstr(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getModelRuleDstr', data })
}

// 安检门模型命中规则分布
function getModelScrtGate(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getModelScrtGate', data })
}

// 业务风险识别模型命中规则
function getModelBusiness(data) {
  return ajax.post({ url: httpPrefix + '/monitor/getModelBusiness', data })
}






