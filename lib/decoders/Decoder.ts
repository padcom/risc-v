import { uint32 } from '../infrastructure/Memory'

export class Decoder {
  decode(instruction: uint32) {
    const opcode = (instruction & 0b0000000000000000000000000_1111111) >>> 0

    return { opcode }
  }
}

export function encode(x0: number, x1: number, letter = '1') {
  return (letter.repeat(x1 - x0 + 1) + '0'.repeat(x0)).padStart(32, '0')
}
