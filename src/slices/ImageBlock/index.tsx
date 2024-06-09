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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PrismicNextImage 
        field={slice.primary.image} 
        imgixParams={{ w: 600 }}
        style={{ width: '500px', height: 'auto', marginBottom: '8px' }} // Reduced margin-bottom
      />
      <h6 style={{ marginBottom: '40px' }}> {/* Added space below the caption */}
        {slice.primary.caption}
      </h6>
    </div>
  );
};

export default ImageBlock;
