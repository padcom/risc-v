/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { SRA } from './SRA'
import { Registers } from '../infrastructure/Registers'
import { AluRegisterTestCase, register as test } from './alu-test'

describe('SRA - arithmetic right shift rs1 by rs2[4:0] and store in rd', () => {
  const op = new SRA()

  const cases: AluRegisterTestCase[] = [{
    instruction: 0b0100000_00111_00101_101_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rs2        : Registers.t2,
    rs2I       : 0b00000000_00000000_00000000_00000000,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000001,
  }, {
    instruction: 0b0100000_00111_00101_101_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rs2        : Registers.t2,
    rs2I       : 0b00000000_00000000_00000000_00000001,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000000,
  }, {
    instruction: 0b0100000_00111_00101_101_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b10000000_00000000_00000000_00000000,
    rs2        : Registers.t2,
    rs2I       : 0b00000000_00000000_00000000_00011111,
    rd         : Registers.t1,
    rdO        : 0b11111111_11111111_11111111_11111111,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
