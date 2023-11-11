/* eslint-disable no-extra-parens */
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

  u8u32(): number
  u8s32(): number
  u12s32(): number
  u21s32(): number
  u32s32(): number
  u16s32(): number
  s32u32(): number
}

Number.prototype.toHex = function(this: number, len: number) {
  return `0x${(this >>> 0).toString(16).padStart(len, '0')}`
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

Number.prototype.toBin = function(this: number, len: number) {
  return `0b${(this >>> 0).toString(2).padStart(len, '0')}`
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

Number.prototype.u8u32 = function(this: number) {
  return this & 0xff
}

Number.prototype.u8s32 = function(this: number) {
  const SIGN_BIT = 0b00000000000000000000000010000000
  const SIGN_MSK = 0b11111111111111111111111110000000

  return Math.trunc((this & SIGN_BIT) ? (this | SIGN_MSK) : this)
}

Number.prototype.u12s32 = function(this: number) {
  const SIGN_BIT = 0b00000000000000000000100000000000
  const SIGN_MSK = 0b11111111111111111111100000000000

  return Math.trunc((this & SIGN_BIT) ? (this | SIGN_MSK) : this)
}

Number.prototype.u16s32 = function(this: number) {
  const SIGN_BIT = 0b00000000000000001000000000000000
  const SIGN_MSK = 0b11111111111111111000000000000000

  return Math.trunc((this & SIGN_BIT) ? (this | SIGN_MSK) : this)
}

Number.prototype.u21s32 = function(this: number) {
  const SIGN_BIT = 0b00000000000100000000000000000000
  const SIGN_MSK = 0b11111111111100000000000000000000

  return Math.trunc((this & SIGN_BIT) ? (this | SIGN_MSK) : this)
}

Number.prototype.u32s32 = function(this: number) {
  const SIGN_BIT = 0b10000000000000000000000000000000
  const SIGN_MSK = 0b10000000000000000000000000000000

  return Math.trunc((this & SIGN_BIT) ? (this | SIGN_MSK) : this)
}

Number.prototype.s32u32 = function(this: number) {
  return this >>> 0
}
