/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { BLT } from './BLT'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'

describe('BLT - branch if less than', () => {
  const op = new BLT()

  interface TestCase {
    instruction: uint32
    rs1        : uint5
    rs1I       : uint32
    rs2        : uint5
    rs2I       : uint32
    pcI        : uint32
    pcO        : uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b0_000000_11111_00101_100_0100_0_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1233,
    rs2        : Registers.t6,
    rs2I       : 0x1234,
    pcI        : 0x10000,
    pcO        : 0x10008,
  }, {
    instruction: 0b0_000000_11111_00101_100_0100_0_1100011,
    rs1        : Registers.t0,
    rs1I       : -0x1234,
    rs2        : Registers.t6,
    rs2I       : -0x1233,
    pcI        : 0x10000,
    pcO        : 0x10008,
  }, {
    instruction: 0b0_000000_11111_00101_100_0100_0_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rs2        : Registers.t6,
    rs2I       : 0x1234,
    pcI        : 0x10000,
    pcO        : 0x10000,
  }, {
    instruction: 0b0_000000_11111_00101_100_0100_0_1100011,
    rs1        : Registers.t0,
    rs1I       : -0x1234,
    rs2        : Registers.t6,
    rs2I       : -0x1234,
    pcI        : 0x10000,
    pcO        : 0x10000,
  }, {
    instruction: 0b1_111111_00110_00101_100_1100_1_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1233,
    rs2        : Registers.t1,
    rs2I       : 0x1234,
    pcI        : 0x10000,
    pcO        : 0x0fff8,
  }, {
    instruction: 0b1_111111_00110_00101_100_1100_1_1100011,
    rs1        : Registers.t0,
    rs1I       : -0x1234,
    rs2        : Registers.t1,
    rs2I       : -0x1233,
    pcI        : 0x10000,
    pcO        : 0x0fff8,
  }, {
    instruction: 0b1_111111_00110_00101_100_1100_1_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rs2        : Registers.t1,
    rs2I       : 0x1234,
    pcI        : 0x10000,
    pcO        : 0x10000,
  }, {
    instruction: 0b1_111111_00110_00101_100_1100_1_1100011,
    rs1        : Registers.t0,
    rs1I       : -0x1234,
    rs2        : Registers.t1,
    rs2I       : -0x1234,
    pcI        : 0x10000,
    pcO        : 0x10000,
  }]

  cases.forEach(({ instruction, rs1, rs1I, rs2, rs2I, pcI, pcO }) => {
    it(`will execute ${instruction.toBin32()}`, () => {
      const registers = new Registers()
      registers.x[rs1] = rs1I
      registers.x[rs2] = rs2I
      registers.pc = pcI
      expect(op.recognize(instruction)).toBe(true)
      op.execute(instruction, registers)
      expect(registers.pc).toBe(pcO)
    })
  })
})
