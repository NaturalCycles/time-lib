/*

yarn tsn benchConversion

 */

import { runBench } from '@naturalcycles/bench-lib'
import { _range } from '@naturalcycles/js-lib'
import { runScript } from '@naturalcycles/nodejs-lib/dist/script'
import { dayjs } from '../src'

const dateStr = '1984-06-21'
const date = dayjs(dateStr)

runScript(async () => {
  const r = await runBench({
    fns: {
      withString: done => {
        const _days = _range(100).map(() => dayjs.utc(date.toISODate()))
        done.resolve()
      },
      withoutString: done => {
        const _days = _range(100).map(() => dayjs.utc(date))
        done.resolve()
      },
      withStringBeforeToISODateOptimization: done => {
        const _days = _range(100).map(() => dayjs.utc(date.format('YYYY-MM-DD')))
        done.resolve()
      },
    },
    writeSummary: true,
    runs: 2,
  })
  console.log(r)
})
