import { dayjs } from './dayjs.full'

// test('locale support', () => {
//   // Before locale is loaded
//   expect(dayjs('2018-05-05').locale('sv').format('MMMM D, YYYY')).toBe('May 5, 2018')
//
//   loadDayjsLocales(['sv'])
//
//   // After locale is loaded
//   expect(dayjs('2018-05-05').locale('sv').format('MMMM D, YYYY')).toBe('maj 5, 2018')
//
//   // Needs 'localizedFormat' plugin
//   expect(dayjs('2018-05-05').locale('sv').format('LL')).toBe('5 maj 2018')
//
//   // const s = dayjs('2018-05-05').locale('sv').format('LL')
//   // console.log(s)
// })

test('fdow of default locale should be Monday', () => {
  // const ld = dayjs().localeData()
  // console.log(ld.firstDayOfWeek())
  // console.log(dayjs().$locale())

  // This is "raw" locale output
  expect(dayjs().$locale()).toMatchObject({
    name: 'en-gb',
    weekStart: 1,
    yearStart: 4,
  })

  expect(dayjs().locale()).toBe('en-gb')

  expect(dayjs().localeData().firstDayOfWeek()).toBe(1)

  expect(dayjs().localeData().weekdays()).toMatchInlineSnapshot(`
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
  `)
})

export {}
