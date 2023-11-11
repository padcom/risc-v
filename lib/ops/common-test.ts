import { it, expect } from 'vitest'
import { uint32 } from '../infrastructure/Memory'

export function recognize(op: any, instruction: uint32) {
  it(`will recognize ${instruction.toBin32()}`, () => {
    expect(op.recognize(instruction)).toBe(true)
  })
}

