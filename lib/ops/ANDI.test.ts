/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { ANDI } from './ANDI'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'

describe('ANDI - bitwise and on rs1 and and sign-extended 12-bit imm and place the result in rd', () => {
  const op = new ANDI()

  interface TestCase {
    instruction: uint32
    rs1        : uint5
    rs1I       : uint32
    rd         : uint5
    rdO        : uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b010101010101_00101_111_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b11111111_11111111_11111111_11111111,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000101_01010101,
  }, {
    instruction: 0b101010101010_00101_111_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b11111111_11111111_11111111_11111111,
    rd         : Registers.t1,
    rdO        : 0b11111111_11111111_11111010_10101010,
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
