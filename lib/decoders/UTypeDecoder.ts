export class UTypeDecoder {
  decode(arg0: number) {
    const opcode = (arg0 & 0b1111111) >>> 0
    const rd = (arg0 & 0b111110000000) >>> 7
    const imm = (arg0 & 0b11111111111111111111000000000000) >>> 0

    return { imm, rd, opcode }
  }
}
