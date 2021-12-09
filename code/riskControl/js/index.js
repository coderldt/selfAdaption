const riskWarningLegendSort = ['低风险信号', '高风险信号', '中风险信号', '提示信息']
const riskWarningLegendColor = ['#9ebac8', '#c8403c', '#edc400', '#62ac1e']

const businessTransactionsColor = ['#8adae7', '#ffb353', '#f0d2ab', '#f15a66', '#78584a', '#7686ff', '#d099f9', '#3dc458', '#418be2']

const router = new VueRouter()
new Vue({
  el: '#app',
  router,
  data: {
    // width: '2075px',
    // height: '1239px',
    width: '1800px',
    height: `1080px`,
    scale: 1,
    optimalRatio: 1.67,
    time: {
      day: '',
      week: '',
      hour: ''
    },
    hourId: '',
    count: 1180,
    // 进入数据企业数量
    accessDataCount: 0,
    safetyCheckCount: 0,
    safetyCheckMoney: 0,
    tuneOutCount: 0,
    dataStatis: {
      assetAtRisk: {
        name: '风险资产总额',
        value: 0
      },
      monCompNum: {
        name: '风险监控企业数',
        value: 0
      },
      nonPerfAssetRto: {
        name: '不良资产率',
        value: 0
      },
      connTransRate: {
        name: '债务人关联交易占比',
        value: 0
      },
      // businessRiskCount: 0,
      // nonPerformingAssetsRatio: 2,
      // proportionRatio: 10
    },
    concentration: {
      obligorCount: 0,
      creditorCount: 0,
    },
    dateList,
    concentrationList,
    businessTransactionsTitle: '',
    businessTransactionsValue: defaultValue,
    riskWarningValue: defaultValue,
    accessDataValue: defaultValue,
    safetyCheckValue: defaultValue,
    tuneOutValue: defaultValue,
    antiFraudRuleValue: defaultValue,
    safetyCheckRuleValue: defaultValue,
    businessRiskRuleValue: defaultValue,
    scoreValue: defaultValue,
    concentrationValue: defaultconCentrationValue,
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    const { token } = this.$route.query
    if (token) {
      sessionStorage.setItem('token', token)
      loading.close();
    } else if (!sessionStorage.getItem('token')) {
      this.$message.error('token丢失，数据请求失败。');
      setTimeout(() => {
        loading.close();
      }, 2000);
    }

    const setScale = this.debounce(() => {
      let ww = window.innerWidth / 1920
      let wh = window.innerHeight / 1080
      this.scale = ww < wh ? ww - 0.04 : wh - 0.04
      // const width = window.innerWidth
      // const height = window.innerHeight

      // const ratio = (width / height)
      // if (ratio > this.optimalRatio) {
      //   this.width = `${height * this.optimalRatio}px`
      //   this.height = `${height}px`
      //   this.fontSize = `${height * this.optimalRatio * 0.0077}px`
      // } else {
      //   this.width = `${width}px`
      //   this.height = `${width / this.optimalRatio}px`
      //   this.fontSize = `${width * 0.0077}px`
      // }
    }, 500)
    setScale()
    window.addEventListener('resize', setScale)
    this.$once('')
  },
  mounted() {
    this.time.day = dayjs().format('YYYY年MM月DD日')
    this.time.week = `星期${['一', '二', '三', '四', '五', '六', '日'][dayjs().get('day') - 1]}`
    this.time.hour = dayjs().format('HH:mm:ss')
    this.hourId = setInterval(()=>{
      this.time.hour = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
    this.getBusinessTransactions()
    this.getRiskWarning()
    this.getAccessData()
    this.getSafetyCheck()
    this.getTuneOut()
    this.getAntiFeaud()
    this.getSafetyCheckRule()
    this.getBusinessRiskRule()
    this.getDataStatistics()
    this.getConcentrationEcharts(defaultconCentrationValue)
    this.getScore()
    
  },
  computed: {
    formatCount() {
      return String(this.dataStatis.assetAtRisk.value).split('').map(item => Number(item))
    }
  },
  methods: {
    // 项目风险事件次数
    async getBusinessTransactions(intervalDay = 0) {
      const res = await getProjRiskEventCnt({ intervalDay })
      this.businessTransactionsTitle = "项目风险事件次数"

      if (res.code == 200) {
        const data = []
        const legend = []
        res.data.forEach(item => {
          data.push({ value: item.value, name: item.name })
          legend.push({ name: item.name, textStyle: { color: "#d8c09f" } })
        })

        const option = {
          color: businessTransactionsColor,
          tooltip: {
            trigger: 'item'
          },
          legend: {
            type: 'scroll',
            right: '5%',
            top: 'middle',
            orient: 'vertical',
            data: legend
          },
          series: [
            {
              type: 'pie',
              center: ['40%', '55%'],
              radius: ['40%', '60%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              labelLine: {
                show: false
              },
              data
            }
          ]
        };
        const myChart = echarts.init(document.getElementById('businessTransactions'));
        myChart.setOption(option, true);
      }
    },
    // 风险预警信号分布
    async getRiskWarning(intervalDay = 0) {
      const res = await getRiskWarnSignalDstr({ intervalDay })
      if (res.code == 200) {
        const data = []
        const legend = []
        riskWarningLegendSort.forEach((i, index) => {
          const obj = res.data.find(item => item.name === i)
          if (obj) {
            data.push({ value: obj.value, name: obj.name, itemStyle: { color: riskWarningLegendColor[index] } })
            legend.push({ name: obj.name, itemStyle: { color: riskWarningLegendColor[index] }, textStyle: {color: riskWarningLegendColor[index]} })
          }
        })

        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c} ({d}%)'
          },
          legend: {
            type: 'scroll',
            right: '5%',
            top: 'middle',
            orient: 'vertical',
            data: legend
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '60%'],
              center: ['40%', '50%'],
              // roseType: 'area',
              data,
              label: {
                formatter: '{b}: {d}%'
              }
            }
          ]
        };

        const myChart = echarts.init(document.getElementById('riskWarning'));
        myChart.setOption(option, true);
      }
    },
    // 准入数据 - 进入数据统计
    async getAccessData(intervalDay = 0) {
      const res = await getEntPass({ intervalDay })
      
      const xAxisList = []
      const seriesList = []
      if (res && res.code == 200) {
        this.accessDataCount = res.data.data[0].value

        res.data.data.reverse().forEach(item => {
          xAxisList.push(item.dataTime)
        })

        res.data.data.forEach(item => {
          seriesList.push(item.value)
        })
      }
      const option = {
        title: {
          text: '准入数据统计',
          textStyle: {
            color: '#87aed8',
            fontSize: '15'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: (res && res.code == 200) ? '3%' : '10%',
          right: '8%',
          bottom: '3%',
          top: '28%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisList,
          axisLabel: {
            color: '#7a9bc3'
          },
        },
        yAxis: {
          type: 'value',
          name: '单位（个）',
          nameTextStyle: {
            color: '#7a9bc3'
          },
          axisLabel: {
            color: '#7a9bc3'
          },
          minorSplitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#aaa', '#ddd']
            }
          }
        },
        series: {
          yAxisIndex: 0,
          type: 'line',
          smooth: true,
          data: seriesList,
          color: "#48cc9d"
        },
      };

      const myChart = echarts.init(document.getElementById('accessData'));
      myChart.setOption(option, true);
    },
    // 准入数据 - 已过安检门数据
    async getSafetyCheck(intervalDay = 0) {
      const res = await getScrtGate({ intervalDay })

      const xAxisList = []
      const seriesList = []
      let title = '已过安检门数量/金额'
      if (res && res.code == 200) {
        const safetyCheckObj = res.data.find(i => i.name === '已过安检门数量')
        if (safetyCheckObj && safetyCheckObj.data && safetyCheckObj.data.length) {
          this.safetyCheckCount = safetyCheckObj.data[0].value

          seriesList.push({
            name: safetyCheckObj.name,
            yAxisIndex: 0,
            type: 'bar',
            barWidth: 20,
            color: '#269e70',
            label: {
              show: true
            },
            data: safetyCheckObj.data.reverse().map(i => i.value)
          })
        }

        const safetyCheckMoneyObj = res.data.find(i => i.name === '已过安检门金额')
        if (safetyCheckMoneyObj && safetyCheckMoneyObj.data && safetyCheckMoneyObj.data.length) {
          this.safetyCheckMoney = safetyCheckMoneyObj.data[0].value

          seriesList.push({
            name: safetyCheckMoneyObj.name,
            yAxisIndex: 1,
            type: 'line',
            smooth: true,
            color: "#48cc9d",
            data: safetyCheckMoneyObj.data.reverse().map(i => i.value)
          })
        }

        res.data[0].data.forEach(item => {
          xAxisList.push(item.dataTime)
        })
      }
      const option = {
        title: {
          text: title,
          textStyle: {
            color: '#87aed8',
            fontSize: '15'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: (res && res.code == 200) ? '3%' : '10%',
          right: '4%',
          bottom: '3%',
          top: '28%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // boundaryGap: false,
          data: xAxisList.reverse(),
          axisLabel: {
            color: '#7a9bc3'
          },
        },
        yAxis: [
          {
            type: 'value',
            name: '单位（个/万元）',
            nameTextStyle: {
              color: '#7a9bc3'
            },
            axisLabel: {
              color: '#7a9bc3'
            },
            minorSplitLine: {
              lineStyle: {
                // 使用深浅的间隔色
                color: ['#aaa', '#ddd']
              }
            }
          },
          {
            type: 'value',
          }
        ],
        series: seriesList
      };

      const myChart = echarts.init(document.getElementById('safetyCheck'));
      myChart.setOption(option, true);
    },
    // 准入数据 - 进尽调企业数量
    async getTuneOut(intervalDay = 0) {
      const res = await getEntDueDili({ intervalDay })
      const xAxisList = []
      const seriesList = []
      if (res && res.code == 200) {
        if (res.data && res.data.data && res.data.data.length) {
          this.tuneOutCount = res.data.data[0].value
        }

        res.data.data.reverse().forEach(item => {
          xAxisList.push(item.dataTime)
        })

        res.data.data.forEach(item => {
          seriesList.push(item.value)
        })
      }
      const option = {
        title: {
          text: '已尽调企业数量',
          textStyle: {
            color: '#87aed8',
            fontSize: '15'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: (res && res.code == 200) ? '3%' : '10%',
          right: '8%',
          bottom: '3%',
          top: '28%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisList,
          axisLabel: {
            color: '#7a9bc3'
          },
        },
        yAxis: {
          type: 'value',
          name: '单位（个）',
          nameTextStyle: {
            color: '#7a9bc3'
          },
          axisLabel: {
            color: '#7a9bc3'
          },
          minorSplitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#aaa', '#ddd']
            }
          }
        },
        series: [
          {
            name: res.data.name,
            type: 'line',
            stack: 'Total',
            smooth: true,
            data: seriesList,
            color: "#e98e07"
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('tuneOut'));
      myChart.setOption(option, true);
    },
    // 规则分布 - 反欺诈命中规则分布
    async getAntiFeaud(intervalDay = 0) {
      const res = await getModelRuleDstr({ intervalDay })
      let yList = []
      let xList = []
      if (res && res.code == 200) {
        yList = res.data.data.slice(0, 5).map(item => item.name)
        xList = res.data.data.slice(0, 5).map(item => item.value)
      }
      const option = {
        title: {
          text: '反欺诈命中规则分布',
          textStyle: {
            color: '#87aed8',
            fontSize: '15'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: (res && res.code == 200) ? '30%' :'10%',
          right: '4%',
          bottom: '3%',
          top: '28%',
          containLabel: false
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: '#f0d1a9'
          },
          axisLine: {
            lineStyle: {
              color: '#f0d1a9'
            }
          }
        },
        yAxis: {
          type: 'category',
          // axisLine: { onZero: false },
          boundaryGap: true,
          data: yList,
          axisLabel: {
            color: '#f0d1a9',
            ellipsis: '...',
            width: 125,
            overflow: 'truncate',
            margin: 125,
            textStyle: {
              align: 'left',
            }
          },
          axisLine: {
            lineStyle: {
              color: '#f0d1a9'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 20,
            label: {
              show: true,
              position: 'right'
            },
            itemStyle: {
              borderRadius: [0, 50, 50, 0],
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#40372b' // 0% 处的颜色
                }, {
                    offset: 1, color: '#f1c103' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            },
            data: xList
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('antiFraudRule'));
      myChart.setOption(option, true);
    },
    // 规则分布 - 安检门模型命中规则分布
    async getSafetyCheckRule(intervalDay = 0) {
      const res = await getModelScrtGate({ intervalDay })
      let yList = []
      let xList = []
      if (res && res.code == 200) {
        yList = res.data.data.slice(0, 5).map(i => i.name)
        xList = res.data.data.slice(0, 5).map(item => item.value)
      }
      const option = {
        title: {
          text: '安检门模型命中规则分布',
          textStyle: {
            color: '#87aed8',
            fontSize: '15'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: (res && res.code == 200) ? '30%' :'10%',
          right: '4%',
          bottom: '3%',
          top: '28%',
          containLabel: false
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: '#f0d1a9',
          },
          axisLine: {
            lineStyle: {
              color: '#f0d1a9'
            }
          }
        },
        yAxis: {
          type: 'category',
          // axisLine: { onZero: false },
          boundaryGap: true,
          data: yList,
          axisLabel: {
            color: '#f0d1a9',
            ellipsis: '...',
            width: 125,
            overflow: 'truncate',
            margin: 125,
            textStyle: {
              align: 'left',
            }
          },
          axisLine: {
            lineStyle: {
              color: '#f0d1a9'
            }
          }
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right'
            },
            barWidth: 20,
            itemStyle: {
              borderRadius: [0, 50, 50, 0],
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#ffffff' // 0% 处的颜色
                }, {
                    offset: 1, color: '#ffccff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            },
            data: xList
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('safetyCheckRule'));
      myChart.setOption(option, true);
    },
    // 规则分布 - 业务风险识别模型明命中规则分布
    async getBusinessRiskRule(intervalDay = 0) {
      const res = await getModelBusiness({ intervalDay })
      let yList = []
      let xList = []
      if (res && res.code == 200) {
        yList = res.data.data.slice(0, 5).map(i => i.name)
        xList = res.data.data.slice(0, 5).map(item => item.value)
      }
      const option = {
        title: {
          text: '业务风险识别模型命中规则分布',
          textStyle: {
            color: '#87aed8',
            fontSize: '15'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: (res && res.code == 200) ? '30%' :'10%',
          right: '4%',
          bottom: '3%',
          top: '28%',
          containLabel: false
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            color: '#0783d9'
          },
          axisLine: {
            lineStyle: {
              color: '#0783d9'
            }
          }
        },
        yAxis: {
          type: 'category',
          boundaryGap: true,
          data: yList,
          axisLabel: {
            color: '#0783d9',
            ellipsis: '...',
            width: 125,
            overflow: 'truncate',
            margin: 125,
            textStyle: {
              align: 'left',
            }
          },
          axisLine: {
            lineStyle: {
              color: '#0783d9'
            }
          }
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'right'
            },
            barWidth: 20,
            itemStyle: {
              borderRadius: [0, 50, 50, 0],
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                    offset: 0, color: '#0199ff' // 0% 处的颜色
                }, {
                    offset: 1, color: '#99ccff' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
            },
            data: xList
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('businessRiskRule'));
      myChart.setOption(option, true);
    },
    // 数据统计
    async getDataStatistics() {
      const res = await getRiskLgScrnParm()
      if (res.code == 200) {
        this.dataStatis = res.data
      }
      // this.dataStatis.businessRiskCount = 55
      // this.dataStatis.nonPerformingAssetsRatio = 2
      // this.dataStatis.proportionRatio = res.data.connTransRate
    },
    // 单一债权人集中度
    async getConcentrationEcharts(intervalMonth = 0) {
      const res = await getRiskCreditorConc({ intervalMonth })
      const legendList = []
      const xAxisList = []
      const seriesList = []
      if (res && res.code == 200) {
        const obligorDetail = res.data.find(i => i.name == '债务人')
        if (obligorDetail && obligorDetail.data && obligorDetail.data.length) {
          this.concentration.obligorCount = res.data.find(i => i.name == '债务人').data[0].value

          seriesList.push({
            name: obligorDetail.name,
            type: 'line',
            smooth: true,
            // showSymbol: false,
            color: '#ffcc00',
            data: obligorDetail.data.reverse().map(i => i.value),
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#ffcc00'
                },
                {
                  offset: 1,
                  color: '#46cc00'
                }
              ])
            },
          })
        }
        
        const creditorDetail = res.data.find(i => i.name == '债权人')
        if (creditorDetail && creditorDetail.data && creditorDetail.data.length) {
          this.concentration.creditorCount = res.data.find(i => i.name == '债权人').data[0].value

          seriesList.push({
            name: creditorDetail.name,
            type: 'line',
            smooth: true,
            // showSymbol: false,
            color: "#63f5f6",
            data: creditorDetail.data.reverse().map(i => i.value),
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: '#60e8ea'
                },
                {
                  offset: 1,
                  color: '#1d2e46'
                }
              ])
            },
          })
        }

        res.data.forEach(item => {
          legendList.push(item.name)
        })

        res.data[0].data.forEach(item => {
          xAxisList.push(item.dataTime)
        })
      }
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '28%',
          containLabel: true
        },
        legend: {
          data: legendList,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'category',
          data: xAxisList.reverse(),
          axisLabel: {
            color: '#7a9bc3'
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
        },
        series: seriesList
      };
      const myChart = echarts.init(document.getElementById('echarts'));
      myChart.setOption(option, true);
    },
    // 主体评级分布
    async getScore(intervalDay = 0) {
      const res = await getMainGradeDstr({ intervalDay })
      let xList = []
      let seriesList = []
      if (res && res.code == 200) {
        xList = res.data.data.reverse().map(item => item.name)
        seriesList = res.data.data.map(item => item.value)
      }
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '0%',
          top: '28%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xList,
          axisLabel: {
            color: '#7a9bc3'
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#fff'
          },
        },
        series: [
          {
            name: '主体评级分布',
            type: 'bar',
            itemStyle: {
              borderRadius: 50
            },
            barWidth: 20,
            color: "#2aafea",
            data: seriesList
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('score'));
      myChart.setOption(option, true);
    },
    debounce(fun, delay) {
      return function (args) {
        let that = this;
        let _args = args;
        clearTimeout(fun.id);
        fun.id = setTimeout(function () {
          fun.call(that, _args);
        }, delay);
      }
    }
  },
  beforeDestroy() {
    if (this.hourId) {
      clearInterval(this.hourId)
    }
  }
})