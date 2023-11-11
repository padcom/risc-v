/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { SH } from './SH'
import { Registers } from '../infrastructure/Registers'
import { SaveTestCase, save as test } from './transfer-test'

describe('SH - save word from rs2 to [rs1]', () => {
  const op = new SH()

  const cases: SaveTestCase[] = [{
    instruction: 0b0000000_00110_00101_001_00010_0100011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rs2        : Registers.t1,
    rs2I       : 0xFFFFFFFF,
    base       : 0x10000,
    offset     : 2,
    expected   : 0xFFFF,
    reader     : 'read16',
  }, {
    instruction: 0b1111111_00110_00101_001_11110_0100011,
    rs1        : Registers.t0,
    rs1I       : 0x10004,
    rs2        : Registers.t1,
    rs2I       : 0xFFFFFFFF,
    base       : 0x10000,
    offset     : -2,
    expected   : 0xFFFF,
    reader     : 'read16',
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
