new Vue({
  el: '#app',
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
    this.mapInit()
    this.getAssetStatistics()
    this.getChangeTrend()
    this.getRateWarning()
    this.getBusinessDistribution()
    this.getSpecies()
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
    getAssetStatistics() {
      this.assetStatistics.heads.push('统计项', '带融资资产', '平台资产', '累计发放资产', '在保资产')
      this.assetStatistics.total.push('累计笔数', '555', 155, 255, 355)
      this.assetStatistics.money.push('累计金额', '5972', 4444, 6666, 5500)
    },
    getChangeTrend() {
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
          name: '单位（万元）',
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
          },
          {
            name: 'Email1',
            type: 'line',
            stack: 'Total',
            data: [171, 126, 93, 36, 151, 104]
          },
          {
            name: 'Email2',
            type: 'line',
            stack: 'Total',
            data: [148, 4, 69, 113, 115, 44]
          },
          {
            name: 'Email3',
            type: 'line',
            stack: 'Total',
            data: [127, 4, 146, 72, 110, 62]
          },
        ]
      };

      const myChart = echarts.init(document.getElementById('changeTrend'));
      myChart.setOption(option);
    },
    getRateWarning() {
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
          boundaryGap: false,
          data: ['11/1', '11/2', '11/3', '11/4', '11/5', '11/6'],
          axisLabel: {
            color: '#7a9bc3'
          },
        },
        yAxis: {
          type: 'value',
          name: '单位（%）',
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
          },
          {
            name: 'Email1',
            type: 'line',
            stack: 'Total',
            data: [171, 126, 93, 36, 151, 104]
          },
          {
            name: 'Email2',
            type: 'line',
            stack: 'Total',
            data: [148, 4, 69, 113, 115, 44]
          },
          {
            name: 'Email3',
            type: 'line',
            stack: 'Total',
            data: [127, 4, 146, 72, 110, 62]
          },
        ]
      };

      const myChart = echarts.init(document.getElementById('rateWarning'));
      myChart.setOption(option);
    },
    getBusinessDistribution() {
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
          name: '单位（万元）',
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
          },
          {
            name: 'Email1',
            type: 'line',
            stack: 'Total',
            data: [171, 126, 93, 36, 151, 104]
          },
          {
            name: 'Email2',
            type: 'line',
            stack: 'Total',
            data: [148, 4, 69, 113, 115, 44]
          },
          {
            name: 'Email3',
            type: 'line',
            stack: 'Total',
            data: [127, 4, 146, 72, 110, 62]
          },
        ]
      };

      const myChart = echarts.init(document.getElementById('businessDistribution'));
      myChart.setOption(option);
    },
    getSpecies() {
      this.speciesList.push(
        { title: '正向保障', value: '111', unit: '万元' },
        { title: '反向保障', value: '100', unit: '万元' },
        { title: '到货保障', value: '100', unit: '万元' },
        { title: '星券', value: '100', unit: '万元' },
        { title: 'ABS/ABN', value: '100', unit: '万元' },
      )
    },
    getMainMoney() {
      this.totalFactoring = 1020
      this.totalABN = 1106
    },
    mapInit() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiY29kZXJsdG1iIiwiYSI6ImNrbWViOGQ4aDJ1MW0ycWp4MmlyOWkybjUifQ.eoR2Cs1QgekzXeyX6PqcPw';
      this.map = new mapboxgl.Map({
        container: 'map',
        style: {
          version: 8,
          sources: {},
          layers: [],
          center: [105.10792, 31.80715],
          zoom: 3.2305,
        },
        minZoom: 2.3,
        maxZoom: 4.5,
      });

      window.map = this.map

      this.map.on('load', () => {
        this.addLayer()
        this.addPointLayer()


        setTimeout(() => {

        })
      })
    },
    addLayer() {
      console.log();
      this.map.addSource('province', {
        'type': 'geojson',
        'data': areageojson
      })

      this.map.addLayer({
        source: 'province',
        id: 'provinceFill',
        type: "fill",
        "paint": {
          "fill-color": "#005281",
        }
      })

      this.map.addLayer({
        source: 'province',
        id: 'privinceLine',
        type: "line",
        "paint": {
          "line-color": "#fff",
        }
      })
    },
    addPointLayer() {
      const data = {
        "type": "FeatureCollection",
        "features": [{
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              114.27755355834961, 30.58989817188057,
            ]
          }
        }, {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [117.46850663775967, 32.06144965315211]
          }
        }, {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [119.041672209701, 36.21400681507957]
          }
        }, {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [114.31171417236328, 30.58842044495832]
          }
        }, {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [98.14104389468662, 25.818633679082637]
          }
        }, {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [95.51910127447832, 21.775730567358593]
          }
        }
        ]
      };
      this.map.addSource('point', {
        type: 'geojson',
        data
      })

      this.map.addLayer({
        id: 'point',
        source: 'point',
        type: 'circle',
        paint: {
          'circle-color': '#ffb74a',
          'circle-radius': 10
        }
      })
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