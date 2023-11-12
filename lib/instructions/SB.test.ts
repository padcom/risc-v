/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { SB } from './SB'
import { Registers } from '../infrastructure/Registers'
import { SaveTestCase, save as test } from './transfer-test'

describe('SB - save byte from rs2 to [rs1]', () => {
  const op = new SB()

  const cases: SaveTestCase[] = [{
    instruction: 0b0000000_00110_00101_000_00001_0100011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rs2        : Registers.t1,
    rs2I       : 0xFFFFFFFF,
    base       : 0x10000,
    offset     : 1,
    expected   : 0xFF,
    reader     : 'read8',
  }, {
    instruction: 0b1111111_00110_00101_000_11111_0100011,
    rs1        : Registers.t0,
    rs1I       : 0x10002,
    rs2        : Registers.t1,
    rs2I       : 0xFFFFFFFF,
    base       : 0x10000,
    offset     : -1,
    expected   : 0xFF,
    reader     : 'read8',
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
