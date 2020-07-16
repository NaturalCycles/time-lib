import { expectResults } from '@naturalcycles/dev-lib/dist/testing'
import { dayjs } from '../dayjs.full'

test.each([
  ['2019-06-02', 7],
  ['2019-06-03', 1],
  ['2019-06-04', 2],
  ['2019-06-05', 3],
  ['2019-06-06', 4],
  ['2019-06-07', 5],
  ['2019-06-08', 6],
  ['2019-06-09', 7],
  ['2019-06-10', 1],
])('isoWeekday %s = %s', (date, expected) => {
  expect(dayjs(date).isoWeekday()).toBe(expected)
})

test.each([
  [5, '2019-07-12'],
  [6, '2019-07-13'],
  [7, '2019-07-14'],
  [1, '2019-07-15'],
  [2, '2019-07-16'],
  [3, '2019-07-17'],
  [4, '2019-07-18'],
] as [number, string][])('isoWeekday(%s) = %s', (isoWeekday, expected) => {
  const d = dayjs('2019-07-12')
  expect(d.isoWeekday(isoWeekday).format('YYYY-MM-DD')).toBe(expected)
})

test('today', () => {
  console.log(dayjs().isoWeekday())
})

const dates = [
  '2020-07-11', // sat
  '2020-07-12', // sun
  '2020-07-13', // mon
  '2020-07-14',
  '2020-07-15',
  '2020-07-16',
  '2020-07-17',
  '2020-07-18',
  '2020-07-19', // sun
  '2020-07-20', // mon
  '2020-07-21', // tue
]

test('isoWeekday(Monday)', () => {
  // should set it to the correct Monday of SAME WEEK
  expectResults(d => dayjs(d).isoWeekday(1).toISODate(), dates).toMatchSnapshot()
})
