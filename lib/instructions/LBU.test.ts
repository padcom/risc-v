/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { LBU } from './LBU'
import { Registers } from '../infrastructure/Registers'
import { LoadTestCase, load as test } from './transfer-test'

describe('LBU - load unsigned byte to rd', () => {
  const op = new LBU()

  const cases: LoadTestCase[] = [{
    instruction: 0b000000000001_00101_100_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 1,
    value      : 0xff,
    expected   : 0x000000ff,
    writer     : 'write8',
  }, {
    instruction: 0b111111111111_00101_100_00110_0000011,
    rs1        : Registers.t0,
    rs1I       : 0x10002,
    rd         : Registers.t1,
    base       : 0x10000,
    offset     : 1,
    value      : 0xff,
    expected   : 0x000000ff,
    writer     : 'write8',
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
