/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { ADDI } from './ADDI'
import { Registers } from '../infrastructure/Registers'
import { AluTestCase, test } from './alu-test'

describe('ADDI - add imm to rs1 and store in rd', () => {
  const op = new ADDI()

  const cases: AluTestCase[] = [{
    instruction: 0b000000000001_00101_000_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rd         : Registers.t1,
    rdO        : 0x1235,
  }, {
    instruction: 0b111111111111_00101_000_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0x1234,
    rd         : Registers.t1,
    rdO        : 0x1233,
  }, {
    instruction: 0b000000000001_00101_000_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0xffffffff,
    rd         : Registers.t1,
    rdO        : 0,
  }, {
    instruction: 0b111111111111_00101_000_00110_0010011,
    rs1        : Registers.t0,
    rs1I       : 0xffffffff,
    rd         : Registers.t1,
    rdO        : 0xfffffffe,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
