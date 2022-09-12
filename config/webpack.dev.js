const { merge } = require('webpack-merge')
const path = require('path')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')

const devConfig = {
    entry: './src/index',
    mode: 'development', 
    output: {
        publicPath: 'http://localhost:8080/'
    }, 
    devServer: {
        port: 8080,
        static: {
            directory: path.join(__dirname, 'dist')
        }, 
        historyApiFallback: true,
        open: true
    }, 
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            // Este es el identificador utilizado por la aplicación contenedora para conectarse con esta aplicación
            name: 'remote', 
            // Así es como se llamará el script de la aplicación, es una convención
            filename: 'remoteEntry.js',
            // Enumeramos los componentes que vamos a exponer
            exposes: {
                './App': './src/App',
            }, 
            // Usarmos las mismas dependencias que los packages json, además que aquí podemos colocar las versiones de las dependecias que deseamos compartir.
            shared: packageJson.dependencies
        })
    ]
}

module.exports = merge(commonConfig, devConfig)