import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Operation } from './Operation'

export class FENCEI implements Operation {
  static OPCODE = 0b0001111
  static FUNCT3 = 0b001
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === FENCEI.OPCODE && funct3 === FENCEI.FUNCT3
  }

  execute() {
    // noop
  }
}
