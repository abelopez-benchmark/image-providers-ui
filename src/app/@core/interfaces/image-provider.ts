import { Image } from "../models/image";

export interface IImageProvider {
  searchImagesByKeywords(search: string): Promise<Image[]>
}
