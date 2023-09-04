/*

yarn tsn bench1

 */

import { runBench } from '@naturalcycles/bench-lib'
import { _range } from '@naturalcycles/js-lib'
import { runScript } from '@naturalcycles/nodejs-lib'
import { dayjs } from '../src/index'

const date = '1984-06-21'

runScript(async () => {
  const r = await runBench({
    fns: {
      // toISODate: done => {
      //   const start = dayjs(date)
      //   const _days = _range(100).map(i => start.add(i, 'day').toISODate())
      //   done.resolve()
      // },
      format: done => {
        const start = dayjs(date)
        const _days = _range(100).map(i => start.add(i, 'day').format('YYYY-MM-DD'))
        done.resolve()
      },
      manual: done => {
        const start = dayjs(date)
        const _days = _range(100).map(i => {
          const d = start.add(i, 'day')
          return `${d.year()}-${String(d.month() + 1).padStart(2, '0')}-${String(d.date()).padStart(
            2,
            '0',
          )}`
        })
        done.resolve()
      },
      // manual1: done => {
      //   const start = dayjs(date)
      //   const _days = _range(100).map(i => {
      //     const d = start.add(i, 'day')
      //     return String(d.year()).padStart(4, '0') + '-' + String(d.month()).padStart(2, '0') + '-' + String(d.day()).padStart(2, '0')
      //   })
      //   done.resolve()
      // },
      manual2: done => {
        const start = dayjs(date)
        const _days = _range(100).map(i => {
          const d = start.add(i, 'day')
          return [
            d.year(),
            String(d.month() + 1).padStart(2, '0'),
            String(d.date()).padStart(2, '0'),
          ].join('-')
        })
        done.resolve()
      },
    },
    writeSummary: true,
    runs: 2,
  })
  console.log(r)
})
