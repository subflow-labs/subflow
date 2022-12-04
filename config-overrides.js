
const webpack = require('webpack');

module.exports = function override(config) { 
  const fallback = config.resolve.fallback || {}; 
  Object.assign(fallback, { 
    "crypto": require.resolve("crypto-browserify"), 
    "stream": require.resolve("stream-browserify"), 
    "assert": require.resolve("assert"), 
    "http": require.resolve("stream-http"), 
    "https": require.resolve("https-browserify"), 
    "os": require.resolve("os-browserify"), 
    "url": require.resolve("url"),
    "buffer": require.resolve("buffer"),
    "zlib": require.resolve("browserify-zlib"),
    "path": require.resolve("path-browserify") 
    }) 
 config.resolve.fallback = fallback;
 config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"] 
 config.plugins = (config.plugins || []).concat([ 
   new webpack.ProvidePlugin({ 
    process: 'process/browser', 
    Buffer: ['buffer', 'Buffer'] 
  }) 
 ]) 

 config.module.rules.push({
  test: /\.m?js/,
  resolve: {
      fullySpecified: false
  }
})

 return config; }

/*
module.exports = function override (config, env) {
  console.log('override')
  let loaders = config.resolve
  loaders.fallback = {
      "fs": false,
      "tls": false,
      "net": false,
      "http": require.resolve("stream-http"),
      "https": false,
      "zlib": require.resolve("browserify-zlib") ,
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "crypto": require.resolve("crypto-browserify")
  }

  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
        fullySpecified: false
    }
  })
  
  return config
}*/



/*
module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, { 
    	"crypto": require.resolve("crypto-browserify"), 
      "stream": require.resolve("stream-browserify"), 
      "assert": require.resolve("assert"), 
      "http": require.resolve("stream-http"), 
      "https": require.resolve("https-browserify"), 
      "os": require.resolve("os-browserify"), 
      "url": require.resolve("url") 
      }) 
   config.resolve.fallback = fallback; 
   config.plugins = (config.plugins || []).concat([ 
   	new webpack.ProvidePlugin({ 
    	process: 'process/browser', 
      Buffer: ['buffer', 'Buffer'] 
    }) 
   ]) 
   return config; }*/

   
