const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const package = require("./package.json");
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');
const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);

let cacheGroupsObject = {};

let dependencies = Object.keys(package.dependencies);
dependencies.forEach(element => {
    cacheGroupsObject[element] = {
        name: element,
        test: RegExp("[\\\\/]node_modules[\\\\/]" + element + "[\\\\/]"),
        chunks: "all",
        minChunks: 2
    }
});

let ownLib = getDirectories("./src/scripts/lib");
ownLib.forEach(element => {
    element = element.split("\\").pop();
    cacheGroupsObject[element] = {
        name: element,
        test: RegExp("[\\\\/]src[\\\\/]scripts[\\\\/]lib[\\\\/]" + element + "[\\\\/]"),
        chunks: "all",
        minChunks: 2,
        //minSize => Minimum size, in bytes, for a chunk to be generated. 
    }
    dependencies.push(element)
});

module.exports = {
    mode: "production",  //set production when release, development when debug
    watch: false,
    optimization: {
        splitChunks: {
            cacheGroups: cacheGroupsObject
        }
    },
    resolve: {
        extensions: [".js"]
    },
    entry: {
        app: "./src/scripts/app.js"
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
            template: "./src/index.html",
            filename: "./index.html", //default start at dist root 
            chunks: [...dependencies, ...["app"]]
        }),
        new CopyWebpackPlugin([
            {
              from: './src/images/',
              to: './images/[name].[ext]',
              toType: 'template'
            }
        ])
    ]
}
