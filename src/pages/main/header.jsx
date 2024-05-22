import styled from "styled-components";

const HeadBox = () => {
  const Container = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  `;
  const MainImg = styled.div``;
  const Header = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    width: 100%;
    height: 150px;
  `;
  const LeftBox = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    width: 20%;
    height: 100%;
    left: 3%;
    img {
      width: 150px;
      height: auto;
    }
  `;
  const Logo = styled.div``;
  const RightBox = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 10%;
    width: 20%;
    height: 50%;
    left: 11%;
    font-size: 25px;
    color: #fff;
  `;
  const MenuBar = styled.div`
    z-index: 1;
    position: absolute;
    right: 5%;
    cursor: pointer;
    img {
      width: 150px;
      height: auto;
    }
  `;
  const Gbtn = styled.div`
    display: flex;
    width: 30%;
    justify-content: center;
    align-items: center;
  `;
  const Cbtn = styled.div`
    display: flex;
    width: 30%;
    justify-content: center;
    align-items: center;
  `;
  const Bbtn = styled.div`
    display: flex;
    width: 30%;
    justify-content: center;
    align-items: center;
  `;

  const MenuAfter = styled.div`
    position: absolute;
    width: 400px;
    height: 600px;
    background: gray;
    right: -20%;
    top: -90%;
    transform: rotate(-40deg);
    /* border-radius: 100px; */
  `;
  const MenuT = styled.div`
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100px;
    height: 200px;
    top: 55%;
    left: 17%;
    background: red; */
  `;
  const MyPage = styled.div`
    font-size: 20px;
    height: 15%;
  `;
  const Cart = styled.div`
    font-size: 20px;
    height: 15%;
  `;
  const LogOut = styled.div`
    font-size: 20px;
    height: 15%;
  `;
  return (
    <Container>
      <Header>
        <LeftBox>
          <Logo>
            <img src="img/logo.webp" alt="" />
          </Logo>
        </LeftBox>
        <RightBox>
          <Gbtn>굿즈</Gbtn>
          <Cbtn>콘서트</Cbtn>
          <Bbtn>버블</Bbtn>
        </RightBox>
        <MenuBar>
          <img src="img/menubar.png" alt="" />
        </MenuBar>
        <MenuAfter>
          <MenuT>
            <MyPage>마이페이지</MyPage>
            <Cart>장바구니</Cart>
            <LogOut>로그아웃</LogOut>
          </MenuT>
        </MenuAfter>
      </Header>
      <MainImg>
        <img src="img/main1.png" alt="" />
      </MainImg>
    </Container>
  );
};

export default HeadBox;
