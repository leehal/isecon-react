import styled from "styled-components";

const HeadBox = () => {
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: red;
  `;
  const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 150px;
    background: blue;
  `;

  return (
    <Container>
      <Header></Header>
    </Container>
  );
};

export default HeadBox;
