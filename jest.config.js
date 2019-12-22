module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: [ "ts", "js" ],
    testRegex: "*.test.ts$",
    coverageDirectory: "coverage",
    coverageReporters: [ "text" ],
    testEnvironment: "node",
    collectCoverage: true
};
