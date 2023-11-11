/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { SRAI } from './SRAI'
import { Registers } from '../infrastructure/Registers'
import { AluImmediateTestCase, immediate as test } from './alu-test'

describe('SRAI - arithmetic shift right rs1 by imm[4:0] store in rd', () => {
  const op = new SRAI()

  const cases: AluImmediateTestCase[] = [{
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

  cases.forEach(testCase => { test(op, testCase) })
})
