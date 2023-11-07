import { describe, it, expect } from 'vitest'
import { UTypeDecoder } from './UTypeDecoder'

describe('R-type decoder', () => {
  const decoder = new UTypeDecoder()

  it('will decode opcode', () => {
    const { opcode } = decoder.decode(0xffffffff)
    expect(opcode).toBe(0b1111111)
  })

  it('will decode rd', () => {
    const { rd } = decoder.decode(0xffffffff)
    expect(rd).toBe(0b11111)
  })

  it('will decode imm', () => {
    const { imm } = decoder.decode(0xffffffff)
    expect(imm).toBe(-0x1000)
  })
})
