import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class ORI implements Operation {
  static OPCODE = 0b0010011
  static FUNCT3 = 0b110
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === ORI.OPCODE && funct3 === ORI.FUNCT3
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rd, imm } = this.decoder.decode(instruction)
    registers.x[rd] = registers.x[rs1] | imm
  }
}
