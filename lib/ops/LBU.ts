import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class LBU implements Operation {
  static OPCODE = 0b0000011
  static FUNCT3 = 0b100
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === LBU.OPCODE && funct3 === LBU.FUNCT3
  }

  execute(instruction: uint32, registers: Registers, memory: Memory) {
    const { rd, rs1, imm } = this.decoder.decode(instruction)
    registers.write(rd, memory.read8(registers.read(rs1) + imm))
  }
}
