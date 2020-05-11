import { dayjs } from './dayjs.full'

test('default to weekStart=Monday', () => {
  const locale = dayjs().$locale()

  // console.log(locale)

  expect(locale).toMatchObject({
    name: 'en-gb',
    weekStart: 1,
  })
})
