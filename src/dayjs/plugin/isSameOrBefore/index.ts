/* tslint:disable */
export default (o: any, c: any) => {
  c.prototype.isSameOrBefore = function (that: any, units: any) {
    return this.isSame(that, units) || this.isBefore(that, units)
  }
}
