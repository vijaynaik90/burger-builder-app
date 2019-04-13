import styled from 'styled-components';

export const Form = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Input = styled.input`
  width: 90%;
  height: 35px;
  border: ${props => props.border || '1px solid #ccc'};
  background-color: #fff;
`;

export const Button = styled.button`
  width: 80%;
  height: 35px;
  background-color: #FF1493;
  color: #fff;
  border-radius: 3px;
  font-size: 15px;
`;

// Text

export const Title = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: #4d4d4d;
  font-size: 2.2em;
  text-align: left;
`;

export const Title2 = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  color: #4d4d4d;
  font-size: 1.8em;
`;

export const Text = styled.p`
  font-family: 'Raleway', sans-serif;
  color: ${props => props.color || '#4d4d4d'}
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #777;
  font-family: "Raleway", sans-serif;
  font-size: 1.2em;
  margin: 0.5em 0;
  position: relative;
`;
