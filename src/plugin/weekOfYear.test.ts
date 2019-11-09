import { _range } from '@naturalcycles/js-lib'
import moment from 'moment'
import { dayjs } from '../index'

// const weekStarts = [0, 1, 6]
// Based on: https://github.com/moment/momentjs.com/issues/279#issuecomment-375611003
const presets = [
  // ISO-8601: Europe
  {
    name: 'iso',
    dow: 1,
    doy: 4, // 1st week of the year is the one that contains the first Thursday (7 + 1 - 4)
  },
  // US, Canada
  {
    name: 'us',
    dow: 0,
    doy: 6, // 1st week of the year is the one that contains the 1st of January (7 + 0 - 1)
  },
  // Most of Arab countries
  // {
  //   name: 'arab',
  //   dow: 6,
  //   doy: 12, // 1st week of the year is the one that contains the 1st of January (7 + 6 - 1)
  // },
]

const startDate = '2000-01-01'

test('weekOfYear', () => {
  presets.forEach(preset => {
    const { dow, doy, name } = preset
    dayjs.extendLocale({
      weekStart: dow,
    })

    moment.updateLocale('en', {
      week: {
        dow,
        doy,
      },
    })

    _range(0, 29000).forEach(n => {
      const d = dayjs(startDate).add(n, 'day')
      const isoWeek1 = d.week()
      const isoWeek2 = moment(startDate)
        .add(n, 'day')
        .week()
      // console.log(`${d.toISODate()}: ${d.isoWeek()}`)

      if (isoWeek1 !== isoWeek2) {
        // fail(`${d.toISODate()} dayjs: ${d.isoWeek()}, moment: ${dm.isoWeek()}`)
        throw new Error(`preset=${name} ${d.toISODate()} dayjs: ${isoWeek1}, moment: ${isoWeek2}`)
      }
    })
  })
})
