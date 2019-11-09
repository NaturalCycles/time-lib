import { dayjs } from '..'

test('localeData', () => {
  const localeData = dayjs().$locale()
  // console.log(localeData)
  expect(localeData).toMatchObject({
    name: 'en',
  })

  dayjs.extendLocale({
    weekStart: 1,
  })
  expect(dayjs().$locale()).toMatchObject({
    name: 'en',
    weekStart: 1,
  })
})
