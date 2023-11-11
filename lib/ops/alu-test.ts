/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-multi-spaces */
import { it, expect } from 'vitest'
import { Registers } from '../infrastructure/Registers'
import { uint32, uint5 } from '../infrastructure/Memory'
import { recognize } from './common-test'

export interface AluImmediateTestCase {
  instruction: uint32
  rs1        : uint5
  rs1I       : uint32
  rd         : uint5
  rdO        : uint32
}

export function immediate(
  op: any,
  { instruction, rs1, rs1I, rd, rdO }: AluImmediateTestCase,
) {
  recognize(op, instruction)

  it(`will execute ${instruction.toBin32()}`, () => {
    const registers = new Registers()
    registers.x[rs1] = rs1I

    op.execute(instruction, registers)

    expect(registers.x[rd]).toBe(rdO.u32s32())
  })
}

export interface AluRegisterTestCase {
  instruction: uint32
  rs1        : uint5
  rs1I       : uint32
  rs2        : uint5
  rs2I       : uint32
  rd         : uint5
  rdO        : uint32
}

export function register(
  op: any,
  { instruction, rs1, rs1I, rs2, rs2I, rd, rdO }: AluRegisterTestCase,
) {
  recognize(op, instruction)

  it(`will execute ${instruction.toBin32()}`, () => {
    const registers = new Registers()
    registers.x[rs1] = rs1I.u32s32()
    registers.x[rs2] = rs2I.u32s32()

    op.execute(instruction, registers)

    expect(registers.x[rd]).toBe(rdO.u32s32())
  })
}
