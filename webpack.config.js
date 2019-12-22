// @ts-check
const Path = require('path');

const getPathFromRoot = Path.resolve.bind(null, __dirname);

/** @type {(env: 'production' | 'development') => import('webpack').Configuration[]} */
module.exports = env => {

    /** @type {import('webpack').Configuration} */
    const common = {
        mode: env,
        optimization: { concatenateModules: true, minimize: false },
        target:  'node',
        devtool: 'source-map',
        resolve: { extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'] },
        module:  { rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }] }
    };
    return [
        {
            ...common,
            entry: {
                'injected/index': getPathFromRoot('ts/injected/index.ts'),
            },
            output: {
                path: getPathFromRoot('build'),
                filename: '[name].js',
                library: 'module.exports.Emu',
                libraryTarget: 'assign'
            },
        },{
            ...common,
            entry: {
                'static/index':   getPathFromRoot('ts/static/index.ts'),
                'codegen/index':  getPathFromRoot('ts/codegen/index.ts')
            },
            output: {
                path: getPathFromRoot('build'),
                filename: '[name].js',
                libraryTarget: 'commonjs'
            },
        }
    ];
};
