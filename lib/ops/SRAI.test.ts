/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { SRAI } from './SRAI'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'

describe('SRAI - arithmetic shift right rs1 by imm[4:0] store in rd', () => {
  const op = new SRAI()

  interface TestCase {
    instruction: uint32
    rs1        : uint5
    rs1I       : uint32
    rd         : uint5
    rdO        : uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b010000000000_00101_101_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000001,
  }, {
    instruction: 0b010000000001_00101_101_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b01000000_00000000_00000000_00000001,
    rd         : Registers.t1,
    rdO        : 0b00100000_00000000_00000000_00000000,
  }, {
    instruction: 0b010000011111_00101_101_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b10000000_00000000_00000000_00000000,
    rd         : Registers.t1,
    rdO        : 0b11111111_11111111_11111111_11111111,
  }]

  cases.forEach(({ instruction, rs1, rs1I, rd, rdO }) => {
    it(`will execute ${instruction.toBin32()}`, () => {
      const registers = new Registers()
      registers.x[rs1] = rs1I
      expect(op.recognize(instruction)).toBe(true)
      op.execute(instruction, registers)
      expect(registers.x[rd]).toBe(rdO.u32s32())
    })
  })
})
