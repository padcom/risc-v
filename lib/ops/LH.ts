import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class LH implements Operation {
  static OPCODE = 0b0000011
  static FUNCT3 = 0b001
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === LH.OPCODE && funct3 === LH.FUNCT3
  }

  execute(instruction: uint32, registers: Registers, memory: Memory) {
    const { rd, rs1, imm } = this.decoder.decode(instruction)
    registers.x[rd] = memory.read16(registers.x[rs1] + imm).u16s32()
  }
}
