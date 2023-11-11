/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { LHU } from './LHU'
import { Registers } from '../infrastructure/Registers'
import { RAM, uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'

describe('LHU - load unsigned word to rd', () => {
  const op = new LHU()

  interface TestCase {
    instruction: uint32
    rs1: uint5
    rs1I: uint32
    rd: uint5
    base: uint32
    offset: uint32
    value: uint32
    expected: uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b000000000010_00101_101_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 2,
    value      : 0xFFFF,
    expected   : 0x0000FFFF,
  }, {
    instruction: 0b111111111110_00101_101_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10004,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 2,
    value      : 0xFFFF,
    expected   : 0x0000FFFF,
  }]

  cases.forEach(({ instruction }) => { recognize(op, instruction) })

  cases.forEach(({ instruction, rs1, rs1I, rd, base, offset, value, expected }) => {
    it(`will load from address 0x10000+${rs1I} into register x${rd}`, () => {
      const registers = new Registers()
      registers.x[rs1] = rs1I
      const memory = new RAM(base, 0x10)
      memory.write16(base + offset, value)

      op.execute(instruction, registers, memory)

      expect(registers.x[rd]).toBe(expected)
    })
  })
})
