const Path = require("path")
const HtmlPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.tsx",
    output: {
      filename: "bundle.js",
      path: Path.join(__dirname, "/dist")
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    devServer: {
      historyApiFallback: true,
    },
    module:{
        rules:[
            {
                test: /\.(ts|js)x?$/,
                exclude: "/node_modules/",
                use: {
                  loader: "swc-loader",
                  options: {
                    jsc: {
                      loose: true,
                      target: "es2016",
                      parser: {
                        syntax: "typescript",
                        tsx: true,
                        decorators: true,
                        dynamicImport: true
                      }
                    }
                  }
                }
              },
            {
                test:/\.css$/i,
                use:["style-loader","css-loader"]
            },
            {
                test:/\.s[ac]ss$/i,
                use:["style-loader","css-loader","sass-loader"]
            },
            {
                test:/\.html$/,
                use:{
                    loader:"html-loader"
                }
            }
        ]
    },
    plugins:[
        new HtmlPlugin({
            template:"./public/index.html"
        })
    ]
}