import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import styled from '@emotion/native';

import { PhotoAlbum } from './PhotoAlbum';
import { ControlPanel } from './ControlPanel';

export const App = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	return (
		<Container>
			<SafeAreaView>
				<PhotoAlbum additionalPhoto={selectedImage} />
				<ControlPanel selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
			</SafeAreaView>
		</Container>
	);
};

const Container = styled.View`
	background-color: '#fff';
	display: flex;
	align-items: center;
	justify-content: center;
`;
