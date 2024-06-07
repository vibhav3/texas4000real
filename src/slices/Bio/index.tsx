import Bounded from "@/components/bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/HEading";
import Button from "@/components/button";
import { PrismicNextImage } from "@prismicio/next";
import Avatar from "./Avatar";
/**
 * Props for `Bio`.
 */
export type BioProps = SliceComponentProps<Content.BioSlice>;

/**
 * Component for "Bio" Slices.
 */
const Bio = ({ slice }: BioProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr,1fr]">
        <Heading as="h1" size="xl" className="col-start-1">
          {slice.primary.heading}
        </Heading>

      <div className="prose prose-xl prose-slate prose-invert col-start-1">
        <PrismicRichText field={slice.primary.description} />
      </div>
        <Button linkField ={slice.primary.button_link} label ={slice.primary.button_text} />

        <Avatar 
        image = {slice.primary.avatar}
        className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
        />
      </div>

    </Bounded>
  );
};

export default Bio;
