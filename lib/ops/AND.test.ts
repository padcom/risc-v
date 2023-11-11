/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { AND } from './AND'
import { Registers } from '../infrastructure/Registers'
import { AluRegisterTestCase, register as test } from './alu-test'

describe('AND - bit-wise and rs1 with rs2 and store in rd', () => {
  const op = new AND()

  const cases: AluRegisterTestCase[] = [{
    instruction: 0b0000000_00111_00101_111_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rs2        : Registers.t2,
    rs2I       : 0b00000000_00000000_00000000_00000001,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000001,
  }, {
    instruction: 0b0000000_00111_00101_111_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rs2        : Registers.t2,
    rs2I       : 0b11111111_11111111_11111111_11111111,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000001,
  }, {
    instruction: 0b0000000_00111_00101_111_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b10101010_10101010_10101010_10101010,
    rs2        : Registers.t2,
    rs2I       : 0b01010101_01010101_01010101_01010101,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000000,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
