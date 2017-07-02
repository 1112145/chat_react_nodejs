var path = require("path");

module.exports = {
  entry: [
    __dirname + '/src/main.jsx',
  ],
  output: {
    path: __dirname + '/dist/',
    publicPath: __dirname + '/dist/',
    filename: 'bundle.js'
  },
  externals: {
    jquery: 'jQuery',
    'socket.io-client': 'socket.io-client',
  },
  module: {
    loaders: [
      {test: /\.css$/,
        loader: "style-loader!css-loader"
        },
      {test: /\.scss$/, 
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
      {test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    alias: {
      chatbubble: path.resolve(__dirname,'src/components/chatbubble/','./chatbubble'),
      chatfeed: path.resolve(__dirname,'src/components/chatfeed/','./chatfeed'),
      chatinput: path.resolve(__dirname,'src/components/chatinput/','./chatinput'),
      chatlist: path.resolve(__dirname,'src/components/chatlist/','./chatlist'),
      chat: path.resolve(__dirname,'src/components/chat/','./chat'),
    },
    extensions: ['.js', '.jsx']
  },
  plugins: []
};