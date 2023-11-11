/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { SRLI } from './SRLI'
import { Registers } from '../infrastructure/Registers'
import { AluTestCase, test } from './alu-test'

describe('SRLI - shift right rs1 by imm[4:0] store in rd', () => {
  const op = new SRLI()

  const cases: AluTestCase[] = [{
    instruction: 0b000000000000_00101_101_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000001,
  }, {
    instruction: 0b000000000001_00101_101_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b00000000_00000000_00000000_00000001,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000000,
  }, {
    instruction: 0b000000011111_00101_101_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0b10000000_00000000_00000000_00000000,
    rd         : Registers.t1,
    rdO        : 0b00000000_00000000_00000000_00000001,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
