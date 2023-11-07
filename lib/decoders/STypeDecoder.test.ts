import { describe, it, expect } from 'vitest'
import { STypeDecoder } from './STypeDecoder'

describe('R-type decoder', () => {
  const decoder = new STypeDecoder()

  it('will decode opcode', () => {
    const { opcode } = decoder.decode(0xffffffff)
    expect(opcode).toBe(0b1111111)
  })

  it('will decode opcode', () => {
    const { funct3 } = decoder.decode(0xffffffff)
    expect(funct3).toBe(0b111)
  })

  it('will decode rs1', () => {
    const { rs1 } = decoder.decode(0xffffffff)
    expect(rs1).toBe(0b11111)
  })

  it('will decode rs2', () => {
    const { rs2 } = decoder.decode(0xffffffff)
    expect(rs2).toBe(0b11111)
  })

  it('will decode imm', () => {
    const { imm } = decoder.decode(0xffffffff)
    expect(imm).toBe(0b111111111111)
  })
})
