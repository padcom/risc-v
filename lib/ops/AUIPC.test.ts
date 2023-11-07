/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { AUIPC } from './AUIPC'
import { Registers } from '../infrastructure/Registers'
import { uint5, uint12, uint32 } from '../infrastructure/Memory'

describe('AUIPC - add upper immediate to pc', () => {
  const op = new AUIPC()

  interface TestCase {
    instruction: uint32
    pc: uint12
    value: uint32
    register: uint5
  }

  const cases: TestCase[] = [{
    instruction: 0b00000000000000000001_11111_0010111,
    pc         : 0x0234,
    value      : 0b00000000000000000001_0010_0011_0100,
    register   : Registers.t6,
  }, {
    instruction: 0b11111111111111111111_00110_0010111,
    pc         : 0x0234,
    value      : 0b11111111111111111111_0010_0011_0100,
    register   : Registers.t1,
  }, {
    instruction: 0b10101010101010101010_00111_0010111,
    pc         : 0x0234,
    value      : 0b10101010101010101010_0010_0011_0100,
    register   : Registers.t2,
  }, {
    instruction: 0b01010101010101010101_11100_0010111,
    pc         : 0x0234,
    value      : 0b01010101010101010101_0010_0011_0100,
    register   : Registers.t3,
  }]

  cases.forEach(({ instruction, pc, value, register }) => {
    it(`will load ${value} into register x${register}`, () => {
      const registers = new Registers()
      registers.pc = pc
      expect(op.recognize(instruction)).toBe(true)
      op.execute(instruction, registers)
      expect(registers.x[register].s32u32()).toBe(value)
    })
  })
})
