import React, { useEffect, useState } from 'react';
import styled from '@emotion/native';
import { getPhotos, structurePhotoData } from './utils';

export const PhotoAlbum = () => {
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
