/* tslint:disable */
export default (o: any, c: any) => {
  c.prototype.isSameOrAfter = function (that: any, units: any) {
    return this.isSame(that, units) || this.isAfter(that, units)
  }
}
