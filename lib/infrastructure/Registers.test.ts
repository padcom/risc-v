/* eslint-disable padding-line-between-statements */
import { describe, it, expect } from 'vitest'
import { Registers } from './Registers'

describe('Infrastructure / Registers', () => {
  const registers = new Registers()

  it('will create all registers', () => {
    expect(registers.pc).toBe(0)
    expect(registers.x).toHaveLength(32)
    for (const x of registers.x) expect(x).toEqual(0)
  })
})
