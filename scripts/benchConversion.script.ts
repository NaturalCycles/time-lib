/*

yarn tsn benchConversion

 */

import { runBenchScript } from '@naturalcycles/bench-lib'
import { dayjs } from '../src'

const dateStr = '1984-06-21'
const date = dayjs(dateStr)

runBenchScript({
  fns: {
    withString: done => {
      // const _days = _range(100).map(() => dayjs.utc(date.toISODate()))
      const _day = dayjs.utc(date.toISODate())
      done.resolve()
    },
    withoutString: done => {
      // const _days = _range(100).map(() => dayjs.utc(date))
      const _day = dayjs.utc(date)
      done.resolve()
    },
    withStringBeforeToISODateOptimization: done => {
      // const _days = _range(100).map(() => dayjs.utc(date.format('YYYY-MM-DD')))
      const _day = dayjs.utc(date.format('YYYY-MM-DD'))
      done.resolve()
    },
  },
  runs: 2,
})
