module.exports = {
  ...require('@naturalcycles/dev-lib/cfg/jest.config'),
  transform: {
    // Babel is needed to transform *.js from src/vendor/dayjs
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
}
