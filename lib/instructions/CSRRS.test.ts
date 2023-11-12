/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { CSRRS } from './CSRRS'
import { Registers } from '../infrastructure/Registers'
import { CsrRegisterTestCase, register as test } from './csr-test'

describe('CSRRS - atomic read and set bit in CSR', () => {
  const op = new CSRRS()

  const cases: CsrRegisterTestCase[] = [{
    instruction: 0b000000000001_00101_010_00110_1110011,
    rs1        : Registers.t0,
    rs1I       : 0b10101010_10101010_10101010_10101010,
    rd         : Registers.t1,
    csr        : 0x001,
    csrI       : 0b00000000,
    csrO       : 0b10101010,
  }, {
    instruction: 0b000000000001_00101_010_00110_1110011,
    rs1        : Registers.t0,
    rs1I       : 0b10101010_10101010_10101010_10101010,
    rd         : Registers.t1,
    csr        : 0x001,
    csrI       : 0b01010101,
    csrO       : 0b11111111,
  }, {
    instruction: 0b000000000001_00000_010_00110_1110011,
    rs1        : Registers.zero,
    rs1I       : 0b10101010_10101010_10101010_10101010,
    rd         : Registers.t1,
    csr        : 0x001,
    csrI       : 0b11111111,
    csrO       : 0b11111111,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
