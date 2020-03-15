import React, { useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import styled from '@emotion/native';
import { PhotoAlbum } from './PhotoAlbum';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export const App = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	// Open Image picker
	const openImagePickerAsync = async () => {
		const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required!');
			return;
		}

		const pickerResult = await ImagePicker.launchImageLibraryAsync();

		if (pickerResult.cancelled === true) {
			return;
		}

		const newPhoto = {
			id: Math.round(Math.random() * 1e8),
			uri: pickerResult.uri,
		};
		setSelectedImage(newPhoto);
	};

	// Open share dialog
	const openShareDialogAsync = async () => {
		if (!(await Sharing.isAvailableAsync())) {
			alert(`Ouch, sharing isn't available on your platform`);
			return;
		}

		Sharing.shareAsync(selectedImage.uri);
	};

	return (
		<Container>
			<SafeAreaView>
				<PhotoAlbum additionalPhoto={selectedImage} />
				<ButtonRow>
					<Button onPress={openImagePickerAsync}>
						<ButtonText>Upload</ButtonText>
					</Button>
					<Button onPress={openShareDialogAsync}>
						<ButtonText>Share</ButtonText>
					</Button>
				</ButtonRow>
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

const ButtonRow = styled.View`
	display: flex;
	flex-direction: row;
`;

const Button = styled.TouchableOpacity`
	background-color: black;
	padding: 10px;
	border-radius: 2px;
	width: 150px;
	margin: auto;
	margin-top: 10px;
`;

const ButtonText = styled.Text`
	color: white;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 16px;
	text-align: center;
`;
