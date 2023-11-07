/* eslint-disable max-lines-per-function */
import { describe, it, expect } from 'vitest'

describe('Numeric utilities', () => {
  it('will convert 12-bit signed value to 32bit signed', () => {
    expect(0b0000_0000_0000.u12s32()).toBe(0)
    expect(0b0000_0000_0001.u12s32()).toBe(1)
    expect(0b0000_0000_0010.u12s32()).toBe(2)
    expect(0b0000_0000_0011.u12s32()).toBe(3)
    expect(0b1111_1111_1111.u12s32()).toBe(-1)
    expect(0b1111_1111_1110.u12s32()).toBe(-2)
    expect(0b1111_1111_1101.u12s32()).toBe(-3)
    expect(0b1111_1111_1100.u12s32()).toBe(-4)
  })

  it('will convert 21-bit unsigned value to 32bit signed', () => {
    expect(0b0_0000_0000_0000_0000_0000.u21s32()).toBe(0)
    expect(0b0_0000_0000_0000_0000_0001.u21s32()).toBe(1)
    expect(0b0_0000_0000_0000_0000_0010.u21s32()).toBe(2)
    expect(0b0_0000_0000_0000_0000_0011.u21s32()).toBe(3)
    expect(0b1_1111_1111_1111_1111_1111.u21s32()).toBe(-1)
    expect(0b1_1111_1111_1111_1111_1110.u21s32()).toBe(-2)
    expect(0b1_1111_1111_1111_1111_1101.u21s32()).toBe(-3)
    expect(0b1_1111_1111_1111_1111_1100.u21s32()).toBe(-4)
  })

  it('will convert 32-bit bits to 32-bit signed', () => {
    expect(0b00000000_00000000_00000000_00000000.u32s32()).toBe(0)
    expect(0b00000000_00000000_00000000_00000001.u32s32()).toBe(1)
    expect(0b00000000_00000000_00000000_00000010.u32s32()).toBe(2)
    expect(0b00000000_00000000_00000000_00000011.u32s32()).toBe(3)
    expect(0b11111111_11111111_11111111_11111111.u32s32()).toBe(-1)
    expect(0b11111111_11111111_11111111_11111110.u32s32()).toBe(-2)
    expect(0b11111111_11111111_11111111_11111101.u32s32()).toBe(-3)
    expect(0b11111111_11111111_11111111_11111100.u32s32()).toBe(-4)
  })

  it('will convert 32-bit bits to 32-bit signed', () => {
    expect((0).s32u32()).toBe(0b00000000_00000000_00000000_00000000)
    expect((1).s32u32()).toBe(0b00000000_00000000_00000000_00000001)
    expect((2).s32u32()).toBe(0b00000000_00000000_00000000_00000010)
    expect((3).s32u32()).toBe(0b00000000_00000000_00000000_00000011)
    expect((-1).s32u32()).toBe(0b11111111_11111111_11111111_11111111)
    expect((-2).s32u32()).toBe(0b11111111_11111111_11111111_11111110)
    expect((-3).s32u32()).toBe(0b11111111_11111111_11111111_11111101)
    expect((-4).s32u32()).toBe(0b11111111_11111111_11111111_11111100)
  })
})
