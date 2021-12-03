const express = require('express')
const router = express.Router()

router.post('/cockpit/getMonDueBizAmt', async (req, res) => {
  // iitoipo
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": {
      "factAmt": {
        "name": "正向保理",
        "value": "0万元"
      },
      "absAmt": {
        "name": "ABS/ABN",
        "value": "17.5万元"
      },
      "absTotAmt": {
        "name": "ABS、ABN总额",
        "value": "17.5万元"
      },
      "revFactAmt": {
        "name": "反向保理",
        "value": "0万元"
      },
      "factTotAmt": {
        "name": "保理总额",
        "value": "1000.01万元"
      },
      "aogAmt": {
        "name": "到货保理",
        "value": "0万元"
      },
      "secAmt": {
        "name": "星券",
        "value": "1000.01万元"
      }
    },
    "serialNumber": "10000202111261339555",
    "success": true
  })
})

router.post('/cockpit/getAssetTot', (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": [
      {
        "id": null,
        "assetNum": 348,
        "assetAmt": 53879.93,
        "typeCode": "03",
        "typeName": "累计发放资产",
        "createTime": null
      },
      {
        "id": null,
        "assetNum": 195,
        "assetAmt": 142981.22,
        "typeCode": "02",
        "typeName": "待融资资产",
        "createTime": null
      },
      {
        "id": null,
        "assetNum": 1259,
        "assetAmt": 219011.97,
        "typeCode": "01",
        "typeName": "平台资产",
        "createTime": null
      },
      {
        "id": null,
        "assetNum": 348,
        "assetAmt": 53879.93,
        "typeCode": "04",
        "typeName": "在保资产",
        "createTime": null
      }
    ],
    "serialNumber": "10000202111261446595",
    "success": true
  })
})

router.post('/cockpit/getBizAmt', (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": [
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 8700
          },
          {
            "dataTime": "2021-02-09",
            "value": 0
          },
          {
            "dataTime": "2021-02-08",
            "value": 0
          }
        ],
        "name": "星券"
      },
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 0
          },
          {
            "dataTime": "2021-02-08",
            "value": 6500
          }
        ],
        "name": "反向保理"
      },
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 2600
          },
          {
            "dataTime": "2021-02-08",
            "value": 0
          }
        ],
        "name": "ABS/ABN"
      },
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 32900
          },
          {
            "dataTime": "2021-02-08",
            "value": 0
          }
        ],
        "name": "正向保理"
      }
    ],
    "serialNumber": "10000202111261526336",
    "success": true
  })
})

router.post('/cockpit/getBizCnt', (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": [
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 0
          },
          {
            "dataTime": "2021-02-08",
            "value": 0
          }
        ],
        "name": "星券"
      },
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 0
          },
          {
            "dataTime": "2021-02-08",
            "value": 0
          }
        ],
        "name": "反向保理"
      },
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 0
          },
          {
            "dataTime": "2021-02-08",
            "value": 2
          }
        ],
        "name": "ABS/ABN"
      },
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 1
          },
          {
            "dataTime": "2021-02-08",
            "value": 0
          }
        ],
        "name": "正向保理"
      }
    ],
    "serialNumber": "10000202111261526336",
    "success": true
  })
})

router.post('/cockpit/getBadRto', (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": [
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 60
          },
          {
            "dataTime": "2021-02-08",
            "value": 0
          }
        ],
        "name": "星券"
      },
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 0
          },
          {
            "dataTime": "2021-02-08",
            "value": 210
          }
        ],
        "name": "反向保理"
      },
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 130
          },
          {
            "dataTime": "2021-02-09",
            "value": 0
          },
          {
            "dataTime": "2021-02-08",
            "value": 0
          }
        ],
        "name": "ABS/ABN"
      },
      {
        "data": [
          {
            "dataTime": "2021-02-10",
            "value": 0
          },
          {
            "dataTime": "2021-02-09",
            "value": 20
          },
          {
            "dataTime": "2021-02-08",
            "value": 90
          }
        ],
        "name": "正向保理"
      }
    ],
    "serialNumber": "10000202111261526336",
    "success": true
  })
})

router.post('/cockpit/getAssetDstr', (req, res) => {
  res.send({
    "code": "200",
    "msg": "响应成功",
    "data": [
      {
        "id": null,
        "assetNum": 219,
        "assetAmt": 2127122.17,
        "regionCode": null,
        "regionName": null,
        "createTime": null
      },
      {
        "id": 1,
        "assetNum": 325,
        "assetAmt": 3156122.15,
        "regionCode": "11",
        "regionName": "北京市",
        "createTime": "2021-11-16"
      }
    ],
    "serialNumber": "10000202111261346080",
    "success": true
  })
})

module.exports = router