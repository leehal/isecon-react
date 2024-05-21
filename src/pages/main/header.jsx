import styled from "styled-components";

const HeadBox = () => {
  const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    background: blue;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  `;
  const MainImg = styled.div``;
  const Header = styled.div`
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100px;
    border: 1px solid red;
  `;
  const LeftBox = styled.div`
    img {
      width: 150px;
      height: auto;
    }
  `;
  const Logo = styled.div``;
  const RightBox = styled.div``;
  return (
    <Container>
      <Header>
        <LeftBox>
          <Logo>
            <img src="img/logo.webp" alt="" />
          </Logo>
        </LeftBox>
        <RightBox></RightBox>
      </Header>
      <MainImg>
        <img src="img/main1.png" alt="" />
      </MainImg>
    </Container>
  );
};

export default HeadBox;
