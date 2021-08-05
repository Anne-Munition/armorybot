import { Document, Schema, model } from 'mongoose'

const schema = new Schema({
  type: String,
  id: String,
  embed: String,
})

export interface EmbedDoc extends Document {
  type: string
  id: string
  embed: string
}

export default model<EmbedDoc>('embeds', schema)
