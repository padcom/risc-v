/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { LH } from './LH'
import { Registers } from '../infrastructure/Registers'
import { LoadTestCase, load as test } from './transfer-test'

describe('LH - load word to rd', () => {
  const op = new LH()

  const cases: LoadTestCase[] = [{
    instruction: 0b000000000010_00101_001_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 2,
    value      : 0xFFFF,
    expected   : -1,
    writer     : 'write16',
  }, {
    instruction: 0b111111111110_00101_001_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10004,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 2,
    value      : 0xFFFF,
    expected   : -1,
    writer     : 'write16',
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
