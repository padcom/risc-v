/* eslint-disable no-multi-spaces */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { int32, uint32, uint5 } from './Memory'

export class Registers {
  static readonly zero = 0
  static readonly ra   = 1
  static readonly sp   = 2
  static readonly gp   = 3
  static readonly tp   = 4
  static readonly t0   = 5
  static readonly t1   = 6
  static readonly t2   = 7
  static readonly fp   = 8
  static readonly s0   = 8
  static readonly s1   = 9
  static readonly a0   = 10
  static readonly a1   = 11
  static readonly a2   = 12
  static readonly a3   = 13
  static readonly a4   = 14
  static readonly a5   = 15
  static readonly a6   = 16
  static readonly a7   = 17
  static readonly s2   = 18
  static readonly s3   = 19
  static readonly s4   = 20
  static readonly s5   = 21
  static readonly s6   = 22
  static readonly s7   = 23
  static readonly s8   = 24
  static readonly s9   = 25
  static readonly s10  = 26
  static readonly s11  = 27
  static readonly t3   = 28
  static readonly t4   = 29
  static readonly t5   = 30
  static readonly t6   = 31

  public pc: uint32    = 0
  private x: uint32[]  = new Array(32).fill(0)

  read(index: uint5): int32 {
    return index === 0 ? 0 : this.x[index]
  }

  write(index: uint5, value: int32) {
    this.x[index] = value
  }

  private static ALL_X = new Array(32).map((_, index) => index)
  private static ALL = [-1, ...Registers.ALL_X]

  dump(...registers: number[]) {
    if (registers.length === 0) registers = Registers.ALL

    registers.forEach(register => {
      const reg = register === -1 ? 'pc ' : `x${register}`.padEnd(3, ' ')
      const val = register === -1 ? this.pc : this.read(register)
      console.log(reg, val.toHex32(), val.toBin32(), val)
    })
  }
}
