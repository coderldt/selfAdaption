new Vue({
    el: '#app',
    data: {
      width: '1800px', // 需要显示的屏幕宽度
      height: `1080px`, // 需要显示的屏幕高度
      scale: 1,
    },
    created() {
      const setScale = this.debounce(() => {
        let ww = window.innerWidth / 1920
        let wh = window.innerHeight / 1080
        this.scale = ww < wh ? ww - 0.04 : wh - 0.04
      }, 500)
      setScale()
      window.addEventListener('resize', setScale)
    },
    mounted() {},
    computed: {},
    methods: {
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