axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

let ajax = {
  get: function({ url, data = {}, header = {} }) {
		let query = ''
		Object.entries(data).forEach(([key, values]) => {
			query += `${key}=${values}&`
		})
		
		let finallyUrl = url
		if (query) {
			finallyUrl += `${query.slice(0, -1)}`
		}
		return this.ajax({ url: finallyUrl, header })
  },
  post: function({ url, data, header = {} }) {
    return this.ajax({ url, data, method: 'POST', header })
  },
  ajax({ method = 'GET', url = '', data = {}, header }) {
    return new Promise((resolve, reject) => {
      const headers = Object.assign({}, header, { token: sessionStorage.getItem('token') })
      axios.request({ method, url, data, headers }).then(res => {
        resolve(res)
      }, (err) => {
        reject(error)
      })
    })
  }
}