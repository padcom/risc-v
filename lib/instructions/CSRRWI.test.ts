/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { CSRRWI } from './CSRRWI'
import { CsrImmediateTestCase, immediate as test } from './csr-test'
import { Registers } from '../infrastructure/Registers'

describe('CSRRWI - atomic read uimm[4:0] and write to CSR', () => {
  const op = new CSRRWI()

  const cases: CsrImmediateTestCase[] = [{
    instruction: 0b000000000001_01010_101_00110_1110011,
    rd         : Registers.t1,
    rdO        : 0b00000000,
    csr        : 0x001,
    csrI       : 0b00000000,
    csrO       : 0b00001010,
  }, {
    instruction: 0b000000000001_00000_101_00110_1110011,
    rd         : Registers.t1,
    rdO        : 0b11111111,
    csr        : 0x001,
    csrI       : 0b11111111,
    csrO       : 0b00000000,
  }, {
    instruction: 0b000000000001_10101_101_00000_1110011,
    rd         : Registers.zero,
    rdO        : 0, // rd is not written at all
    csr        : 0x001,
    csrI       : 0b01010101,
    csrO       : 0b01010101,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
