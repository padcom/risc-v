/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
/* eslint-disable max-lines-per-function */
/* eslint-disable key-spacing */
import { describe, it, expect } from 'vitest'
import { AUIPC } from './AUIPC'
import { Registers } from '../infrastructure/Registers'
import { uint5, uint12, uint32 } from '../infrastructure/Memory'
import { recognize } from './common-test'

describe('AUIPC - add upper immediate to pc', () => {
  const op = new AUIPC()

  interface TestCase {
    instruction: uint32
    pcI        : uint12
    rs1        : uint5
    rs1O       : uint32
  }

  const cases: TestCase[] = [{
    instruction: 0b00000000000000000001_11111_0010111,
    pcI        : 0x0234,
    rs1        : Registers.t6,
    rs1O       : 0b00000000000000000001_0010_0011_0100,
  }, {
    instruction: 0b11111111111111111111_00110_0010111,
    pcI        : 0x0234,
    rs1        : Registers.t1,
    rs1O       : 0b11111111111111111111_0010_0011_0100,
  }, {
    instruction: 0b10101010101010101010_00111_0010111,
    pcI        : 0x0234,
    rs1        : Registers.t2,
    rs1O       : 0b10101010101010101010_0010_0011_0100,
  }, {
    instruction: 0b01010101010101010101_11100_0010111,
    pcI        : 0x0234,
    rs1        : Registers.t3,
    rs1O       : 0b01010101010101010101_0010_0011_0100,
  }]

  cases.forEach(({ instruction }) => { recognize(op, instruction) })

  cases.forEach(({ instruction, pcI, rs1O: value, rs1: register }) => {
    it(`will load ${value} into register x${register}`, () => {
      const registers = new Registers()
      registers.pc = pcI

      op.execute(instruction, registers)

      expect(registers.x[register].s32u32()).toBe(value)
    })
  })
})
