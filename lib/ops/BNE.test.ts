/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { BNE } from './BNE'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'

describe('BNE - load upper immediate', () => {
  const op = new BNE()

  it('will recognize', () => {
    expect(op.recognize(0b0_000000_00000_00000_001_0000_0_1100011)).toBe(true)
  })

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
    instruction: 0b0_000000_11111_00101_001_0100_0_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rs2        : Registers.t6,
    rs2I       : 0x1235,
    pcI        : 0x10000,
    pcO        : 0x10008,
  }, {
    instruction: 0b0_000000_11111_00101_000_0100_0_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rs2        : Registers.t6,
    rs2I       : 0x1234,
    pcI        : 0x10000,
    pcO        : 0x10000,
  }]

  cases.forEach(({ instruction, rs1, rs1I, rs2, rs2I, pcI, pcO }) => {
    it(`will execute ${instruction.toBin32()}`, () => {
      const registers = new Registers()
      registers.x[rs1] = rs1I
      registers.x[rs2] = rs2I
      registers.pc = pcI
      op.execute(instruction, registers)
      expect(registers.pc).toBe(pcO)
    })
  })
})
