/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { SUB } from './SUB'
import { Registers } from '../infrastructure/Registers'
import { AluRegisterTestCase, register as test } from './alu-test'

describe('SUB - subtract rs2 from rs1 and store in rd', () => {
  const op = new SUB()

  const cases: AluRegisterTestCase[] = [{
    instruction: 0b0100000_00111_00101_000_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rs2        : Registers.t2,
    rs2I       : 0b00000000_00000000_00000000_00000001,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000000,
  }, {
    instruction: 0b0100000_00111_00101_000_00110_0110011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rs2        : Registers.t2,
    rs2I       : 0b11111111_11111111_11111111_11111111,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000010,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
