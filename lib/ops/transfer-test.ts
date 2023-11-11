/* eslint-disable no-multi-spaces */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { it, expect } from 'vitest'
import { RAM, int32, uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'
import { Registers } from '../infrastructure/Registers'

export interface LoadTestCase {
  instruction: uint32
  rs1: uint5
  rs1I: uint32
  rd: uint5
  base: uint32
  offset: uint32
  value: uint32
  expected: int32
  writer: 'write8' | 'write16' | 'write32'
}

export function load(
  op: any,
  { instruction, rs1, rs1I, rd, base, offset, value, expected, writer }: LoadTestCase,
) {
  recognize(op, instruction)

  it(`will execute ${instruction.toBin32()}`, () => {
    const registers = new Registers()
    registers.x[rs1] = rs1I
    const memory = new RAM(base, 0x10)
    memory[writer](base + offset, value)

    op.execute(instruction, registers, memory)

    expect(registers.x[rd]).toBe(expected)
  })
}

export interface SaveTestCase {
  instruction: uint32
  rs1        : uint5
  rs1I       : uint32
  rs2        : uint5
  rs2I       : uint32
  base       : uint32
  offset     : uint32
  expected   : int32
  reader     : 'read8' | 'read16' | 'read32'
}

export function save(
  op: any,
  { instruction, rs1, rs1I, rs2, rs2I, base, offset, expected, reader }: SaveTestCase,
) {
  recognize(op, instruction)

  it(`will execute ${instruction.toBin32()}`, () => {
    const registers = new Registers()
    registers.x[rs1] = rs1I
    registers.x[rs2] = rs2I
    const memory = new RAM(base, 0x10)

    op.execute(instruction, registers, memory)

    expect(memory[reader](rs1I + offset)).toBe(expected)
  })
}
