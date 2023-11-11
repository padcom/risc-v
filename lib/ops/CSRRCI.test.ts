/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { CSRRCI } from './CSRRCI'
import { Registers } from '../infrastructure/Registers'
import { CsrImmediateTestCase, immediate as test } from './csr-test'

describe('CSRRCI - atomic read uimm[4:0] and clear bit in CSR', () => {
  const op = new CSRRCI()

  const cases: CsrImmediateTestCase[] = [{
    instruction: 0b000000000001_01010_111_00110_1110011,
    rd         : Registers.t1,
    rdO        : 0b11111111,
    csr        : 0x001,
    csrI       : 0b11111111,
    csrO       : 0b11110101,
  }, {
    instruction: 0b000000000001_00000_111_00110_1110011,
    rd         : Registers.t1,
    rdO        : 0b11111111,
    csr        : 0x001,
    csrI       : 0b11111111,
    csrO       : 0b11111111,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
