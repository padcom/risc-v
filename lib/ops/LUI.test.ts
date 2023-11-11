/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { LUI } from './LUI'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'

describe('LUI - load upper immediate', () => {
  const op = new LUI()

  interface TestCase {
    instruction: uint32
    rs1: uint5
    rs1O: uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b00000000000000000001_11111_0110111,
    rs1        : Registers.t6,
    rs1O       : 0b00000000000000000001_00000_0000000,
  }, {
    instruction: 0b11111111111111111111_00110_0110111,
    rs1        : Registers.t1,
    rs1O       : 0b11111111111111111111_00000_0000000,
  }, {
    instruction: 0b10101010101010101010_00111_0110111,
    rs1        : Registers.t2,
    rs1O       : 0b10101010101010101010_00000_0000000,
  }, {
    instruction: 0b01010101010101010101_11100_0110111,
    rs1       : Registers.t3,
    rs1O       : 0b01010101010101010101_00000_0000000,
  }]

  cases.forEach(({ instruction }) => { recognize(op, instruction) })

  cases.forEach(({ instruction, rs1, rs1O }) => {
    it(`will load ${rs1O} into register x${rs1}`, () => {
      const registers = new Registers()

      op.execute(instruction, registers)

      expect(registers.read(rs1).s32u32()).toBe(rs1O)
    })
  })
})
