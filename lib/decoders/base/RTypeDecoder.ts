import { Decoder } from "../Decoder"

export class RTypeDecoder extends Decoder {
  decode(arg0: number) {
    const { opcode } = super.decode(arg0)
    const rd = (arg0 & 0b111110000000) >>> 7
    const funct3 = (arg0 & 0b111000000000000) >>> 12
    const rs1 = (arg0 & 0b11111000000000000000) >>> 15
    const rs2 = (arg0 & 0b1111100000000000000000000) >>> 20
    const funct7 = (arg0 & 0b11111110000000000000000000000000) >>> 25

    return { funct7, rs2, rs1, funct3, rd, opcode }
  }
}
