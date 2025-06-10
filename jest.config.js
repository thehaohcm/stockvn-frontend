module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/tests/unit/__mocks__/fileMock.js'
  },
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.js'
  ]
}