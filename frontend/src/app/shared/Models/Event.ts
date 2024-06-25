import { Buffer } from 'buffer';
export class Event {
  _id!: string;  // Include _id to match MongoDB's _id field
  name!: string;
  price!: number;
  tags?: string[];
  description!: string;
  count!: number;
  imageUrl!: String;
  location!: string[];
  time!: string;
}
