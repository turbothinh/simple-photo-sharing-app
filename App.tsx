import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import styled from '@emotion/native';
import { PIXABAY_API_KEY } from 'react-native-dotenv';

const getPhotos = () => {
	const keyword = 'programmer';
	const apiService = 'https://pixabay.com/api/';
	const apiOptions = '&per_page=5&pretty=true';
	const apiKeyword = encodeURIComponent(keyword);
	const apiEndpoint = `${apiService}?key=${PIXABAY_API_KEY}&q=${apiKeyword}${apiOptions}`;

	return fetch(apiEndpoint);
};

const Photos = () => {
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		getPhotos()
			.then(res => res.json())
			.then(data => setPhotos(data.hits))
			.catch(e => {
				throw new Error(`Something wrong ${e}`);
			});
	}, []);

	return (
		photos && (
			<PhotoList>
				{photos.map(photo => (
					<Photo key={photo.id} source={{ uri: photo.webformatURL }} />
				))}
			</PhotoList>
		)
	);
};

export default function App() {
	return (
		<Container>
			<SafeAreaView>
				<Photos />
				<Description>Click on the button below to share image!</Description>
				<Button onClick={() => alert('Shared!')}>
					<ButtonText>Share</ButtonText>
				</Button>
			</SafeAreaView>
		</Container>
	);
}

const Photo = styled.Image`
	width: 25%;
	height: 100px;
`;

const PhotoList = styled.View`
	width: 100%;
	height: 400px;
	display: flex;
	flex-wrap: wrap;
`;

const Container = styled.View`
	background-color: '#fff';
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Description = styled.Text`
	font-size: 13px;
`;

const Button = styled.TouchableOpacity`
	background-color: black;
	padding: 10px;
	border-radius: 2px;
`;

const ButtonText = styled.Text`
	color: white;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 20px;
`;
