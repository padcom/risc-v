/* eslint-disable max-lines-per-function */
import { describe, it, expect } from 'vitest'
import { RAM } from './Memory'

describe('RAM', () => {
  it('will read 8-bit value', () => {
    const memory = new RAM(0x1000, 1).load(0x1000, [0x01])
    const actual = memory.read8(0x1000)
    expect(actual).toBe(1)
  })

  it('will write 8-bit value', () => {
    const memory = new RAM(0x1000, 1)
    memory.write8(0x1000, 2)
    const actual = memory.read8(0x1000)
    expect(actual).toBe(2)
  })

  it('will read 16-bit value', () => {
    const memory = new RAM(0x1000, 2).load(0x1000, [0x01, 0x02])
    const actual = memory.read16(0x1000)
    expect(actual).toBe(0x0102)
  })

  it('will write 16-bit value', () => {
    const memory = new RAM(0x1000, 2)
    memory.write16(0x1000, 0x0203)
    const actual = memory.read16(0x1000)
    expect(actual).toBe(0x0203)
  })

  it('will read 32-bit value', () => {
    const memory = new RAM(0x1000, 4).load(0x1000, [0x01, 0x02, 0x03, 0x04])
    const actual = memory.read32(0x1000)
    expect(actual).toBe(0x01020304)
  })

  it('will write 32-bit value', () => {
    const memory = new RAM(0x1000, 4)
    memory.write32(0x1000, 0x02030405)
    const actual = memory.read32(0x1000)
    expect(actual).toBe(0x02030405)
  })

  it('will throw an error when loading values below available space', () => {
    expect(() => new RAM(0x1000, 1).load(0x0fff, [0x01])).toThrow('Memory underflow')
  })

  it('will throw an error when loading values above available space', () => {
    expect(() => new RAM(0x1000, 1).load(0x1000, [0x01, 0x02])).toThrow('Memory overflow')
  })

  it('will throw an error when accessing uint8 below available space', () => {
    expect(() => new RAM(0x1000, 1).read8(0x0fff)).toThrow('Address below base')
  })

  it('will throw an error when accessing uint8 above available space', () => {
    expect(() => new RAM(0x1000, 1).read8(0x1001)).toThrow('Address above available space')
  })

  it('will throw an error when writing uint8 below available space', () => {
    expect(() => new RAM(0x1000, 1).write8(0x0fff, 0)).toThrow('Address below base')
  })

  it('will throw an error when writing uint8 above available space', () => {
    expect(() => new RAM(0x1000, 1).write8(0x1001, 0)).toThrow('Address above available space')
  })

  it('will throw an error when accessing uint16 below available space', () => {
    expect(() => new RAM(0x1000, 2).read16(0x0ffe)).toThrow('Address below base')
  })

  it('will throw an error when accessing uint16 above available space', () => {
    expect(() => new RAM(0x1000, 2).read16(0x1002)).toThrow('Address above available space')
  })

  it('will throw an error when accessing uint16 on uneven address', () => {
    expect(() => new RAM(0x1000, 4).read16(0x1001)).toThrow('Memory alignment error')
  })

  it('will throw an error when writing uint16 below available space', () => {
    expect(() => new RAM(0x1000, 2).write16(0x0ffe, 0)).toThrow('Address below base')
  })

  it('will throw an error when write uint16 above available space', () => {
    expect(() => new RAM(0x1000, 2).write16(0x1002, 0)).toThrow('Address above available space')
  })

  it('will throw an error when write uint16 on uneven address', () => {
    expect(() => new RAM(0x1000, 4).write16(0x1001, 0)).toThrow('Memory alignment error')
  })

  it('will throw an error when accessing uint32 below available space', () => {
    expect(() => new RAM(0x1000, 4).read32(0x0ffe)).toThrow('Address below base')
  })

  it('will throw an error when accessing uint32 above available space', () => {
    expect(() => new RAM(0x1000, 4).read32(0x1002)).toThrow('Address above available space')
  })

  it('will throw an error when accessing uint32 on uneven address', () => {
    expect(() => new RAM(0x1000, 8).read32(0x1001)).toThrow('Memory alignment error')
  })

  it('will throw an error when writing uint32 below available space', () => {
    expect(() => new RAM(0x1000, 4).write32(0x0ffe, 0)).toThrow('Address below base')
  })

  it('will throw an error when writing uint32 above available space', () => {
    expect(() => new RAM(0x1000, 4).write32(0x1002, 0)).toThrow('Address above available space')
  })

  it('will throw an error when writing uint32 on uneven address', () => {
    expect(() => new RAM(0x1000, 8).write32(0x1001, 0)).toThrow('Memory alignment error')
  })
})
