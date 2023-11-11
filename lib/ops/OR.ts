import { RTypeDecoder } from '../decoders/RTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class OR implements Operation {
  static OPCODE = 0b0110011
  static FUNCT3 = 0b110
  static FUNCT7 = 0b0000000
  decoder = new RTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode, funct3, funct7 } = this.decoder.decode(instruction)

    return opcode === OR.OPCODE && funct3 === OR.FUNCT3 && funct7 === OR.FUNCT7
  }

  execute(instruction: uint32, registers: Registers) {
    const { rs1, rs2, rd } = this.decoder.decode(instruction)
    registers.x[rd] = registers.x[rs1] | registers.x[rs2]
  }
}
