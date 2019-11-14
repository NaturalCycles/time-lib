export const TS_2018_06_21 = 1529539200

/**
 * Returns time passed since `from` until `until` (default to Date.now())
 */
export function since(from: number, until = Date.now()): string {
  return ms(until - from)
}

/**
 * Returns, e.g:
 * 125 ms
 * 1.125 sec
 * 11 sec
 * 1m12s
 * 59m2s
 * 1h3m12s
 */
export function ms(millis: number): string {
  // <1 sec
  if (millis < 1000) return `${Math.round(millis)} ms`

  // < 5 sec
  if (millis < 5000) return `${(millis / 1000).toFixed(3)} sec`

  const sec = Math.floor(millis / 1000) % 60
  const min = Math.floor(millis / (60 * 1000)) % 60
  const hrs = Math.floor(millis / (3600 * 1000))

  // <1 hr
  if (hrs === 0) {
    // <1 min
    if (min === 0) return `${sec} sec`

    return `${min}m${sec}s`
  }

  // >= 1hr
  return `${hrs}h${min}m${sec}s`
}
