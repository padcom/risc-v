/* eslint-disable no-multi-spaces */
import { uint32 } from '../infrastructure/Memory'
import { Decoder } from './Decoder'

export class STypeDecoder extends Decoder {
  decode(instruction: uint32) {
    const { opcode } = super.decode(instruction)
    const funct3 = (instruction & 0b0000000_00000_00000_111_00000_0000000) >>> 12
    const rs1    = (instruction & 0b0000000_00000_11111_000_00000_0000000) >>> 15
    const rs2    = (instruction & 0b0000000_11111_00000_000_00000_0000000) >>> 20
    const imm0   = (instruction & 0b1111111_00000_00000_000_00000_0000000) >>> 20
    const imm1   = (instruction & 0b0000000_00000_00000_000_11111_0000000) >>> 7
    const uimm   = imm0 | imm1
    const imm    = uimm.u12s32()

    return { uimm, imm, rs2, rs1, funct3, opcode }
  }
}
