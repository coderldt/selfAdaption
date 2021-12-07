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
    count: 1180,
    // 进入数据企业数量
    accessDataCount: 0,
    safetyCheckCount: 0,
    safetyCheckMoney: 0,
    tuneOutCount: 0,
    dataStatis: {
      assetAtRisk: {
        name: '',
        value: 0
      },
      monCompNum: {
        name: '',
        value: 0
      },
      nonPerfAssetRto: {
        name: '',
        value: 0
      },
      connTransRate: {
        name: '',
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
      console.log(this.dataStatis.assetAtRisk);
      return String(this.dataStatis.assetAtRisk.value).split('').map(item => Number(item))
    }
  },
  methods: {
    // 项目风险事件次数
    async getBusinessTransactions(intervalDay = 0) {
      const res = await getProjRiskEventCnt({ intervalDay })
      if (res.code == 200) {
        const data = []
        res.data.forEach(item => {
          data.push({ value: item.value, name: item.name })
        })
        const option = {
          tooltip: {
            trigger: 'item'
          },
          title: {
            text: '项目风险时间次数',
            left: 'center',
            top: 20,
            textStyle: {
              color: '#fff'
            }
          },
          legend: {
            type: 'scroll',
            right: '5%',
            top: 'middle',
            orient: 'vertical',
            textStyle: {
              color: "#fff"
            }
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
        myChart.setOption(option);
      }
    },
    // 风险预警信号分布
    async getRiskWarning(intervalDay = 0) {
      const res = await getRiskWarnSignalDstr({ intervalDay })
      if (res.code == 200) {
        const data = []
        res.data.forEach(item => {
          data.push({ value: item.value, name: item.name })
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
            textStyle: {
              color: "#fff"
            }
          },
          series: [
            {
              type: 'pie',
              radius: ['40%', '60%'],
              center: ['40%', '50%'],
              // roseType: 'area',
              data
            }
          ]
        };

        const myChart = echarts.init(document.getElementById('riskWarning'));
        myChart.setOption(option);
      }
    },
    // 准入数据 - 进入数据统计
    async getAccessData(intervalDay = 0) {
      const res = await getEntPass({ intervalDay })
      
      const xAxisList = []
      const seriesList = []
      let title = '企业准入数据统计'
      if (res && res.code == 200) {
        this.accessDataCount = res.data.data[0].value

        res.data.data.reverse().forEach(item => {
          xAxisList.push(item.dataTime)
        })

        res.data.data.forEach(item => {
          seriesList.push(item.value)
        })

        title = res.data.name
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
          left: '3%',
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
      myChart.setOption(option);
    },
    // 准入数据 - 已过安检门数据
    async getSafetyCheck(intervalDay = 0) {
      const res = await getScrtGate({ intervalDay })

      const xAxisList = []
      const seriesList = []
      let title = '已过安检门数据/金额'
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
          left: '3%',
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
      myChart.setOption(option);
    },
    // 准入数据 - 进尽调企业数量
    async getTuneOut(intervalDay = 0) {
      const res = await getEntDueDili({ intervalDay })
      const xAxisList = []
      const seriesList = []
      let title = '尽调企业数量'
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

        title = res.data.name
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
          left: '3%',
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
      myChart.setOption(option);
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
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '28%',
          containLabel: true
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
            color: '#f0d1a9'
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
            data: xList
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('antiFraudRule'));
      myChart.setOption(option);
    },
    // 规则分布 - 安检门模型命中规则分布
    async getSafetyCheckRule(intervalDay = 0) {
      const res = await getModelScrtGate({ intervalDay })
      let yList = []
      let xList = []
      let title = '安检门模型'
      if (res && res.code == 200) {
        yList = res.data.data.slice(0, 5).map(i => i.name)
        xList = res.data.data.slice(0, 5).map(item => item.value)
        title = res.data.name
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
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '28%',
          containLabel: true
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
            color: '#f0d1a9'
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
            data: xList
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('safetyCheckRule'));
      myChart.setOption(option);
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
          text: '业务风险识别模型明命中规则分布',
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
          left: '-10%',
          right: '4%',
          bottom: '3%',
          top: '28%',
          containLabel: true
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
            overflow: 'truncate'
            // formatter: function (val) {
            //   return val.replace(/(.{9})/g, '$1\n')
            // },
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
            data: xList
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('businessRiskRule'));
      myChart.setOption(option);
    },
    // 数据统计
    async getDataStatistics() {
      const res = await getRiskLgScrnParm()
      if (res.code == 200) {
        this.dataStatis = res.data
        // this.dataStatis.businessRiskCount = 
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
        }
        
        const creditorDetail = res.data.find(i => i.name == '债权人')
        if (creditorDetail && creditorDetail.data && creditorDetail.data.length) {
          this.concentration.creditorCount = res.data.find(i => i.name == '债权人').data[0].value
        }

        res.data.forEach(item => {
          legendList.push(item.name)
        })

        res.data[0].data.forEach(item => {
          xAxisList.push(item.dataTime)
        })

        res.data.forEach(item => {
          seriesList.push({
            name: item.name,
            type: 'bar',
            data: item.data.reverse().map(i => i.value)
          })
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
      myChart.setOption(option);
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
            data: seriesList
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('score'));
      myChart.setOption(option);
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
})