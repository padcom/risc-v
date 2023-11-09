import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class ADDI implements Operation {
  static OPCODE = 0b0010011
  static FUNCT3 = 0b000
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === ADDI.OPCODE && funct3 === ADDI.FUNCT3
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rd, imm } = this.decoder.decode(instruction)
    registers.x[rd] = (registers.x[rs1].u32s32() + imm).s32u32()
  }
}
