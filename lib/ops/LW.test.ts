/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { LW } from './LW'
import { Registers } from '../infrastructure/Registers'
import { RAM, int32, uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'

describe('LW - load dword from memory to rd', () => {
  const op = new LW()

  interface TestCase {
    instruction: uint32
    rs1: uint5
    rs1I: uint32
    rd: uint5
    base: uint32
    offset: uint32
    value: uint32
    expected: int32
  }

  const cases: TestCase[] = [{
    instruction: 0b000000000100_00101_010_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 4,
    value      : 0xffffffff,
    expected   : -1,
  }, {
    instruction: 0b111111111100_00101_010_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10008,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 4,
    value      : 0xffffffff,
    expected   : -1,
  }]

  cases.forEach(({ instruction }) => { recognize(op, instruction) })

  cases.forEach(({ instruction, rs1, rs1I, rd, base, offset, value, expected }) => {
    it(`will load from address ${rs1I.toHex32()} into register x${rd}`, () => {
      const registers = new Registers()
      registers.x[rs1] = rs1I
      const memory = new RAM(base, 0x10)
      memory.write32(base + offset, value)

      op.execute(instruction, registers, memory)

      expect(registers.x[rd]).toBe(expected)
    })
  })
})
