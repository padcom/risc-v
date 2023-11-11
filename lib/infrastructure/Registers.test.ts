/* eslint-disable padding-line-between-statements */
import { describe, it, expect } from 'vitest'
import { Registers } from './Registers'

describe('Infrastructure / Registers', () => {
  const registers = new Registers()

  it('will create all registers', () => {
    expect(registers.pc).toBe(0)
    // @ts-ignore because we're testing internal state of the instance
    expect(registers.x).toHaveLength(32)
    // @ts-ignore because we're testing internal state of the instance
    for (const x of registers.x) expect(x).toEqual(0)
  })

  it('will x0 always be zero', () => {
    registers.write(0, -1)
    expect(registers.read(0)).toBe(0)
  })
})
