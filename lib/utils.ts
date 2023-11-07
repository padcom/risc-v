/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-extend-native */
interface Number {
  toHex(len: number): string
  toHex8(): string
  toHex16(): string
  toHex32(): string

  toBin(len: number): string
  toBin8(): string
  toBin16(): string
  toBin32(): string
}

Number.prototype.toHex = function(len: number) {
  return `0x${this.toString(16).padStart(len, '0')}`
}

Number.prototype.toHex8 = function() {
  return this.toHex(2)
}

Number.prototype.toHex16 = function() {
  return this.toHex(4)
}

Number.prototype.toHex32 = function() {
  return this.toHex(8)
}

Number.prototype.toBin = function(len: number) {
  return `0b${this.toString(2).padStart(len, '0')}`
}

Number.prototype.toBin8 = function() {
  return this.toBin(8)
}

Number.prototype.toBin16 = function() {
  return this.toBin(16)
}

Number.prototype.toBin32 = function() {
  return this.toBin(32)
}
