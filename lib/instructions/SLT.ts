import { RTypeDecoder } from '../decoders/RTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class SLT implements Operation {
  static OPCODE = 0b0110011
  static FUNCT3 = 0b010
  static FUNCT7 = 0b0000000
  decoder = new RTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3, funct7 } = this.decoder.decode(instruction)

    return opcode === SLT.OPCODE && funct3 === SLT.FUNCT3 && funct7 === SLT.FUNCT7
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rs2, rd } = this.decoder.decode(instruction)
    registers.write(rd, registers.read(rs1) < registers.read(rs2) ? 1 : 0)
  }
}
