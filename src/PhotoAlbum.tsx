import React, { useEffect, useState, FC } from 'react';
import styled from '@emotion/native';
import { getPhotos, structurePhotoData } from './utils';

type PhotoObject = {
	id: number | string;
	uri: string;
};

interface PhotoAlbum {
	additionalPhoto: PhotoObject;
}

export const PhotoAlbum: FC<PhotoAlbum> = ({ additionalPhoto }) => {
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
		const buildPhotoList = async () => {
			try {
				const result = await getPhotos();
				const rawListOfPhotos = await result.json();
				const listOfPhotos = await structurePhotoData(rawListOfPhotos.hits);
				setPhotos(listOfPhotos);
			} catch (error) {
				setPhotos([]);
			}
		};

		// If photo list is empty, fetch photos
		if (photos.length === 0) {
			buildPhotoList();
		}
	}, [structurePhotoData, getPhotos, additionalPhoto, photos]);

	useEffect(() => {
		if (additionalPhoto) {
			console.log('adding photos');
			console.log(photos);
			const newPhotos = photos;
			newPhotos.push(additionalPhoto);
			setPhotos(newPhotos);
		}
	}, [additionalPhoto]);

	const renderItems = item => {
		const { id, uri } = item;
		return (
			<Card onPress={() => onSelect(id)}>
				<Overlay selected={selected.get(id)} />
				<Photo source={{ uri }} style={{ resizeMode: 'cover' }} />
			</Card>
		);
	};

	return (
		photos && (
			<PhotoList
				data={photos}
				horizontal={false}
				numColumns={2}
				extraData={photos}
				keyExtractor={photo => photo.id}
				renderItem={({ item }) => renderItems(item)}
			/>
		)
	);
};

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
	background-color: rgba(250, 60, 155, 0.5);
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
