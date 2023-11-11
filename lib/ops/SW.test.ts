/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { SW } from './SW'
import { Registers } from '../infrastructure/Registers'
import { SaveTestCase, save as test } from './transfer-test'

describe('SW - save dword from rs2 to [rs1]', () => {
  const op = new SW()

  const cases: SaveTestCase[] = [{
    instruction: 0b0000000_00110_00101_010_00100_0100011,
    rs1        : Registers.t0,
    rs1I       : 0x10000,
    rs2        : Registers.t1,
    rs2I       : 0xFFFFFFFF,
    base       : 0x10000,
    offset     : 4,
    expected   : 0xFFFFFFFF,
    reader     : 'read32',
  }, {
    instruction: 0b1111111_00110_00101_010_11100_0100011,
    rs1        : Registers.t0,
    rs1I       : 0x10008,
    rs2        : Registers.t1,
    rs2I       : 0xFFFFFFFF,
    base       : 0x10000,
    offset     : -4,
    expected   : 0xFFFFFFFF,
    reader     : 'read32',
  }]

  cases.forEach(testCase => { test(op, testCase) })
})
