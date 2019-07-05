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

test('today', () => {
  console.log(dayjs().isoWeekday())
})
