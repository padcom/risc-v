/* eslint-disable max-lines-per-function */
import { describe, it, expect } from 'vitest'
import { RTypeDecoder } from './RTypeDecoder'

describe('R-type decoder', () => {
  const decoder = new RTypeDecoder()

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

  it('will decode rs2', () => {
    const { rs2 } = decoder.decode(0xffffffff)
    expect(rs2).toBe(0b11111)
  })

  it('will decode funct7', () => {
    const { funct7 } = decoder.decode(0xffffffff)
    expect(funct7).toBe(0b1111111)
  })
})
