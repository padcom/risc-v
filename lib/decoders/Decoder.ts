export class Decoder {
  decode(arg0: number) {
    const opcode = arg0 & 0b1111111 >>> 0

    return { opcode }
  }
}

export function encode(x0: number, x1: number, letter: string = '1') {
  return (letter.repeat(x1 - x0 + 1) + '0'.repeat(x0)).padStart(32, '0')
}
