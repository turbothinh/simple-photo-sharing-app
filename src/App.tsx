import React from 'react';
import { SafeAreaView, Alert } from 'react-native';
import styled from '@emotion/native';
import { PhotoAlbum } from './PhotoAlbum';

export const App = () => (
	<Container>
		<SafeAreaView>
			<PhotoAlbum />
			<Description>Click on the button below to share image!</Description>
			<Button onPress={() => Alert.alert('Photos shared!')}>
				<ButtonText>Share</ButtonText>
			</Button>
		</SafeAreaView>
	</Container>
);

const Container = styled.View`
	background-color: '#fff';
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Description = styled.Text`
	font-size: 13px;
	text-align: center;
`;

const Button = styled.TouchableOpacity`
	background-color: black;
	padding: 10px;
	border-radius: 2px;
	width: 200px;
	margin: auto;
	margin-top: 10px;
`;

const ButtonText = styled.Text`
	color: white;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 20px;
	text-align: center;
`;
