// 根据不同的环境更改不同的baseUrl
let baseUrl = ''

if (process.env.NODE_ENV === 'development') {
  baseUrl = ''
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'www.baidu.com/' // 生产地址
}
export { baseUrl }
