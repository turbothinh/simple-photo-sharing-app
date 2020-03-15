import React, { useState } from 'react';
import styled from '@emotion/native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { Platform } from 'react-native';
import uploadToAnonymousFilesAsync from 'anonymous-files';

export const ControlPanel = ({ selectedImage, setSelectedImage }) => {
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

		// Handle photo differently on differnent platforms
		// Web
		if (Platform.OS === 'web') {
			const remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
			const newPhoto = {
				id: Math.round(Math.random() * 1e8),
				uri: pickerResult.uri,
				remoteUri,
			};
			setSelectedImage(newPhoto);
			// App
		} else {
			const newPhoto = {
				id: Math.round(Math.random() * 1e8),
				uri: pickerResult.uri,
				remoteUri: null,
			};
			setSelectedImage(newPhoto);
		}
	};

	// Open share dialog
	const openShareDialogAsync = async () => {
		if (!(await Sharing.isAvailableAsync())) {
			alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
			return;
		}

		Sharing.shareAsync(selectedImage.remoteUri || selectedImage.localUri);
	};

	return (
		<ButtonRow>
			<Button onPress={openImagePickerAsync}>
				<ButtonText>Upload</ButtonText>
			</Button>
			<Button onPress={openShareDialogAsync}>
				<ButtonText>Share</ButtonText>
			</Button>
		</ButtonRow>
	);
};

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
