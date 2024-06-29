{
  "env"
    "es6" : true,
    "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "max-len": ["error", { "code": 80 }],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "never"],
    "no-unused-vars": ["error"],
    "semi": ["error", "always"]
  }
}
