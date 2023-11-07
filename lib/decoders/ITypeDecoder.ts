import { Decoder } from './Decoder'

export class ITypeDecoder extends Decoder {
  decode(arg0: number) {
    const { opcode } = super.decode(arg0)
    const rd     = (arg0 & 0b00000000000_00000_000_11111_0000000) >>> 7
    const funct3 = (arg0 & 0b00000000000_00000_111_00000_0000000) >>> 12
    const rs1    = (arg0 & 0b00000000000_11111_000_00000_0000000) >>> 15
    const imm    = (arg0 & 0b11111111111_00000_000_00000_0000000) >> 20

    return { imm, rs1, funct3, rd, opcode }
  }
}
