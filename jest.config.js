/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsConfig: 'tsconfig.json',
        },
    },
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '/var/ts_algorithms_practice/src/$1',
    },
};