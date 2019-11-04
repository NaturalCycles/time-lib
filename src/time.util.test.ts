import { mockTime } from '@naturalcycles/test-lib'
import { ms, since } from './time.util'

beforeEach(() => {
  mockTime()
})

test('since', () => {
  expect(since(1000, 1001)).toBe('1 ms')
  expect(since(1000, 1010)).toBe('10 ms')
})

test('ms', () => {
  expect(ms(1)).toBe('1 ms')
  expect(ms(10)).toBe('10 ms')
  expect(ms(1005)).toBe('1.005 sec')
  expect(ms(49123)).toBe('49 sec')
  expect(ms(69123)).toBe('1m9s')
  expect(ms(69500)).toBe('1m10s')
  expect(ms(3599500)).toBe('1h0m0s')
  expect(ms(3600000)).toBe('1h0m0s')
  expect(ms(3732000)).toBe('1h2m12s')
})
