/* eslint-disable key-spacing */
/* eslint-disable max-lines-per-function */
import { describe } from 'vitest'
import { BNE } from './BNE'
import { Registers } from '../infrastructure/Registers'
import { BranchTestCase, test } from './branch-test'

describe('BNE - branch if not equal', () => {
  const op = new BNE()

  const cases: BranchTestCase[] = [{
    instruction: 0b0_000000_00110_00101_001_0100_0_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rs2        : Registers.t1,
    rs2I       : 0x1235,
    pcI        : 0x10000,
    pcO        : 0x10008,
  }, {
    instruction: 0b0_000000_00110_00101_001_0100_0_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rs2        : Registers.t1,
    rs2I       : 0x1234,
    pcI        : 0x10000,
    pcO        : 0x10000,
  }, {
    instruction: 0b1_111111_00110_00101_001_1100_1_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rs2        : Registers.t1,
    rs2I       : 0x1235,
    pcI        : 0x10000,
    pcO        : 0x0fff8,
  }, {
    instruction: 0b1_111111_00110_00101_001_1100_1_1100011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rs2        : Registers.t1,
    rs2I       : 0x1234,
    pcI        : 0x10000,
    pcO        : 0x10000,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
