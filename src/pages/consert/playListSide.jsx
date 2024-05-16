import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column; //세로 방향으로 요소를 배치
  align-items: right;
  justify-content: right;
  height: 100vh;
  width: 30vw;
  background-color: #704a81;
  margin: 0%;
`;

const PlHead = styled.div`
  background-color: #ce0aff75;
  color: white;
  width: 100%;
  height: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.div`
  background-color: black;
  width: 100%;
  height: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    border-radius: 5%;
    background-color: gray;
  }
`;

const PlayListSide = () => {
  return (
    <>
      <Container>
        <PlHead>ISECON</PlHead>
        <SearchBar>
          <input type="text" />
        </SearchBar>
      </Container>
    </>
  );
};
export default PlayListSide;
