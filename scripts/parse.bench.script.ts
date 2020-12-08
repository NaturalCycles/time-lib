/*

yarn tsn parse.bench

 */

import { runBench } from '@naturalcycles/bench-lib'
import { _range } from '@naturalcycles/js-lib'
import { runScript } from '@naturalcycles/nodejs-lib/dist/script'
import { dayjs } from '../src/index'

const date = '1984-06-21'
const dates = _range(100).map(i => dayjs(date).add(i, 'day').toISODate())

runScript(async () => {
  const r = await runBench({
    fns: {
      option1: done => {
        const _parsed = dates.map(d => dayjs(d))
        done.resolve()
      },
      option2: done => {
        const _parsed = dates.map(d => dayjs(d, 'YYYY-MM-DD', true))
        done.resolve()
      },
    },
    // writeSummary: true,
    runs: 2,
  })
  console.log(r)
})
