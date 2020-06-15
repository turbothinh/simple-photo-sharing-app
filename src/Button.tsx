
import styled from '@emotion/native';

export const ButtonRow = styled.View`
  display: flex;
  flex-direction: row;
  background-color: red;

  @media (max-width: 600px) {
    background-color: lightgrey;
  }
`;

export const Button = styled.TouchableOpacity`
  background-color: black;
  padding: 10px;
  border-radius: 2px;
  width: 150px;
  margin: auto;
  margin-top: 10px;

  :hover {
    background-color: grey;
  }

  @media only screen and (max-width: 600px) {
    width: 200px;
    background-color: green;
  }
`;

export const ButtonText = styled.Text`
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;
