export const uploadImageToCloudinary = async (productImage: any): Promise<string | null> => {
    try {

      const data = new FormData();
      data.append("file", productImage);
      data.append("upload_preset", "final_project");
      data.append("cloud_name", "dbqbeuvaw");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbqbeuvaw/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      console.log("Upload successful:", result);

      return result.secure_url;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    } 
  };