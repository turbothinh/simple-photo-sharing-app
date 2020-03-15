import { PIXABAY_API_KEY } from 'react-native-dotenv';

/**
 * Fetch a list of photos from Pixabay
 */
export const getPhotos = async () => {
	const keyword = 'programmer';
	const apiService = 'https://pixabay.com/api/';
	const apiOptions = '&per_page=10&pretty=true';
	const apiKeyword = encodeURIComponent(keyword);
	const apiEndpoint = `${apiService}?key=${PIXABAY_API_KEY}&q=${apiKeyword}${apiOptions}`;

	return await fetch(apiEndpoint);
};

/**
 * structurePhotoData
 * Structure photo data into consumable array format
 */
export const structurePhotoData = photos => {
	const photoList = photos.reduce((acc, photo) => {
		acc.push({
			id: photo.id,
			uri: photo.webformatURL,
		});
		return acc;
	}, []);

	return photoList;
};
