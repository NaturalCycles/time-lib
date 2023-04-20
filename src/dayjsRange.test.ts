import { _shuffle } from '@naturalcycles/js-lib'
import {
  dayjsEarliest,
  dayjsLatest,
  dayjsRange,
  dayjsRangeIncl,
  dayjsRangeInclISODate,
  dayjsRangeISODate,
  dayjsRangeSeq,
} from './dayjsRange'

test('dayjsRange', () => {
  expect(dayjsRangeISODate('2021-12-24', '2021-12-26')).toMatchInlineSnapshot(`
    [
      "2021-12-24",
      "2021-12-25",
    ]
  `)

  expect(dayjsRangeInclISODate('2021-12-24', '2021-12-26')).toMatchInlineSnapshot(`
    [
      "2021-12-24",
      "2021-12-25",
      "2021-12-26",
    ]
  `)

  expect(dayjsRangeISODate('2021-12-24', '2021-12-30', 2)).toMatchInlineSnapshot(`
    [
      "2021-12-24",
      "2021-12-26",
      "2021-12-28",
    ]
  `)

  expect(dayjsRangeInclISODate('2021-12-24', '2021-12-30', 2)).toMatchInlineSnapshot(`
    [
      "2021-12-24",
      "2021-12-26",
      "2021-12-28",
      "2021-12-30",
    ]
  `)

  expect(dayjsRange('2021-12-24', '2021-12-26', 4, 'hour').map(d => d.toPretty(false)))
    .toMatchInlineSnapshot(`
      [
        "2021-12-24 00:00",
        "2021-12-24 04:00",
        "2021-12-24 08:00",
        "2021-12-24 12:00",
        "2021-12-24 16:00",
        "2021-12-24 20:00",
        "2021-12-25 00:00",
        "2021-12-25 04:00",
        "2021-12-25 08:00",
        "2021-12-25 12:00",
        "2021-12-25 16:00",
        "2021-12-25 20:00",
      ]
    `)
})

test('dayjsEarliest, dayjsLatest', () => {
  const dates = _shuffle(dayjsRangeIncl('2021-01-01', '2021-01-05', 2, 'd'))
  expect(dayjsEarliest(...dates).toISODate()).toBe('2021-01-01')
  expect(dayjsLatest(...dates).toISODate()).toBe('2021-01-05')

  expect(() => dayjsEarliest()).toThrow()
  expect(() => dayjsLatest()).toThrow()
})

test('dayjsRangeSeq', () => {
  const d = dayjsRangeSeq('2021-01-01', '2022-01-01').find(d => d.month() === 1)
  expect(d?.toISODate()).toBe('2021-02-01')
})
