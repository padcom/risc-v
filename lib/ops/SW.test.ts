/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { SW } from './SW'
import { Registers } from '../infrastructure/Registers'
import { RAM, int32, uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'

describe('SW - save dword from rs2 to [rs1]', () => {
  const op = new SW()

  interface TestCase {
    instruction: uint32
    rs1: uint5
    rs1I: uint32
    rs2: uint5
    rs2I: uint32
    base: uint32
    offset: uint32
    expected: int32
  }

  const cases: TestCase[] = [{
    instruction: 0b0000000_00110_00101_010_00100_0100011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rs2        : Registers.t1,
    rs2I       : 0xFFFFFFFF,
    base       : 0x10000,
    offset     : 4,
    expected   : 0xFFFFFFFF,
  }, {
    instruction: 0b1111111_00110_00101_010_11100_0100011,
    rs1        : Registers.t0,
    rs1I       : 0x10008,
    rs2        : Registers.t1,
    rs2I       : 0xFFFFFFFF,
    base       : 0x10000,
    offset     : -4,
    expected   : 0xFFFFFFFF,
  }]

  cases.forEach(({ instruction }) => { recognize(op, instruction) })

  cases.forEach(({ instruction, rs1, rs1I, rs2, rs2I, base, offset, expected }) => {
    it(`will store rs2 to address [rs1+imm]`, () => {
      const registers = new Registers()
      registers.x[rs1] = rs1I
      registers.x[rs2] = rs2I
      const memory = new RAM(base, 0x10)

      op.execute(instruction, registers, memory)

      expect(memory.read32(rs1I + offset)).toBe(expected)
    })
  })
})
