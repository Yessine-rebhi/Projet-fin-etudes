import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { SectionHeading as HeadingTitle } from "../misc/Headings.js";
import { ReactComponent as QuotesLeftIcon } from "../../img/quotes-l.svg";
import { ReactComponent as QuotesRightIcon } from "../../img/quotes-r.svg";
import { ReactComponent as ArrowLeftIcon } from "../../img/arrow-left-2-icon.svg";
import { ReactComponent as ArrowRightIcon } from "../../img/arrow-right-2-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "../../img/svg-decorator-blob-4.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "../../img/svg-decorator-blob-5.svg";
import ResponsiveVideoEmbed from "../../helpers/ResponsiveVideoEmbed.js";

import "slick-carousel/slick/slick.css";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-sm`;

const TestimonialSliderContainer = tw.div`mt-24`;
const TestimonialSlider = styled(Slider)``;
const Testimonial = tw.div`flex! flex-col items-center md:items-stretch md:flex-row md:justify-center outline-none`;

const TextContainer = tw.div`md:mx-3 lg:mx-6 md:w-6/12 py-4 flex flex-col justify-between`;
const QuoteContainer = tw.div`relative p-6 md:p-8 lg:p-10 mt-4 md:mt-0`;
const Quote = tw.blockquote`text-center md:text-left font-medium text-xl lg:text-2xl xl:text-3xl`;
const CustomerInfo = tw.div`px-5 lg:px-10 text-center md:text-left mt-4 md:mt-0`;

const QuotesLeft = tw(
  QuotesLeftIcon
)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute top-0 left-0`;
const QuotesRight = tw(
  QuotesRightIcon
)`w-8 h-8 lg:w-10 lg:h-10 text-primary-500 absolute bottom-0 right-0`;

const SliderControlButtonContainer = styled.div`
  ${tw`absolute top-0 h-full flex items-end md:items-center z-20`}
  button {
    ${tw`text-secondary-500 hover:text-primary-500 focus:outline-none transition duration-300 transform hover:scale-125 transform -translate-y-2/3 md:translate-y-0`}
    svg {
      ${tw`w-8`}
    }
  }
`;
const StyledResponsiveVideoEmbed = styled(ResponsiveVideoEmbed)`
  padding-bottom: 56.25% !important;
  padding-top: 0px !important;
  ${tw`rounded`}
  iframe {
    ${tw`rounded bg-black shadow-xl`}
  }
`;

const NextArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer tw="right-0">
    <button {...props}>
      <ArrowRightIcon />
    </button>
  </SliderControlButtonContainer>
);
const PreviousArrow = ({ currentSlide, slideCount, ...props }) => (
  <SliderControlButtonContainer tw="left-0">
    <button {...props}>
      <ArrowLeftIcon />
    </button>
  </SliderControlButtonContainer>
);

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-primary-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

export default () => {
  
  const testimonials = [
    {
      quote:
        "Découvrir les interfaces des marchandiseurs, taches,produits et rapport",
      url:"https://player.vimeo.com/video/702446963?title=0&portrait=0&byline=0&autoplay=0&responsive=1"
      },
    
     
  ];
  return (
    <Container>
      <Content>
        <HeadingInfoContainer>
          <HeadingTitle>Methode de Travail</HeadingTitle>
          <HeadingDescription></HeadingDescription>
        </HeadingInfoContainer>
        <TestimonialSliderContainer>
          <TestimonialSlider
            nextArrow={<NextArrow />}
            prevArrow={<PreviousArrow />}
          >
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index}>
                <TextContainer>
                  <QuoteContainer>
                    <QuotesLeft />
                    <Quote>{testimonial.quote}</Quote>
                    <QuotesRight />
                  </QuoteContainer>
                  <CustomerInfo>
                  </CustomerInfo>
                </TextContainer>
                <TextContainer>
                <StyledResponsiveVideoEmbed
              url={testimonial.url}
              background="transparent"
            />
                </TextContainer>
              </Testimonial>
            ))}
          </TestimonialSlider>
        </TestimonialSliderContainer>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
