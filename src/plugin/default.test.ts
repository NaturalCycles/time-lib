import { mockTime, MOCK_TS_2018_06_21 } from '@naturalcycles/dev-lib/dist/testing'
import * as dayjs from 'dayjs'
import { TS_2018_06_21 } from '../time.util'
import { defaultPlugins } from './default'
dayjs.extend(defaultPlugins)

const DAYJS_2018_06_21 = dayjs.unix(TS_2018_06_21)

beforeEach(() => {
  mockTime()
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

test('isoToDayjs', () => {
  expect(dayjs('2018-06-21').isSame(DAYJS_2018_06_21)).toBe(true)
  expect(dayjs('2018-06-21')).toEqual(DAYJS_2018_06_21)
  expect(dayjs('2018-06-21').unix()).toBe(DAYJS_2018_06_21.unix())
})

test('toISODate', () => {
  expect(DAYJS_2018_06_21.toISODate()).toBe('2018-06-21')
  expect(dayjs().toISODate()).toBe('2018-06-21')
  expect(dayjs('2017-03-14').toISODate()).toBe('2017-03-14')
})

test('toPretty', () => {
  expect(DAYJS_2018_06_21.toPretty()).toBe('2018-06-21 00:00:00')
  expect(DAYJS_2018_06_21.toPretty(false)).toBe('2018-06-21 00:00')
  expect(dayjs().toPretty()).toBe('2018-06-21 00:00:00')
  expect(dayjs('2017-03-14').toPretty()).toBe('2017-03-14 00:00:00')
})

test('toCompactTime', () => {
  expect(DAYJS_2018_06_21.toCompactTime()).toBe('20180621_0000')
  expect(DAYJS_2018_06_21.toCompactTime(false)).toBe('20180621_0000')
  expect(DAYJS_2018_06_21.toCompactTime(true)).toBe('20180621_000000')
  expect(DAYJS_2018_06_21.toCompactDate()).toBe('20180621')
})

test('today', () => {
  expect(dayjs().today().valueOf()).toBe(dayjs().startOf('day').valueOf())
  expect(dayjs().today().toISODate()).toBe(dayjs().startOf('day').toISODate())
})
