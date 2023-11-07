/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { LBU } from './LBU'
import { Registers } from '../infrastructure/Registers'
import { RAM, uint32, uint5, uint8 } from '../infrastructure/Memory'

describe('LBU - load unsigned byte to rd', () => {
  const op = new LBU()

  interface TestCase {
    instruction: uint32
    rs1: uint5
    rs1I: uint32
    rd: uint5
    base: uint32
    offset: uint32
    value: uint8
    expected: uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b000000000001_00101_100_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 1,
    value      : 0xff,
    expected   : 0x000000ff,
  }, {
    instruction: 0b111111111111_00101_100_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10002,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 1,
    value      : 0xff,
    expected   : 0x000000ff,
  }]

  cases.forEach(({ instruction, rs1, rs1I, rd, base, offset, value, expected }) => {
    it(`will load from address 0x10000+${rs1I} into register x${rd}`, () => {
      const registers = new Registers()
      registers.x[rs1] = rs1I
      const memory = new RAM(base, 0x10)
      memory.write8(base + offset, value)
      expect(op.recognize(instruction)).toBe(true)
      op.execute(instruction, registers, memory)
      expect(registers.x[rd]).toBe(expected)
    })
  })
})
