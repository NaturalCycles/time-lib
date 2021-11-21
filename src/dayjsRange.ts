import { END, IsoDate, Sequence } from '@naturalcycles/js-lib'
import { ConfigType, dayjs, IDayjs, OpUnitType } from './index'

/**
 * Like _range, but for IDayjs.
 * Left side is inclusive.
 * Right side of the range is exclusive. (same as _range)
 */
export function dayjsRange(
  minIncl: ConfigType,
  maxExcl: ConfigType,
  step = 1,
  stepUnit: OpUnitType = 'd',
): IDayjs[] {
  const days: IDayjs[] = []
  let current = dayjs(minIncl).startOf(stepUnit)
  const max = dayjs(maxExcl).startOf(stepUnit)

  do {
    days.push(current)
    current = current.add(step, stepUnit)
  } while (current.isBefore(max))

  return days
}

export function dayjsRangeSeq(
  minIncl: ConfigType,
  maxExcl: ConfigType,
  step = 1,
  stepUnit: OpUnitType = 'd',
): Sequence<IDayjs> {
  const min = dayjs(minIncl).startOf(stepUnit)
  const max = dayjs(maxExcl).startOf(stepUnit)
  return Sequence.create(min, d => {
    const next = d.add(step, stepUnit)
    return next.isAfter(max) ? END : next
  })
}

// todo: this would require Seq.map() implementation
// export function dayjsRangeISODateSeq(
//   minIncl: ConfigType,
//   maxExcl: ConfigType,
//   step = 1,
//   stepUnit: OpUnitType = 'd',
// ): Seq<string> {
//   const min = dayjs(minIncl).startOf(stepUnit)
//   const max = dayjs(maxExcl).startOf(stepUnit)
//   return Seq.create(min, d => {
//     const next = d.add(step, stepUnit)
//     return next.isAfter(max) ? END : next
//   })
// }

export function dayjsRangeISODate(
  minIncl: ConfigType,
  maxExcl: ConfigType,
  step = 1,
  stepUnit: OpUnitType = 'd',
): IsoDate[] {
  return dayjsRange(minIncl, maxExcl, step, stepUnit).map(d => d.toISODate())
}

/**
 * Like _range, but for IDayjs.
 * Both sides inclusive.
 */
export function dayjsRangeIncl(
  minIncl: ConfigType,
  maxIncl: ConfigType,
  step = 1,
  stepUnit: OpUnitType = 'd',
): IDayjs[] {
  return dayjsRange(minIncl, dayjs(maxIncl).add(1, stepUnit), step, stepUnit)
}

export function dayjsRangeInclISODate(
  minIncl: ConfigType,
  maxIncl: ConfigType,
  step = 1,
  stepUnit: OpUnitType = 'd',
): IsoDate[] {
  return dayjsRangeIncl(minIncl, maxIncl, step, stepUnit).map(d => d.toISODate())
}

/**
 * Input must contain at least 1 item.
 */
export function dayjsEarliest(...days: IDayjs[]): IDayjs {
  // eslint-disable-next-line unicorn/no-array-reduce
  return days.reduce((earliest, d) => (d.isBefore(earliest) ? d : earliest))
}

/**
 * Input must contain at least 1 item.
 */
export function dayjsLatest(...days: IDayjs[]): IDayjs {
  // eslint-disable-next-line unicorn/no-array-reduce
  return days.reduce((latest, d) => (d.isAfter(latest) ? d : latest))
}
