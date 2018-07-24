let HtmlWebpackPlugin = require("html-webpack-plugin");
let package = require("./package.json");

module.exports = {
    mode: "production",  //set production when release, development when debug
    //watch: true,
    optimization: {
        splitChunks: {
            chunks: "all",
            name: "ownModules",
            cacheGroups: {
                jquery: {
                    name: "jquery",
                    test: /[\\/]node_modules[\\/]jquery[\\/]/,
                    chunks: "all",
                    minChunks: 2
                },
                lodash: {
                    name: "lodash",
                    test: /[\\/]node_modules[\\/]lodash[\\/]/,
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    resolve: {
        extensions: [".js"]
    },
    entry: {
        app: "./src/scripts/app.js",
        app2: "./src/scripts/app2.js"
    },
    output: {
        filename: "./js/[name].bundle.js" //default start at dist root 
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/, 
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/, 
                loaders: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/, 
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: "My Awesome application",
            myPageHeader: "Hello World",
            template: "./src/index.html",
            filename: "./index.html", //default start at dist root 
            chunks: ["app", "jquery", "lodash", "ownModules"]
            //Object.keys(this.optimization.cacheGroups).shift().push("app2")
        }),
        new HtmlWebpackPlugin({
            hash: true,
            title: "My Awesome application",
            myPageHeader: "Hello World",
            template: "./src/index.html",
            filename: "./index2.html", //default start at dist root 
            chunks: ["app", "jquery", "lodash", "ownModules"]
        })
    ]
}