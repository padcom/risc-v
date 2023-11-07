export class Decoder {
  decode(arg0: number) {
    const opcode = arg0 & 0b1111111 >>> 0

    return { opcode }
  }
}
