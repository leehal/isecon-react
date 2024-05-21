import styled from "styled-components";

const HeadBox = () => {
  const Header = styled.div`
    width: 100vw;
    height: 100px;
    background: red;
  `;
  const LeftBox = styled.div``;
  const Logo = styled.div``;
  const RightBox = styled.div``;
  return (
    <Header>
      <LeftBox>
        <Logo>
          <img src="" alt="" />
        </Logo>
      </LeftBox>
      <RightBox></RightBox>
    </Header>
  );
};

export default HeadBox;
