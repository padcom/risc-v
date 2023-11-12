/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { SLTI } from './SLTI'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'

describe('SLTI - set less than immediate', () => {
  const op = new SLTI()

  interface TestCase {
    instruction: uint32
    rs1        : uint5
    rs1I       : uint32
    rd         : uint5
    rdO        : uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b000000000100_00101_010_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0x0002,
    rd         : Registers.t1,
    rdO        : 0x0001,
  }, {
    instruction: 0b000000000001_00101_010_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0x0002,
    rd         : Registers.t1,
    rdO        : 0x0000,
  }, {
    instruction: 0b111111111111_00101_010_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0x0001,
    rd         : Registers.t1,
    rdO        : 0x0000,
  }, {
    instruction: 0b111111111111_00101_010_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0xfffffffe,
    rd         : Registers.t1,
    rdO        : 0x0001,
  }]

  cases.forEach(({ instruction }) => { recognize(op, instruction) })

  cases.forEach(({ instruction, rs1, rs1I, rd, rdO }) => {
    it(`will execute ${instruction.toBin32()}`, () => {
      const registers = new Registers()
      registers.write(rs1, rs1I)

      op.execute(instruction, registers)

      expect(registers.read(rd)).toBe(rdO)
    })
  })
})
