/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { JAL } from './JAL'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'

describe('LUI - load upper immediate', () => {
  const op = new JAL()

  it('will recognize', () => {
    expect(op.recognize(0b0000000000000000000000000_1101111)).toBe(true)
  })

  interface TestCase {
    instruction: uint32
    pc: uint32
    value: uint32
    register: uint5
  }

  const cases: TestCase[] = [{
    instruction: 0b00000000000000000001_00001_0110111,
    pc         : 0x0234,
    value      : 0x1234,
    register   : Registers.ra,
  }, {
    // the instruction is JAL -0x02 (-2 decimal)
    // adding -0x02 to pc 0x0234 (564 decimal) gives 0x232 (562 decimal)
    instruction: 0b11111111111111111111_00101_0110111,
    pc         : 0x0234,
    value      : 0x232,
    register   : Registers.t0,
  }, {
    // the instruction is JAL -0x55d56 (-351574 decimal)
    // adding -0x55d56 to pc 0x0234 ( gives -0x55b22 (-351010 decimal)
    // converting that to unsigned number gives 0xfffaa4de
    instruction: 0b10101010101010101010_00001_0110111,
    pc         : 0x0234,
    value      : 0xfffaa4de,
    register   : Registers.ra,
  }, {
    instruction: 0b01010101010101010101_00101_0110111,
    pc         : 0x0234,
    value      : 0x55f88,
    register   : Registers.t0,
  }]

  cases.forEach(({ instruction, pc, value, register }) => {
    it(`will jump to ${value} with register x${register} set to ${value})`, () => {
      const registers = new Registers()
      registers.pc = pc

      op.execute(instruction, registers)

      expect(registers.x[register]).toBe(value)
      expect(registers.pc).toBe(value)
    })
  })
})
