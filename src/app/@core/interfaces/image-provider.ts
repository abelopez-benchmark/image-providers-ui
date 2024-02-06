import { Image } from "../models/image";

export interface IImageProvider {
  searchImagesByKeywords(): Image[]
}
