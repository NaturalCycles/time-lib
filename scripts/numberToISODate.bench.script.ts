/*

yarn tsn numberToISODate.bench

 */

import { runBench } from '@naturalcycles/bench-lib'
import { _range } from '@naturalcycles/js-lib'
import { runScript } from '@naturalcycles/nodejs-lib/dist/script'
import { dayjs } from '../src/index'

const date = '1984-06-21'
const dates = _range(100).map(i => Number(dayjs(date).add(i, 'day').toCompactDate()))

function parse(d: number): string {
  const r = [...String(d).matchAll(/^(\d{4})(\d{2})(\d{2})$/g)][0]!
  return [r[1], r[2], r[3]].join('-')
}

runScript(async () => {
  // const date = '19840621'
  // const r = [...date.matchAll(/^(\d{4})(\d{2})(\d{2})$/g)][0]

  console.log(parse(19840621))

  await runBench({
    fns: {
      numberToISODate: done => {
        const _parsed = dates.map(ts => {
          const s = String(ts) // .padStart(8, '0')
          // console.log(s)
          return [s.substr(0, 4), s.substr(4, 2), s.substr(6, 2)].join('-')
        })
        done.resolve()
      },
      manual: done => {
        const _parsed = dates.map(d => parse(d))
        done.resolve()
      },
    },
    // writeSummary: true,
    runs: 2,
  })
})
