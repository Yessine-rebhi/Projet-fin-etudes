import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

import LogoImage from "img/logo.png";
import { ReactComponent as FacebookIcon } from "img/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "img/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "img/youtube-icon.svg";

const Container = tw.div`relative bg-gray-200 text-gray-700 -mb-8 -mx-8 px-8 py-20 lg:py-24`;
const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
const SixColumns = tw.div`flex flex-wrap text-center sm:text-left justify-center sm:justify-start md:justify-between -mt-12`;

const Column = tw.div`px-4 sm:px-0 sm:w-1/4 md:w-auto mt-12`;

const ColumnHeading = tw.h5`uppercase font-bold`;

const LinkList = tw.ul`mt-6 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:border-gray-700 pb-1 transition duration-300`;

const Divider = tw.div`my-16 border-b-2 border-gray-300 w-full`;

const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-xl font-black tracking-wider text-gray-800`;

const CopywrightNotice = tw.p`text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-500`;

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2 rounded-full bg-gray-900 text-gray-100 hover:bg-gray-700 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

export default () => {
  return (
    <Container>
      <Content>
        <ThreeColRow>
          <LogoContainer>
            <LogoImg src={LogoImage} />
            <LogoText>Marchandiseur.</LogoText>
          </LogoContainer>
          <CopywrightNotice>&copy; 2022 Marchandiseur. Tous les droits sont réservés.</CopywrightNotice>
          <SocialLinksContainer>
            <SocialLink href="https://facebook.com">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://twitter.com">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="https://youtube.com">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
        </ThreeColRow>
      </Content>
    </Container>
  );
};
