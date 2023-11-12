/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { CSRRC } from './CSRRC'
import { Registers } from '../infrastructure/Registers'
import { CsrRegisterTestCase, register as test } from './csr-test'

describe('CSRRC - atomic read rs1, clear bit in CSR and write to rd', () => {
  const op = new CSRRC()

  const cases: CsrRegisterTestCase[] = [{
    instruction: 0b000000000001_00101_011_00110_1110011,
    rs1        : Registers.t0,
    rs1I       : 0b10101010_10101010_10101010_10101010,
    rd         : Registers.t1,
    csr        : 0x001,
    csrI       : 0b11111111,
    csrO       : 0b01010101,
  }, {
    instruction: 0b000000000001_00101_011_00110_1110011,
    rs1        : Registers.t0,
    rs1I       : 0b10101010_10101010_10101010_10101010,
    rd         : Registers.t1,
    csr        : 0x001,
    csrI       : 0b01010101,
    csrO       : 0b01010101,
  }, {
    instruction: 0b000000000001_00000_011_00110_1110011,
    rs1        : Registers.t0,
    rs1I       : 0b10101010_10101010_10101010_10101010,
    rd         : Registers.t1,
    csr        : 0x001,
    csrI       : 0b11111111,
    csrO       : 0b11111111,
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
