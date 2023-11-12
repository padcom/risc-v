import { ITypeDecoder } from '../decoders/ITypeDecoder'
import { Memory, uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class CSRRSI implements Operation {
  static OPCODE = 0b1110011
  static FUNCT3 = 0b110
  decoder = new ITypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3 } = this.decoder.decode(instruction)

    return opcode === CSRRSI.OPCODE && funct3 === CSRRSI.FUNCT3
  }

  execute(instruction: uint32, registers: Registers, memory: Memory) {
    const { rs1: zimm, rd, imm: csr } = this.decoder.decode(instruction)

    const value = memory.read8(csr)
    registers.write(rd, value.u8u32())

    if (zimm !== 0) {
      // eslint-disable-next-line no-extra-parens
      memory.write8(csr, value | zimm)
    }
  }
}
