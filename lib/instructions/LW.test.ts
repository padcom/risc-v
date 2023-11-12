/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { LW } from './LW'
import { Registers } from '../infrastructure/Registers'
import { LoadTestCase, load as test } from './transfer-test'

describe('LW - load dword from memory to rd', () => {
  const op = new LW()

  const cases: LoadTestCase[] = [{
    instruction: 0b000000000100_00101_010_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 4,
    value      : 0xffffffff,
    expected   : -1,
    writer     : 'write32',
  }, {
    instruction: 0b111111111100_00101_010_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10008,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 4,
    value      : 0xffffffff,
    expected   : -1,
    writer     : 'write32',
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
