/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { CSRRW } from './CSRRW'
import { Registers } from '../infrastructure/Registers'
import { CsrRegisterTestCase, register as test } from './csr-test'

describe('CSRRW - atomic read/write CSR', () => {
  const op = new CSRRW()

  const cases: CsrRegisterTestCase[] = [{
    instruction: 0b000000000001_00101_001_00110_1110011,
    csr        : 0x001,
    csrI       : 0b11111111,
    csrO       : 0b01111000,
    rs1        : Registers.t0,
    rs1I       : 0b0001_0010_0011_0100_0101_0110_0111_1000,
    rd         : Registers.t1,
  }, {
    instruction: 0b000000000001_00101_001_00101_1110011,
    csr        : 0x001,
    csrI       : 0b11111111,
    csrO       : 0b01111000,
    rs1        : Registers.t0,
    rs1I       : 0b0001_0010_0011_0100_0101_0110_0111_1000,
    rd         : Registers.t0,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
