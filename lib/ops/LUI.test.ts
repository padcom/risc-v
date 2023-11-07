/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { LUI } from './LUI'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'

describe('LUI - load upper immediate', () => {
  const op = new LUI()

  it('will recognize', () => {
    expect(op.recognize(0b0000000000000000000000000_0110111)).toBe(true)
  })

  interface TestCase {
    instruction: uint32
    value: uint32
    register: uint5
  }

  const cases: TestCase[] = [{
    instruction: 0b00000000000000000001_11111_0110111,
    value      : 0b00000000000000000001_00000_0000000,
    register   : Registers.t6,
  }, {
    instruction: 0b11111111111111111111_00110_0110111,
    value      : 0b11111111111111111111_00000_0000000,
    register   : Registers.t1,
  }, {
    instruction: 0b10101010101010101010_00111_0110111,
    value      : 0b10101010101010101010_00000_0000000,
    register   : Registers.t2,
  }, {
    instruction: 0b01010101010101010101_11100_0110111,
    value      : 0b01010101010101010101_00000_0000000,
    register   : Registers.t3,
  }]

  cases.forEach(({ instruction, value, register }) => {
    it(`will load ${value} into register x${register}`, () => {
      const registers = new Registers()
      op.execute(instruction, registers)
      expect(registers.x[register]).toBe(value)
    })
  })
})
