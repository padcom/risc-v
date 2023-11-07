import { describe, it, expect } from 'vitest'
import { BTypeDecoder } from './BTypeDecoder'

describe('B-type decoder', () => {
  const decoder = new BTypeDecoder()

  it('will decode opcode', () => {
    const { opcode } = decoder.decode(0xffffffff)
    expect(opcode).toBe(0b1111111)
  })

  it('will decode funct3', () => {
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
    expect(imm.s32u32()).toBe(0b11111111111111111111111111111110)
  })
})
