import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class SRAI implements Operation {
  static OPCODE = 0b0010011
  static FUNCT3 = 0b101
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3, uimm } = this.decoder.decode(instruction)

    // eslint-disable-next-line no-extra-parens
    return opcode === SRAI.OPCODE && funct3 === SRAI.FUNCT3 && (uimm & 0b010000000000) !== 0
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rd, imm } = this.decoder.decode(instruction)
    registers.write(rd, registers.read(rs1) >> (imm & 31))
  }
}
