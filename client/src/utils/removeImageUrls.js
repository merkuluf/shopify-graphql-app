export default function removeImageUrls(text) {
    const regex = /https:\/\/.*?\.(jpg|jpeg|png|gif|webp)/gi;
    return text.replace(regex, '');
}