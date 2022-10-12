const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'app.js'), // 번들 작업할 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들화 된 파일 경로
    filename: 'bundle.js' // 파일 명
  },
  watch: true // 자동 번들화 작업 여부
}

// webpack.config.js 파일