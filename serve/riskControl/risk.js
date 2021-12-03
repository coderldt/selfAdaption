const express = require('express')
const router = express.Router()

router.post('/monitor/getProjRiskEventCnt', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": [
      {
        "type": "so10",
        "value": 14,
        "name": "舆情风险",
      },
      {
        "type": "so9",
        "value": 11,
        "name": "司法诉讼",
      }
    ],
    "serialNumber": "10000202111261733375",
    "success": true
  })
})

router.post('/monitor/getRiskLgScrnParm', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": {
      "connTransRate": {
        "name": "债务关联交易占比",
        "value": "0.02%"
      },
      "nonPerfAssetRto": {
        "name": "不良资产率",
        "value": "0%"
      },
      "assetAtRisk": {
        "name": "风险资产总额",
        "value": 99
      },
      "monCompNum": {
        "name": "风险监控企业数量",
        "value": "0个"
      }
    },
    "serialNumber": "10000202111261733375",
    "success": true
  })
})

router.post('/monitor/getRiskWarnSignalDstr', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": [
      {
        "type": "A",
        "value": 14,
        "name": "提示信息",
      },
      {
        "type": "N",
        "value": 11,
        "name": "低风险信号",
      }
    ],
    "serialNumber": "10000202111261733375",
    "success": true
  })
})

router.post('/monitor/getEntPass', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": {
      "data": [
        {
          "dataTime": "2021-11-27",
          "value": 101
        },
        {
          "dataTime": "2021-11-26",
          "value": 200
        }
      ],
      "name": "企业准入数量统计"
    },
    "serialNumber": "10000202111282157064",
    "success": true
  })
})

router.post('/monitor/getScrtGate', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": [
      {
        "data": [
          {
            "dataTime": "2021-11-27",
            "value": 500
          },
          {
            "dataTime": "2021-11-26",
            "value": 30
          }
        ],
        "name": "已过安检门数量"
      },
      {
        "data": [
          {
            "dataTime": "2021-11-27",
            "value": 365.26
          },
          {
            "dataTime": "2021-11-26",
            "value": 55
          }
        ],
        "name": "已过安检门金额"
      }
    ],
    "serialNumber": "10000202111281829023",
    "success": true
  })
})

router.post('/monitor/getEntDueDili', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": {
      "data": [
        {
          "dataTime": "2021-11-27",
          "value": 261
        },
        {
          "dataTime": "2021-11-26",
          "value": 50
        }
      ],
      "name": "尽调企业数量"
    },
    "serialNumber": "10000202111282157064",
    "success": true
  })
})

router.post('/monitor/getRiskCreditorConc', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": [
      {
        "data": [
          {
            "dataTime": "2021-12",
            "value": 20
          },
          {
            "dataTime": "2021-11",
            "value": 4.65
          },
          {
            "dataTime": "2021-10",
            "value": 0
          },
          {
            "dataTime": "2021-09",
            "value": 0
          },
          {
            "dataTime": "2021-08",
            "value": 0
          },
          {
            "dataTime": "2021-07",
            "value": 0
          },
          {
            "dataTime": "2021-06",
            "value": 0
          }
        ],
        "name": "债务人"
      },
      {
        "data": [
          {
            "dataTime": "2021-12",
            "value": 3
          },
          {
            "dataTime": "2021-11",
            "value": 4.65
          },
          {
            "dataTime": "2021-10",
            "value": 0
          },
          {
            "dataTime": "2021-09",
            "value": 0
          },
          {
            "dataTime": "2021-08",
            "value": 0
          },
          {
            "dataTime": "2021-07",
            "value": 0
          },
          {
            "dataTime": "2021-06",
            "value": 0
          }
        ],
        "name": "债权人"
      }
    ],
    "serialNumber": "10000202111282040415",
    "success": true
  })
})

router.post('/monitor/getMainGradeDstr', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": {
      "data": [
        {
          "name": "C",
          "value": 7
        },
        {
          "name": "CC",
          "value": 0
        },
        {
          "name": "CCC",
          "value": 0
        },
        {
          "name": "B",
          "value": 0
        },
        {
          "name": "BB",
          "value": 0
        },
        {
          "name": "BBB",
          "value": 0
        },
        {
          "name": "A",
          "value": 0
        },
        {
          "name": "AA",
          "value": 0
        },
        {
          "name": "AAA",
          "value": 0
        }
      ]
    },
    "serialNumber": "10000202111282203360",
    "success": true
  })
})

router.post('/monitor/getModelRuleDstr', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": {
      "data": [
        {
          "name": "企业身份验证不一致",
          "value": 4
        },
        {
          "name": "企业失信被执行",
          "value": 3
        }
      ],
      "name": "尽职调查模型"
    },
    "serialNumber": "10000202111282238549",
    "success": true
  })
})

router.post('/monitor/getModelScrtGate', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": {
      "data": [
        {
          "name": "企业经营状态非正常",
          "value": 1
        }
      ],
      "name": "安检门模型"
    },
    "serialNumber": "10000202111282258077",
    "success": true
  })
})

router.post('/monitor/getModelBusiness', async (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": {
      "data": [
        {
          "name": "企业净负债率",
          "value": 3
        },
        {
          "name": "企业剔除预收账款的资产负债率",
          "value": 3
        }
      ],
      "name": "尽职调查模型"
    },
    "serialNumber": "10000202111282300256",
    "success": true
  })
})
module.exports = router