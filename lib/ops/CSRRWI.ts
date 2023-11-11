import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class CSRRWI implements Operation {
  static OPCODE = 0b1110011
  static FUNCT3 = 0b101
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === CSRRWI.OPCODE && funct3 === CSRRWI.FUNCT3
  }

  execute(instruction: uint32, registers: Registers, memory: Memory) {
    const { rs1: zimm, rd, imm: csr } = this.decoder.decode(instruction)

    if (rd !== Registers.zero) {
      const value = memory.read8(csr)
      memory.write8(csr, zimm)
      registers.x[rd] = value.u8u32()
    }
  }
}
