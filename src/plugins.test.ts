import { mockTime } from '@naturalcycles/dev-lib/dist/testing'
// import 'dayjs/plugin/isLeapYear' // ts compilation failure without this line

beforeEach(() => {
  mockTime()
})

test('empty', () => {})

// test('loadDayjsPlugins', () => {
//   // Before plugin is loaded
//   expect(() => dayjs().isLeapYear()).toThrow('not a function')
//
//   loadDayjsPlugins(['isLeapYear'])
//
//   // After plugin is loaded
//   expect(dayjs().isLeapYear()).toBe(false)
// })
