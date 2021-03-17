const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
//npm i -D cross-env
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const plugins = () =>{
 let   base = [
        //plugin takes content from our html, and adds it to the content of the html file in "dist"
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname,('./src/index.html')),
            minify:{
                collapseWhiteSpace:isProd
            }
        }),
        //plugin clear dist
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/204441_normal.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ]
    if(isProd)
    {
    base.push(new BundleAnalyzerPlugin() )
    }

    return base
}
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        },
    }
    if(isProd)
    {
        config.minimizer = [
    new OptimizeCssWebpackPlugin(),
    new TerserWebpackPlugin()

        ]
    }

        return config


}
module.exports = {
    // this shit sometimes has problems(context)
    // context: path.resolve(__dirname,'src')
    //application mode

    mode: process.env.NODE_ENV,
    //entry point
    entry: {
        main:['@babel/polyfill','./src/index.jsx']
    },
    //finally compiled code
    output: {
        //pattern
        filename: '[name].[contenthash].js',
        //path
        path: path.resolve(__dirname,'dist')
    },
    resolve: {
        //default extensions
        extensions: ['.js','.json','ts'],
        alias: {
            //alias for path
        "@models": path.resolve(__dirname,'src/models')
        }
    },
    optimization:optimization(),
    devtool: !isDev ? false : 'source-map',
    devServer: {
        port:4200
    },
    plugins: plugins(),
    module: {
        rules:[
            {
                //For reading css
                //npm i -D css-loader
                test:/\.css$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                    options: {

                    }
                },
                    'css-loader'
                ]
            },
            {
                //For reading less
                //npm i -D less-loader
                test:/\.less$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                    options: {

                    }
                },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                //For reading sass
                //npm i -D sass-loader
                test:/\.s[ac]ss$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
                    options: {

                    }
                },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                //For reading files
                //npm i -D file-loader
                test: /\.(ico|jpg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',

            },
            {
                //For reading xml
                //npm i -D xml-loader
                test:/\.xml$/,
                use:['xml-loader']
            },
            {
                //For reading csv
                //npm i -D csv-loader
                test:/\.csv$/,
                use:['csv-loader']
            },
            //For reading babel
            //npm i -D @babel/plugin-proposal-class-properties
            //npm i -D @babel/preset-env
            //npm i -D babel-loader
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins:[
                            '@babel/plugin-proposal-class-properties'
                        ]
                    },

                }
            },
            {
                //For reading typescript
                //npm i -D @babel/plugin-proposal-class-properties
                //npm i -D @babel/preset-env
                //npm i -D @babel/preset-typescript'
                //npm i -D babel-loader
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-typescript'],
                        plugins:[
                            '@babel/plugin-proposal-class-properties'
                        ]
                    },

                }
            },
            {
                //For reading jsx
                //npm i -D @babel/plugin-proposal-class-properties
                //npm i -D @babel/preset-env
                //npm i -D '@babel/preset-react'
                //npm i -D babel-loader
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react'],
                        plugins:[
                            '@babel/plugin-proposal-class-properties'
                        ]
                    },

                }
            }
        ]
    }
}
