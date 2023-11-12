/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { SLT } from './SLT'
import { Registers } from '../infrastructure/Registers'
import { AluRegisterTestCase, register as test } from './alu-test'

describe('SLT - signed compare rs1 to rs2 and store 1 in rd if rs1 < rs', () => {
  const op = new SLT()

  const cases: AluRegisterTestCase[] = [{
    instruction: 0b0000000_00111_00101_010_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rs2        : Registers.t2,
    rs2I       : 0b00000000_00000000_00000000_00000010,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000001,
  }, {
    instruction: 0b0000000_00111_00101_010_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000010,
    rs2        : Registers.t2,
    rs2I       : 0b00000000_00000000_00000000_00000001,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000000,
  }, {
    instruction: 0b0000000_00111_00101_010_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b11111111_11111111_11111111_11111111,
    rs2        : Registers.t2,
    rs2I       : 0b00000000_00000000_00000000_00000000,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000001,
  }, {
    instruction: 0b0000000_00111_00101_010_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000000,
    rs2        : Registers.t2,
    rs2I       : 0b11111111_11111111_11111111_11111111,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000000,
  }, {
    instruction: 0b0000000_00111_00101_010_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b11111111_11111111_11111111_11111111,
    rs2        : Registers.t2,
    rs2I       : 0b11111111_11111111_11111111_11111110,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000000,
  }, {
    instruction: 0b0000000_00111_00101_010_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b11111111_11111111_11111111_11111110,
    rs2        : Registers.t2,
    rs2I       : 0b11111111_11111111_11111111_11111111,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000001,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
