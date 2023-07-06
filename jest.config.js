const jestConfig = {
    // [...]
    preset: "ts-jest/presets/default-esm",
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
        // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
        "^.+\\.m?[tj]sx?$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
    silent: false,
};
export default jestConfig;
