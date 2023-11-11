/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { CSRRSI } from './CSRRSI'
import { CsrImmediateTestCase, immediate as test } from './csr-test'
import { Registers } from '../infrastructure/Registers'

describe('CSRRSI - atomic read uimm[4:0] and set bit in CSR', () => {
  const op = new CSRRSI()

  const cases: CsrImmediateTestCase[] = [{
    instruction: 0b000000000001_01010_110_00110_1110011,
    rd         : Registers.t1,
    rdO        : 0b00000000,
    csr        : 0x001,
    csrI       : 0b00000000,
    csrO       : 0b00001010,
  }, {
    instruction: 0b000000000001_00000_110_00110_1110011,
    rd         : Registers.t1,
    rdO        : 0b11111111,
    csr        : 0x001,
    csrI       : 0b11111111,
    csrO       : 0b11111111,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
