/*

yarn tsn parse.bench

 */

import { runBench } from '@naturalcycles/bench-lib'
import { _range } from '@naturalcycles/js-lib'
import { runScript } from '@naturalcycles/nodejs-lib'
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
      manual: done => {
        const _parsed = dates.map(d => {
          const a = /^\d{4}-\d{2}-\d{2}$/.exec(d) as any
          // const y = Number(d.substr(0, 4))
          // const m = Number(d.substr(5, 2)) - 1
          // const day = Number(d.substr(8, 2))

          // return dayjs(new Date(y!, m! - 1, day))
          return dayjs(new Date(a[0], a[1] - 1, a[2]))
        })
        done.resolve()
      },
    },
    // writeSummary: true,
    runs: 2,
  })
  console.log(r)
})
