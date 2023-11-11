/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe } from 'vitest'
import { FENCEI } from './FENCEI'
import { recognize } from './common-test'
import { uint32 } from '../infrastructure/Memory'

describe('FENCEI - noop because of single-core emulator', () => {
  const op = new FENCEI()

  interface TestCase {
    instruction: uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b000000000000_00000_001_00000_0001111,
  }]

  cases.forEach(({ instruction }) => { recognize(op, instruction) })
})
