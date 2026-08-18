


const API_BASE = "http://127.0.0.1:8000";

export function getImageUrl(image) {

    if (!image) return null;

    if (image.startsWith("http")) {
        return image;
    }

    return `${API_BASE}${image}`;
}

