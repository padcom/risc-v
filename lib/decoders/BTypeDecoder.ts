/* eslint-disable no-multi-spaces */
import { uint32 } from '../infrastructure/Memory'
import { Decoder } from './Decoder'

export class BTypeDecoder extends Decoder {
  decode(instruction: uint32) {
    const { opcode } = super.decode(instruction)
    const funct3 = (instruction & 0b0_000000_00000_00000_111_0000_0_0000000) >>> 12
    const rs1    = (instruction & 0b0_000000_00000_11111_000_0000_0_0000000) >>> 15
    const rs2    = (instruction & 0b0_000000_11111_00000_000_0000_0_0000000) >>> 20

    const imm0   = (instruction & 0b1_000000_00000_00000_000_0000_0_0000000) >>> 20
    const imm1   = (instruction & 0b0_000000_00000_00000_000_0000_1_0000000) << 3
    const imm2   = (instruction & 0b0_111111_00000_00000_000_0000_0_0000000) >>> 21
    const imm3   = (instruction & 0b0_000000_00000_00000_000_1111_0_0000000) >>> 8
    const uimm   = (imm0 | imm1 | imm2 | imm3) << 1
    const imm    = uimm.u12s32()

    return { uimm, imm, rs2, rs1, funct3, opcode }
  }
}
