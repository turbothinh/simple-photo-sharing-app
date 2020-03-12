import React from 'react';
import { Text, View, Image } from 'react-native';
import styled from '@emotion/native';

export default function App() {
	return (
		<Container>
			<Photo source={{ uri: 'http://placekitten.com/200/300' }} />
			<Description>Featured photo!</Description>
		</Container>
	);
}

const Photo = styled.Image`
	width: 200px;
	height: 200px;
`;

const Container = styled.View`
	background-color: '#fff';
	display: 'flex';
	align-items: 'center';
	justify-content: 'center';
`;

const Description = styled.Text`
	font-size: 13px;
`;
