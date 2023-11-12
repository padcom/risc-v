import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class SLTI implements Operation {
  static OPCODE = 0b0010011
  static FUNCT3 = 0b010
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === SLTI.OPCODE && funct3 === SLTI.FUNCT3
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rd, imm } = this.decoder.decode(instruction)
    registers.write(rd, registers.read(rs1).u32s32() < imm ? 1 : 0)
  }
}
