import styled from "styled-components";
const $ciBlue = "#00fff1";
export const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const rgbString = (rgb: ReturnType<typeof hexToRgb>) => {
  return rgb?.r + "," + rgb?.g + "," + rgb?.b;
};

export const Centered = styled.div<{ direction?: "row" | "column" }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ direction }) => (direction === "row" ? "row" : "column")};
`;

export const Clickable = styled.div`
  height: 100%;
  width: 100%;
  &:hover {
    cursor: pointer;
  }
`;

export const DefaultPadding = styled.div`
  padding: 20px;
`;

export const CardContent = styled.div`
  background-color: #13161c;
  border-radius: inherit;
  transition: all 0.25s;
  height: calc(100% - 0.1rem);
  width: calc(100% - 0.1rem);
`;

export const Card = styled.div`
  width: 20rem;
  height: 15rem;
  background: radial-gradient(150rem circle at 0 0, rgba(${rgbString(hexToRgb($ciBlue))}, 0), transparent 0%);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.15s;
  &:hover {
    &::before {
      opacity: 1;
    }
  }
  &::before {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: inherit;
    background: radial-gradient(
      60rem circle at var(--xPos) var(--yPos),
      rgba(${rgbString(hexToRgb($ciBlue))}, 0.05),
      transparent 35%
    );
    opacity: 0;
    transition: all 0.15s ease-in-out;
  }
`;

export const ClickableCard = styled(Card)`
  &:hover {
    cursor: pointer;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 90%;
  padding: 2rem;
  &:hover {
    ${ClickableCard} {
      background: radial-gradient(
        100rem circle at var(--xPos) var(--yPos),
        rgba(${rgbString(hexToRgb($ciBlue))}, 0.4),
        transparent 15%
      );
    }
  }
`;

export const NavbarClickable = styled(Clickable)`
  background-color: #13161c;
  position: fixed;
  top: 0;
  height: 60px;
`;
