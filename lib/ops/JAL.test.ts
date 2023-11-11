/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { JAL } from './JAL'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'

describe('JAL - unconditional jump', () => {
  const op = new JAL()

  interface TestCase {
    instruction: uint32
    rd: uint5
    pcI: uint32
    pcO: uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b00000000000000000001_00001_1101111,
    pcI        : 0x0234,
    pcO        : 0x1234,
    rd         : Registers.ra,
  }, {
    // the instruction is JAL -0x02 (-2 decimal)
    // adding -0x02 to pc 0x0234 (564 decimal) gives 0x232 (562 decimal)
    instruction: 0b11111111111111111111_00101_1101111,
    pcI        : 0x0234,
    pcO        : 0x232,
    rd         : Registers.t0,
  }, {
    // the instruction is JAL -0x55d56 (-351574 decimal)
    // adding -0x55d56 to pc 0x0234 ( gives -0x55b22 (-351010 decimal)
    // converting that to unsigned number gives 0xfffaa4de
    instruction: 0b10101010101010101010_00001_1101111,
    pcI        : 0x0234,
    pcO        : 0xfffaa4de,
    rd         : Registers.ra,
  }, {
    instruction: 0b01010101010101010101_00101_1101111,
    pcI        : 0x0234,
    pcO        : 0x55f88,
    rd         : Registers.t0,
  }]

  cases.forEach(({ instruction }) => { recognize(op, instruction) })

  cases.forEach(({ instruction, pcI: pc, pcO: value, rd: register }) => {
    it(`will jump to ${value} with register x${register} set to ${value})`, () => {
      const registers = new Registers()
      registers.pc = pc

      op.execute(instruction, registers)

      expect(registers.x[register]).toBe(value)
      expect(registers.pc).toBe(value)
    })
  })
})
