/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { ADDI } from './ADDI'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'

describe('ADDI - add imm to rs1 and store in rd', () => {
  const op = new ADDI()

  interface TestCase {
    instruction: uint32
    rs1        : uint5
    rs1I       : uint32
    rd         : uint5
    rdO        : uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b000000000001_00101_000_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rd         : Registers.t1,
    rdO        : 0x1235,
  }, {
    instruction: 0b111111111111_00101_000_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rd         : Registers.t1,
    rdO        : 0x1233,
  }, {
    instruction: 0b000000000001_00101_000_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0xffffffff,
    rd         : Registers.t1,
    rdO        : 0,
  }, {
    instruction: 0b111111111111_00101_000_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0xffffffff,
    rd         : Registers.t1,
    rdO        : 0xfffffffe,
  }]

  cases.forEach(({ instruction, rs1, rs1I, rd, rdO }) => {
    it(`will execute ${instruction.toBin32()}`, () => {
      const registers = new Registers()
      registers.x[rs1] = rs1I
      expect(op.recognize(instruction)).toBe(true)
      op.execute(instruction, registers)
      expect(registers.x[rd]).toBe(rdO)
    })
  })
})
