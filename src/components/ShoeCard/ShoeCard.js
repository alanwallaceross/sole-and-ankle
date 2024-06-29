import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const STYLES = {
    "on-sale": { text: "Sale", backgroundColor: COLORS.primary, textColor: COLORS.gray[700] },
    "new-release": {
      text: "Just Released", backgroundColor: COLORS.secondary, textColor: 'inherit'
    },
    default: { textColor: 'inherit' },
  };
  
  const style = STYLES[variant]


  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          {variant !== "default" && <Flag style={{'--backgroundColor': style.backgroundColor}}>{style.text}</Flag>}
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
          <Price style={{'--color': style.textColor, textDecoration: variant === 'on-sale' ? 'line-through': 'none'}}>{formatPrice(price)}</Price>
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === 'on-sale' && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const PriceWrapper = styled.div`
display: flex;
flex-direction: column;
`

const Flag = styled.div`
  background-color: var(--backgroundColor);
  position: absolute;
  top: 8px;
  right: -8px;
  height: 32px;
  width: fit-content;
  font-size: ${14/18}rem;
  color: ${COLORS.white};
  border: transparent solid 1px;
  border-radius: 2px;
  font-weight: ${WEIGHTS.bold};
  line-height: 32px;
  padding: 0 9px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
  align-self: flex-start;
`;

const Price = styled.span`
color: var(--color);
`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
