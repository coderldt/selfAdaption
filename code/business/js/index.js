const distributionSort = ['正向保理', '反向保理', '到货保理', '星券', 'ABS/ABN']
const distributionColorSort = ['#ccffab', '#3d3dff', '#ffb252', '#008000', '#66ffff']
const router = new VueRouter()
new Vue({
  el: '#app',
  router,
  data: {
    width: '1800px',
    height: `1080px`,
    scale: 1,
    optimalRatio: 1.67,
    time: {
      day: '',
      week: '',
      hour: ''
    },
    assetStatistics: {
      heads: [],
      total: [],
      money: []
    },
    speciesList: [],
    speciesColor: ['#4657ec', '#07fcfb', '#ffb74a', '#f0d2ab', '#4ccf96'],
    totalFactoring: 0,
    totalABN: 0,
    map: null,
    hourId: null,
    dateList,
    changeTrendValue: defaultValue,
    businessDistributionValue: defaultValue,
    rateWarningValue: defaultValue,
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
    }, 500)
    setScale()
    window.addEventListener('resize', setScale)
  },
  mounted() {
    this.time.day = dayjs().format('YYYY年MM月DD日')
    this.time.week = `星期${['一', '二', '三', '四', '五', '六', '日'][dayjs().get('day') - 1]}`
    this.hourId = setInterval(()=>{
      this.time.hour = dayjs().format('YYYY-MM-DD HH:mm:ss');
    }, 1000);
    // this.mapInit()
    this.getAssetStatistics()
    this.getChangeTrend()
    this.getRateWarning()
    this.getBusinessDistribution()
    // this.getSpecies()
    this.getMainMoney()
  },
  computed: {
    formatCount() {
      return String(this.count).split('')
    },
    getCurrentStyle() {
      return function (index) {
        const color = this.speciesColor[index]
        return {
          color,
          border: '3px solid ' + color,
          'box-shadow': `inset 0px 0px 13px ${color}99`
        }
      }
    },
  },
  methods: {
    // 资产数据统计
    async getAssetStatistics() {
      const res = await getAssetTot()
      if (res && res.code == 200) {
        const head = ['统计项']
        const total = ['累计笔数']
        const money = ['累计金额']
        res.data.forEach(item => {
          head.push(item.typeName)
          total.push(item.assetNum)
          money.push(item.assetAmt)
        })
        this.assetStatistics.heads = head
        this.assetStatistics.total = total
        this.assetStatistics.money = money
      }
      // this.assetStatistics.heads.push('统计项', '带融资资产', '平台资产', '累计发放资产', '在保资产')
      // this.assetStatistics.total.push('累计笔数', '555', 155, 255, 355)
      // this.assetStatistics.money.push('累计金额', '5972', 4444, 6666, 5500)
    },
    // 业务发放金额变化趋势
    async getChangeTrend(intervalDay = 0) {
      const res = await getBizAmt({ intervalDay })
      const xAxisList = []
      const seriesList = []
      if (res && res.code == 200) {
        res.data[0].data.forEach(item => {
          xAxisList.push(item.dataTime)
        })

        distributionSort.forEach((key, index) => {
          const obj = res.data.find(i => i.name === key)
          if (obj) {
            seriesList.push({
              name: obj.name,
              type: 'line',
              stack: 'Total',
              data: obj.data.reverse().map(i => i.value),
              color: distributionColorSort[index]
            })
          } 
        })
      }
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          right: 0
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
          data: xAxisList.reverse(),
          axisLabel: {
            color: '#fff'
          },
        },
        yAxis: {
          type: 'value',
          name: '单位（元）',
          nameTextStyle: {
            color: '#fff'
          },
          axisLabel: {
            color: '#fff'
          },
          minorSplitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#aaa', '#ddd']
            }
          }
        },
        series: seriesList
      };

      const myChart = echarts.init(document.getElementById('changeTrend'));
      myChart.setOption(option);
    },
    // 不良率预警
    async getRateWarning(intervalDay = 0) {
      const res = await getBadRto({ intervalDay })
      const xAxisList = []
      const seriesList = []
      if (res.code == 200) {
        res.data[0].data.forEach(item => {
          xAxisList.push(item.dataTime)
        })

        distributionSort.forEach((key, index) => {
          const obj = res.data.find(i => i.name === key)
          if (obj) {
            seriesList.push({
              name: obj.name,
              type: 'bar',
              data: obj.data.reverse().map(i => i.value),
              barWidth: 20,
              color: distributionColorSort[index]
            })
          } 
        })
      }
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxisList.reverse(),
          axisLabel: {
            color: '#fff'
          },
        },
        yAxis: {
          type: 'value',
          name: '单位（%）',
          nameTextStyle: {
            color: '#fff'
          },
          axisLabel: {
            color: '#fff'
          },
          minorSplitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#aaa', '#ddd']
            }
          }
        },
        series: seriesList
      };

      const myChart = echarts.init(document.getElementById('rateWarning'));
      myChart.setOption(option);
    },
    // 业务发放笔变化趋势
    async getBusinessDistribution(intervalDay = 0) {
      const res = await getBizCnt({ intervalDay })
      const xAxisList = []
      const seriesList = []
      if (res.code == 200) {
        res.data[0].data.forEach(item => {
          xAxisList.push(item.dataTime)
        })

        distributionSort.forEach((key, index) => {
          const obj = res.data.find(i => i.name === key)
          if (obj) {
            seriesList.push({
              name: obj.name,
              type: 'line',
              stack: 'Total',
              data: obj.data.reverse().map(i => i.value),
              color: distributionColorSort[index]
            })
          } 
        })
      }
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          textStyle: {
            color: '#fff'
          },
          right: 0
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
          data: xAxisList.reverse(),
          axisLabel: {
            color: '#fff'
          },
        },
        yAxis: {
          type: 'value',
          name: '单位（万元）',
          nameTextStyle: {
            color: '#fff'
          },
          axisLabel: {
            color: '#fff'
          },
          minorSplitLine: {
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#aaa', '#ddd']
            }
          }
        },
        series: seriesList
      };

      const myChart = echarts.init(document.getElementById('businessDistribution'));
      myChart.setOption(option);
    },
    // 分类统计
    // 三十天内到期业务金额
    async getMainMoney() {
      const res = await getMonDueBizAmt()
      this.totalFactoring = '0元'
      this.totalABN = '0元'
      if (res && res.code == 200) {
        const data = res.data
        this.totalFactoring = Number.parseFloat(data.factTotAmt.value)
        this.totalABN = Number.parseFloat(data.absTotAmt.value)
        this.speciesList = [
          { title: data.factAmt.name, value: Number.parseFloat(data.factAmt.value), unit: '万元' }, // 正向保障
          { title: data.revFactAmt.name, value: Number.parseFloat(data.revFactAmt.value), unit: '万元' }, // 反向保障
          { title: data.aogAmt.name, value: Number.parseFloat(data.aogAmt.value), unit: '万元' }, // 到货保障
          { title: data.secAmt.name, value: Number.parseFloat(data.secAmt.value), unit: '万元' }, // 星券
          { title: data.absAmt.name, value: Number.parseFloat(data.absAmt.value), unit: '万元' }, // ABS/ABN
        ]
      }
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