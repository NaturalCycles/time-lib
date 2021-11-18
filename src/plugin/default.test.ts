import { mockTime, MOCK_TS_2018_06_21 } from '@naturalcycles/dev-lib/dist/testing'
import { _range } from '@naturalcycles/js-lib'
import { dayjs } from '../dayjs.full'

const DAYJS_2018_06_21 = dayjs.unix(MOCK_TS_2018_06_21)

beforeEach(() => {
  mockTime()
})

test('dayjs', () => {
  const now = dayjs()
  expect(now).toBeInstanceOf(dayjs)
  expect(now.toDate().toISOString()).toBe('2018-06-21T00:00:00.000Z')
  expect(DAYJS_2018_06_21.toDate().toISOString()).toBe('2018-06-21T00:00:00.000Z')
  expect(now.format()).toBe('2018-06-21T00:00:00+00:00')
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
  expect(dayjs('2020-03-05').toISODate()).toBe('2020-03-05')

  // "Interesting" edge case:
  expect(dayjs('0023-03-14').toISODate()).toBe('1923-03-14')

  // This tests the "fast" .toISODate() implementation vs stock .format implementation
  const startDate = '1984-06-21'
  _range(100)
    .map(i => dayjs(startDate).add(i, 'day').toISODate())
    .forEach(date => {
      expect(dayjs(date).toISODate()).toBe(dayjs(date).format('YYYY-MM-DD'))
    })
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
