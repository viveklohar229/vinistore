import axios from "axios";



export const fetchDataFromApi = async (url) => {
    try {
        if (!url || typeof url !== "string") throw new Error("Invalid URL input");

        const finalUrl = `https://fullstack-ecommerce-server-bvto.onrender.com${url.startsWith("/") ? url : "/" + url}`;
        console.log("API Request URL:", finalUrl);

        const { data } = await axios.get(finalUrl);
        return data;
    } catch (error) {
        console.error("API Error:", error.response ? error.response.data : error.message);
        return { success: false, error: error.message };
    }
};


export const postData = async (url, formData, isJson = true) => {
    try {
        const options = {
            method: 'POST',
            body: isJson ? JSON.stringify(formData) : formData
        };

        if (isJson) {
            options.headers = { 'Content-Type': 'application/json' };
        }

        const res = await fetch("https://fullstack-ecommerce-server-bvto.onrender.com" + url, options);

        let data;
        try {
            data = await res.json();
        } catch (jsonError) {
            return { error: "Invalid JSON response from server" };
        }

        return res.ok ? data : { error: data };
    } catch (error) {
        console.log("Fetch error:", error);
        return { error: error.message || "Something went wrong" };
    }
};


export const editData = async (url, updateData) => {
    const { res } = await axios.put(`https://fullstack-ecommerce-server-bvto.onrender.com${url}`, updateData)
    return res;
}


export const deleteData = async (url) => {
    try {
        const response = await axios.delete(`https://fullstack-ecommerce-server-bvto.onrender.com${url}`);
        return response.data; // ✅ Returns actual response data
    } catch (error) {
        console.error("Error deleting data:", error);
        return { error: true, message: error.response?.data?.message || "Something went wrong" };
    }
};



export const uploadImage = async (url, formData) => {
    const { res } = await axios.post("https://fullstack-ecommerce-server-bvto.onrender.com" + url, formData);
    return res;
}

export const deleteImage = async (url,image) =>{
    const {res} = await axios.delete(`https://fullstack-ecommerce-server-bvto.onrender.com${url}`,image)
    return res;
}
