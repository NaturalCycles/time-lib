import { dayjs } from './dayjs.full'

test('default to weekStart=Monday', () => {
  expect(dayjs().$locale().weekStart).toBe(1)
})
