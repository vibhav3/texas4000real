import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    <div>
      <PrismicNextImage 
        field={slice.primary.image} 
        imgixParams={{ w: 600 }}
        style={{ width: '300px', height: 'auto' }} 
      />
      <h2>
        {slice.primary.caption}
      </h2>
    </div>
  );
};

export default ImageBlock;
