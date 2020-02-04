import * as dayjs from 'dayjs'
import { isoWeekdayPlugin } from './isoWeekday'
dayjs.extend(isoWeekdayPlugin)

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
