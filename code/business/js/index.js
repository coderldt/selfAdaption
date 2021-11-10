new Vue({
  el: '#app',
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
      businessRiskCount: 0,
      nonPerformingAssetsRatio: 2,
      proportionRatio: 10
    },
    concentration: {
      obligorCount: 0,
      creditorCount: 0,
    }
  },
  created() {
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
    this.getConcentrationEcharts()
    this.getScore()
  },
  computed: {
    formatCount() {
      return String(this.count).split('')
    }
  },
  methods: {
    getBusinessTransactions() {
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
            name: 'Access From',
            type: 'pie',
            center: ['40%', '55%'],
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '诉讼' },
              { value: 735, name: '行政处罚' },
              { value: 580, name: '舆情' },
              { value: 735, name: '行政处罚' },
              { value: 580, name: '舆情' },
              { value: 735, name: '行政处罚' },
              { value: 580, name: '舆情' },
              { value: 735, name: '行政处罚' },
              { value: 580, name: '舆情' },
            ]
          }
        ]
      };
      const myChart = echarts.init(document.getElementById('businessTransactions'));
      myChart.setOption(option);
    },
    getRiskWarning() {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
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
            name: 'Area Mode',
            type: 'pie',
            radius: ['40%', '60%'],
            center: ['40%', '50%'],
            // roseType: 'area',
            data: [
              { value: 15, name: '高风险信息（15）' },
              { value: 5, name: '风险信息（5）' },
              { value: 10, name: '警示信息（10）' },
              { value: 20, name: '提示信息（20）' },
            ]
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('riskWarning'));
      myChart.setOption(option);
    },
    getAccessData() {
      this.accessDataCount = 20
      const option = {
        title: {
          text: '进入数据统计',
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
          boundaryGap: false,
          data: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6'],
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
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230]
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('accessData'));
      myChart.setOption(option);
    },
    getSafetyCheck() {
      this.safetyCheckCount = 30
      this.safetyCheckMoney = 200
      const option = {
        title: {
          text: '已过安检门数据/金额',
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
          boundaryGap: false,
          data: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6'],
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
            inverse: true
          }
        ],
        series: [
          {
            name: 'Email',
            yAxisIndex: 0,
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230]
          },
          {
            name: 'Emails',
            yAxisIndex: 1,
            type: 'line',
            stack: 'Total',
            data: [230, 90, 134, 101, 132, 120]
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('safetyCheck'));
      myChart.setOption(option);
    },
    getTuneOut() {
      this.tuneOutCount = 20
      const option = {
        title: {
          text: '进尽调企业数量',
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
          boundaryGap: false,
          data: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6'],
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
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230]
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('tuneOut'));
      myChart.setOption(option);
    },
    getAntiFeaud() {
      const yList = [
        '企业身份验证不一致', '企业存在破产记录', '企业存在债券违约', '企业失信被执行', '企业身份验证不一致'
      ]
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
            name: '2011',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('antiFraudRule'));
      myChart.setOption(option);
    },
    getSafetyCheckRule() {
      const yList = [
        '企业身份验证不一致', '企业存在破产记录', '企业存在债券违约', '企业失信被执行', '企业身份验证不一致'
      ]
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
            name: '2011',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('safetyCheckRule'));
      myChart.setOption(option);
    },
    getBusinessRiskRule() {
      const yList = [
        '企业身份验证不一致', '企业存在破产记录', '企业存在债券违约', '企业失信被执行', '企业身份验证不一致'
      ]
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
          left: '3%',
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
          // axisLine: { onZero: false },
          boundaryGap: true,
          data: yList,
          axisLabel: {
            color: '#0783d9'
          },
          axisLine: {
            lineStyle: {
              color: '#0783d9'
            }
          }
        },
        series: [
          {
            name: '2011',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('businessRiskRule'));
      myChart.setOption(option);
    },
    getDataStatistics() {
      this.dataStatis.businessRiskCount = 55
      this.dataStatis.nonPerformingAssetsRatio = 2
      this.dataStatis.proportionRatio = 20
    },
    getConcentrationEcharts() {
      this.concentration.obligorCount = 4
      this.concentration.creditorCount = 3
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
          data: ['obligor', 'creditor'],
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'category',
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
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
            name: 'obligor',
            type: 'bar',
            data: [120, 132, 101, 134, 90, 230, 500]
          },
          {
            name: 'creditor',
            type: 'bar',
            data: [120, 132, 101, 134, 90, 230, 500]
          }
        ]
      };

      const myChart = echarts.init(document.getElementById('echarts'));
      myChart.setOption(option);
    },
    getScore() {
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
        xAxis: {
          type: 'category',
          data: ['AAAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC', 'CC', 'C'],
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
            name: 'obligor',
            type: 'bar',
            data: [120, 132, 101, 134, 90, 230, 500, 155, 299]
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
  watch: {

  }
})