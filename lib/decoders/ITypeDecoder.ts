export class ITypeDecoder {
  decode(arg0: number) {
    const opcode = arg0 & 0b1111111 >>> 0
    const rd = (arg0 & 0b111110000000) >>> 7
    const funct3 = (arg0 & 0b111000000000000) >>> 12
    const rs1 = (arg0 & 0b11111000000000000000) >>> 15
    const imm = (arg0 & 0b1111111111100000000000000000000) >> 20

    return { imm, rs1, funct3, rd, opcode }
  }
}
