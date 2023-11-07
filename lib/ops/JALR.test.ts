/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { JALR } from './JALR'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'

describe('JALR - jump and link register', () => {
  const op = new JALR()

  it('will recognize', () => {
    expect(op.recognize(0b0000000000000000000000000_1100111)).toBe(true)
  })

  interface TestCase {
    /** instruction to execute */
    instruction: uint32
    /** selected rs1 register */
    rs1: uint5
    /** initial value of rs1 register */
    rs1I: uint32
    /** value of pc register after operation */
    pcO: uint32
    /** selected rd register */
    rd: uint5
    /** value of rd register after operation */
    rdO: uint32,
  }

  const cases: TestCase[] = [{
    instruction: 0b0000000000010_00101_000_11111_1100111,
    rs1        : Registers.t0,
    rs1I       : 0x00001001,
    pcO        : 0x00001002,
    rd         : Registers.t6,
    rdO        : 0x00001006,
  }, {
    instruction: 0b111111111110_00101_000_11111_1100111,
    rs1        : Registers.t0,
    rs1I       : 0x00001000,
    pcO        : 0x00001000 - 2,
    rd         : Registers.t6,
    rdO        : 0x00001002,
  }]

  cases.forEach(({ instruction, rs1, rs1I, pcO, rd, rdO }) => {
    it(`will execute ${instruction.toBin32()}`, () => {
      const registers = new Registers()
      registers.x[rs1] = rs1I
      op.execute(instruction, registers)

      expect(registers.pc).toBe(pcO)
      expect(registers.x[rd].s32u32()).toBe(rdO)
    })
  })
})
