/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { ORI } from './ORI'
import { Registers } from '../infrastructure/Registers'
import { AluTestCase, test } from './alu-test'

describe('ORI - bitwise or on rs1 and and sign-extended 12-bit imm and place the result in rd', () => {
  const op = new ORI()

  const cases: AluTestCase[] = [{
    instruction: 0b010101010101_00101_110_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b10101010_10101010_10101010_10101010,
    rd         : Registers.t1,
    rdO        : 0b10101010_10101010_10101111_11111111,
  }, {
    instruction: 0b101010101010_00101_110_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b10101010_10101010_10101010_10101010,
    rd         : Registers.t1,
    rdO        : 0b11111111_11111111_11111010_10101010,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
