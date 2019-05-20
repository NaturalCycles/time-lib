import { MOCK_TS_2018_06_21, mockTime } from '@naturalcycles/test-lib'
import { dayjs } from './index'
import { DAYJS_2018_06_21, ms, nowPretty, nowUnix, since, todayIso } from './time.util'

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
})

test('dayjs', () => {
  const now = dayjs()
  expect(now).toBeInstanceOf(dayjs)
  expect(now.toISOString()).toBe('2018-06-21T00:00:00.000Z')
  expect(DAYJS_2018_06_21.toISOString()).toBe('2018-06-21T00:00:00.000Z')
  expect(now.toJSON()).toBe('2018-06-21T00:00:00.000Z')
  expect(now.unix()).toBe(MOCK_TS_2018_06_21)
  expect(now.valueOf()).toBe(MOCK_TS_2018_06_21 * 1000)
  expect(Number(now)).toBe(MOCK_TS_2018_06_21 * 1000)
})

test('nowUnix', () => {
  expect(nowUnix()).toBe(MOCK_TS_2018_06_21)
})

test('nowPretty', () => {
  expect(nowPretty()).toBe('2018-06-21 00:00:00')
})

test('todayIso', () => {
  expect(todayIso()).toBe('2018-06-21')
})

test('isoToDayjs', () => {
  expect(dayjs('2018-06-21').isSame(DAYJS_2018_06_21)).toBe(true)
  expect(dayjs('2018-06-21')).toEqual(DAYJS_2018_06_21)
  expect(dayjs('2018-06-21').unix()).toBe(DAYJS_2018_06_21.unix())
})

test('utc', () => {
  expect(dayjs.utc().toISOString()).toBe('2018-06-21T00:00:00.000Z')

  // Not trivial, but isUTC is only true if it was created with .utc()
  expect(dayjs().isUTC()).toBe(false)
  expect(
    dayjs
      .utc()
      .local()
      .isUTC(),
  ).toBe(false)
  expect(dayjs.utc().isUTC()).toBe(true)
})

test('toISODate', () => {
  expect(DAYJS_2018_06_21.toISODate()).toBe('2018-06-21')
  expect(dayjs().toISODate()).toBe('2018-06-21')
  expect(dayjs('2017-03-14').toISODate()).toBe('2017-03-14')
})

test('toPretty', () => {
  expect(DAYJS_2018_06_21.toPretty()).toBe('2018-06-21 00:00:00')
  expect(dayjs().toPretty()).toBe('2018-06-21 00:00:00')
  expect(dayjs('2017-03-14').toPretty()).toBe('2017-03-14 00:00:00')
})

test('toCompactTime', () => {
  expect(DAYJS_2018_06_21.toCompactTime()).toBe('20180621_0000')
  expect(DAYJS_2018_06_21.toCompactTime(false)).toBe('20180621_0000')
  expect(DAYJS_2018_06_21.toCompactTime(true)).toBe('20180621_000000')
})
