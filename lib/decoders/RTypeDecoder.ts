import { Decoder } from './Decoder'

export class RTypeDecoder extends Decoder {
  decode(arg0: number) {
    const { opcode } = super.decode(arg0)
    const rd     = (arg0 & 0b0000000_00000_00000_000_11111_0000000) >>> 7
    const funct3 = (arg0 & 0b0000000_00000_00000_111_00000_0000000) >>> 12
    const rs1    = (arg0 & 0b0000000_00000_11111_000_00000_0000000) >>> 15
    const rs2    = (arg0 & 0b0000000_11111_00000_000_00000_0000000) >>> 20
    const funct7 = (arg0 & 0b1111111_00000_00000_000_00000_0000000) >>> 25

    return { funct7, rs2, rs1, funct3, rd, opcode }
  }
}
