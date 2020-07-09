module.exports = {
    "env": {
        "browser": false,
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
    ],
    "extends": ["airbnb-typescript"],
    "rules": {
        "linebreak-style": "off",
		"no-use-before-define": ["error", { "variables": false }],
        "indent": "off",
        "@typescript-eslint/indent": ["error", 4],
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "max-len": ["error", { "code": 150 }],
        "import/no-cycle": "off",
        "no-plusplus": "off",
        "no-restricted-globals": "off",
        "no-param-reassign": "off",
        "no-confusing-arrow": "off",
    },
};
