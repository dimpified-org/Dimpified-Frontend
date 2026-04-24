import AxiosInterceptor from "../component/AxiosInterceptor";

const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

// Upload service image
const uploadServiceImage = async ({
  oldImageUrl = null,
  image,
  accessToken,
  refreshToken,
  navigate,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken, navigate);

  try {
    const formData = new FormData();

    if (oldImageUrl) {
      formData.append("oldImageUrl", oldImageUrl);
    }
    formData.append("image", image);

    const response = await authFetch.post(
      `${PLAIN_API_URL}/creator/service-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response;
  } catch (error) {
    if (error.isTokenExpired) {
      navigate("/creator/signin");
    } else {
      throw new Error(
        error.response?.data?.message || "Error uploading service image",
      );
    }
  }
};

const serviceApi = {
  uploadServiceImage,
};

export default serviceApi;
