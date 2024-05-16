import styled from "styled-components";

const Productdiv = styled.ul`
  width: 25%;
  height: 20%;
  background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-style: solid;
  text-align: center;
`;
const Productimg = styled.div`
  width: 90%;
  height: 45%;
  background-image: url(${(props) => props.url});
`;

const Producttext = styled.div`
  width: 90%;
  height: 45%;
`;

const ProductMap = () => {
  const prod = [
    {
      Productimg:
        "https://cafe24img.poxo.com/withmuulive/web/product/small/202402/054d9313676e4b3ef01ecef081fa4e9b.jpg",
      name: "이세계 아이돌 - 01 페이스 쿠션",
      price: 35000,
    },
    {
      Productimg:
        "https://cafe24img.poxo.com/withmuulive/web/product/small/202402/054d9313676e4b3ef01ecef081fa4e9b.jpg",
      name: "이세계아이돌 - 02 아크릴 디오라마",
      price: 29000,
    },
    {
      Productimg:
        "https://cafe24img.poxo.com/withmuulive/web/product/small/202402/054d9313676e4b3ef01ecef081fa4e9b.jpg",
      name: "이세계아이돌 - 03 포토카드 세트",
      price: 7000,
    },
  ];
  const pm = prod.map((pd) => (
    <Productdiv>
      <Productimg url={pd.Productimg}></Productimg>
      <Producttext>{pd.name}</Producttext>
      <Producttext>{pd.price}</Producttext>
    </Productdiv>
  ));
  return pm;
};

const Product = () => {
  return (
    <>
      <ProductMap></ProductMap>
    </>
  );
};

export default Product;
