import styled from "styled-components/native";

export const HeaderCard = styled.View`
  width: 100%;
  max-width: 100%;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row;
`

export const IconHeaderCard = styled.Image`
  width: 100%;
  max-width: 24px;
`

export const TextHeaderCard = styled.Text`
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  color: #9B9B9B;
  padding-left: 10px;
`

export const RowLastHistoric = styled.View`
  width: 100%;
  max-width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export const LineRowSeparatorHistoric = styled.Text`
    color: #878686;
    font-size: 20px;
`

export const ViewPlans = styled.View`
    width: 100%;
    max-width: 190px;
    justify-content: center;
    align-items: center;
    border: 2px solid rgb(140, 82, 229);
    border-radius: 10px;
    margin-top: 15px;
    padding: 25px 0;
`

export const TextViewPlans = styled.Text`
  font-size: 14px;
  color: #000000;
  text-align: center;
`

export const LettersViewPlans = styled.Text`
  position: absolute;
  top: -10px;
  right: -10px;
  color: #FFF;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 30px;
  width: 30px;
  padding-top: 4px;
  background-color: rgb(140, 82, 229);
  border-radius: 50px;
  font-size: 16px;
`