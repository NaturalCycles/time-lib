import { dayjsRange, dayjsRangeInclISODate, dayjsRangeISODate } from './dayjsRange'

test('dayjsRange', () => {
  expect(dayjsRangeISODate('2021-12-24', '2021-12-26')).toMatchInlineSnapshot(`
    Array [
      "2021-12-24",
      "2021-12-25",
    ]
  `)

  expect(dayjsRangeInclISODate('2021-12-24', '2021-12-26')).toMatchInlineSnapshot(`
    Array [
      "2021-12-24",
      "2021-12-25",
      "2021-12-26",
    ]
  `)

  expect(dayjsRangeISODate('2021-12-24', '2021-12-30', 2)).toMatchInlineSnapshot(`
    Array [
      "2021-12-24",
      "2021-12-26",
      "2021-12-28",
    ]
  `)

  expect(dayjsRangeInclISODate('2021-12-24', '2021-12-30', 2)).toMatchInlineSnapshot(`
    Array [
      "2021-12-24",
      "2021-12-26",
      "2021-12-28",
      "2021-12-30",
    ]
  `)

  expect(dayjsRange('2021-12-24', '2021-12-26', 4, 'hour').map(d => d.toPretty(false)))
    .toMatchInlineSnapshot(`
    Array [
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
