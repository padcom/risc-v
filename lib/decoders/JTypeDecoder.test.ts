import { describe, it, expect } from 'vitest'
import { JTypeDecoder } from './JTypeDecoder'

describe('J-type decoder', () => {
  const decoder = new JTypeDecoder()

  it('will decode opcode', () => {
    const { opcode } = decoder.decode(0xffffffff)
    expect(opcode).toBe(0b1111111)
  })

  it('will decode rd', () => {
    const { rd } = decoder.decode(0xffffffff)
    expect(rd).toBe(0b11111)
  })

  it('will decode imm', () => {
    const { uimm, imm } = decoder.decode(0xffffffff)
    expect(uimm).toBe(0b111111111111111111110)
    expect(imm).toBe(-2)
  })
})
