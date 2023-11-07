import { describe, it, expect } from 'vitest'
import { ITypeDecoder } from './ITypeDecoder'

describe('R-type decoder', () => {
  const decoder = new ITypeDecoder()

  it('will decode opcode', () => {
    const { opcode } = decoder.decode(0xffffffff)
    expect(opcode).toBe(0b1111111)
  })

  it('will decode rd', () => {
    const { rd } = decoder.decode(0xffffffff)
    expect(rd).toBe(0b11111)
  })

  it('will decode funct3', () => {
    const { funct3 } = decoder.decode(0xffffffff)
    expect(funct3).toBe(0b111)
  })

  it('will decode rs1', () => {
    const { rs1 } = decoder.decode(0xffffffff)
    expect(rs1).toBe(0b11111)
  })

  it('will decode imm', () => {
    const { imm } = decoder.decode(0xffffffff)
    expect(imm).toBe(-1)
  })
})
