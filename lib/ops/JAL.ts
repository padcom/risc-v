import { JTypeDecoder } from '../decoders/JTypeDecoder'
import { uint32 } from '../infrastructure/Memory'
import { Registers } from '../infrastructure/Registers'
import { Operation } from './Operation'

export class JAL implements Operation {
  static OPCODE = 0b1101111
  decoder = new JTypeDecoder()

  recognize(instruction: uint32) {
    const { opcode } = this.decoder.decode(instruction)

    return opcode === JAL.OPCODE
  }

  execute(instruction: uint32, registers: Registers) {
    const { rd, imm } = this.decoder.decode(instruction)
    // eslint-disable-next-line operator-assignment
    registers.pc = (registers.pc + imm & 0xffffffff).s32u32()
    registers.write(rd, registers.pc)
  }
}
