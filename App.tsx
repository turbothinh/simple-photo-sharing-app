import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled, { css } from '@emotion/native';
import { PIXABAY_API_KEY } from 'react-native-dotenv';

const getPhotos = () => {
	const keyword = 'programmer';
	const apiService = 'https://pixabay.com/api/';
	const apiOptions = '&per_page=20&pretty=true';
	const apiKeyword = encodeURIComponent(keyword);
	const apiEndpoint = `${apiService}?key=${PIXABAY_API_KEY}&q=${apiKeyword}${apiOptions}`;

	return fetch(apiEndpoint);
};

const structurePhotoData = photos => {
	const photoList = photos.reduce((acc, photo) => {
		acc.push({
			id: photo.id,
			uri: photo.webformatURL,
		});
		return acc;
	}, []);

	return photoList;
};

const Photos = () => {
	const [photos, setPhotos] = useState([]);
	const [selected, setSelected] = useState(new Map());

	const onSelect = React.useCallback(
		id => {
			const newSelected = new Map(selected);
			newSelected.set(id, !selected.get(id));

			setSelected(newSelected);
		},
		[selected],
	);

	useEffect(() => {
		getPhotos()
			.then(res => res.json())
			.then(data => {
				const photos = structurePhotoData(data.hits);
				setPhotos(photos);
			})
			.catch(e => {
				throw new Error(`Something wrong ${e}`);
			});
	}, [structurePhotoData, getPhotos]);

	const renderItems = item => {
		const { id, uri } = item;

		return (
			<Card onPress={() => onSelect(id)}>
				<Overlay selected={selected.get(id)} />
				<Photo source={{ uri }} />
			</Card>
		);
	};

	return (
		photos && (
			<PhotoList
				data={photos}
				horizontal={false}
				numColumns={2}
				keyExtractor={photo => photo.id}
				extraData={selected}
				renderItem={({ item }) => renderItems(item)}
			/>
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

const Card = styled.TouchableOpacity`
	position: relative;
	flex-basis: 50%;
	background-color: red;
	margin: 2px;
`;

const Overlay = styled.View`
	display: ${props => (props.selected ? 'flex' : 'none')};
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(250, 250, 142, 0.3);
	z-index: 2;
`;

const Photo = styled.Image`
	width: 100%;
	height: 100px;
	flex: 1;
`;

const PhotoList = styled.FlatList`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	padding: 8px;
	margin-bottom: 20px;
`;

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
`;
