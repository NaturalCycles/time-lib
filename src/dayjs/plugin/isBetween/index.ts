/* tslint:disable */
export default (o: any, c: any, d: any) => {
  c.prototype.isBetween = function (a: any, b: any, u: any, i: any) {
    const dA = d(a)
    const dB = d(b)
    i = i || '()'
    const dAi = i[0] === '('
    const dBi = i[1] === ')'

    return (
      ((dAi ? this.isAfter(dA, u) : !this.isBefore(dA, u)) &&
        (dBi ? this.isBefore(dB, u) : !this.isAfter(dB, u))) ||
      ((dAi ? this.isBefore(dA, u) : !this.isAfter(dA, u)) &&
        (dBi ? this.isAfter(dB, u) : !this.isBefore(dB, u)))
    )
  }
}
