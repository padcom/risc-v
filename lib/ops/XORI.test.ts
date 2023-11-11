/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { XORI } from './XORI'
import { Registers } from '../infrastructure/Registers'
import { AluImmediateTestCase, immediate as test } from './alu-test'

describe('XORI - bitwise xor on rs1 and and sign-extended 12-bit imm and place the result in rd', () => {
  const op = new XORI()

  const cases: AluImmediateTestCase[] = [{
    instruction: 0b010101010101_00101_100_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b11111111_11111111_11111111_11111111,
    rd         : Registers.t1,
    rdO        : 0b11111111_11111111_11111010_10101010,
  }, {
    instruction: 0b101010101010_00101_100_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b11111111_11111111_11111111_11111111,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000101_01010101,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
