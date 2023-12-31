/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { JALR } from './JALR'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'

describe('JALR - jump and link register', () => {
  const op = new JALR()

  interface TestCase {
    instruction: uint32
    rs1        : uint5
    rs1I       : uint32
    pcO        : uint32
    rd         : uint5
    rdO        : uint32,
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

  cases.forEach(({ instruction }) => { recognize(op, instruction) })

  cases.forEach(({ instruction, rs1, rs1I, pcO, rd, rdO }) => {
    it(`will execute ${instruction.toBin32()}`, () => {
      const registers = new Registers()
      registers.write(rs1, rs1I)

      op.execute(instruction, registers)

      expect(registers.pc).toBe(pcO)
      expect(registers.read(rd).s32u32()).toBe(rdO)
    })
  })
})
